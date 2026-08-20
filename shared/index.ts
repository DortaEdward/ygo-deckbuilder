
export interface SidebarState {
    cardTypes: string[],
    monsterTypes: string[],
    attributes: string[],
    levelRanks: string[],
    formatLegalities: string[],
    formats: string[],
    collection: string[],
}
export interface Card {
    id: number
    name: string
    type: string | null
    frameType: string | null
    description: string | null
    atk: number | null
    def: number | null
    level: number | null
    scale: number | null
    linkVal: number | null
    race: string | null
    attribute: string | null
    archetype: string | null
    imageUrl: string | null
    imageUrlSmall: string | null
    updatedAt: number | null
}

export type SidebarKeys = keyof SidebarState