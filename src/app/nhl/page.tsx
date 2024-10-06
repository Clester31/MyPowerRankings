"use client"

import { useEffect, useState } from 'react'
import nhl_team_info from '../teaminfo/nhl_team_info'
import FullTeamList from '../components/FullTeamList';
import Footer from '../components/Footer';

export default function NFLList() {
    const [teams, setTeams] = useState<object[]>([]);

    useEffect(() => {
        setTeams(nhl_team_info);
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex-grow mt-16'>
                <FullTeamList teamList={teams} league={'NHL'} teamCount={32} />
            </div>
            <Footer />
        </div>
    )
}