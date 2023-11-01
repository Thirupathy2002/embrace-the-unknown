import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Access_code, Room } from "../utils/schema.js";

dbConnection(process.env.NEXT_PUBLIC_MONGODB_URI);
export async function POST(req) {
  try {
    const { roomID } = await req.json();
    const data = await Room.findOne({ id: roomID });

    if (data.turn == 1) {
      data.turn = 2;
      data.save();
      if (!data) {
        return NextResponse.json({ message: "Room not found" }, { status: 404 });
      } else {
        return NextResponse.json({ message: "saved" }, { status: 202 });
      }
    } else {
      const access = await Access_code.findOne({ name: `code-${data.step + 2}` });
      if (!access) {
        return NextResponse.json({ message: "You won" }, { status: 200 });
      }
      data.step += 1;
      data.turn = 1;
      data.save();
      if (!data) {
        return NextResponse.json({ message: "Room not found" }, { status: 404 });
      } else {
        return NextResponse.json({ location: access.location }, { status: 202 });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
