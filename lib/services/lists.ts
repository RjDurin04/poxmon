import { apiFetch } from "@/lib/api/client";
import { APIResourceList, NamedAPIResource } from "@/lib/types/common";
import { TypeDetail } from "@/lib/types/moves";
import { RegionDetail } from "@/lib/types/world";

interface LanguageName {
    name: string;
    language: NamedAPIResource;
}

interface Language extends NamedAPIResource {
    id: number;
    official: boolean;
    iso639: string;
    iso3166: string;
    names: LanguageName[];
}

// Lists
export async function getRegionList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/region?limit=${limit}&offset=${offset}`);
}

export async function getGenerationList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/generation?limit=${limit}&offset=${offset}`);
}

export async function getTypeList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/type?limit=${limit}&offset=${offset}`);
}

export async function getLocationList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/location?limit=${limit}&offset=${offset}`);
}

export async function getPokedexList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/pokedex?limit=${limit}&offset=${offset}`);
}

export async function getLanguageList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/language?limit=${limit}&offset=${offset}`);
}

export async function getLanguage(id: string | number): Promise<Language> {
    return apiFetch<Language>(`/language/${id}`);
}

// Aliases
export const getTypeDetail = async (id: string | number): Promise<TypeDetail> => {
    return apiFetch<TypeDetail>(`/type/${id}`);
};

export const getRegionDetail = async (id: string | number): Promise<RegionDetail> => {
    return apiFetch<RegionDetail>(`/region/${id}`);
};
