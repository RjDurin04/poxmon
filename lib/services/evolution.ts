import { apiFetch, apiFetchUrl } from "@/lib/api/client";
import { EvolutionChain, EvolutionTrigger } from "@/lib/types/evolution";

export async function getEvolutionChain(id: string | number): Promise<EvolutionChain> {
    return apiFetch<EvolutionChain>(`/evolution-chain/${id}`);
}

export async function getEvolutionChainFromUrl(url: string): Promise<EvolutionChain> {
    return apiFetchUrl<EvolutionChain>(url);
}

export async function getEvolutionTrigger(id: string | number): Promise<EvolutionTrigger> {
    return apiFetch<EvolutionTrigger>(`/evolution-trigger/${id}`);
}
