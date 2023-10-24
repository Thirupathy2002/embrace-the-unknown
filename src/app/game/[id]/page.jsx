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
      <h1>Room Id: {roomID}</h1>
      <div className={styles.players}>
        <Link replace={true} href={`${roomID}/player1`}>
          <div className={styles.card}>Player 1</div>
        </Link>
        <Link replace={true} href={`${roomID}/player2`}>
          <div className={styles.card}>Player 2</div>
        </Link>
      </div>
    </div>
  );
};

export default page;
