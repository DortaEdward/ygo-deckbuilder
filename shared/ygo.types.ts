export interface YgoProDeckCard {
    id: number;
    name: string;
    typeline: string[];
    type: string;
    humanReadableCardType: string;
    frameType: string;
    desc: string;
    race: string;
    atk: number;
    def: number;
    level: number;
    attribute: string;
    archetype: string;
    ygoprodeck_url: string;

    card_sets: YgoProDeckCardSet[];
    card_images: YgoProDeckCardImage[];
    card_prices: YgoProDeckCardPrice[];
}

export interface YgoProDeckCardSet {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
}

export interface YgoProDeckCardImage {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
}

export interface YgoProDeckCardPrice {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
    coolstuffinc_price: string;
}