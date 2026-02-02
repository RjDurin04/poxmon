import { getPokemonDetail, getPokemonSpecies } from "@/lib/services/pokemon";
import { getEvolutionChainFromUrl } from "@/lib/services/evolution";
import { getPokemonEncounters } from "@/lib/services/pokemon-extras";
import { PokemonDetailView } from "@/components/PokemonDetailView";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PokemonPage({ params }: PageProps) {
    const { slug } = await params;

    const pokemon = await getPokemonDetail(slug);
    const species = await getPokemonSpecies(pokemon.species.name);

    const [evolution, encounters] = await Promise.all([
        getEvolutionChainFromUrl(species.evolution_chain.url),
        getPokemonEncounters(slug).catch(() => []),
    ]);

    return <PokemonDetailView pokemon={pokemon} species={species} evolution={evolution} encounters={encounters} />;
}
