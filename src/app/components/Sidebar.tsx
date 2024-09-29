export default function Sidebar() {
    return (
        <div className="bg-red-400 w-16 flex h-screen justify-center">
            <ul className="text-4xl p-2">
                <li className="flex flex-row my-4"><i className="fa-solid fa-football hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li>
                <li className="flex flex-row my-4"><i className="fa-solid fa-basketball hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li>
                <li className="flex flex-row my-4"><i className="fa-solid fa-hockey-puck hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li>
                <li className="flex flex-row my-4"><i className="fa-solid fa-baseball hover:text-white cursor-pointer transition duration-100 hover:ease-in"></i></li>
            </ul>
        </div>
    )
}