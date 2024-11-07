"use client"

import { createContext, useContext, useState } from "react";

type Team = {
    id: string;
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

interface ContextType {
    finalTeamList: Team[];
    setFinalTeamList: React.Dispatch<React.SetStateAction<Team[]>>;
    leagueString: string;
    setLeagueString: React.Dispatch<React.SetStateAction<string>>;
    localLists: ListType[]; 
    setLocalLists: React.Dispatch<React.SetStateAction<ListType[]>>; 
}

interface ListType {
    id: string;
    name: string;
    teams: Team[];
}

const appContext = createContext<ContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [finalTeamList, setFinalTeamList] = useState<Team[]>([]);
    const [leagueString, setLeagueString] = useState<string>("");
    const [localLists, setLocalLists] = useState<ListType[]>([]);

    return (
        <appContext.Provider value={{
            finalTeamList,
            setFinalTeamList,
            leagueString,
            setLeagueString,
            localLists,
            setLocalLists,
        }}>
            {children}
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
