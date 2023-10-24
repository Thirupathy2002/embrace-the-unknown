"use client"
import React, { useState } from "react"
import styles from "@/styles/game.module.scss"


const player1 = () => {
  const [player1Playing, setplayer1Playing] = useState(true)
  return (
    <main className={styles.container}>
      <h1>Your Puzzle to solve</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, vero ad?
        Dignissimos labore expedita amet ex consequuntur sit magni deserunt
        earum cupiditate? Illo, quis qui laboriosam sequi omnis autem eos
        reprehenderit soluta dignissimos ut deleniti iste, iusto earum atque
        ipsum nostrum, explicabo impedit? Quasi veritatis consequuntur voluptas
        at molestias distinctio expedita animi odio, vero sapiente nihil
        perspiciatis blanditiis dolores officiis!
      </p>
    </main>
  )
}

export default player1
