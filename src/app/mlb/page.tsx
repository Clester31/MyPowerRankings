"use client"

import { useEffect, useState } from 'react'
import mlb_team_info from '../teaminfo/mlb_team_info'
import FullTeamList from '../components/FullTeamList';
import Footer from '../components/Footer';

type Team = {
    id: string;
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

export default function MLBList() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        setTeams(mlb_team_info as Team[]);
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex-grow mt-16'>
                <FullTeamList teamList={teams} league={'MLB'} teamCount={30} />
            </div>
            <Footer />
        </div>
    )
}