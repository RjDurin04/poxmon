import { apiFetch } from "@/lib/api/client";
import { LocationDetail, LocationAreaDetail, RegionDetail, GenerationDetail, PokedexDetail, VersionDetail, VersionGroupDetail, PalParkAreaDetail } from "@/lib/types/world";
import { Machine } from "@/lib/types/world"; // Re-exporting Machine from generic world types if needed, or specific file
import { APIResourceList } from "@/lib/types/common";

// Location
export async function getLocation(id: string | number): Promise<LocationDetail> {
    return apiFetch<LocationDetail>(`/location/${id}`);
}

// Alias
export const getLocationDetail = getLocation;

export async function getLocationArea(id: string | number): Promise<LocationAreaDetail> {
    return apiFetch<LocationAreaDetail>(`/location-area/${id}`);
}

export async function getRegion(id: string | number): Promise<RegionDetail> {
    return apiFetch<RegionDetail>(`/region/${id}`);
}

export async function getPalParkArea(id: string | number): Promise<PalParkAreaDetail> {
    return apiFetch<PalParkAreaDetail>(`/pal-park-area/${id}`);
}

// Games
export async function getGeneration(id: string | number): Promise<GenerationDetail> {
    return apiFetch<GenerationDetail>(`/generation/${id}`);
}

// Alias
export const getGenerationDetail = getGeneration;

export async function getPokedex(id: string | number): Promise<PokedexDetail> {
    return apiFetch<PokedexDetail>(`/pokedex/${id}`);
}

export async function getVersion(id: string | number): Promise<VersionDetail> {
    return apiFetch<VersionDetail>(`/version/${id}`);
}

export async function getVersionGroup(id: string | number): Promise<VersionGroupDetail> {
    return apiFetch<VersionGroupDetail>(`/version-group/${id}`);
}

export async function getMachine(id: string | number): Promise<Machine> {
    return apiFetch<Machine>(`/machine/${id}`);
}
