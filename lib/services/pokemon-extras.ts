import { apiFetch } from "@/lib/api/client";
import { NamedAPIResource, Name } from "@/lib/types/common";
import { PokemonType } from "@/lib/types/pokemon";
import {
    Characteristic, Nature
} from "@/lib/types/world";

// We need to define some specific response types if they aren't in world.ts yet, 
// or import them if they are.
// For now, I'll assume some might be missing and add simple interfaces or import existing.

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
    sprites: {
        front_default: string | null;
        front_shiny: string | null;
        back_default: string | null;
        back_shiny: string | null;
    };
    version_group: NamedAPIResource;
    names: Name[];
    form_names: Name[];
}

export interface Gender {
    id: number;
    name: string;
    pokemon_species_details: {
        rate: number;
        pokemon_species: NamedAPIResource;
    }[];
    names: Name[];
}

export interface PokeathlonStat {
    id: number;
    name: string;
    affecting_natures: {
        increase: { max_change: number; nature: NamedAPIResource }[];
        decrease: { max_change: number; nature: NamedAPIResource }[];
    };
    names: Name[];
}

export interface Stat {
    id: number;
    name: string;
    game_index: number;
    is_battle_only: boolean;
    affecting_moves: { move: NamedAPIResource; change: number }[];
    affecting_natures: { nature: NamedAPIResource; increase: boolean }[];
    names: Name[];
}

export async function getPokemonForm(id: string | number): Promise<PokemonForm> {
    return apiFetch<PokemonForm>(`/pokemon-form/${id}`);
}

export async function getGender(id: string | number): Promise<Gender> {
    return apiFetch<Gender>(`/gender/${id}`);
}

export async function getPokeathlonStat(id: string | number): Promise<PokeathlonStat> {
    return apiFetch<PokeathlonStat>(`/pokeathlon-stat/${id}`);
}

export async function getCharacteristic(id: string | number): Promise<Characteristic> {
    return apiFetch<Characteristic>(`/characteristic/${id}`);
}

export async function getStat(id: string | number): Promise<Stat> {
    return apiFetch<Stat>(`/stat/${id}`);
}

// Re-export or aliases if code uses different names
export const getNatureDetail = async (id: string | number): Promise<Nature> => {
    return apiFetch<Nature>(`/nature/${id}`);
};

import { LocationAreaEncounter } from "@/lib/types/pokemon";

export const getPokemonEncounters = async (id: string | number): Promise<LocationAreaEncounter[]> => {
    // pokemon/{id}/encounters
    return apiFetch<LocationAreaEncounter[]>(`/pokemon/${id}/encounters`);
};
