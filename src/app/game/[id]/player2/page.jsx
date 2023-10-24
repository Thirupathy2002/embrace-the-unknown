"use client"
import React, { useEffect, useState } from "react"
import styles from "@/styles/game.module.scss"
import Select from "react-select"
import { langOptions, selectStyles, initialCode } from "./constants"
import CodeMirror from "@uiw/react-codemirror"
import { loadLanguage } from "@uiw/codemirror-extensions-langs"
import { githubDark } from "@uiw/codemirror-theme-github"

const Player2 = () => {
  const [playingStatus, setPlayingStatus] = useState(true)
  const [lang, setLang] = useState("javascript")
  const [code, setCode] = useState(initialCode[lang])
  const handleSelectChange = (selectLang) => {
    setLang(selectLang.value)
  }

  const handleCodeChange = (code) => {
    setCode(code)
  }

  useEffect(() => {
    setCode(initialCode[lang])
  }, [lang])

  return (
    <main className={styles.container}>
      {!playingStatus ? (
        <h2 className={styles.title}>
          Wait Untill Player 1 Completes his challenge
        </h2>
      ) : (
        <>
          <h2 className={styles.title}>Your Coding Challenge</h2>
          <CodeMirror
            value={code}
            theme={githubDark}
            minHeight="300px"
            maxHeight="400px"
            extensions={[loadLanguage(lang)]}
            placeholder={`Enter your ${lang} code`}
            onChange={handleCodeChange}
          />
          <Select
            classNamePrefix="select"
            defaultValue={langOptions[0]}
            isSearchable={true}
            onChange={handleSelectChange}
            name="lang"
            options={langOptions}
            components={{
              IndicatorSeparator: () => null,
            }}
            styles={selectStyles}
          />
        </>
      )}
    </main>
  )
}

export default Player2
