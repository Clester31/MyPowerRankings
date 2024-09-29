/* eslint-disable @next/next/no-img-element */
type PageIconProps = {
    logo: string
    text: string
}

export default function PageIcon({ logo, text }: PageIconProps) {
    return (
        <div className="flex flex-col items-center p-2 bg-gray-200 rounded-xl m-4 cursor-pointer transition duration-200 ease-in hover:scale-110">
            <img src={logo} alt="logo icon" width={120} />
            <h1>{text}</h1>
        </div>
    )
}