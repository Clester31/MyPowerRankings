import { useAppContext } from "../context/Context";
import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
type Team = {
    id: string;
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

interface ListType {
    name: string;
    list: Team[];
    listIndex: number;
    setLocalLists: React.Dispatch<React.SetStateAction<{ name: string; teams: Team[] }[]>>;
}

export default function List({ name, list, listIndex, setLocalLists }: ListType) {
    const { setFinalTeamList } = useAppContext();
    const router = useRouter();

    const viewList = () => {
        setFinalTeamList(list);
        router.push('/results');
    }

    return (
        <div
            key={listIndex}
            className="my-4 mx-2">
            <div className="flex flex-row mb-1">
                <h2 className="text-xl mx-4">{name}</h2>
                <button
                    className="bg-red-500 text-white px ml-2 rounded"
                    onClick={() => setLocalLists(prev => [...prev.slice(0, listIndex), ...prev.slice(listIndex + 1)])}
                >
                    <i className="fa-solid fa-trash px-2 hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i>
                </button>
                <button
                    className="bg-sky-500 text-white px ml-2 rounded"
                    onClick={viewList}
                >
                    <i className="fa-solid fa-eye px-2 hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i>
                </button>
            </div>
            <div
                className="flex flex-row p-1 rounded-2xl border-4 border-gray-300 shadow-xl"
                style={{ background: 'linear-gradient(0.25turn, #afcadb, #cbafdb, #dbafaf)' }}
            >
                {Array.isArray(list) && list.length > 0 ? (
                    list.map((team: Team, teamIndex: number) => (
                        <div
                            key={teamIndex}
                            className="flex flex-col items-center p-1">
                            <img
                                src={team.img}
                                alt={`${team.full_name} logo`}
                                className="w-20"
                            />
                        </div>
                    ))
                ) : (
                    <p>No teams available in this list.</p> 
                )}
            </div>
        </div>
    )
}
