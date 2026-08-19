import ImportButton from "@renderer/components/Import"
import { Link } from "react-router"

export default function Homepage() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-gray-50 text-4xl font-bold tracking-wider">Duel Engine</h1>
            <div className="text-center flex flex-col gap-2">
                <Link to={"deckbuilder"} className="text-gray-50 text-xl w-48 px-4 py-1 border-border rounded-md border-2 hover:bg-slate-800">
                    <p>Deck Builder</p>
                </Link>
                <Link to={"settings"} className="text-gray-50 text-xl w-48 px-4 py-1 border-border rounded-md border-2 hover:bg-slate-800">
                    <p>Settings</p>
                </Link>
                <Link to={"settings"} className="text-gray-50 text-xl w-48 px-4 py-1 border-border rounded-md border-2 hover:bg-slate-800">
                    <p>Exit</p>
                </Link>
            </div>
            <ImportButton />
        </div>
    )
}