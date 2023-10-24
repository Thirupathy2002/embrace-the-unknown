"use client";
import styles from "@/styles/page.module.scss";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomID, setRoomID] = useState("");
  const handleRoom = async (type) => {
    if (type === "create") {
      const res = await fetch("/api/create", {
        cache: "no-store",
        method: "GET",
      });
      if (res.status !== 200) {
        console.log("error");
      } else {
        const { roomID } = await res.json();
        router.replace(`/game/${roomID}`);
      }
    } else {
      router.replace(`/game/${roomID}`);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.head}>
        Welcome to
        <div className={styles.title}>EMBRACE THE UNKNOWN</div>
      </div>
      <div className={styles.rules}>
        <div className={styles.title}>Rules:</div>
        <ul>
          ✦ Participant 1 will be present at the event venue, while the other teammate will search
          for a QR Code <br />
          ✦ Participant 2 will locate and scan the QR Code, revealing a puzzle to solve <br />
          ✦ Upon solving it correctly, another link will be displayed <br />
          ✦ Participant 2 will send the link to their teammate <br />
          ✦ The teammate will debug the provided code <br />
          ✦ If the code passes all test cases, a popup message will appear <br />
          ✦ The popup message will contain the location of the next QR Code <br />
          ✦ The teammate will communicate this location to their partner <br />
        </ul>
      </div>
      <div className={styles.room}>
        <div className={styles.create}>
          <input
            type="text"
            maxLength="6"
            name="room"
            placeholder="Enter a room code"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <div className={styles.button} onClick={() => handleRoom("join")}>
            Join a room
          </div>
        </div>
        or
        <div
          className={classNames(styles.create, styles.button)}
          onClick={() => handleRoom("create")}
        >
          Create a room
        </div>
      </div>
    </div>
  );
}
