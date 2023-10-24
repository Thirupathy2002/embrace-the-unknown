"use client"
import React, { useState } from 'react'
import styles from "@/styles/game.module.scss"

const Player2 = () => {
  const [playingStatus, setPlayingStatus] = useState(false)
  return (
    <main className={styles.container}>
      {!playingStatus ? <h2 className=''>Wait Untill Player 1 Completes his challenge</h2> : <h2>Code Editor</h2>}
    </main>
  )
}

export default Player2