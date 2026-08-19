import { Check, Edit2, ShoppingCart, Upload } from "lucide-react";
import { useState } from "react";

export default function Deckbuilder() {
    const [inputToggle, setInputToggle] = useState(true);
    const [deckName, setDeck] = useState('Deck name');
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
                <section className="border-y mx-4 border-border flex">
                    <div className="border-r h-full border-border pr-4 flex flex-col  py-2">
                        <span className="text-muted text-xs font-light">MAIN DECK</span>
                        <span className="text-sky-500 font-bold">40</span>
                    </div>
                    <div className="border-r h-full border-border px-4 flex flex-col  py-2">
                        <span className="text-muted text-xs">EXTRA DECK</span>
                        <span className="text-sky-500 font-bold">15</span>
                    </div>
                    <div className="border-r h-full border-border px-4 flex flex-col  py-2">
                        <span className="text-muted text-xs">SIDE DECK</span>
                        <span className="text-sky-500 font-bold">15</span>
                    </div>

                </section>
            </div>
            <div className="min-w-64 border-l border-border h-full min-h-0">Deck Analusis</div>
        </div>
    )
}