import { useState, useEffect } from "react";
import TeamModule from "./TeamModule";

type FullTeamListProps = {
    teamList: object[];
    league: string;
}

const button_styles = "p-4 rounded-xl text-2xl transition duration-200 ease-in hover:scale-105 mx-2 w-48";
const button_disabled = "text-gray-500 cursor-not-allowed";

export default function FullTeamList({ teamList = [], league }: FullTeamListProps) {
    const [nextTeamUp, setNextTeamUp] = useState<object>({});
    const [randomizedTeamList, setRandomizedTeamList] = useState<object[]>([]);
    const [rankedList, setRankedList] = useState<object[]>([nextTeamUp]);
    const [currentListIndex, setCurrentListIndex] = useState<number>(0);
    const [listCount, setListCount] = useState<number>(2);
    const [leftButtonDisabled, setLeftButtonDisabled] = useState<boolean>(false);
    const [rightButtonDisabled, setRightButtonDisabled] = useState<boolean>(false);
    const [undoButtonDisabled, setUndoButtonDisabled] = useState<boolean>(false);
    const [snapshots, setSnapshots] = useState<object[][]>([]);

    const moveTeamback = () => {
        if (currentListIndex !== 0 && listCount < 34) {
            const newRankedList = [...rankedList];
            [newRankedList[currentListIndex], newRankedList[currentListIndex - 1]] = [newRankedList[currentListIndex - 1], newRankedList[currentListIndex]];

            setRankedList(newRankedList);
            setCurrentListIndex(prev => prev - 1);
        }
    }

    const moveTeamForward = () => {
        if (currentListIndex !== rankedList.length - 1 && listCount < 34) {
            const newRankedList = [...rankedList];
            [newRankedList[currentListIndex], newRankedList[currentListIndex + 1]] = [newRankedList[currentListIndex + 1], newRankedList[currentListIndex]];

            setRankedList(newRankedList);
            setCurrentListIndex(prev => prev + 1);
        }
    }

    const insertTeam = () => {
        if (listCount < 34) {
            setListCount(prev => prev + 1);
            if (listCount < 33) {
                setNextTeamUp(randomizedTeamList[listCount]);
                const newRankedList = [nextTeamUp, ...rankedList];
                setRankedList(newRankedList);
                setSnapshots(prev => [...prev, rankedList]);
                console.log(snapshots);
            }
            setCurrentListIndex(0);
        }
    }

    useEffect(() => {
        function randomizeList(list: object[]) {
            for (let i = list.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [list[i], list[j]] = [list[j], list[i]];
            }
            return list;
        }
        setRandomizedTeamList(randomizeList([...teamList]));
    }, [teamList]);

    useEffect(() => {
        if (randomizedTeamList.length > 0) {
            setRankedList([randomizedTeamList[0]]); // Initialize rankedList with the first team
            setNextTeamUp(randomizedTeamList[1]); // Set the next team up to be inserted
        }
    }, [randomizedTeamList]);

    useEffect(() => {
        setLeftButtonDisabled(currentListIndex === 0 || listCount === 34);
        setRightButtonDisabled(currentListIndex === rankedList.length - 1 || listCount === 34);
        setUndoButtonDisabled(rankedList.length <= 1 || listCount === 34); // Enable undo button if there's more than one team
    }, [currentListIndex, rankedList.length, listCount]);

    return (
        <div>
            <h1>{league}</h1>
            <div className="flex flex-row justify-center grid grid-cols-8">
                {rankedList.map((team, index) => {
                    return (
                        <TeamModule
                            key={index}
                            pos={index}
                            currentListIndex={currentListIndex}
                            teamInfo={team}
                        />
                    );
                })}
            </div>
            <div className="flex flex-row justify-center mt-8">
                <button
                    className={`${button_styles} bg-gray-200 ${leftButtonDisabled ? button_disabled : ''}`}
                    style={{ color: leftButtonDisabled || listCount === 34 ? '#aaaaaa' : 'black' }}
                    onClick={moveTeamback}
                    disabled={leftButtonDisabled} // Disable the button based on state
                >
                    Move Before
                </button>
                <button
                    className={`${button_styles} ${listCount === 2 ? 'bg-green-500' : listCount === 34 ? 'bg-sky-200' : 'bg-sky-500'} ${listCount === 34 ? button_disabled : ''}`}
                    style={{ color: listCount === 34 ? '#aaaaaa' : 'black' }} // Conditional styling for text color
                    onClick={insertTeam}
                    disabled={listCount === 34} // Disable the button based on listCount
                >
                    {listCount === 2 ? 'Begin' : listCount === 33 ? 'Finish' : 'Insert'}
                </button>
                <button
                    className={`${button_styles} bg-gray-200 ${rightButtonDisabled ? button_disabled : ''}`}
                    style={{ color: rightButtonDisabled || listCount === 34 ? '#aaaaaa' : 'black' }} // Conditional styling for text color
                    onClick={moveTeamForward}
                    disabled={rightButtonDisabled} // Disable the button based on state
                >
                    Move After
                </button>
            </div>
            <div className="flex flex-row justify-center mt-8">
                <button
                    className={`${button_styles} ${undoButtonDisabled ? 'bg-red-200' : 'bg-red-500'}`}
                    style={{ color: rightButtonDisabled || listCount === 34 ? '#aaaaaa' : 'black' }}
                    onClick={moveTeamback}
                    disabled={undoButtonDisabled} // Disable the button based on the undo state
                >
                    Undo
                </button>
            </div>
        </div>
    );
}
