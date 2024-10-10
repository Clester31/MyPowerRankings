"use client"

import { useEffect, useState } from 'react'
import nfl_team_info from '../teaminfo/nfl_team_info'
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

export default function NFLList() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        setTeams(nfl_team_info as Team[]);
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex-grow mt-16'> 
                <FullTeamList teamList={teams} league={'NFL'} teamCount={32} />
            </div>
            <Footer />
        </div>
    )
}