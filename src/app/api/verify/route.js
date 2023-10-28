import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Room, Access_code, CodingQuestions } from "../utils/schema.js";
import piston from "piston-client";

dbConnection(process.env.NEXT_PUBLIC_MONGODB_URI);
export async function POST(req) {
  try {
    const client = piston({ server: "https://emkc.org" });
    const { roomID, code, lang } = await req.json();
    console.log(code);
    const room = await Room.findOne({ id: roomID });
    const question = await CodingQuestions.findOne({ id: room.code[room.step - 1] });

    const result = await client.execute(lang, code);
    console.log(result.run.stdout);
    const output = result.run.stdout.split("^v^");
    

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
