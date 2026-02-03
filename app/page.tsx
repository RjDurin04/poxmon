import { getPokemonList, getPokemonDetail } from "@/lib/api";
import { PokemonGrid } from "@/components/PokemonGrid";
import { PokemonDetail } from "@/lib/types/pokemon";

export default async function HomePage() {
  let pokemonDetails: PokemonDetail[] = [];

  try {
    const list = await getPokemonList(2000, 0);
    pokemonDetails = await Promise.all(
      list.results.map((p) => getPokemonDetail(p.name))
    );
  } catch (error) {
    console.error("Home Page Fetch Error:", error);
    // pokemonDetails remains empty array
  }

  return <PokemonGrid initialPokemon={pokemonDetails} />;
}
