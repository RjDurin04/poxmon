import { getPokemonList, getPokemonDetail } from "@/lib/api";
import { PokemonGrid } from "@/components/PokemonGrid";

export default async function HomePage() {
  const list = await getPokemonList(151, 0);

  const pokemonDetails = await Promise.all(
    list.results.map((p) => getPokemonDetail(p.name))
  );

  return <PokemonGrid initialPokemon={pokemonDetails} />;
}
