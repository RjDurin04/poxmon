const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// --- Generic Fetch Helper ---
type NextFetchOptions = RequestInit & { next?: { revalidate?: number } };

async function apiFetch<T>(endpoint: string, retries = 3): Promise<T> {
    const url = `${POKEAPI_BASE}${endpoint}`;
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                next: { revalidate: 3600 },
            } as NextFetchOptions);

            if (!res.ok) {
                if (res.status === 404) throw new Error(`Not Found: ${endpoint}`);
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }

            const text = await res.text();
            if (!text) throw new Error("Empty response from API");
            return JSON.parse(text) as T;
        } catch (error) {
            const isLastRetry = i === retries - 1;
            console.error(`Fetch attempt ${i + 1} failed for ${url}:`, error);

            if (isLastRetry) throw error;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

async function apiFetchUrl<T>(url: string, retries = 3): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                next: { revalidate: 3600 },
            } as NextFetchOptions);

            if (!res.ok) {
                if (res.status === 404) throw new Error(`Not Found: ${url}`);
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }

            const text = await res.text();
            if (!text) throw new Error("Empty response from API");
            return JSON.parse(text) as T;
        } catch (error) {
            const isLastRetry = i === retries - 1;
            console.error(`Fetch attempt ${i + 1} failed for ${url}:`, error);

            if (isLastRetry) throw error;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

// ======================
// Common Types
// ======================
export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface APIResource {
    url: string;
}

export interface APIResourceList {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

export interface Name {
    name: string;
    language: NamedAPIResource;
}

export interface Description {
    description: string;
    language: NamedAPIResource;
}

export interface Effect {
    effect: string;
    language: NamedAPIResource;
}

export interface VerboseEffect {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
}

export interface FlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version?: NamedAPIResource;
    version_group?: NamedAPIResource;
}

export interface VersionGameIndex {
    game_index: number;
    version: NamedAPIResource;
}

export interface GenerationGameIndex {
    game_index: number;
    generation: NamedAPIResource;
}

export interface MachineVersionDetail {
    machine: APIResource;
    version_group: NamedAPIResource;
}

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
// Evolution Types
// ======================
export interface EvolutionDetail {
    item: NamedAPIResource | null;
    trigger: NamedAPIResource;
    gender: number | null;
    held_item: NamedAPIResource | null;
    known_move: NamedAPIResource | null;
    known_move_type: NamedAPIResource | null;
    location: NamedAPIResource | null;
    min_level: number | null;
    min_happiness: number | null;
    min_beauty: number | null;
    min_affection: number | null;
    needs_overworld_rain: boolean;
    party_species: NamedAPIResource | null;
    party_type: NamedAPIResource | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: NamedAPIResource | null;
    turn_upside_down: boolean;
}

export interface EvolutionChainNode {
    is_baby: boolean;
    species: NamedAPIResource;
    evolution_details: EvolutionDetail[];
    evolves_to: EvolutionChainNode[];
}

export interface EvolutionChain {
    id: number;
    baby_trigger_item: NamedAPIResource | null;
    chain: EvolutionChainNode;
}

export interface EvolutionTrigger {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

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

export interface PokemonSpeciesGender {
    rate: number;
    pokemon_species: NamedAPIResource;
}

export interface Gender {
    id: number;
    name: string;
    pokemon_species_details: PokemonSpeciesGender[];
    required_for_evolution: NamedAPIResource[];
}

export interface GrowthRateExperienceLevel {
    level: number;
    experience: number;
}

export interface GrowthRate {
    id: number;
    name: string;
    formula: string;
    descriptions: Description[];
    levels: GrowthRateExperienceLevel[];
    pokemon_species: NamedAPIResource[];
}

export interface NatureStatChange {
    max_change: number;
    pokeathlon_stat: NamedAPIResource;
}

export interface MoveBattleStylePreference {
    low_hp_preference: number;
    high_hp_preference: number;
    move_battle_style: NamedAPIResource;
}

export interface NatureDetail {
    id: number;
    name: string;
    decreased_stat: NamedAPIResource | null;
    increased_stat: NamedAPIResource | null;
    hates_flavor: NamedAPIResource | null;
    likes_flavor: NamedAPIResource | null;
    pokeathlon_stat_changes: NatureStatChange[];
    move_battle_style_preferences: MoveBattleStylePreference[];
    names: Name[];
}

export interface NaturePokeathlonStatAffect {
    max_change: number;
    nature: NamedAPIResource;
}

export interface NaturePokeathlonStatAffectSets {
    increase: NaturePokeathlonStatAffect[];
    decrease: NaturePokeathlonStatAffect[];
}

export interface PokeathlonStat {
    id: number;
    name: string;
    names: Name[];
    affecting_natures: NaturePokeathlonStatAffectSets;
}

export interface PokemonColor {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface PokemonFormSprites {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
}

export interface PokemonForm {
    id: number;
    name: string;
    order: number;
    form_order: number;
    is_default: boolean;
    is_battle_only: boolean;
    is_mega: boolean;
    form_name: string;
    pokemon: NamedAPIResource;
    types: PokemonType[];
    sprites: PokemonFormSprites;
    version_group: NamedAPIResource;
    names: Name[];
    form_names: Name[];
}

export interface PokemonHabitat {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface AwesomeName {
    awesome_name: string;
    language: NamedAPIResource;
}

export interface PokemonShape {
    id: number;
    name: string;
    awesome_names: AwesomeName[];
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface MoveStatAffect {
    change: number;
    move: NamedAPIResource;
}

export interface MoveStatAffectSets {
    increase: MoveStatAffect[];
    decrease: MoveStatAffect[];
}

export interface NatureStatAffectSets {
    increase: NamedAPIResource[];
    decrease: NamedAPIResource[];
}

export interface Stat {
    id: number;
    name: string;
    game_index: number;
    is_battle_only: boolean;
    affecting_moves: MoveStatAffectSets;
    affecting_natures: NatureStatAffectSets;
    characteristics: APIResource[];
    move_damage_class: NamedAPIResource | null;
    names: Name[];
}

// ======================
// Language Types
// ======================
export interface Language {
    id: number;
    name: string;
    official: boolean;
    iso639: string;
    iso3166: string;
    names: Name[];
}

// ======================
// Pokemon Location Encounters
// ======================
export interface LocationAreaEncounter {
    location_area: NamedAPIResource;
    version_details: {
        max_chance: number;
        version: NamedAPIResource;
        encounter_details: {
            min_level: number;
            max_level: number;
            condition_values: NamedAPIResource[];
            chance: number;
            method: NamedAPIResource;
        }[];
    }[];
}

// ======================
// API Fetchers - Pokemon
// ======================
export const getPokemonList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokemon?limit=${limit}&offset=${offset}`);

export const getPokemonDetail = (nameOrId: string | number) =>
    apiFetch<PokemonDetail>(`/pokemon/${nameOrId}`);

export const getPokemonSpecies = (nameOrId: string | number) =>
    apiFetch<PokemonSpecies>(`/pokemon-species/${nameOrId}`);

export const getPokemonSpeciesList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokemon-species?limit=${limit}&offset=${offset}`);

export const getPokemonEncounters = (nameOrId: string | number) =>
    apiFetch<LocationAreaEncounter[]>(`/pokemon/${nameOrId}/encounters`);

export const getEvolutionChain = (url: string) =>
    apiFetchUrl<EvolutionChain>(url);

export const getEvolutionChainById = (id: number) =>
    apiFetch<EvolutionChain>(`/evolution-chain/${id}`);

export const getEvolutionTriggerList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/evolution-trigger?limit=${limit}&offset=${offset}`);

export const getEvolutionTrigger = (nameOrId: string | number) =>
    apiFetch<EvolutionTrigger>(`/evolution-trigger/${nameOrId}`);

// ======================
// API Fetchers - Moves
// ======================
export const getMoveList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/move?limit=${limit}&offset=${offset}`);

export const getMoveDetail = (nameOrId: string | number) =>
    apiFetch<MoveDetail>(`/move/${nameOrId}`);

export const getMoveAilmentList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/move-ailment?limit=${limit}&offset=${offset}`);

export const getMoveAilment = (nameOrId: string | number) =>
    apiFetch<MoveAilment>(`/move-ailment/${nameOrId}`);

export const getMoveBattleStyleList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/move-battle-style?limit=${limit}&offset=${offset}`);

export const getMoveBattleStyle = (nameOrId: string | number) =>
    apiFetch<MoveBattleStyle>(`/move-battle-style/${nameOrId}`);

export const getMoveCategoryList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/move-category?limit=${limit}&offset=${offset}`);

export const getMoveCategory = (nameOrId: string | number) =>
    apiFetch<MoveCategory>(`/move-category/${nameOrId}`);

export const getMoveDamageClassList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/move-damage-class?limit=${limit}&offset=${offset}`);

export const getMoveDamageClass = (nameOrId: string | number) =>
    apiFetch<MoveDamageClass>(`/move-damage-class/${nameOrId}`);

export const getMoveLearnMethodList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/move-learn-method?limit=${limit}&offset=${offset}`);

export const getMoveLearnMethod = (nameOrId: string | number) =>
    apiFetch<MoveLearnMethod>(`/move-learn-method/${nameOrId}`);

export const getMoveTargetList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/move-target?limit=${limit}&offset=${offset}`);

