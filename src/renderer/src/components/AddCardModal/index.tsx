
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar"
interface Card {
    id: number
    name: string
    type: string | null
    atk: number | null
    def: number | null
    imageUrlSmall: string | null
}
type Props = {
    setIsModalOpen: (b: boolean) => void;
}

export default function AddCardModal({ setIsModalOpen }: Props) {
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const pageSize = 50

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
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        {
                            cards.map(card => {
                                return (
                                    <div key={card.id}>
                                        <img src={`card-image:///${card.id}.jpg`} alt={card.name} className="w-full rounded" loading="lazy" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}