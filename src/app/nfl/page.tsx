"use client"

import { useEffect, useState } from 'react'
import nfl_team_info from '../teaminfo/nfl_team_info'
import FullTeamList from '../components/FullTeamList';

export default function NFLList() {
    const [teams, setTeams] = useState<object[]>([]);

    useEffect(() => {
        setTeams(nfl_team_info);
    }, [])

    return (
        <div>
            <FullTeamList teamList={teams} league={'NFL'} />
        </div>
    )
}