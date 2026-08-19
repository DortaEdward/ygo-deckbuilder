
export interface SidebarState {
    cardTypes: string[],
    monsterTypes: string[],
    attributes: string[],
    levelRanks: string[],
    formatLegalities: string[],
    formats: string[],
    collection: string[],
}

export type SidebarKeys = keyof SidebarState