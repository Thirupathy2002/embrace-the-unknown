import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Room } from "../utils/schema.js";

dbConnection(process.env.NEXT_PUBLIC_MONGODB_URI);
export async function POST(req) {
  try {
    const { roomID } = await req.json();
    const data = await Room.findOne({ id: roomID });
    if (!data) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    } else {
      return NextResponse.json({ message: "Room found" }, { status: 200 });
      // return NextResponse.redirect(new URL(`/game/${roomID}`, req.url));
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
