import { apiFetch } from "@/lib/api/client";
import { APIResourceList } from "@/lib/types/common";
import {
    ContestType, ContestEffect, SuperContestEffect
} from "@/lib/types/world";
import {
    EncounterMethod, EncounterCondition, EncounterConditionValue
} from "@/lib/types/world"; // Assuming these are in world.ts or similar

// Contests
export async function getContestType(id: string | number): Promise<ContestType> {
    return apiFetch<ContestType>(`/contest-type/${id}`);
}

export async function getContestEffect(id: string | number): Promise<ContestEffect> {
    return apiFetch<ContestEffect>(`/contest-effect/${id}`);
}

export async function getSuperContestEffect(id: string | number): Promise<SuperContestEffect> {
    return apiFetch<SuperContestEffect>(`/super-contest-effect/${id}`);
}

// Encounters
export async function getEncounterMethod(id: string | number): Promise<EncounterMethod> {
    return apiFetch<EncounterMethod>(`/encounter-method/${id}`);
}

export async function getEncounterCondition(id: string | number): Promise<EncounterCondition> {
    return apiFetch<EncounterCondition>(`/encounter-condition/${id}`);
}

export async function getEncounterConditionValue(id: string | number): Promise<EncounterConditionValue> {
    return apiFetch<EncounterConditionValue>(`/encounter-condition-value/${id}`);
}

// Lists
export async function getContestTypeList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/contest-type?limit=${limit}&offset=${offset}`);
}
