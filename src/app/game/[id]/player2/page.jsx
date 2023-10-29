"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/game.module.scss";
import Select from "react-select";
import { langOptions, selectStyles } from "./constants";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { githubDark } from "@uiw/codemirror-theme-github";
import { round1 } from "./round1";

// get this value from server.
const QstnNum = 1;

const player2 = ({ params }) => {
  const roomID = params.id;

  const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState(round1[QstnNum].template[lang]);
  const [isTurn, setIsTurn] = useState(false);
  const [testCase, setTestCase] = useState([0, 0]);

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
    setLoading(false);
  };

  const handleTest = async () => {
    const fn_name = round1[QstnNum].check_fn;
    let testcaseAddedFns = [];
    if (lang === "java") {
      testcaseAddedFns = round1[QstnNum].test_cases.map((item, i) => {
        return `System.out.println(${fn_name}(${item.input}));`;
      });
    } else if (lang === "javascript") {
      testcaseAddedFns = round1[QstnNum].test_cases.map((item) => {
        return `console.log(${fn_name}(${item.input}));\n`;
      });
      testcaseAddedFns = testcaseAddedFns.join(`console.log("^v^");\n`);
    } else {
      testcaseAddedFns = round1[QstnNum].test_cases.map((item) => {
        return `${fn_name}(${item.input})`;
      });
    }
    let req_payload;
    if (lang === "c") {
      req_payload = `${code}\n\nint main() {\n${testcaseAddedFns.join(";\n")};\n returm 0;\n}`;
    } else if (lang === "java") {
      req_payload = `${code
        .trim()
        .substring(
          0,
          code.length - 1
        )}\n\npublic static void main(String[] args) {\n${testcaseAddedFns.join(
        '\nSystem.out.println("^v^");\n'
      )}\n    }\n}`;
    } else {
      req_payload = `${code}\n${testcaseAddedFns}`;
    }
    const res = await fetch("/api/verify", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        roomID,
        code: req_payload,
        lang,
      }),
    });
  };

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
  }, []);

  useEffect(() => {
    setCode(round1[QstnNum].template[lang]);
  }, [lang]);

  if (loading) {
    return <div className={styles.main}>Loading...</div>;
  }

  if (isMobile) {
    return (
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.title}>EMBRACE THE UNKNOWN</div>
          Room ID: <span>{roomID}</span>
          <br />
          <div className={styles.notmobile}>⚠️ Player 2 must be using a desktop.</div>
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
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Your Coding Challenge</h2>
      <p style={{ margin: "1rem 0", textAlign: "center" }}>{round1[QstnNum].question}</p>
      <CodeMirror
        value={code}
        theme={githubDark}
        minHeight="300px"
        maxHeight="400px"
        extensions={[loadLanguage(lang)]}
        placeholder={`Enter your ${lang} code`}
        onChange={(value) => setCode(value)}
      />
      <div className={styles.footer}>
        <Select
          classNamePrefix="select"
          defaultValue={langOptions[0]}
          isSearchable={true}
          onChange={(selectLang) => setLang(selectLang.value)}
          name="lang"
          options={langOptions}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={selectStyles}
        />
        <div className={styles.test_block}>
          <button className={styles.btn} onClick={() => handleTest()}>
            Run
          </button>
          <button className={styles.btn} onClick={() => handleTest("submit")}>
            Submit
          </button>
        </div>
      </div>
      {round1[QstnNum].test_cases.map((test_case, index) => (
        <div className={styles.test_cases} key={index}>
          <h3>Test Case {index + 1}</h3>
          <div className={styles.test_case_row}>
            <h4>Input: </h4>
            <p>{test_case.input}</p>
          </div>
          <div className={styles.test_case_row}>
            <h4>Output: </h4>
            <p>{test_case.output}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default player2;
