/* eslint-disable @next/next/no-img-element */
type PlaceholderProps = {
    leagueLogo: string;
}

export default function TeamModulePlaceholder({leagueLogo}: PlaceholderProps) {
    return (
        <div className="flex flex-col text-center w-64 h-36 items-center justify-center p-2 rounded-xl bg-gray-200 m-2 text-xl font-semibold">
            <img src={leagueLogo} alt="nfl team logo" width={80} />
        </div>
    );
}