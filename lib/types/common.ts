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
