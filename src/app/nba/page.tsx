"use client"

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FullTeamList from "../components/FullTeamList";
import nba_team_info from "../teaminfo/nba_team_info";

type Team = {
    id: string;
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

export default function NBAList() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        setTeams(nba_team_info as Team[]);
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex-grow mt-16'>
                <FullTeamList teamList={teams} league={'NBA'} teamCount={30} />
            </div>
            <Footer />
        </div>
    )
}