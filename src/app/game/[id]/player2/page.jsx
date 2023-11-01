"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/game.module.scss";
import Select from "react-select";
import { langOptions, selectStyles } from "./constants";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { githubDark } from "@uiw/codemirror-theme-github";
import { toast } from "sonner";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import { useRouter } from "next/navigation";

const player2 = ({ params }) => {
  const roomID = params.id;
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [runcodeLoading, setRuncodeLoading] = useState(false);
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState();
  const [question, setQuestion] = useState();
  const [isTurn, setIsTurn] = useState(false);
  const [testCase, setTestCase] = useState([null, null]);
  const [diff, setDiff] = useState({ newCode: "", oldCode: "" });

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
      if (turn == 2) setIsTurn(true);
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
      setQuestion(question);
      setCode(question?.template[lang]);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/submit", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        roomID,
      }),
    });
    if (res.status === 202) {
      const { location } = await res.json();
      setLocation(location);
      toast.success("Submitted successfully");
    }
  };

  const handleTest = async () => {
    setRuncodeLoading(true);
    setDiff({ newCode: "", oldCode: "" });
    const functionName = question?.check_fn;

    let testcaseAddedFns = [];
    let reqPayload;
    switch (lang) {
      case "java": {
        testcaseAddedFns = question?.test_cases.map(
          (item) => `System.out.println(${functionName}(${item.input}));`
        );
        testcaseAddedFns = testcaseAddedFns.join('\nSystem.out.println("^v^");\n');
        reqPayload = `${code
          .trim()
          .slice(0, -1)}\n\npublic static void main(String[] args) {\n${testcaseAddedFns}\n}}`;
        break;
      }

      case "javascript": {
        testcaseAddedFns = question?.test_cases.map(
          (item) => `console.log(${functionName}(${item.input}));\n`
        );
        testcaseAddedFns = testcaseAddedFns.join('console.log("^v^");\n');
        reqPayload = `${code}\n${testcaseAddedFns}`;
        break;
      }

      case "python": {
        testcaseAddedFns = question?.test_cases.map(
          (item) => `print(${functionName}(${item.input}))\n`
        );
        testcaseAddedFns = testcaseAddedFns.join('print("^v^")\n');
        reqPayload = `${code}\n${testcaseAddedFns}`;
        break;
      }

      case "c": {
        testcaseAddedFns = question?.test_cases.map(
          (item) => `printf(${functionName}(${item.input}));\n`
        );
        testcaseAddedFns = testcaseAddedFns.join('printf("^v^");\n');
        reqPayload = `${code}\n\nint main() {\n${testcaseAddedFns} return 0;\n}`;
        break;
      }
    }

    try {
      const res = await fetch("/api/verify", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          roomID,
          code: reqPayload,
          lang,
        }),
      });
      if (res.status === 202) {
        setTestCase([true, true]);
        toast.success("All test cases have been passed. Hit submit to continue.");
      }
      if (res.status === 400) {
        toast.error("Error in your code!");
      }
      if (res.status === 401) {
        const result = await res.json();
        toast.error(result.message);
      }
      if (res.status === 206) {
        const data = await res.json();
        console.log(data);
        toast.error("Test cases failed! ");
        setTestCase(data.result);
        if (!data.result[0]) {
          setDiff({ oldCode: data.stdOutput[0], newCode: question?.test_cases[0].output });
        }
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setRuncodeLoading(false);
    }
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
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (question) setCode(question?.template[lang]);
  }, [lang]);

  if (location) {
    return (
      <div className="main">
        The next QR location is at {location}
        <br />
        Inform your teammate to scan the QR code at the location. Refresh this page to continue.
      </div>
    );
  }
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
      <ol className={styles.instructions}>
        <li>
          Player shouldn't rename the function name which is present in the template. If they do,
          the compiler will throw an error and the hidden test case will fail.
        </li>
        <li>
          Player should code the logic inside the function and the return the expected output in the
          funtion return.
        </li>
      </ol>
      <p style={{ margin: "1rem 0", fontWeight: "600" }}>{question?.question}</p>
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
            {runcodeLoading ? "Loading.." : "Run code"}
          </button>
          {testCase.every((item) => item) && (
            <button className={styles.btn} onClick={() => handleSubmit()}>
              Submit
            </button>
          )}
        </div>
      </div>
      {diff.newCode && (
        <ReactDiffViewer
          compareMethod={DiffMethod.LINES}
          leftTitle="Std Output"
          rightTitle="Expected"
          styles={{
            variables: {
              dark: {
                diffViewerTitleBackground: "#0d1117",
                diffViewerTitleColor: "#8b949e",
              },
            },
          }}
          useDarkTheme
          oldValue={diff.oldCode}
          newValue={diff.newCode}
          splitView
        />
      )}
      <div className={styles.test_cases}>
        <div>
          <h3>
            Test Case 1:
            <span style={{ marginLeft: "1rem" }}>{testCase[0] ? `✅` : diff ? `❌` : ""}</span>
          </h3>
          <div className={styles.test_case_row}>
            <h4>Input: </h4>
            <p>{question.test_cases[0].input}</p>
          </div>
          <div className={styles.test_case_row}>
            <h4>Output: </h4>
            <p>{`${question.test_cases[0].output}`}</p>
          </div>
        </div>
      </div>
      {!testCase[0] && <h4 className={styles.hidden_cases}>Other test cases are hidden 🤫</h4>}
      {testCase[1] == false && <h4 className={styles.hidden_cases}>Hidden test cases failed 😭</h4>}
    </main>
  );
};

export default player2;
