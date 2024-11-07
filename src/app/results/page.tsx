/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useAppContext } from "../context/Context"
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import getDateString from "../getDateString";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { addUserList, auth } from '../firebase'
import { AddNewListDisplay } from "../components/AddNewListDisplay";
import { v4 as uuidv4 } from 'uuid';
import { User } from "firebase/auth";

const button_styles = "p-2 rounded-md text-md transition duration-200 ease-in hover:scale-105 mx-2 w-48 shadow-lg";

type Team = {
    id: string;
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

interface ListType {
    id: string;
    name: string;
    teams: Team[];
}

export default function ResultsPage() {
    const [name, setName] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const [newListDisplay, setNewListDisplay] = useState<boolean>(false);
    const { finalTeamList, setLocalLists }: { finalTeamList: Team[], setLocalLists: React.Dispatch<React.SetStateAction<ListType[]>> } = useAppContext();
    const imageRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const generateImage = () => {
        if (imageRef.current) {
            html2canvas(imageRef.current, { useCORS: true }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `MyPowerRankings_${getDateString()}`
                link.click();
            })
        }
    }

    const addNewList = (newListItem: Team[], listName: string) => {
        const newList: ListType = {
            id: uuidv4(),
            name: listName,
            teams: newListItem
        };
        setLocalLists(prev => [...prev, newList]);
        addUserList(newListItem, listName);
        setNewListDisplay(false);
        router.push('/');
    }

    return (
        <div className="flex flex-col min-h-screen">
            {newListDisplay &&
                <AddNewListDisplay 
                    teamList={finalTeamList}
                    addNewList={addNewList}
                    setNewListDisplay={setNewListDisplay}
                />
            }
            <div className="flex flex-col flex-grow items-center">
                <div className="mt-16 flex flex-row justify-center items-center">
                    <div
                        ref={imageRef}
                        style={{
                            position: "relative",
                            width: "600px",
                            height: "1050px",
                            backgroundImage: "url('/template/template.png')",
                            backgroundSize: "cover",
                        }}
                    >
                        <h1 className="mt-20 text-2xl font-semibold text-center">Created By: {name}</h1>
                        <div className="grid grid-cols-2 gap-3 mt-4 m-auto ml-16">
                            {finalTeamList.map((team, index) => (
                                <div
                                    className="flex flex-row items-center"
                                    key={index}
                                    style={{ color: "black", fontSize: "16px" }}
                                >
                                    <div className="w-1/6 text-center font-semibold"><h1>{index + 1}. </h1></div>
                                    <div className="w-1/6"><img src={team.img} width={48} /></div>
                                    <div className="w-2/3 ml-2"><h1>{team.full_name}</h1></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="m-8">
                    <input
                        type="text"
                        className={`${button_styles} bg-gray-100 border-2 border-black`}
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                        maxLength={32}
                    />
                    <button
                        className={`${button_styles} bg-blue-500 text-white justify-center items-center`}
                        onClick={generateImage}
                    >
                        Download Image
                    </button>
                    {user &&
                        <button
                            className={`${button_styles} bg-green-500 text-white justify-center items-center`}
                            onClick={() => setNewListDisplay(true)}
                        >
                            Save List
                        </button>
                    }

                </div>
            </div>
            <Footer />
        </div>
    );
}
