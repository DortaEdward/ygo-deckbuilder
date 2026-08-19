import { ipcMain, BrowserWindow, dialog } from 'electron'
import { importCardsFromJson } from '../db/importCards'
import { db } from '../db'
import { cards } from '../db/schema'
import { like, sql } from 'drizzle-orm'

ipcMain.handle('cards:import', async (event, filePath?: string) => {
    const window = BrowserWindow.fromWebContents(event.sender)!

    let targetPath = filePath
    if (!targetPath) {
        const result = await dialog.showOpenDialog(window, {
            filters: [{ name: 'JSON', extensions: ['json'] }],
            properties: ['openFile'],
        })
        if (result.canceled || !result.filePaths[0]) {
            return { success: false, cardsImported: 0, setsImported: 0, error: 'No file selected' }
        }
        targetPath = result.filePaths[0]
    }

    return importCardsFromJson(targetPath, window)
})

ipcMain.handle('cards:getAll', async (_event, options?: { page?: number; pageSize?: number; search?: string }) => {
    const pageSize = options?.pageSize ?? 50
    const page = options?.page ?? 1
    const offset = (page - 1) * pageSize

    const whereClause = options?.search
        ? like(cards.name, `%${options.search}%`)
        : undefined

    const results = await db
        .select()
        .from(cards)
        .where(whereClause)
        .limit(pageSize)
        .offset(offset)

    const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(cards)
        .where(whereClause)

    return { cards: results, total: count, page, pageSize }
})