export const getMoveTarget = (nameOrId: string | number) =>
    apiFetch<MoveTarget>(`/move-target/${nameOrId}`);

// ======================
// API Fetchers - Abilities
// ======================
export const getAbilityList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/ability?limit=${limit}&offset=${offset}`);

export const getAbilityDetail = (nameOrId: string | number) =>
    apiFetch<AbilityDetail>(`/ability/${nameOrId}`);

// ======================
// API Fetchers - Types
// ======================
export const getTypeList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/type?limit=${limit}&offset=${offset}`);

export const getTypeDetail = (nameOrId: string | number) =>
    apiFetch<TypeDetail>(`/type/${nameOrId}`);

// ======================
// API Fetchers - Items
// ======================
export const getItemList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/item?limit=${limit}&offset=${offset}`);

export const getItemDetail = (nameOrId: string | number) =>
    apiFetch<ItemDetail>(`/item/${nameOrId}`);

export const getItemAttributeList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/item-attribute?limit=${limit}&offset=${offset}`);

export const getItemAttribute = (nameOrId: string | number) =>
    apiFetch<ItemAttribute>(`/item-attribute/${nameOrId}`);

export const getItemCategoryList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/item-category?limit=${limit}&offset=${offset}`);

export const getItemCategory = (nameOrId: string | number) =>
    apiFetch<ItemCategory>(`/item-category/${nameOrId}`);

export const getItemFlingEffectList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/item-fling-effect?limit=${limit}&offset=${offset}`);

