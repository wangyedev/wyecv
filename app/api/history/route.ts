// app/api/history/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ messages: [] });
    }

    // Validate ObjectId format
    if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ messages: [] });
    }

    const mongo = await clientPromise;
    const db = mongo.db("chatbot");

    try {
      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(sessionId) });

      if (!session) {
        return NextResponse.json({ messages: [] });
      }

      return NextResponse.json({ messages: session.messages });
    } catch (error) {
      console.error("Error finding session:", error);
      return NextResponse.json({ messages: [] });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ messages: [] });
  }
}
