import { NamedAPIResource, APIResource, Name, Description, VerboseEffect, GenerationGameIndex, MachineVersionDetail, Effect } from "./common";

// ======================
// Item Types
// ======================
export interface ItemSprites {
    default: string | null;
}

export interface ItemHolderPokemon {
    pokemon: NamedAPIResource;
    version_details: { rarity: number; version: NamedAPIResource }[];
}

export interface ItemFlavorText {
    text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface ItemDetail {
    id: number;
    name: string;
    cost: number;
    fling_power: number | null;
    fling_effect: NamedAPIResource | null;
    attributes: NamedAPIResource[];
    category: NamedAPIResource;
    effect_entries: VerboseEffect[];
    flavor_text_entries: ItemFlavorText[];
    game_indices: GenerationGameIndex[];
    names: Name[];
    sprites: ItemSprites;
    held_by_pokemon: ItemHolderPokemon[];
    baby_trigger_for: APIResource | null;
    machines: MachineVersionDetail[];
}

export interface ItemAttribute {
    id: number;
    name: string;
    descriptions: Description[];
    items: NamedAPIResource[];
    names: Name[];
}

export interface ItemCategory {
    id: number;
    name: string;
    items: NamedAPIResource[];
    names: Name[];
    pocket: NamedAPIResource;
}

export interface ItemFlingEffect {
    id: number;
    name: string;
    effect_entries: Effect[];
    items: NamedAPIResource[];
}

export interface ItemPocket {
    id: number;
    name: string;
    categories: NamedAPIResource[];
    names: Name[];
}

// ======================
// Berry Types
// ======================
export interface BerryFlavorMap {
    potency: number;
    flavor: NamedAPIResource;
}

export interface BerryDetail {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: NamedAPIResource;
    flavors: BerryFlavorMap[];
    item: NamedAPIResource;
    natural_gift_type: NamedAPIResource;
}

export interface BerryFirmness {
    id: number;
    name: string;
    berries: NamedAPIResource[];
    names: Name[];
}

export interface FlavorBerryMap {
    potency: number;
    berry: NamedAPIResource;
}

export interface BerryFlavor {
    id: number;
    name: string;
    berries: FlavorBerryMap[];
    contest_type: NamedAPIResource;
    names: Name[];
}
