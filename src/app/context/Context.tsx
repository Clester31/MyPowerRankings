"use client"

import { createContext, useContext, useState } from "react";

interface ContextType {
    finalTeamList: object[];
    setFinalTeamList: React.Dispatch<React.SetStateAction<object[]>>;
    leagueString: string;
    setLeagueString: React.Dispatch<React.SetStateAction<string>>;
}

const appContext = createContext<ContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [finalTeamList, setFinalTeamList] = useState<object[]>([]);
    const [leagueString, setLeagueString] = useState<string>("");

    return (
        <appContext.Provider value={{
            finalTeamList,
            setFinalTeamList,
            leagueString,
            setLeagueString
        }}>
            {children}
        </appContext.Provider>
    );
};

// Custom hook to access the context
export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
