"use client"
import React from "react"
import styles from "@/styles/game.module.scss"
import Link from "next/link"

const page = ({ params }) => {
  const roomId = params.id

  const handlePlayerPage = (path) => {
    
  }

  return (
    <div className={styles.main}>
      <h1>Room Id: {roomId}</h1>
      <divn className={styles.players}>
        <Link href={`${roomId}/player1`}>
          <div className={styles.card} onClick={handlePlayerPage()}>Player 1</div>
        </Link>
        <Link href={`${roomId}/player2`}>
          <div className={styles.card}>Player 2</div>
        </Link>
      </divn>
    </div>
  )
}

export default page
