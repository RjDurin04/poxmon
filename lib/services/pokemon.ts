import { apiFetch } from "@/lib/api/client";
import { PokemonDetail, PokemonSpecies } from "@/lib/types/pokemon";
import { EggGroup, GrowthRate, Nature, PokemonColor, PokemonHabitat, PokemonShape } from "@/lib/types/world";
import { APIResourceList } from "@/lib/types/common";

export async function getPokemon(id: string | number): Promise<PokemonDetail> {
    return apiFetch<PokemonDetail>(`/pokemon/${id}`);
}

export async function getPokemonSpecies(id: string | number): Promise<PokemonSpecies> {
    return apiFetch<PokemonSpecies>(`/pokemon-species/${id}`);
}

// Alias
export const getPokemonDetail = getPokemon;

// getEvolutionChain moved to lib/services/evolution.ts
// getEvolutionChainFromUrl should be there too, or kept?
// Let's keep getEvolutionChainFromUrl here if unique, OR move it to evolution.ts.
// It is unique for now.
// getEvolutionChainFromUrl moved to evolution.ts

// getAbility moved to moves.ts
// getType moved to moves.ts

export async function getNature(id: string | number): Promise<Nature> {
    return apiFetch<Nature>(`/nature/${id}`);
}

export async function getGrowthRate(id: string | number): Promise<GrowthRate> {
    return apiFetch<GrowthRate>(`/growth-rate/${id}`);
}

export async function getEggGroup(id: string | number): Promise<EggGroup> {
    return apiFetch<EggGroup>(`/egg-group/${id}`);
}

export async function getPokemonColor(id: string | number): Promise<PokemonColor> {
    return apiFetch<PokemonColor>(`/pokemon-color/${id}`);
}

export async function getPokemonShape(id: string | number): Promise<PokemonShape> {
    return apiFetch<PokemonShape>(`/pokemon-shape/${id}`);
}

export async function getPokemonHabitat(id: string | number): Promise<PokemonHabitat> {
    return apiFetch<PokemonHabitat>(`/pokemon-habitat/${id}`);
}

// List fetchers
export async function getPokemonList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/pokemon?limit=${limit}&offset=${offset}`);
}
