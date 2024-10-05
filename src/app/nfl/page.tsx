"use client"

import { useEffect, useState } from 'react'
import nfl_team_info from '../teaminfo/nfl_team_info'
import FullTeamList from '../components/FullTeamList';
import Footer from '../components/Footer';

export default function NFLList() {
    const [teams, setTeams] = useState<object[]>([]);

    useEffect(() => {
        setTeams(nfl_team_info);
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <FullTeamList teamList={teams} league={'NFL'} teamCount={32}/>
            <Footer />
        </div>
    )
}