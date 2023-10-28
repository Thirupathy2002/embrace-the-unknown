import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Room, Access_code } from "../utils/schema.js";

dbConnection(process.env.NEXT_PUBLIC_MONGODB_URI);
export async function POST(req) {
  try {
    const { roomID } = await req.json();
    const room = await Room.findOne({ id: roomID });
    if (!room) {
      return NextResponse.json({ message: "Not allowed" }, { status: 500 });
    } else {
      return NextResponse.json({ turn: room.turn }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
