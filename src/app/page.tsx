"use client"

import PageIcon from "./components/PageIcon";
import Footer from "./components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, signIn, logOut } from "./firebase";

const button_styles = "p-2 rounded-md text-md transition duration-200 ease-in hover:scale-105 mx-2 w-48 shadow-lg";

export default function Home() {
  const nfl_logo = 'images/nfl_logo.png'
  const nba_logo = 'images/nba_logo.png'
  const nhl_logo = 'images/nhl_logo.png'
  const mlb_logo = 'images/mlb_logo.png'

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center">
        <div className="w-1/2 text-center mt-16">
          <h1 className="text-4xl">Sports Power Rankings Generator</h1>
          <p className="text-xl mt-4">
            Create your own power rankings for multiple sports leagues! Choose one below to get started.
          </p>
          <div className="flex flex-row mt-8 justify-center">
            <Link href={'/nfl'}><PageIcon logo={nfl_logo} text="NFL" /></Link>
            <Link href={'/nba'}><PageIcon logo={nba_logo} text="NBA" /></Link>
            <Link href={'/nhl'}><PageIcon logo={nhl_logo} text="NHL" /></Link>
            <Link href={'/mlb'}><PageIcon logo={mlb_logo} text="MLB" /></Link>
          </div>
          <div className="mt-8">
            {user ? (
              <>
                <Link href={'/lists'}>
                  <button className={`${button_styles} bg-blue-500 text-white text-xl`}>View Saved Lists</button>
                </Link>
                <button
                  onClick={handleSignOut}
                  className={`${button_styles} bg-red-500 text-white text-xl`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href={'/login'}>
                <button className={`${button_styles} bg-green-500 text-white text-xl`}>Sign In</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}