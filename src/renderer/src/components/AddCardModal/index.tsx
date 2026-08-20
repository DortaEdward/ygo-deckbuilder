
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar"
import { Card } from "@shared/index";
import { Plus } from "lucide-react";

type Props = {
    setIsModalOpen: (b: boolean) => void;
}

export default function AddCardModal({ setIsModalOpen }: Props) {
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [searchInput, setSearchInput] = useState('')   // what the user is typing, updates instantly
    const [search, setSearch] = useState('')
    const pageSize = 100
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchInput])

    function GetCardColor(cardType: string) {
        if (cardType.includes("pendulum")) {
            cardType = "pendulum monster";
        } else if (cardType.includes("synchro")){
            cardType = "synchro monster";
        }
        switch (cardType) {
            case "effect monster":
                return "bg-amber-500";
            case "link monster":
                return "bg-blue-500";
            case "synchro monster":
                return "bg-gray-100";
            case "ritual effect monster":
                return "bg-blue-600";
            case "normal monster":
                return "bg-yellow-300";
            case "fusion monster":
                return "bg-purple-300";
            case "pendulum monster":
                return "bg-amber-600";
            case "spell card":
                return "bg-green-500";
            case "trap card":
                return "bg-fuchsia-800";
        }
    }

    useEffect(() => {
        setLoading(true)
        window.api
            .getAllCards({ page, pageSize, search: search || undefined })
            .then((result) => {
                setCards(result.cards)
                setTotal(result.total)
            })
            .finally(() => setLoading(false))
    }, [page, search])


    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/65 p-2 z-10">
            <div className="flex flex-col border border-border h-full w-full bg-surface">
                <div className="text-gray-50 border-b border-border p-4 flex items-center">
                    <div className="flex-1 flex items-center">
                        <span className="font-bold text-xs" >ADD CARDS</span>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="cursor-pointer">
                        <span className="flex items-center gap-1 text-xs text-muted">Close <span className="text-muted text-[10px] border border-border px-2 py-0.5 bg-black/10 rounded">Esc</span></span>
                    </button>
                </div>
                <div className="w-full h-full flex min-h-0">
                    <Sidebar />
                    <div className="flex-1 min-h-0 overflow-y-auto w-full">
                        <div className="border-b border-border p-4">
                            <div className="flex items-center gap-6">
                                <input
                                    type="text"
                                    className="flex-1 border border-border bg-card outline-none px-2 py-1 rounded text-gray-50 text-sm"
                                    placeholder="Search cards..."
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <div className="flex items-center text-muted gap-3">
                                    <span className="text-sm">{cards.length} results</span>
                                    <select name="" id="" className="border border-border py-1 px-2 rounded text-sm outline-none bg-card">
                                        <option value="">Sort: Relevance</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-1 py-4 px-4">
                            {
                                cards.map(card => {
                                    return (
                                        <div key={card.id} className="flex items-center py-1 px-2 bg-card rounded">
                                            <div className="h-18 flex items-center">
                                                <div className={`w-0.5 h-full rounded-l ${GetCardColor(card.type!.toLowerCase() as string)}`}></div>
                                                <img
                                                    src={`card-image:/${card.id}.jpg`}
                                                    alt={card.name}
                                                    className="h-full"
                                                    loading="lazy" />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <span className="text-gray-50 text-sm px-2">{card.name}</span>
                                                <span className="text-muted text-xs px-2">{card.attribute} L/R {card.level} {card.race} {card.type}</span>
                                            </div>
                                            <div className="border border-border rounded p-1 text-muted bg-white/5 cursor-pointer">
                                                <Plus size={12} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}