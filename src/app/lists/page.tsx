/* eslint-disable @next/next/no-img-element */
"use client"

import { useAppContext } from "../context/Context"
import List from "../components/List";
import { useEffect, useState } from "react";
import { auth, fetchUserLists } from "../firebase";
import DeleteItemDisplay from "../components/DeleteItemDisplay";

export default function ListPage() {
    const [showDeleteDisplay, setShowDeleteDisplay] = useState<boolean>(false);
    const [itemToDelete] = useState<string | null>(null);
    const { localLists, setLocalLists } = useAppContext();

    useEffect(() => {
        const fetchLists = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const lists = await fetchUserLists(user.uid);
                    const formattedLists = lists.map(list => ({
                        id: list.id,
                        name: list.name,
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

    const handleDeleteConfirm = (id: string) => {
        setLocalLists(prev => prev.filter(list => list.id !== id));
        setShowDeleteDisplay(false); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            {showDeleteDisplay && (
                <DeleteItemDisplay 
                    onConfirm={() => handleDeleteConfirm(itemToDelete!)} 
                    onCancel={() => setShowDeleteDisplay(false)} 
                />
            )}
            <div className="mt-16 p-2">
                <div>
                    <h1 className="text-center font-semibold text-2xl">My Lists</h1>
                    {localLists.map((listItem, listIndex) => (
                        <List 
                            key={listIndex} 
                            id={listItem.id}
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
