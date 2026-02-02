import { NamedAPIResource, Name, Description, GenerationGameIndex, FlavorText, Effect } from "./common";

// ======================
// Location Types
// ======================
export interface LocationDetail {
    id: number;
    name: string;
    region: NamedAPIResource | null;
    names: Name[];
    game_indices: GenerationGameIndex[];
    areas: NamedAPIResource[];
}

export interface EncounterMethodRate {
    encounter_method: NamedAPIResource;
    version_details: { rate: number; version: NamedAPIResource }[];
}

export interface EncounterVersionDetails {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: {
        min_level: number;
        max_level: number;
        condition_values: NamedAPIResource[];
        chance: number;
        method: NamedAPIResource;
    }[];
}

export interface PokemonEncounter {
    pokemon: NamedAPIResource;
    version_details: EncounterVersionDetails[];
}

export interface LocationAreaDetail {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: EncounterMethodRate[];
    location: NamedAPIResource;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
}

export interface PalParkAreaDetail {
    id: number;
    name: string;
    names: Name[];
    pokemon_encounters: {
        base_score: number;
        rate: number;
        pokemon_species: NamedAPIResource;
    }[];
}

export interface RegionDetail {
    id: number;
    name: string;
    locations: NamedAPIResource[];
    main_generation: NamedAPIResource;
    names: Name[];
    pokedexes: NamedAPIResource[];
    version_groups: NamedAPIResource[];
}

// ======================
// Game Types
// ======================
export interface GenerationDetail {
    id: number;
    name: string;
    abilities: NamedAPIResource[];
    main_region: NamedAPIResource;
    moves: NamedAPIResource[];
    names: Name[];
    pokemon_species: NamedAPIResource[];
    types: NamedAPIResource[];
    version_groups: NamedAPIResource[];
}

export interface PokedexDetail {
    id: number;
    name: string;
    is_main_series: boolean;
    descriptions: Description[];
    names: Name[];
    pokemon_entries: {
        entry_number: number;
        pokemon_species: NamedAPIResource;
    }[];
    region: NamedAPIResource | null;
    version_groups: NamedAPIResource[];
}

export interface VersionDetail {
    id: number;
    name: string;
    names: Name[];
    version_group: NamedAPIResource;
}

export interface VersionGroupDetail {
    id: number;
    name: string;
    order: number;
    generation: NamedAPIResource;
    move_learn_methods: NamedAPIResource[];
    pokedexes: NamedAPIResource[];
    regions: NamedAPIResource[];
    versions: NamedAPIResource[];
}

// ======================
// Encounter Types
// ======================
export interface EncounterMethod {
    id: number;
    name: string;
    order: number;
    names: Name[];
}

export interface EncounterCondition {
    id: number;
    name: string;
    names: Name[];
    values: NamedAPIResource[];
}

export interface EncounterConditionValue {
    id: number;
    name: string;
    condition: NamedAPIResource;
    names: Name[];
}

// ======================
// Contest Types
// ======================
export interface ContestName {
    name: string;
    color: string;
    language: NamedAPIResource;
}

export interface ContestType {
    id: number;
    name: string;
    berry_flavor: NamedAPIResource;
    names: ContestName[];
}

export interface ContestEffect {
    id: number;
    appeal: number;
    jam: number;
    effect_entries: Effect[];
    flavor_text_entries: FlavorText[];
}

export interface SuperContestEffect {
    id: number;
    appeal: number;
    flavor_text_entries: FlavorText[];
    moves: NamedAPIResource[];
}

// ======================
// Machine Types
// ======================
export interface Machine {
    id: number;
    item: NamedAPIResource;
    move: NamedAPIResource;
    version_group: NamedAPIResource;
}

// ======================
// Pokemon Metadata Types
// ======================
export interface Characteristic {
    id: number;
    gene_modulo: number;
    possible_values: number[];
    highest_stat: NamedAPIResource;
    descriptions: Description[];
}

export interface EggGroup {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface PokemonColor {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface PokemonShape {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface PokemonHabitat {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface GrowthRate {
    id: number;
    name: string;
    formula: string;
    descriptions: Description[];
    levels: {
        level: number;
        experience: number;
    }[];
    pokemon_species: NamedAPIResource[];
}

export interface Nature {
    id: number;
    name: string;
    decreased_stat: NamedAPIResource | null;
    increased_stat: NamedAPIResource | null;
    likes_flavor: NamedAPIResource | null;
    hates_flavor: NamedAPIResource | null;
    names: Name[];
    pokeathlon_stat_changes: {
        max_change: number;
        pokeathlon_stat: NamedAPIResource;
    }[];
    move_battle_style_preferences: {
        low_hp_preference: number;
        high_hp_preference: number;
        move_battle_style: NamedAPIResource;
    }[];
}
