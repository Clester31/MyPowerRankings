/* eslint-disable @next/next/no-img-element */
"use client"

import { useAppContext } from "../context/Context"
import List from "../components/List";
import { useEffect } from "react";
import { auth, fetchUserLists } from "../firebase";

export default function ListPage() {
    const { localLists, setLocalLists } = useAppContext();

    useEffect(() => {
        const fetchLists = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const lists = await fetchUserLists(user.uid);
                    const formattedLists = lists.map(list => ({
                        name: list.listName,
                        teams: list.teams
                    }));
                    setLocalLists(formattedLists);
    
                    console.log("local lists", formattedLists); 
                } catch (error) {
                    console.error("failed to fetch lists", error);
                }
            }
        };
        fetchLists();
    }, [setLocalLists]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mt-16 p-2">
                <div>
                    <h1 className="text-center font-semibold text-2xl">My Lists</h1>
                    {localLists.map((listItem, listIndex) => (
                        <List 
                            key={listIndex} 
                            name={listItem.name} 
                            list={listItem.teams} 
                            listIndex={listIndex} 
                            setLocalLists={setLocalLists} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
    
}