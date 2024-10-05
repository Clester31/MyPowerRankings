"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import PageIcon from "./components/PageIcon";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  const nfl_logo = 'images/nfl_logo.png'
  const nba_logo = 'images/nba_logo.png'
  const nhl_logo = 'images/nhl_logo.png'
  const mlb_logo = 'images/mlb_logo.png'

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 text-center flex-grow mt-16">
        <h1 className="text-4xl ">Sports Power Rankings Generator</h1>
        <p className="text-xl mt-4">
          Create your own power rankings for multiple sports leagues! Choose one below to get started.
        </p>
        <div className="flex flex-row mt-8 justify-center">
          <Link href={'/nfl'}><PageIcon logo={nfl_logo} text="NFL" /></Link>
          <Link href={'/nba'}><PageIcon logo={nba_logo} text="NBA" /></Link>
          <Link href={'/nhl'}><PageIcon logo={nhl_logo} text="NHL" /></Link>
          <Link href={'/mlb'}><PageIcon logo={mlb_logo} text="MLB" /></Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}