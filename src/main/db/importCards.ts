// src/main/db/importCards.ts
import fs from 'fs'
import { db } from './index'
import { cards, cardSets } from './schema'
import { sql } from 'drizzle-orm'
import type { BrowserWindow } from 'electron'

interface YgoCardSet {
    set_name: string
    set_code: string
    set_rarity?: string
    set_rarity_code?: string   // add
    set_price?: string
}

interface YgoCardImage {
    id: number
    image_url: string
    image_url_small: string
}

interface YgoCard {
    id: number
    name: string
    type: string
    frameType?: string
    desc: string
    atk?: number
    def?: number
    level?: number
    scale?: number
    linkval?: number
    race?: string
    attribute?: string
    archetype?: string
    card_sets?: YgoCardSet[]
    card_images?: YgoCardImage[]
}

interface YgoJson {
    data: YgoCard[]
}

export interface ImportProgress {
    phase: 'reading' | 'inserting' | 'done' | 'error'
    processed: number
    total: number
    message?: string
}

export interface ImportResult {
    success: boolean
    cardsImported: number
    setsImported: number
    error?: string
}

export async function importCardsFromJson(
    filePath: string,
    window: BrowserWindow
): Promise<ImportResult> {
    const sendProgress = (progress: ImportProgress) => {
        window.webContents.send('import:progress', progress)
    }

    try {
        sendProgress({ phase: 'reading', processed: 0, total: 0 })

        const raw = fs.readFileSync(filePath, 'utf-8')
        const parsed: YgoJson = JSON.parse(raw)
        const cardList = parsed.data

        const total = cardList.length
        sendProgress({ phase: 'inserting', processed: 0, total })

        let setsImported = 0
        const CHUNK_SIZE = 500

        for (let i = 0; i < cardList.length; i += CHUNK_SIZE) {
            const chunk = cardList.slice(i, i + CHUNK_SIZE)

            db.transaction((tx) => {
                for (const card of chunk) {
                    const image = card.card_images?.[0]

                    tx.insert(cards)
                        .values({
                            id: card.id,
                            name: card.name,
                            type: card.type,
                            frameType: card.frameType,
                            description: card.desc,
                            atk: card.atk,
                            def: card.def,
                            level: card.level,
                            scale: card.scale,
                            linkVal: card.linkval,
                            race: card.race,
                            attribute: card.attribute,
                            archetype: card.archetype,
                            imageUrl: image?.image_url,
                            imageUrlSmall: image?.image_url_small,
                            updatedAt: Math.floor(Date.now() / 1000),
                        })
                        .onConflictDoUpdate({
                            target: cards.id,
                            set: {
                                name: card.name,
                                type: card.type,
                                frameType: card.frameType,
                                description: card.desc,
                                atk: card.atk,
                                def: card.def,
                                level: card.level,
                                scale: card.scale,
                                linkVal: card.linkval,
                                race: card.race,
                                attribute: card.attribute,
                                archetype: card.archetype,
                                imageUrl: image?.image_url,
                                imageUrlSmall: image?.image_url_small,
                                updatedAt: Math.floor(Date.now() / 1000),
                            },
                        })
                        .run()

                    // Reset this card's sets, then re-insert current ones (handles reprints cleanly)
                    tx.delete(cardSets).where(sql`${cardSets.cardId} = ${card.id}`).run()

                    if (card.card_sets?.length) {
                        for (const set of card.card_sets) {
                            tx.insert(cardSets)
                                .values({
                                    cardId: card.id,
                                    setName: set.set_name,
                                    setCode: set.set_code,
                                    setRarity: set.set_rarity,
                                    setRarityCode: set.set_rarity_code,   // add
                                    setPrice: set.set_price,
                                })
                                .onConflictDoNothing()
                                .run()
                        }
                    }
                }
            })

            sendProgress({
                phase: 'inserting',
                processed: Math.min(i + CHUNK_SIZE, total),
                total,
            })
        }

        sendProgress({ phase: 'done', processed: total, total })

        return { success: true, cardsImported: total, setsImported }
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        sendProgress({ phase: 'error', processed: 0, total: 0, message })
        return { success: false, cardsImported: 0, setsImported: 0, error: message }
    }
}