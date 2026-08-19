import { sqliteTable, integer, text, primaryKey, foreignKey } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'

export const cards = sqliteTable('cards', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    type: text('type'),
    frameType: text('frame_type'),
    description: text('description'),
    atk: integer('atk'),
    def: integer('def'),
    level: integer('level'),
    scale: integer('scale'),
    linkVal: integer('link_val'),
    race: text('race'),
    attribute: text('attribute'),
    archetype: text('archetype'),
    imageUrl: text('image_url'),
    imageUrlSmall: text('image_url_small'),
    updatedAt: integer('updated_at'),
})

export const cardSets = sqliteTable(
    'card_sets',
    {
        cardId: integer('card_id')
            .notNull()
            .references(() => cards.id, { onDelete: 'cascade' }),
        setName: text('set_name').notNull(),
        setCode: text('set_code').notNull(),
        setRarity: text('set_rarity'),
        setRarityCode: text('set_rarity_code'),
        setPrice: text('set_price'),
    },
    (table) => [
        primaryKey({ columns: [table.cardId, table.setCode, table.setRarity] }),
    ]
)

export const decks = sqliteTable('decks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at').notNull().default(sql`(unixepoch())`),
})

export const deckCards = sqliteTable(
    'deck_cards',
    {
        deckId: integer('deck_id')
            .notNull()
            .references(() => decks.id, { onDelete: 'cascade' }),
        cardId: integer('card_id')
            .notNull()
            .references(() => cards.id, { onDelete: 'cascade' }),
        section: text('section', { enum: ['main', 'extra', 'side'] }).notNull(),
        quantity: integer('quantity').notNull().default(1),
    },
    (table) => [
        primaryKey({ columns: [table.deckId, table.cardId, table.section] }),
    ]
)

export const meta = sqliteTable('meta', {
    key: text('key').primaryKey(),
    value: text('value'),
})

export const collectionEntries = sqliteTable(
    'collection_entries',
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        cardId: integer('card_id').notNull(),
        setCode: text('set_code').notNull(),
        rarity: text('rarity').notNull(),
        condition: text('condition', {
            enum: ['mint', 'near_mint', 'excellent', 'good', 'light_played', 'played', 'poor'],
        })
            .notNull()
            .default('near_mint'),
        quantity: integer('quantity').notNull().default(1),
        notes: text('notes'),
        acquiredAt: integer('acquired_at').notNull().default(sql`(unixepoch())`),
    },
    (table) => [
        foreignKey({
            columns: [table.cardId, table.setCode, table.rarity],
            foreignColumns: [cardSets.cardId, cardSets.setCode, cardSets.setRarity],
        }).onDelete('cascade'),
    ]
)

export const collectionEntriesRelations = relations(collectionEntries, ({ one }) => ({
    card: one(cards, {
        fields: [collectionEntries.cardId],
        references: [cards.id],
    }),
    cardSet: one(cardSets, {
        fields: [collectionEntries.cardId, collectionEntries.setCode],
        references: [cardSets.cardId, cardSets.setCode],
    }),
}))


export const cardsRelations = relations(cards, ({ many }) => ({
    sets: many(cardSets),
    deckEntries: many(deckCards),
}))

export const cardSetsRelations = relations(cardSets, ({ one }) => ({
    card: one(cards, {
        fields: [cardSets.cardId],
        references: [cards.id],
    }),
}))

export const decksRelations = relations(decks, ({ many }) => ({
    cards: many(deckCards),
}))

export const deckCardsRelations = relations(deckCards, ({ one }) => ({
    deck: one(decks, {
        fields: [deckCards.deckId],
        references: [decks.id],
    }),
    card: one(cards, {
        fields: [deckCards.cardId],
        references: [cards.id],
    }),
}))