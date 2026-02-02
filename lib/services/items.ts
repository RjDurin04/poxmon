import { apiFetch } from "@/lib/api/client";
import { ItemDetail, ItemCategory, ItemPocket, ItemAttribute, BerryDetail, BerryFirmness, BerryFlavor, ItemFlingEffect } from "@/lib/types/items";
import { APIResourceList } from "@/lib/types/common";

export async function getItem(id: string | number): Promise<ItemDetail> {
    return apiFetch<ItemDetail>(`/item/${id}`);
}

// Alias
export const getItemDetail = getItem;

export async function getItemCategory(id: string | number): Promise<ItemCategory> {
    return apiFetch<ItemCategory>(`/item-category/${id}`);
}

export async function getItemPocket(id: string | number): Promise<ItemPocket> {
    return apiFetch<ItemPocket>(`/item-pocket/${id}`);
}

export async function getItemAttribute(id: string | number): Promise<ItemAttribute> {
    return apiFetch<ItemAttribute>(`/item-attribute/${id}`);
}

export async function getBerry(id: string | number): Promise<BerryDetail> {
    return apiFetch<BerryDetail>(`/berry/${id}`);
}

// Alias
export const getBerryDetail = getBerry;

export async function getBerryFirmness(id: string | number): Promise<BerryFirmness> {
    return apiFetch<BerryFirmness>(`/berry-firmness/${id}`);
}

export async function getBerryFlavor(id: string | number): Promise<BerryFlavor> {
    return apiFetch<BerryFlavor>(`/berry-flavor/${id}`);
}

export async function getItemFlingEffect(id: string | number): Promise<ItemFlingEffect> {
    return apiFetch<ItemFlingEffect>(`/item-fling-effect/${id}`);
}

export async function getItemList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/item?limit=${limit}&offset=${offset}`);
}

export async function getBerryList(limit = 20, offset = 0): Promise<APIResourceList> {
    return apiFetch<APIResourceList>(`/berry?limit=${limit}&offset=${offset}`);
}