export const getItemFlingEffect = (nameOrId: string | number) =>
    apiFetch<ItemFlingEffect>(`/item-fling-effect/${nameOrId}`);

export const getItemPocketList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/item-pocket?limit=${limit}&offset=${offset}`);

export const getItemPocket = (nameOrId: string | number) =>
    apiFetch<ItemPocket>(`/item-pocket/${nameOrId}`);

// ======================
// API Fetchers - Berries
// ======================
export const getBerryList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/berry?limit=${limit}&offset=${offset}`);

export const getBerryDetail = (nameOrId: string | number) =>
    apiFetch<BerryDetail>(`/berry/${nameOrId}`);

export const getBerryFirmnessList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/berry-firmness?limit=${limit}&offset=${offset}`);

export const getBerryFirmness = (nameOrId: string | number) =>
    apiFetch<BerryFirmness>(`/berry-firmness/${nameOrId}`);

export const getBerryFlavorList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/berry-flavor?limit=${limit}&offset=${offset}`);

export const getBerryFlavor = (nameOrId: string | number) =>
    apiFetch<BerryFlavor>(`/berry-flavor/${nameOrId}`);

// ======================
// API Fetchers - Locations
// ======================
export const getLocationList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/location?limit=${limit}&offset=${offset}`);

export const getLocationDetail = (nameOrId: string | number) =>
    apiFetch<LocationDetail>(`/location/${nameOrId}`);

export const getLocationAreaList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/location-area?limit=${limit}&offset=${offset}`);

export const getLocationArea = (nameOrId: string | number) =>
    apiFetch<LocationAreaDetail>(`/location-area/${nameOrId}`);

export const getPalParkAreaList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pal-park-area?limit=${limit}&offset=${offset}`);

export const getPalParkArea = (nameOrId: string | number) =>
    apiFetch<PalParkAreaDetail>(`/pal-park-area/${nameOrId}`);

export const getRegionList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/region?limit=${limit}&offset=${offset}`);

export const getRegionDetail = (nameOrId: string | number) =>
    apiFetch<RegionDetail>(`/region/${nameOrId}`);

// ======================
// API Fetchers - Games
// ======================
export const getGenerationList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/generation?limit=${limit}&offset=${offset}`);

export const getGenerationDetail = (nameOrId: string | number) =>
    apiFetch<GenerationDetail>(`/generation/${nameOrId}`);

export const getPokedexList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokedex?limit=${limit}&offset=${offset}`);

export const getPokedex = (nameOrId: string | number) =>
    apiFetch<PokedexDetail>(`/pokedex/${nameOrId}`);

export const getVersionList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/version?limit=${limit}&offset=${offset}`);

export const getVersion = (nameOrId: string | number) =>
    apiFetch<VersionDetail>(`/version/${nameOrId}`);

export const getVersionGroupList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/version-group?limit=${limit}&offset=${offset}`);

export const getVersionGroup = (nameOrId: string | number) =>
    apiFetch<VersionGroupDetail>(`/version-group/${nameOrId}`);

