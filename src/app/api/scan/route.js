import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Room, Access_code } from "../utils/schema.js";

dbConnection(process.env.NEXT_PUBLIC_MONGODB_URI);
export async function POST(req) {
  try {
    const { roomID, code } = await req.json();
    const room = await Room.findOne({ id: roomID });
    const access_code = await Access_code.findOne({ code: code });
    if (!room) {
      return NextResponse.json({ message: "Not allowed" }, { status: 500 });
    }
    if (room.step == access_code.name.split("-")[1]) {
      return NextResponse.json({ message: "Access Granted" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Access Denied" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
