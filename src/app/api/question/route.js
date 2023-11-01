import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Room, Coding_questions, Puzzle_questions } from "../utils/schema.js";

dbConnection(process.env.NEXT_PUBLIC_MONGODB_URI);
export async function POST(req) {
  try {
    const { roomID } = await req.json();
    const room = await Room.findOne({ id: roomID });
    if (room.turn == 1) {
      const question = await Puzzle_questions.findOne({
        id: room.code[room.step - 1],
      });
    } else {
      const question = await Coding_questions.findOne({
        id: room.code[room.step - 1],
      });
    }
    if (question) {
      return NextResponse.json({ question }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
