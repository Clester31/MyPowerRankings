"use client"

import Link from "next/link";
import { User } from "firebase/auth";
import { useState } from "react";
import { auth, logOut } from "../firebase";
import { useEffect } from "react";

const button_styles = "rounded-md text-lg transition duration-200 ease-in hover:scale-105 mx-4 h-8 w-32 shadow-lg";

export default function Topbar() {
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
        <div className="fixed top-0 bg-blue-500 w-screen flex h-12 justify-between items-center z-10">
            <div>
                <Link href={'/lists'}>
                    <button
                        className={`${button_styles} ${user === null ? `bg-gray-300 text-gray-600` : `bg-white`}`}
                        disabled={user === null}
                        title={user === null ? "Log in to view your own lists" : ""}
                    >
                        Lists
                    </button>
                </Link>
            </div>
            <div>
                <ul className="text-3xl p-2 flex flex-row">
                    <Link href={'/nfl'}><li className="flex flex-row mx-8"><i className="fa-solid fa-football hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/nba'}><li className="flex flex-row mx-8"><i className="fa-solid fa-basketball hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/'}><li className="flex flex-row mx-8"><i className="fa-solid fa-house hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/nhl'}><li className="flex flex-row mx-8"><i className="fa-solid fa-hockey-puck hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/mlb'}><li className="flex flex-row mx-8"><i className="fa-solid fa-baseball hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                </ul>
            </div>
            <div>
                {user ? (
                    <>
                        <button
                            onClick={handleSignOut}
                            className={`${button_styles} bg-white`}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link href={'/login'}>
                        <button className={`${button_styles} bg-white`}>Sign In</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
