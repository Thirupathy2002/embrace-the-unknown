import React from "react";
import styles from "@/styles/game.module.scss";
import Link from "next/link";
import { BASE_URL } from "@/config";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const roomID = params.id;
  const res = await fetch(BASE_URL + "/api/join", {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({
      roomID,
    }),
  });

  if (res.status !== 200) {
    redirect("/");
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <div className={styles.title}>EMBRACE THE UNKNOWN</div>
        Room ID: <span>{roomID}</span>
        <br />
        If you created this room, share this ID with your teammate.
      </div>
      <br />
      <div className={styles.instruction}>
        ⚠️ Read the objective of each player below and choose wisely, Please note that you cannot
        change your player once selected!
      </div>
      <div className={styles.rules}>
        <div className={styles.a}>
          <div className={styles.title}>Player 1:</div>
          ✦ Search for a QR Code arround the campus. <br />
          ✦ Scan the QR Code to reveal a puzzle to solve. <br />
          ✦ Solve the puzzle to unlock the coding problem for player 2. <br />
        </div>
        <div className={styles.b}>
          <div className={styles.title}>Player 2:</div>
          ✦ Solve coding problems. <br />
          ✦ Reveal the location of the next QR Code by solving the coding problem. <br />
        </div>
      </div>
      <div>Choose your player ↓</div>
      <div className={styles.players}>
        <Link replace={true} href={`${roomID}/player1`}>
          Player 1
        </Link>
        <Link replace={true} href={`${roomID}/player2`}>
          Player 2
        </Link>
      </div>
    </div>
  );
};

export default page;
