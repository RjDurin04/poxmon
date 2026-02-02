import { NamedAPIResource, APIResource, Name, Description, FlavorText, VersionGameIndex } from "./common";

// ======================
// Pokemon Types
// ======================
export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
    other: {
        dream_world: { front_default: string | null; front_female: string | null };
        home: { front_default: string | null; front_female: string | null; front_shiny: string | null; front_shiny_female: string | null };
        "official-artwork": { front_default: string | null; front_shiny: string | null };
        showdown: { front_default: string | null; front_shiny: string | null; back_default: string | null; back_shiny: string | null };
    };
    versions: Record<string, Record<string, Record<string, string | null>>>;
}

export interface PokemonCries {
    latest: string | null;
    legacy: string | null;
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonTypePast {
    generation: NamedAPIResource;
    types: PokemonType[];
}

export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: { rarity: number; version: NamedAPIResource }[];
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: {
        level_learned_at: number;
        move_learn_method: NamedAPIResource;
        version_group: NamedAPIResource;
        order?: number;
    }[];
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export interface PokemonDetail {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    species: NamedAPIResource;
    sprites: PokemonSprites;
    cries: PokemonCries;
    stats: PokemonStat[];
    types: PokemonType[];
    past_types: PokemonTypePast[];
    past_abilities: {
        generation: NamedAPIResource;
        abilities: PokemonAbility[];
    }[];
}

// ======================
// Pokemon Species Types
// ======================
export interface PokemonSpeciesVariety {
    is_default: boolean;
    pokemon: NamedAPIResource;
}

export interface PokemonSpeciesDexEntry {
    entry_number: number;
    pokedex: NamedAPIResource;
}

export interface Genus {
    genus: string;
    language: NamedAPIResource;
}

export interface PalParkEncounterArea {
    base_score: number;
    rate: number;
    area: NamedAPIResource;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: NamedAPIResource;
    pokedex_numbers: PokemonSpeciesDexEntry[];
    egg_groups: NamedAPIResource[];
    color: NamedAPIResource;
    shape: NamedAPIResource;
    evolves_from_species: NamedAPIResource | null;
    evolution_chain: APIResource;
    habitat: NamedAPIResource | null;
    generation: NamedAPIResource;
    names: Name[];
    flavor_text_entries: FlavorText[];
    form_descriptions: Description[];
    genera: Genus[];
    varieties: PokemonSpeciesVariety[];
    pal_park_encounters: PalParkEncounterArea[];
}

// ======================
// Encounter Types
// ======================
export interface Encounter {
    min_level: number;
    max_level: number;
    condition_values: NamedAPIResource[];
    chance: number;
    method: NamedAPIResource;
}

export interface VersionEncounterDetail {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Encounter[];
}

export interface LocationAreaEncounter {
    location_area: NamedAPIResource;
    version_details: VersionEncounterDetail[];
}
