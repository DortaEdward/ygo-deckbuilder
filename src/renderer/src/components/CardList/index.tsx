// src/renderer/src/components/CardList.tsx
import { useEffect, useState } from 'react'

interface Card {
    id: number
    name: string
    type: string | null
    atk: number | null
    def: number | null
    imageUrlSmall: string | null
}

export function CardList() {
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

    const totalPages = Math.ceil(total / pageSize)

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search cards..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                }}
                className="mb-4 w-full rounded border px-3 py-2"
            />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="grid grid-cols-6 gap-4">
                        {cards.map((card) => (
                            <div key={card.id} className="text-center">
                                {card.imageUrlSmall && (
                                    <img src={card.imageUrlSmall} alt={card.name} className="w-full rounded" />
                                )}
                                <p className="mt-1 text-sm">{card.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-4">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="rounded border px-3 py-1 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages} ({total} cards)
                        </span>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="rounded border px-3 py-1 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}