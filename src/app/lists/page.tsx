/* eslint-disable @next/next/no-img-element */
"use client"

import { useAppContext } from "../context/Context"
import List from "../components/List";
import { useEffect, useState } from "react";
import { auth, fetchUserLists } from "../firebase";
import DeleteItemDisplay from "../components/DeleteItemDisplay";

export default function ListPage() {
    const [showDeleteDisplay, setShowDeleteDisplay] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const { localLists, setLocalLists } = useAppContext();

    useEffect(() => {
        const fetchLists = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const lists = await fetchUserLists(user.uid);
                    const formattedLists = lists.map(list => ({
                        id: list.id,
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

    const handleDeleteConfirm = (id: string) => {
        // Logic to delete the item
        setLocalLists(prev => prev.filter(list => list.id !== id));
        setShowDeleteDisplay(false); // Hide the delete display after confirming
    };

    return (
        <div className="flex flex-col min-h-screen">
            {showDeleteDisplay && (
                <DeleteItemDisplay 
                    onConfirm={() => handleDeleteConfirm(itemToDelete!)} // Confirm delete
                    onCancel={() => setShowDeleteDisplay(false)} // Cancel delete
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
                            onDelete={() => {
                                setItemToDelete(listItem.id); // Set the item to delete
                                setShowDeleteDisplay(true); // Show the delete confirmation display
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
