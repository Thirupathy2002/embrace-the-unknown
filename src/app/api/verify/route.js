import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Room, Coding_questions,Puzzle_questions } from "../utils/schema.js";
import piston from "piston-client";

dbConnection(process.env.NEXT_PUBLIC_MONGODB_URI);
export async function POST(req) {
  try {
    const client = piston({ server: "https://emkc.org" });
    const { roomID, code, lang,ans,id } = await req.json();
    if(roomID, code, lang){const room = await Room.findOne({ id: roomID });
    const question = await Coding_questions.findOne({
      id: room.code[room.step - 1],
    });
    const result = await client.execute(lang, code);
    if (result?.run.stderr.length) {
      return NextResponse.json({ message: result.run.stderr }, { status: 400 });
    }
    let stdOutput;
    if (lang == "c") {
      stdOutput = result.run.stdout.split("^v^");
    } else {
      stdOutput = result.run.stdout.split("\n^v^\n");
    }
    if (stdOutput.some((item) => item.trim() === "undefined")) {
      return NextResponse.json({ message: "Function does not return anything!" }, { status: 401 });
    }
    const output = question.test_cases.map((item, i) => {
      if (item.output == stdOutput[i].trim()) {
        return true;
      } else {
        return false;
      }
    });

    if (output.every((item) => item === true)) {
      return NextResponse.json({ result: output }, { status: 202 });
    } else {
      return NextResponse.json({ result: output, stdOutput }, { status: 206 });
    }}else{
      const verify = await Puzzle_questions.findOne({ _id:id })
      if (ans === verify.answer) {
        return NextResponse.json({ result: "Your answer is Correct" }, { status: 200 });
      }else{
        return NextResponse.json({ result: "Wrong answer" }, { status: 206 });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
