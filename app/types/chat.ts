// types/chat.ts
import { ObjectId } from "mongodb";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  _id?: ObjectId;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
