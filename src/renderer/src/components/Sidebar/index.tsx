import { SidebarKeys, SidebarState } from "@shared/index";
import { useState } from "react";


export default function Sidebar() {

    const [sidebarState, setSidebarState] = useState<SidebarState>({
        cardTypes: [],
        monsterTypes: [],
        attributes: [],
        levelRanks: [],
        formatLegalities: [],
        formats: [],
        collection: [],
    });

    function toggleSidebarState(k: SidebarKeys, payload: string) {
        setSidebarState(prev => {
            const exists = prev[k].includes(payload);
            return {
                ...prev,
                [k]: exists
                    ? prev[k].filter(item => item !== payload)
                    : [...prev[k], payload],
            };
        });
    }

    function clearKeyState(k: SidebarKeys) {
        setSidebarState(prev => {
            return {
                ...prev,
                [k]: [],
            };
        });
    }

    function isInSidebarState(k: SidebarKeys, payload: string): boolean {
        return sidebarState[k].includes(payload);
    }

    const sidebar = {
        cardTypes: ["monster", "spell", "trap"],
        monsterTypes: [
            "Aqua",
            "Beast",
            "Beast-Warrior",
            "Cyberse",
            "Dinosaur",
            "Divine-Beast",
            "Dragon",
            "Fairy",
            "Fiend",
            "Fish",
            "Illusion",
            "Insect",
            "Machine",
            "Plant",
            "Psychic",
            "Pyro",
            "Reptile",
            "Rock",
            "Sea Serpent",
            "Spellcaster",
            "Thunder",
            "Warrior",
            "Winged Beast",
            "Wyrm",
            "Zombie"
        ],
        attributes: [
            "DARK",
            "DIVINE",
            "EARTH",
            "FIRE",
            "LIGHT",
            "WATER",
            "WIND"
        ],
        levelRank: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        formatLegality: ["unlimited", "semi-limited", "limited", "forbidden"],
        format: ["advanced", "traditional", "OCG", "other"],
        collection: ["owned only", "missing only"]
    }
    return (
        <div className="flex-1 flex h-full min-h-0 ">
            <div className="border-r border-border h-full overflow-y-auto scrollbar-thumb-card w-58 p-3 flex flex-col gap-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted font-medium">CARD TYPE</span>
                        <button className="text-teal-600 cursor-pointer" onClick={() => clearKeyState("cardTypes")}>clear</button>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                        {
                            sidebar.cardTypes.map(t => {
                                return (
                                    <div
                                        key={t}
                                        onClick={() => toggleSidebarState("cardTypes", t)}
                                        className={`border border-border rounded px-2 flex items-center py-1 ${isInSidebarState("cardTypes", t) ? "bg-teal-500/25 text-teal-500 border-teal-500" : "bg-elevated text-muted"} capitalize cursor-pointer`}>
                                        <span className="text-[10px]">{t}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted font-medium">Monster Type</span>
                        <button className="text-teal-600 cursor-pointer" onClick={() => clearKeyState("monsterTypes")}>clear</button>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap overflow-y-auto h-48 scrollbar-thumb-card">
                        {
                            sidebar.monsterTypes.map(mt => {
                                return (
                                    <div
                                        key={mt}
                                        onClick={() => toggleSidebarState("monsterTypes", mt)}
                                        className={`border border-border rounded px-2 flex items-center py-1 ${isInSidebarState("monsterTypes", mt) ? "bg-teal-500/25 text-teal-500 border-teal-500" : "bg-elevated text-muted"} capitalize cursor-pointer`}>
                                        <span className="text-[10px]">{mt.replace("-", " ")}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted font-medium">Attribute</span>
                        <button className="text-teal-600 cursor-pointer" onClick={() => clearKeyState("attributes")}>clear</button>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                        {
                            sidebar.attributes.map(a => {
                                return (
                                    <div
                                        key={a}
                                        onClick={() => toggleSidebarState("attributes", a)}
                                        className={`border border-border rounded px-2 flex items-center py-1 ${isInSidebarState("attributes", a) ? "bg-teal-500/25 text-teal-500 border-teal-500" : "bg-elevated text-muted"} capitalize cursor-pointer`}>
                                        <span className="text-[10px]">{a}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted font-medium">Level / Rank</span>
                        <button className="text-teal-600 cursor-pointer" onClick={() => clearKeyState("levelRanks")}>clear</button>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                        {
                            sidebar.levelRank.map((r, i) => {
                                return (
                                    <div
                                        key={r}
                                        onClick={() => toggleSidebarState("levelRanks", String(r))}
                                        className={`border border-border rounded px-2 flex items-center py-1 ${isInSidebarState("levelRanks", String(r)) ? "bg-teal-500/25 text-teal-500 border-teal-500" : "bg-elevated text-muted"} capitalize cursor-pointer`}>
                                        <span className="text-[10px]">{i === sidebar.levelRank.length - 1 ? `${r} +` : r}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted font-medium">Format Legality</span>
                        <button className="text-teal-600 cursor-pointer" onClick={() => clearKeyState("formatLegalities")}>clear</button>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                        {
                            sidebar.formatLegality.map((l) => {
                                return (
                                    <div
                                        key={l}
                                        onClick={() => toggleSidebarState("formatLegalities", l)}
                                        className={`border border-border rounded px-2 flex items-center py-1 ${isInSidebarState("formatLegalities", l) ? "bg-teal-500/25 text-teal-500 border-teal-500" : "bg-elevated text-muted"} capitalize cursor-pointer`}>
                                        <span className="text-[10px]">{l}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted font-medium">Format</span>
                        <button className="text-teal-600 cursor-pointer" onClick={() => clearKeyState("formats")}>clear</button>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                        {
                            sidebar.format.map((f) => {
                                return (
                                    <div
                                        key={f}
                                        onClick={() => toggleSidebarState("formats", f)}
                                        className={`border border-border rounded px-2 flex items-center py-1 ${isInSidebarState("formats", f) ? "bg-teal-500/25 text-teal-500 border-teal-500" : "bg-elevated text-muted"} capitalize cursor-pointer`}>
                                        <span className="text-[10px]">{f}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted font-medium">Collection</span>
                        <button className="text-teal-600 cursor-pointer" onClick={() => clearKeyState("collection")}>clear</button>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                        {
                            sidebar.collection.map((c) => {
                                return (
                                    <div
                                        key={c}
                                        onClick={() => toggleSidebarState("collection", c)}
                                        className={`border border-border rounded px-2 flex items-center py-1 ${isInSidebarState("collection", c) ? "bg-teal-500/25 text-teal-500 border-teal-500" : "bg-elevated text-muted"} capitalize cursor-pointer`}>
                                        <span className="text-[10px]">{c}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="flex-1 min-h-0">main</div>
        </div>
    )
}