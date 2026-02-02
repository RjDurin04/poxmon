import { NamedAPIResource, APIResource, Name, Description, VerboseEffect, FlavorText, Effect, MachineVersionDetail, GenerationGameIndex } from "./common";

// ======================
// Move Types
// ======================
export interface ContestComboSets {
    normal: ContestComboDetail;
    super: ContestComboDetail;
}

export interface ContestComboDetail {
    use_before: NamedAPIResource[] | null;
    use_after: NamedAPIResource[] | null;
}

export interface MoveStatChange {
    change: number;
    stat: NamedAPIResource;
}

export interface PastMoveStatValues {
    accuracy: number | null;
    effect_chance: number | null;
    power: number | null;
    pp: number | null;
    effect_entries: VerboseEffect[];
    type: NamedAPIResource | null;
    version_group: NamedAPIResource;
}

export interface MoveMetaData {
    ailment: NamedAPIResource;
    category: NamedAPIResource;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
}

export interface MoveFlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface MoveDetail {
    id: number;
    name: string;
    accuracy: number | null;
    effect_chance: number | null;
    pp: number;
    priority: number;
    power: number | null;
    contest_combos: ContestComboSets | null;
    contest_type: NamedAPIResource | null;
    contest_effect: APIResource | null;
    damage_class: NamedAPIResource;
    effect_entries: VerboseEffect[];
    effect_changes: {
        version_group: NamedAPIResource;
        effect_entries: Effect[];
    }[];
    flavor_text_entries: MoveFlavorText[];
    generation: NamedAPIResource;
    machines: MachineVersionDetail[];
    meta: MoveMetaData;
    names: Name[];
    past_values: PastMoveStatValues[];
    stat_changes: MoveStatChange[];
    super_contest_effect: APIResource | null;
    target: NamedAPIResource;
    type: NamedAPIResource;
    learned_by_pokemon: NamedAPIResource[];
}

export interface MoveAilment {
    id: number;
    name: string;
    moves: NamedAPIResource[];
    names: Name[];
}

export interface MoveBattleStyle {
    id: number;
    name: string;
    names: Name[];
}

export interface MoveCategory {
    id: number;
    name: string;
    descriptions: Description[];
    moves: NamedAPIResource[];
}

export interface MoveDamageClass {
    id: number;
    name: string;
    descriptions: Description[];
    moves: NamedAPIResource[];
    names: Name[];
}

export interface MoveLearnMethod {
    id: number;
    name: string;
    names: Name[];
    descriptions: Description[];
    version_groups: NamedAPIResource[];
}

export interface MoveTarget {
    id: number;
    name: string;
    descriptions: Description[];
    moves: NamedAPIResource[];
    names: Name[];
}

// ======================
// Ability Types
// ======================
export interface AbilityEffectChange {
    version_group: NamedAPIResource;
    effect_entries: Effect[];
}

export interface AbilityFlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface AbilityPokemon {
    is_hidden: boolean;
    slot: number;
    pokemon: NamedAPIResource;
}

export interface AbilityDetail {
    id: number;
    name: string;
    is_main_series: boolean;
    generation: NamedAPIResource;
    names: Name[];
    effect_entries: VerboseEffect[];
    effect_changes: AbilityEffectChange[];
    flavor_text_entries: AbilityFlavorText[];
    pokemon: AbilityPokemon[];
}

// ======================
// Type Types
// ======================
export interface TypeRelations {
    no_damage_to: NamedAPIResource[];
    half_damage_to: NamedAPIResource[];
    double_damage_to: NamedAPIResource[];
    no_damage_from: NamedAPIResource[];
    half_damage_from: NamedAPIResource[];
    double_damage_from: NamedAPIResource[];
}

export interface TypeRelationsPast {
    generation: NamedAPIResource;
    damage_relations: TypeRelations;
}

export interface TypePokemon {
    slot: number;
    pokemon: NamedAPIResource;
}

export interface TypeDetail {
    id: number;
    name: string;
    damage_relations: TypeRelations;
    past_damage_relations: TypeRelationsPast[];
    game_indices: GenerationGameIndex[];
    generation: NamedAPIResource;
    move_damage_class: NamedAPIResource | null;
    names: Name[];
    pokemon: TypePokemon[];
    moves: NamedAPIResource[];
}
