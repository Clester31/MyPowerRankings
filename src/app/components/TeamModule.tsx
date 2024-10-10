/* eslint-disable @next/next/no-img-element */
type Team = {
    full_name: string;
    abrv: string;
    img: string;
    bg: string;
    selected: boolean;
};

type TeamInfoProps = {
    pos: number;
    currentListIndex: number;
    teamInfo: Team; 
};

export default function TeamModule({ pos, currentListIndex, teamInfo }: TeamInfoProps) {
    return (
        <div>
            <div
                className="flex flex-col text-center w-64 h-36 items-center justify-center p-2 rounded-xl bg-gray-200 m-2 text-xl font-semibold"
                style={currentListIndex !== pos ? {
                    background: `linear-gradient(to bottom, ${teamInfo.bg}, white)`,
                    border: `4px solid ${teamInfo.bg}`
                }
                    :
                    {
                        background: `linear-gradient(to bottom, #aaaaaa, white)`,
                        border: `4px solid #aaaaaa`
                    }
                }
            >
                <img src={teamInfo.img} alt="nfl team logo" width={80} />
                <h1>{pos + 1}. {teamInfo.full_name}</h1>
            </div>
        </div>
    )
}