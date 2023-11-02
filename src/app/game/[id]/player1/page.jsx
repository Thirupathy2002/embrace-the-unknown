"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/game.module.scss";
import QrReader from "reactjs-qr-reader";
import { toast } from "sonner";

const player1 = ({ params }) => {
  const roomID = params.id;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("No result");
  const [isMobile, setIsMobile] = useState(false);
  const [access, setAccess] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isTurn, setIsTurn] = useState(false);
  const [question, setQuestion] = useState("");
  const [ans, setans] = useState("");
  

  const handleScan = async (result) => {
    if (result) {
      setScanned(true);
      setResult(result.data);
      const res = await fetch("/api/scan", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          roomID,
          code: result.data,
        }),
      });
      if (res.status === 200) {
        toast.success("Access Granted");
        setAccess(true);
      }
    }
  };

  const handleError = (error) => {
    toast.error(error);
  };

  const fetchTurn = async () => {
    const res = await fetch("/api/turn", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        roomID,
      }),
    });
    if (res.status === 200) {
      const { turn } = await res.json();
      if (turn == 1) setIsTurn(true);
      else setIsTurn(false);
    } else {
      toast.error("Room not found");
    }
  };

  const fetchQuestion = async () => {
    const res = await fetch("/api/question", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        roomID,
      }),
    });
    if (res.status === 200) {
      const { question } = await res.json();
      console.log(question);
      setQuestion(question);
    }
    setLoading(false);
  };

  const handleverify = async ()=>{
    const res = await fetch("/api/verify", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        ans,
      }),
    });
    if (res.status === 200) {
      console.log("happy");
    }
  }

  useEffect(() => {
    setLoading(true);
    // @source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      const mQ = matchMedia?.("(pointer:coarse)");
      if (mQ?.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        const UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    setIsMobile(hasTouchScreen);
    fetchTurn();
    fetchQuestion();
  }, []);

  if (loading) {
    return <div className={styles.main}>Loading...</div>;
  }

  if (!isMobile) {
    return (
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.title}>EMBRACE THE UNKNOWN</div>
          Room ID: <span>{roomID}</span>
          <br />
          <div className={styles.notmobile}>⚠️ Player 1 must be using a mobile device.</div>
        </div>
      </div>
    );
  }

  if (!isTurn) {
    return (
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.title}>EMBRACE THE UNKNOWN</div>
          Room ID: <span>{roomID}</span>
          <br />
        </div>
        <div className={styles.question}>Waiting for player 2 to complete</div>
      </div>
    );
  }

  if (!access) {
    return (
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.title}>EMBRACE THE UNKNOWN</div>
          Room ID: <span>{roomID}</span>
          <br />
          <div className={styles.question}>{question.question}</div>
          <input type="text" value={ans}  onChange={()=>setans(e.target.value)}/>
          <button onClick={handleverify}>verify</button>
          <button>submit</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <div className={styles.title}>EMBRACE THE UNKNOWN</div>
        Room ID: <span>{roomID}</span>
        <br />
        Scan the QR code to reveal a puzzle to solve.
      </div>
      <div style={{ width: "100vw", height: "100vw" }}>
        {!scanned && <QrReader delay={2000} onError={handleError} onScan={handleScan} />}
      </div>
      <p>{result}</p>
    </div>
  );
};

export default player1;
