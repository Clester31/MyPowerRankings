import { useState } from "react";

type Team = {
    id: string;
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

type AddNewListDisplayProps = {
    teamList: Team[];
    addNewList: (newListItem: Team[], listName: string) => void;
    setNewListDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddNewListDisplay({ teamList, addNewList, setNewListDisplay }: AddNewListDisplayProps) {
    const button_styles = "p-2 rounded-md text-md transition duration-200 ease-in hover:scale-105 mx-2 w-48 shadow-lg";
    const [listName, setListName] = useState<string>("");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <div className="bg-white w-64 p-4 text-center rounded-2xl">
                <h1
                className="text-end font-bold text-red-500 cursor-pointer"
                onClick={() => setNewListDisplay(false)}
                >
                    X
                    </h1>
                <h1 className="text-xl font-semibold my-2">List Name</h1>
                <input
                    type="text"
                    className={`${button_styles} bg-gray-100 border-2 border-black my-2`}
                    onChange={(e) => setListName(e.target.value)}
                />
                <button
                    className={`${button_styles} bg-green-500 my-2 text-white`}
                    onClick={() => addNewList(teamList, listName)}
                >
                    Add List
                </button>
            </div>
        </div>
    )
}