/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import TeamModule from "./TeamModule";
import TeamModulePlaceholder from "./TeamModulePlaceholder";
import { useAppContext } from "../context/Context";
import { useRouter } from 'next/navigation';

type Team = {
    id: string;
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

type FullTeamListProps = {
    teamList: Team[];
    league: string;
    teamCount: number;
}

const button_styles = "p-2 rounded-md text-md transition duration-200 ease-in hover:scale-105 mx-2 shadow-lg";

export default function FullTeamList({ teamList, league, teamCount }: FullTeamListProps) {
    const [randomizedList, setRandomizedList] = useState<Team[]>([]);
    const [rankedList, setRankedList] = useState<Team[]>([]);
    const [currentListIndex, setCurrentListIndex] = useState<number>(0);
    const [listCount, setListCount] = useState<number>(1);
    const [snapshots, setSnapshots] = useState<Team[][]>([]);

    const { setFinalTeamList, setLeagueString } = useAppContext();
    const router = useRouter();

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
        console.log("listcount", listCount);
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

    const finishList = () => {
        console.log(rankedList);
        setFinalTeamList(rankedList);
        setLeagueString(league);
        router.push('/results');
    }

    useEffect(() => {
        function randomizeList(list: Team[]): Team[] {
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
                <h1>{league} Power Rankings Generator</h1>
            </div>
            <div className="flex m-auto justify-center items-center">
                <div className="left-module flex flex-row">
                    {Array.from({ length: 2 }, (_, i) => {
                        const teamIndex = currentListIndex - 2 + i;
                        if (teamIndex < 0) {
                            return (
                                <div
                                    className={
                                        currentListIndex - teamIndex === 2 ? 'opacity-40' :
                                            currentListIndex - teamIndex === 1 ? 'opacity-80' : 'opacity-100'
                                    }
                                    key={i}>
                                    <TeamModulePlaceholder />
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
                        <TeamModulePlaceholder />
                    )}
                </div>
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
                                    <TeamModulePlaceholder />
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

            {
                rankedList.length < 1 &&
                <div className="flex flex-row justify-center mt-8">
                    <button
                        className={`${button_styles} text-white w-32 ${rankedList.length > 0 ? `bg-green-200 text-gray-400` : `bg-green-500 text-black`}`}
                        onClick={beginRank}
                        disabled={rankedList.length > 0}
                    >
                        Start
                    </button>
                </div>
                ||
                rankedList.length === teamCount &&
                <div className="flex flex-col justify-center mt-8 items-center">
                    <div>
                        <button
                            className={`${button_styles} bg-gray-300 w-16 ${currentListIndex === 0 || listCount > teamCount ? 'bg-gray-100 text-gray-400' : ''}`}
                            onClick={moveTeamBack}
                            disabled={rankedList.length === 0 || currentListIndex === 0 || listCount > teamCount}
                        >
                            <i className="fa-solid fa-arrow-left px-2 cursor-pointer transition duration-100 hover:ease-in"></i>
                        </button>
                        <button
                            className={`${button_styles} text-white w-32 ${rankedList.length !== teamCount ? 'bg-amber-100 text-gray-400' : `bg-amber-500`}`}
                            onClick={finishList}
                            disabled={rankedList.length !== teamCount}
                        >
                            Finish
                        </button>
                        <button
                            className={`${button_styles} bg-gray-300 w-16 ${rankedList.length === 0 || currentListIndex === rankedList.length - 1 || listCount > teamCount ? 'bg-gray-100 text-gray-400' : ''}`}
                            onClick={moveTeamForward}
                            disabled={rankedList.length === 0 || currentListIndex === rankedList.length - 1 || listCount > teamCount}
                        >
                            <i className="fa-solid fa-arrow-right px-2 cursor-pointer transition duration-100 hover:ease-in"></i>
                        </button>
                    </div>
                    <div className="mt-4">
                        <button
                            className={`${button_styles} w-32 text-white ${snapshots.length < 2 ? 'bg-red-100 text-gray-400' : `bg-red-500`}`}
                            onClick={undoInsertion}
                            disabled={rankedList.length === 0 || snapshots.length < 2}
                        >
                            <i className="fa-solid fa-undo px-2 cursor-pointer transition duration-100 hover:ease-in"></i>
                        </button>
                    </div>
                </div>

                ||
                <div className="flex flex-col justify-center mt-8 items-center">
                    <div>
                        <button
                            className={`${button_styles} bg-gray-300 w-16 ${currentListIndex === 0 || listCount > teamCount ? 'bg-gray-100 text-gray-400' : ''}`}
                            onClick={moveTeamBack}
                            disabled={rankedList.length === 0 || currentListIndex === 0 || listCount > teamCount}
                        >
                            <i className="fa-solid fa-arrow-left px-2 cursor-pointer transition duration-100 hover:ease-in"></i>
                        </button>
                        <button
                            className={`${button_styles} w-32 text-xl text-white ${rankedList.length === 0 || rankedList.length === teamCount ? `bg-blue-200 text-gray-400` : `bg-blue-500`}`}
                            onClick={insertTeam}
                            disabled={rankedList.length === 0 || rankedList.length === teamCount}
                        >
                            Insert
                        </button>
                        <button
                            className={`${button_styles} bg-gray-300 w-16 ${rankedList.length === 0 || currentListIndex === rankedList.length - 1 || listCount > teamCount ? 'bg-gray-100 text-gray-400' : ''}`}
                            onClick={moveTeamForward}
                            disabled={rankedList.length === 0 || currentListIndex === rankedList.length - 1 || listCount > teamCount}
                        >
                            <i className="fa-solid fa-arrow-right px-2 cursor-pointer transition duration-100 hover:ease-in"></i>
                        </button>
                    </div>
                    <div className="mt-4">
                        <button
                            className={`${button_styles} w-32 text-white ${snapshots.length < 2 ? 'bg-red-100 text-gray-400' : `bg-red-500`}`}
                            onClick={undoInsertion}
                            disabled={rankedList.length === 0 || snapshots.length < 2}
                        >
                            <i className="fa-solid fa-undo px-2 cursor-pointer transition duration-100 hover:ease-in"></i>
                        </button>
                    </div>

                </div>
            }

            {/* <div className="flex flex-row justify-center mt-8">
                <button
                    className={`${button_styles} w-16 ${rankedList.length > 0 ? `bg-green-200 text-gray-400` : `bg-green-500 text-black`}`}
                    onClick={beginRank}
                    disabled={rankedList.length > 0}
                >
                    Start
                </button>
                <button
                    className={`${button_styles} w-16 ${snapshots.length < 2 ? 'bg-red-100 text-gray-400' : `bg-red-500 hover:text-white`}`}
                    onClick={undoInsertion}
                    disabled={rankedList.length === 0 || snapshots.length < 2}
                >
                    <i className="fa-solid fa-undo px-2 cursor-pointer transition duration-100 hover:ease-in"></i>
                </button>
                <button
                    className={`${button_styles} w-16 ${rankedList.length !== teamCount ? 'bg-amber-100 text-gray-400' : `bg-amber-500`}`}
                    onClick={finishList}
                    disabled={rankedList.length !== teamCount}
                >
                    Finish
                </button>
            </div> */}

        </div>
    );
}
