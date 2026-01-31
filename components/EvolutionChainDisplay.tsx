"use client";

import { EvolutionChain, EvolutionChainNode, EvolutionDetail } from "@/lib/api";
import Link from "next/link";
import { Sparkles, Moon, Sun, Heart, Gem, MapPin, Users, FlipVertical, Activity, ChevronRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EvolutionChainDisplayProps {
    chain: EvolutionChain;
}

function getEvolutionRequirements(details: EvolutionDetail[]): string[] {
    if (!details || details.length === 0) return ["Evolution Unknown"];

    const requirements: string[] = [];

    for (const detail of details) {
        const reqs: string[] = [];

        if (detail.trigger?.name === "level-up") {
            if (detail.min_level) reqs.push(`LVL ${detail.min_level}`);
            else if (detail.min_happiness) reqs.push(`HAP ${detail.min_happiness}+`);
            else if (detail.min_beauty) reqs.push(`BEA ${detail.min_beauty}+`);
            else if (detail.min_affection) reqs.push(`AFF ${detail.min_affection}+`);
            else reqs.push("LEVEL UP");
        } else if (detail.trigger?.name === "trade") reqs.push("TRADE");
        else if (detail.trigger?.name === "use-item") reqs.push("USE ITEM");
        else if (detail.trigger?.name) reqs.push(detail.trigger.name.replace(/-/g, " ").toUpperCase());

        if (detail.item) reqs.push(`+ ${detail.item.name.replace(/-/g, " ").toUpperCase()}`);
        if (detail.held_item) reqs.push(`HOLDING ${detail.held_item.name.replace(/-/g, " ").toUpperCase()}`);
        if (detail.time_of_day) reqs.push(detail.time_of_day.toUpperCase());
        if (detail.gender !== null) reqs.push(detail.gender === 1 ? "FEMALE" : "MALE");
        if (detail.location) reqs.push(`LOC: ${detail.location.name.replace(/-/g, " ").toUpperCase()}`);
        if (detail.known_move) reqs.push(`KNOWS: ${detail.known_move.name.replace(/-/g, " ").toUpperCase()}`);
        if (detail.known_move_type) reqs.push(`TYPE: ${detail.known_move_type.name.toUpperCase()}`);
        if (detail.party_species) reqs.push(`WITH ${detail.party_species.name.toUpperCase()}`);
        if (detail.party_type) reqs.push(`WITH ${detail.party_type.name.toUpperCase()} TYPE`);
        if (detail.needs_overworld_rain) reqs.push("RAIN REQ");
        if (detail.turn_upside_down) reqs.push("INVERSION REQ");

        if (reqs.length > 0) requirements.push(reqs.join(" / "));
    }

    return requirements.length > 0 ? requirements : ["NO_DATA"];
}

function getEvolutionIcon(details: EvolutionDetail[]): React.ReactNode {
    if (!details || details.length === 0) return <Zap className="w-4 h-4 text-accent" />;
    const detail = details[0];
    if (detail.time_of_day === "night") return <Moon className="w-4 h-4 text-indigo-400" />;
    if (detail.time_of_day === "day") return <Sun className="w-4 h-4 text-amber-300" />;
    if (detail.item) return <Gem className="w-4 h-4 text-emerald-300" />;
    if (detail.min_happiness) return <Heart className="w-4 h-4 text-pink-400" />;
    if (detail.location) return <MapPin className="w-4 h-4 text-sky-400" />;
    if (detail.party_species || detail.party_type) return <Users className="w-4 h-4 text-indigo-300" />;
    if (detail.turn_upside_down) return <FlipVertical className="w-4 h-4 text-white/40" />;
    return <Zap className="w-4 h-4 text-accent" />;
}

function EvolutionNode({ node, isBranch = false }: { node: EvolutionChainNode; isBranch?: boolean }) {
    const hasEvolutions = node.evolves_to && node.evolves_to.length > 0;
    const speciesId = node.species.url.split("/").filter(Boolean).pop();
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;

    return (
        <div className={`flex flex-col items-center min-w-[240px] sm:min-w-[280px] relative ${isBranch ? 'mt-32' : ''}`}>
            {/* Holographic Specimen Pod */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group z-30"
            >
                <Link
                    href={`/pokemon/${node.species.name}`}
                    className="relative flex flex-col items-center justify-center w-48 h-48 md:w-64 md:h-64 group/node"
                >
                    {/* Background Geometric Frame */}
                    <div className="absolute inset-0 border-[3px] border-white/5 rounded-full group-hover/node:border-accent/40 group-hover/node:scale-105 transition-all duration-700" />
                    <div className="absolute inset-4 border border-white/5 rounded-full rotate-45 group-hover/node:rotate-90 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-accent/0 group-hover/node:bg-accent/[0.03] rounded-full transition-colors duration-700" />

                    {/* Radial Specimen Glow */}
                    <div className="absolute inset-0 bg-accent/0 group-hover/node:bg-accent/10 rounded-full blur-3xl opacity-0 group-hover/node:opacity-30 transition-all duration-700" />

                    {/* Specimen Content */}
                    <motion.div
                        className="relative z-10 w-[65%] h-[65%] flex items-center justify-center"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src={spriteUrl}
                            alt={node.species.name}
                            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover/node:scale-110 transition-transform duration-700"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
                            }}
                        />
                    </motion.div>

                    {/* Technical HUD Overlays */}
                    <div className="absolute bottom-6 flex flex-col items-center gap-1">
                        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 group-hover/node:border-accent/20 transition-colors">
                            <span className="text-[10px] font-[900] text-text-primary uppercase tracking-[0.3em]">
                                {node.species.name.replace(/-/g, " ")}
                            </span>
                        </div>
                        <AnimatePresence>
                            {node.is_baby && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-[8px] font-black text-pink-500 uppercase tracking-widest px-2 py-0.5 bg-pink-500/10 border border-pink-500/20 rounded-md"
                                >
                                    Baby Pokemon
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Scanning Line */}
                    <div className="absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover/node:opacity-20 pointer-events-none">
                        <motion.div
                            className="h-1 w-full bg-accent blur-sm"
                            animate={{ y: [-200, 300] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </Link>
            </motion.div>

            {/* Evolution Protocols & Connections */}
            {hasEvolutions && (
                <div className="flex flex-col items-center w-full mt-4">
                    {node.evolves_to.map((evo, idx) => (
                        <div key={evo.species.name} className="flex flex-col items-center w-full relative">
                            {/* Animated Pipeline Connector */}
                            <div className="relative h-40 w-px flex flex-col items-center">
                                <div className="absolute top-0 w-px h-full bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

                                {/* Data Pulse Particle */}
                                <motion.div
                                    className="absolute top-0 w-1.5 h-3 bg-accent blur-[2px] rounded-full"
                                    animate={{ y: [0, 160] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: idx * 0.5 }}
                                />

                                {/* Protocol Interface Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-8 z-40"
                                >
                                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-bg-secondary/80 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl group/protocol hover:border-accent/40 hover:bg-bg-secondary transition-all min-w-[160px] md:min-w-[200px]">
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover/protocol:scale-110 transition-transform shrink-0">
                                            {getEvolutionIcon(evo.evolution_details)}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                                                <span className="text-[7px] md:text-[8px] font-black text-accent uppercase tracking-widest font-mono">Evolution Trigger</span>
                                            </div>
                                            <div className="flex flex-col text-[9px] md:text-[11px] font-black text-text-primary font-mono tracking-tighter">
                                                {getEvolutionRequirements(evo.evolution_details).map((req, i) => (
                                                    <span key={i} className="whitespace-nowrap opacity-80 group-hover/protocol:opacity-100 italic">
                                                        {req}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-text-muted ml-auto group-hover/protocol:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Child Node */}
                            <EvolutionNode node={evo} isBranch={false} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function EvolutionChainDisplay({ chain }: EvolutionChainDisplayProps) {
    if (!chain || !chain.chain) return (
        <div className="py-24 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">No Evolution Found</span>
            </div>
        </div>
    );

    return (
        <div className="relative py-12 w-full flex flex-col items-center">
            {/* Background Texture for the whole area */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />

            {chain.baby_trigger_item && (
                <div className="mb-20 relative z-40">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-6 py-2.5 bg-accent/5 border border-accent/20 rounded-xl overflow-hidden group/trigger"
                    >
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/trigger:opacity-100 transition-opacity" />
                        <span className="relative z-10 text-[9px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            Evolution Item: {chain.baby_trigger_item.name.replace(/-/g, " ")}
                        </span>
                    </motion.div>
                </div>
            )}

            <div className="relative z-10 w-full flex justify-center overflow-x-auto pb-20 no-scrollbar">
                <EvolutionNode node={chain.chain} />
            </div>
        </div>
    );
}
