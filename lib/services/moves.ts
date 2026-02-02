import { apiFetch } from "@/lib/api/client";
import { MoveDetail, MoveCategory, MoveDamageClass, MoveLearnMethod, MoveTarget, MoveAilment, MoveBattleStyle, AbilityDetail, TypeDetail } from "@/lib/types/moves";
import { APIResourceList } from "@/lib/types/common";

export async function getMove(id: string | number): Promise<MoveDetail> {
    return apiFetch<MoveDetail>(`/move/${id}`);
}

// Alias
export const getMoveDetail = getMove;

export async function getMoveCategory(id: string | number): Promise<MoveCategory> {
    return apiFetch<MoveCategory>(`/move-category/${id}`);
}

export async function getMoveDamageClass(id: string | number): Promise<MoveDamageClass> {
    return apiFetch<MoveDamageClass>(`/move-damage-class/${id}`);
}

export async function getMoveLearnMethod(id: string | number): Promise<MoveLearnMethod> {
    return apiFetch<MoveLearnMethod>(`/move-learn-method/${id}`);
}

export async function getAbility(id: string | number): Promise<AbilityDetail> {
    return apiFetch<AbilityDetail>(`/ability/${id}`);
}

// Alias
export const getAbilityDetail = getAbility;

export async function getAbilityList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/ability?limit=${limit}&offset=${offset}`);
}

export async function getMoveTarget(id: string | number): Promise<MoveTarget> {
    return apiFetch<MoveTarget>(`/move-target/${id}`);
}

export async function getType(id: string | number): Promise<TypeDetail> {
    return apiFetch<TypeDetail>(`/type/${id}`);
}

export async function getMoveAilment(id: string | number): Promise<MoveAilment> {
    return apiFetch<MoveAilment>(`/move-ailment/${id}`);
}

export async function getMoveBattleStyle(id: string | number): Promise<MoveBattleStyle> {
    return apiFetch<MoveBattleStyle>(`/move-battle-style/${id}`);
}

export async function getMoveList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/move?limit=${limit}&offset=${offset}`);
}
