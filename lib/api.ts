/**
 * @deprecated This file is a backward-compatibility bridge.
 * Please import from @/lib/api/client, @/lib/services/*, or @/lib/types/* instead.
 */

// Export Core Client
export * from "./api/client";

// Export Common Types
export * from "./types/common";

// Export Domain Types
export * from "./types/pokemon";
export * from "./types/moves";
export * from "./types/items";
export * from "./types/evolution";
export * from "./types/world";

// Export Services
export * from "./services/pokemon";
export * from "./services/moves";
export * from "./services/items";
export * from "./services/world";
export * from "./services/contests";
export * from "./services/pokemon-extras";
export * from "./services/lists";
export * from "./services/evolution";
