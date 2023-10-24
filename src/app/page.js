"use client";
import styles from "@/styles/page.module.scss";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const handleRoom = async (e, type) => {
    e.preventDefault();
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
      const roomID = e.target.room.value;
      const res = await fetch("/api/join", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          roomID,
        }),
      });
      if (res.status !== 200) {
        toast.error("Room not found");
      } else {
        toast.success("Room not found");
        router.replace(`/game/${roomID}`);
      }
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
        <form className={styles.create} onSubmit={(e) => handleRoom(e, "join")}>
          <input type="text" maxLength="6" name="room" placeholder="Enter a room code" />
          <button className={styles.button} type="submit">
            Join a room
          </button>
        </form>
        or
        <button
          className={classNames(styles.create, styles.button)}
          onClick={(e) => handleRoom(e, "create")}
        >
          Create a room
        </button>
      </div>
    </div>
  );
}
