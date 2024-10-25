"use client"

import Link from "next/link";

export default function Topbar() {
    return (
        <div className="fixed top-0 bg-blue-500 w-screen flex h-12 justify-center items-center z-10">
            <div>
                <ul className="text-3xl p-2 flex flex-row">
                    <Link href={'/nfl'}><li className="flex flex-row mx-8"><i className="fa-solid fa-football hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/nba'}><li className="flex flex-row mx-8"><i className="fa-solid fa-basketball hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/'}><li className="flex flex-row mx-8"><i className="fa-solid fa-house hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/nhl'}><li className="flex flex-row mx-8"><i className="fa-solid fa-hockey-puck hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                    <Link href={'/mlb'}><li className="flex flex-row mx-8"><i className="fa-solid fa-baseball hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li></Link>
                </ul>
            </div>
        </div>
    );
}
