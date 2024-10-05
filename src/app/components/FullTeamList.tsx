/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import TeamModule from "./TeamModule";
import TeamModulePlaceholder from "./TeamModulePlaceholder";

type FullTeamListProps = {
    teamList: { id: string; name: string }[];  // Ensure your team objects have unique ids
    league: string;
    teamCount: number;
}

const button_styles = "p-2 rounded-xl text-xl transition duration-200 ease-in hover:scale-105 mx-2 w-48";

export default function FullTeamList({ teamList, league, teamCount }: FullTeamListProps) {
    const [randomizedList, setRandomizedList] = useState<object[]>([]);
    const [rankedList, setRankedList] = useState<object[]>([]);
    const [currentListIndex, setCurrentListIndex] = useState<number>(0);
    const [listCount, setListCount] = useState<number>(1);
    const [snapshots, setSnapshots] = useState<object[]>([]);

    const league_logo = `images/${league}_logo.png`;

    const beginRank = () => {
        setRankedList(prev => [...prev, randomizedList[0]]);
    };

    const moveTeamBack = () => {
        if (currentListIndex > 0) {
            const newRankedList = [...rankedList];
            [newRankedList[currentListIndex], newRankedList[currentListIndex - 1]] = [newRankedList[currentListIndex - 1], newRankedList[currentListIndex]];
            setRankedList(newRankedList);
            setCurrentListIndex(prev => prev - 1);
        }
    };

    const moveTeamForward = () => {
        if (currentListIndex < rankedList.length - 1) {
            const newRankedList = [...rankedList];
            [newRankedList[currentListIndex], newRankedList[currentListIndex + 1]] = [newRankedList[currentListIndex + 1], newRankedList[currentListIndex]];
            setRankedList(newRankedList);
            setCurrentListIndex(prev => prev + 1);
        }
    };

    const insertTeam = () => {
        if (listCount < teamCount) {
            const newRankedList = [randomizedList[listCount], ...rankedList];
            setRankedList(newRankedList);
            setListCount(prev => prev + 1);
            setSnapshots(prev => [...prev, newRankedList]);
        }
        setCurrentListIndex(0);
    };

    const undoInsertion = () => {
        if (snapshots.length > 0) {
            const lastSnapshot = snapshots[snapshots.length - 2];
            setSnapshots(prev => prev.slice(0, prev.length - 1));
            setRankedList(lastSnapshot);
            setListCount(prev => prev - 1);
            setCurrentListIndex(0);
        }
    };

    useEffect(() => {
        function randomizeList(list: object[]) {
            for (let i = list.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [list[i], list[j]] = [list[j], list[i]];
            }
            return list;
        }
        const randomList = randomizeList([...teamList]);
        setRandomizedList(randomList);
    }, [teamList]);

    return (
        <div>
            <div className="flex flex-row m-auto justify-center items-center mb-8 text-2xl mt-2">
                <img src={league_logo} alt="nfl team logo" width={80} />
                <h1>{league} Power Rankings Generator</h1>
                <img src={league_logo} alt="nfl team logo" width={80} />
            </div>
            <div className="flex m-auto justify-center items-center">
                {/* Left modules */}
                <div className="left-module flex flex-row">
                    {Array.from({ length: 2 }, (_, i) => {
                        const teamIndex = currentListIndex - 2 + i;
                        console.log("teamindex", teamIndex, "currentindex", currentListIndex)
                        if (teamIndex < 0) {
                            return (
                                <div
                                    className={
                                        currentListIndex - teamIndex === 2 ? 'opacity-40' :
                                            currentListIndex - teamIndex === 1 ? 'opacity-80' : 'opacity-100'
                                    }
                                    key={i}>
                                    <TeamModulePlaceholder leagueLogo={league_logo} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    className={
                                        currentListIndex - teamIndex === 2 ? 'opacity-40' :
                                            currentListIndex - teamIndex === 1 ? 'opacity-80' : 'opacity-100'
                                    }
                                    key={rankedList[teamIndex]?.id}>
                                    <TeamModule
                                        pos={teamIndex}
                                        currentListIndex={currentListIndex}
                                        teamInfo={rankedList[teamIndex]}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>

                {/* Center module */}
                <div className="center-module">
                    {rankedList.length > 0 ? (
                        <TeamModule
                            key={rankedList[currentListIndex]?.id}  // Ensure unique key
                            pos={currentListIndex}
                            currentListIndex={currentListIndex}
                            teamInfo={rankedList[currentListIndex]}
                        />
                    ) : (
                        <TeamModulePlaceholder leagueLogo={league_logo} />
                    )}
                </div>

                {/* Right modules */}
                <div className="right-module flex flex-row">
                    {Array.from({ length: 2 }, (_, i) => {
                        const teamIndex = currentListIndex + 1 + i;
                        if (teamIndex >= rankedList.length) {
                            return (
                                <div
                                    className={
                                        currentListIndex - teamIndex === -2 ? 'opacity-40' :
                                            currentListIndex - teamIndex === -1 ? 'opacity-80' : 'opacity-100'
                                    }
                                    key={i}>
                                    <TeamModulePlaceholder leagueLogo={league_logo} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    className={
                                        currentListIndex - teamIndex === -2 ? 'opacity-40' :
                                            currentListIndex - teamIndex === -1 ? 'opacity-80' : 'opacity-100'
                                    }
                                    key={rankedList[teamIndex]?.id}>
                                    <TeamModule
                                        pos={teamIndex}
                                        currentListIndex={currentListIndex}
                                        teamInfo={rankedList[teamIndex]}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>

            <div className="flex flex-row justify-center mt-8">
                <button
                    className={`${button_styles} bg-gray-200 ${currentListIndex === 0 && 'bg-gray-100 text-gray-400'}`}
                    onClick={moveTeamBack}
                    disabled={rankedList.length === 0 || currentListIndex === 0}
                >
                    Move Before
                </button>
                <button
                    className={`${button_styles} ${rankedList.length === 0 ? `bg-cyan-200 text-gray-400` : `bg-cyan-500`}`}
                    onClick={insertTeam}
                    disabled={rankedList.length === 0}
                >
                    Insert
                </button>
                <button
                    className={`${button_styles} bg-gray-200 ${currentListIndex === rankedList.length - 1 ? 'bg-gray-100 text-gray-400' : rankedList.length === teamCount && 'bg-gray-100 text-gray-400'}`}
                    onClick={moveTeamForward}
                    disabled={rankedList.length === 0 || currentListIndex === rankedList.length - 1 || rankedList.length === teamCount}
                >
                    Move After
                </button>
            </div>

            <div className="flex flex-row justify-center mt-8">
                <button
                    className={`${button_styles} ${snapshots.length < 2 ? 'bg-red-100 text-gray-400' : `bg-red-500`}`}
                    onClick={undoInsertion}
                    disabled={rankedList.length === 0 || snapshots.length < 2}
                >
                    Undo
                </button>
                <button
                    className={`${button_styles} ${rankedList.length > 0 ? `bg-green-200 text-gray-400` : `bg-green-500 text-black`}`}
                    onClick={beginRank}
                    disabled={rankedList.length > 0}
                >
                    Begin
                </button>
            </div>
        </div>       
    );
}
