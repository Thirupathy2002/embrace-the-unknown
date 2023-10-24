"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/game.module.scss";
import QrReader from "reactjs-qr-reader";
import { toast } from "sonner";

const player1 = ({ params }) => {
  const roomID = params.id;
  const delay = 500;

  const previewStyle = {};

  const [result, setResult] = useState("No result");
  const [isMobile, setIsMobile] = useState(false);

  const handleScan = (result) => {
    if (result) {
      console.log(result);
      setResult(result.data);
    }
  };

  const handleError = (error) => {
    toast.error(error);
  };

  // useEffect(() => {
  //   // @source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
  //   let hasTouchScreen = false;
  //   if ("maxTouchPoints" in navigator) {
  //     hasTouchScreen = navigator.maxTouchPoints > 0;
  //   } else if ("msMaxTouchPoints" in navigator) {
  //     hasTouchScreen = navigator.msMaxTouchPoints > 0;
  //   } else {
  //     const mQ = matchMedia?.("(pointer:coarse)");
  //     if (mQ?.media === "(pointer:coarse)") {
  //       hasTouchScreen = !!mQ.matches;
  //     } else if ("orientation" in window) {
  //       hasTouchScreen = true; // deprecated, but good fallback
  //     } else {
  //       // Only as a last resort, fall back to user agent sniffing
  //       const UA = navigator.userAgent;
  //       hasTouchScreen =
  //         /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
  //         /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
  //     }
  //   }
  //   setIsMobile(hasTouchScreen);
  // }, []);

  if (!isMobile) {
    return (
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.title}>EMBRACE THE UNKNOWN</div>
          Room ID: <span>{roomID}</span>
          <br />
          Make sure you and your teammate are on the same room.
          <br />
          <div className={styles.notmobile}>⚠️ Player 1 must be using a mobile device.</div>
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
        Make sure you and your teammate are on the same room.
        <br />
        Scan the QR code to reveal a puzzle to solve.
      </div>
      <div style={{ width: "100vw", height: "100vw" }}>
        <QrReader delay={delay} onError={handleError} onScan={handleScan} />
      </div>
      <p>{result}</p>
    </div>
  );
};

export default player1;
