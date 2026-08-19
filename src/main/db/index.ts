import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { app } from 'electron'
import path from 'path'
import * as schema from './schema'

export let db: ReturnType<typeof drizzle<typeof schema>>
let sqlite: Database.Database

export function initDb() {
    const dbPath = path.join(app.getPath('userData'), 'ygo-cards.db')

    sqlite = new Database(dbPath)
    sqlite.pragma('journal_mode = WAL')

    db = drizzle(sqlite, { schema })
}