// ======================
// API Fetchers - Encounters
// ======================
export const getEncounterMethodList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/encounter-method?limit=${limit}&offset=${offset}`);

export const getEncounterMethod = (nameOrId: string | number) =>
    apiFetch<EncounterMethod>(`/encounter-method/${nameOrId}`);

export const getEncounterConditionList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/encounter-condition?limit=${limit}&offset=${offset}`);

export const getEncounterCondition = (nameOrId: string | number) =>
    apiFetch<EncounterCondition>(`/encounter-condition/${nameOrId}`);

export const getEncounterConditionValueList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/encounter-condition-value?limit=${limit}&offset=${offset}`);

export const getEncounterConditionValue = (nameOrId: string | number) =>
    apiFetch<EncounterConditionValue>(`/encounter-condition-value/${nameOrId}`);

// ======================
// API Fetchers - Contests
// ======================
export const getContestTypeList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/contest-type?limit=${limit}&offset=${offset}`);

export const getContestType = (nameOrId: string | number) =>
    apiFetch<ContestType>(`/contest-type/${nameOrId}`);

export const getContestEffectList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/contest-effect?limit=${limit}&offset=${offset}`);

export const getContestEffect = (id: number) =>
    apiFetch<ContestEffect>(`/contest-effect/${id}`);

export const getSuperContestEffectList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/super-contest-effect?limit=${limit}&offset=${offset}`);

export const getSuperContestEffect = (id: number) =>
    apiFetch<SuperContestEffect>(`/super-contest-effect/${id}`);

// ======================
// API Fetchers - Machines
// ======================
export const getMachineList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/machine?limit=${limit}&offset=${offset}`);

export const getMachine = (id: number) =>
    apiFetch<Machine>(`/machine/${id}`);

// ======================
// API Fetchers - Pokemon Metadata
// ======================
export const getCharacteristicList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/characteristic?limit=${limit}&offset=${offset}`);

export const getCharacteristic = (id: number) =>
    apiFetch<Characteristic>(`/characteristic/${id}`);

export const getEggGroupList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/egg-group?limit=${limit}&offset=${offset}`);

export const getEggGroup = (nameOrId: string | number) =>
    apiFetch<EggGroup>(`/egg-group/${nameOrId}`);

export const getGenderList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/gender?limit=${limit}&offset=${offset}`);

export const getGender = (nameOrId: string | number) =>
    apiFetch<Gender>(`/gender/${nameOrId}`);

export const getGrowthRateList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/growth-rate?limit=${limit}&offset=${offset}`);

export const getGrowthRate = (nameOrId: string | number) =>
    apiFetch<GrowthRate>(`/growth-rate/${nameOrId}`);

export const getNatureList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/nature?limit=${limit}&offset=${offset}`);

export const getNatureDetail = (nameOrId: string | number) =>
    apiFetch<NatureDetail>(`/nature/${nameOrId}`);

export const getPokeathlonStatList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokeathlon-stat?limit=${limit}&offset=${offset}`);

export const getPokeathlonStat = (nameOrId: string | number) =>
    apiFetch<PokeathlonStat>(`/pokeathlon-stat/${nameOrId}`);

export const getPokemonColorList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokemon-color?limit=${limit}&offset=${offset}`);

export const getPokemonColor = (nameOrId: string | number) =>
    apiFetch<PokemonColor>(`/pokemon-color/${nameOrId}`);

export const getPokemonFormList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokemon-form?limit=${limit}&offset=${offset}`);

export const getPokemonForm = (nameOrId: string | number) =>
    apiFetch<PokemonForm>(`/pokemon-form/${nameOrId}`);

export const getPokemonHabitatList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokemon-habitat?limit=${limit}&offset=${offset}`);

export const getPokemonHabitat = (nameOrId: string | number) =>
    apiFetch<PokemonHabitat>(`/pokemon-habitat/${nameOrId}`);

export const getPokemonShapeList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/pokemon-shape?limit=${limit}&offset=${offset}`);

export const getPokemonShape = (nameOrId: string | number) =>
    apiFetch<PokemonShape>(`/pokemon-shape/${nameOrId}`);

export const getStatList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/stat?limit=${limit}&offset=${offset}`);

export const getStat = (nameOrId: string | number) =>
    apiFetch<Stat>(`/stat/${nameOrId}`);

// ======================
// API Fetchers - Utility
// ======================
export const getLanguageList = (limit = 50, offset = 0) =>
    apiFetch<APIResourceList>(`/language?limit=${limit}&offset=${offset}`);

export const getLanguage = (nameOrId: string | number) =>
    apiFetch<Language>(`/language/${nameOrId}`);
