import { getPokemonList, getPokemonDetail } from "@/lib/api";
import { PokemonGrid } from "@/components/PokemonGrid";
import { PokemonDetail } from "@/lib/types/pokemon";
import { NamedAPIResource } from "@/lib/types/common";

export default async function HomePage() {
  let initialDetails: PokemonDetail[] = [];
  let allPokemon: NamedAPIResource[] = [];

  try {
    const list = await getPokemonList(2000, 0);
    allPokemon = list.results;

    // Fetch first 40 for initial fast render and build
    initialDetails = await Promise.all(
      allPokemon.slice(0, 40).map((p) => getPokemonDetail(p.name))
    );
  } catch (error) {
    console.error("Home Page Fetch Error:", error);
  }

  return <PokemonGrid allPokemon={allPokemon} initialDetails={initialDetails} />;
}
