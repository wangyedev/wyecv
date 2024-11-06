// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import clientPromise from "../../lib/mongodb";
import type { ChatSession, Message } from "../../types/chat";
import { ObjectId } from "mongodb";

// Initialize OpenAI
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({ apiKey: openaiApiKey });

const pineconeApiKey = process.env.PINECONE_API_KEY;

if (!pineconeApiKey) {
  throw new Error("PINECONE_API_KEY is not set");
}

// Initialize Pinecone
const pinecone = new Pinecone({ apiKey: pineconeApiKey });

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json();
    const mongo = await clientPromise;
    const db = mongo.db("chatbot");
    const sessions = db.collection<ChatSession>("sessions");

    // Get or create session
    let session;
    if (sessionId && sessionId.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        session = await sessions.findOne({ _id: new ObjectId(sessionId) });
      } catch (error) {
        console.error("Error finding session:", error);
        // Continue to create new session
      }
    }

    if (!session) {
      // Create new session
      const result = await sessions.insertOne({
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      session = {
        _id: result.insertedId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    // Generate embeddings
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });

    // Query Pinecone
    const index = pinecone.Index("chatbot");
    const queryResponse = await index.query({
      vector: embedding.data[0].embedding,
      topK: 3,
      includeMetadata: true,
    });

    const context = queryResponse.matches
      .map((match) => match.metadata?.text)
      .join("\n");

    // Prepare conversation history
    const recentMessages = session.messages.slice(-5);
    const conversationHistory = recentMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Use the following context to answer questions: ${context}`,
        },
        ...conversationHistory,
        { role: "user", content: message },
      ],
      stream: true,
    });

    // Create a streaming response
    const encoder = new TextEncoder();
    const streamResponse = new ReadableStream({
      async start(controller) {
        let fullResponse = "";

        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            fullResponse += content;

            // Send the chunk to the client
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
            );
          }

          // Save the complete message to database
          const newMessages: Message[] = [
            {
              role: "user",
              content: message,
              timestamp: new Date(),
            },
            {
              role: "assistant",
              content: fullResponse,
              timestamp: new Date(),
            },
          ];

          await sessions.updateOne(
            { _id: session._id },
            {
              $push: { messages: { $each: newMessages } },
              $set: { updatedAt: new Date() },
            }
          );

          // Send the session ID in the final chunk
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                sessionId: session._id.toString(),
              })}\n\n`
            )
          );
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    // Return the streaming response
    return new Response(streamResponse, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
