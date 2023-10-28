"use client"
import React, { useEffect, useState } from "react"
import styles from "@/styles/game.module.scss"
import Select from "react-select"
import { langOptions, selectStyles } from "./constants"
import CodeMirror from "@uiw/react-codemirror"
import { loadLanguage } from "@uiw/codemirror-extensions-langs"
import { githubDark } from "@uiw/codemirror-theme-github"
import { round1 } from "./round1"

// get this value from server.
const QstnNum = Math.floor(Math.random() * 1)

const Player2 = () => {
  const [playingStatus, setPlayingStatus] = useState(true)
  const [lang, setLang] = useState("javascript")
  const [code, setCode] = useState(round1[QstnNum].template[lang])

  const handleTest = (type) => {
    const fn_name = round1[QstnNum].check_fn
    const testcaseAddedFns = round1[QstnNum].test_cases.map((item) => {
      return `${fn_name}(${item.input})`
    })
    let req_payload
    if (lang === 'c') {
      req_payload = `${code}\n\nint main() {\n${testcaseAddedFns.join(";\n")}\n returm 0;\n}`
    } else {
      req_payload = `${code}\n${testcaseAddedFns.join("\n")}`
    }
    console.log(req_payload);
  }

  useEffect(() => {
    setCode(round1[QstnNum].template[lang])
  }, [lang])

  return (
    <main className={styles.main}>
      {!playingStatus ? (
        <h2 className={styles.title}>
          Wait Untill Player 1 Completes his challenge
        </h2>
      ) : (
        <>
          <h2 className={styles.title}>Your Coding Challenge</h2>
          <p style={{ margin: "1rem 0", textAlign: "center" }}>
            {round1[QstnNum].question}
          </p>
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
              <button className={styles.btn} onClick={() => handleTest("run")}>
                Run
              </button>
              <button
                className={styles.btn}
                onClick={() => handleTest("submit")}
              >
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
        </>
      )}
    </main>
  )
}

export default Player2
