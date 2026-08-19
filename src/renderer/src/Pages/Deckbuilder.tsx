import { Check, ChevronDown, ChevronRight, Edit2, ShoppingCart, Upload } from "lucide-react";
import { useState } from "react";

export default function Deckbuilder() {
    const [inputToggle, setInputToggle] = useState(true);
    const [deckName, setDeck] = useState('Deck name');
    const decks = [
        {
            name: "Main Deck",
            cards: []
        },
        {
            name: "Extra Deck",
            cards: []
        },
        {
            name: "Side Deck",
            cards: []
        },
    ]

    const [mainDeckOpen, setMainDeckOpen] = useState(false);


    return (
        <div className="flex h-full">
            <div className="flex-1 h-full min-h-0 overflow-y-auto text-white">
                <section className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 mr-10 items-center">
                            {
                                inputToggle
                                    ?
                                    <div className="flex gap-2 items-center h-full">
                                        <input className="flex-1 border border-border py-2 px-2 rounded h-full" value={deckName} onChange={e => setDeck(e.target.value)} />
                                        <button className="flex items-center justify-center border-border border rounded p-2" onClick={() => setInputToggle(false)}><Check size={20} /></button>
                                    </div>
                                    :
                                    <span onClick={() => setInputToggle(true)} className="h-full text-xl text-center font-bold">{deckName}</span>
                            }
                        </div>
                        <div className="flex gap-2">
                            <button className="flex gap-2 items-center px-3 py-1 border border-border bg-white/5 rounded-sm text-xs"> <Edit2 size={12} /> Edit</button>
                            <button className="flex gap-2 items-center px-3 py-1 border border-border bg-white/5 rounded-sm text-xs"> <Upload size={12} /> Export</button>
                            <button className="flex gap-2 items-center px-3 py-1 border border-border bg-blue-700 rounded-sm text-xs"><ShoppingCart size={12} /> Buy Deck on TCGPlayer</button>
                        </div>
                    </div>
                </section>
                {/* Deck Stats */}
                <section className="border-t mx-4 border-border flex">
                    <div className="border-r h-full border-border pr-4 flex flex-col  py-2">
                        <span className="text-muted text-xs font-light">MAIN DECK</span>
                        <span className="text-sky-500 font-bold">40</span>
                    </div>
                    <div className="border-r h-full border-border px-4 flex flex-col  py-2">
                        <span className="text-muted text-xs">EXTRA DECK</span>
                        <span className="text-gray-50 font-bold">15</span>
                    </div>
                    <div className="border-r h-full border-border px-4 flex flex-col  py-2">
                        <span className="text-muted text-xs">SIDE DECK</span>
                        <span className="text-gray-50 font-bold">15</span>
                    </div>
                    <div className="border-r h-full border-border px-4 flex flex-col  py-2">
                        <span className="text-muted text-xs">MONSTERS</span>
                        <span className="text-gray-50 font-bold">15</span>
                    </div>
                    <div className="border-r h-full border-border px-4 flex flex-col  py-2">
                        <span className="text-muted text-xs">SPELLS</span>
                        <span className="text-gray-50 font-bold">15</span>
                    </div>
                    <div className="border-r h-full border-border px-4 flex flex-col  py-2">
                        <span className="text-muted text-xs">TRAPS</span>
                        <span className="text-gray-50 font-bold">15</span>
                    </div>
                </section>
                <section className="bg-surface border-y border-border px-4 flex items-center justify-between">
                    <div className="flex">
                        <div className="h-full border-b-2 hover:bg-white/5 cursor-pointer border-blue-500 px-4 py-2">
                            <span className="text-xs">Deck</span>
                        </div>
                        <div className="h-full hover:bg-white/5 cursor-pointer px-4 py-2">
                            <span className="text-xs">Notes</span>
                        </div>
                        <div className="h-full hover:bg-white/5 cursor-pointer px-4 py-2">
                            <span className="text-xs mr-2">Combos</span>
                            <span className="text-[10px]">7</span>
                        </div>
                        <div className="h-full hover:bg-white/5 cursor-pointer px-4 py-2">
                            <span className="text-xs mr-2">Comments</span>
                            <span className="text-[10px]">12</span>
                        </div>
                    </div>
                    <div>
                        <button className="text-xs border border-border cursor-pointer px-3 py-1 rounded bg-white/5">+ Add cards</button>
                    </div>
                </section>
                <section className="px-4 py-4">
                    {
                        decks.map(deck => {
                            return (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between border-b border-border">
                                        <div className="cursor-pointer" onClick={() => setMainDeckOpen(prev => !prev)}>
                                            <div className="flex items-center gap-4">
                                                {
                                                    mainDeckOpen
                                                        ? <ChevronDown size={12} />
                                                        : <ChevronRight size={12} />
                                                }
                                                <span className="text-xs">{deck.name} · MONSTERS <span>{deck.cards.length}/40</span></span>
                                                <div className="relative bg-muted h-1 w-64">
                                                    <div className="absolute top-0 left-0 bg-sky-600 h-1 w-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted">12 unique</span>
                                        </div>
                                    </div>
                                    {
                                        mainDeckOpen
                                        &&
                                        <div className="py-2">
                                            Cards
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }

                </section>
            </div>
            <div className="min-w-64 border-l border-border h-full min-h-0">Deck Analusis</div>
        </div>
    )
}