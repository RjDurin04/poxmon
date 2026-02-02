"use client";

import { motion } from "framer-motion";
import React from "react";
import { getTypeColor } from "@/lib/utils";

interface TypeEffectProps {
    types: { type: { name: string } }[];
}

// Seeded random number generator for deterministic particle generation
function seededRandom(seed: number): () => number {
    let currentSeed = seed;
    return () => {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        return currentSeed / 233280;
    };
}

// --- Archetype Components ---

// 1. Rising Particles (Fire, Water, Ghost, Poison, Dark)
const RisingParticles = ({ colors, speed = 1 }: { colors: string[], speed?: number }) => {
    const particles = React.useMemo(() => {
        const random = seededRandom(42);
        return [...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2 + random() * 0.5;
            const startRadius = 15 + random() * 20;
            const endRadius = 45 + random() * 15;
            const angleOffset = random() * 0.3;

            return {
                size: random() * 12 + 6,
                startX: 50 + Math.cos(angle) * startRadius,
                startY: 50 + Math.sin(angle) * startRadius,
                endX: 50 + Math.cos(angle + angleOffset) * endRadius,
                endY: 50 + Math.sin(angle + angleOffset) * endRadius - 20,
                delay: i * 0.12,
                duration: 1.8 + random() * 1.2,
                colorIndex: i % colors.length,
            };
        });
    }, [colors.length]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    variants={{
                        initial: {
                            left: `${p.startX}%`,
                            top: `${p.startY}%`,
                            opacity: 0,
                            scale: 0.3
                        },
                        hover: {
                            left: [`${p.startX}%`, `${p.endX}%`],
                            top: [`${p.startY}%`, `${p.endY}%`],
                            opacity: [0, 0.9, 0.7, 0],
                            scale: [0.3, 1, 0.8, 0.2],
                            transition: {
                                duration: p.duration / speed,
                                repeat: Infinity,
                                delay: p.delay / speed,
                                ease: "easeOut"
                            }
                        }
                    }}
                    className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        backgroundColor: colors[p.colorIndex],
                        width: p.size + "px",
                        height: p.size + "px",
                        boxShadow: `0 0 ${p.size}px ${p.size / 2}px ${colors[p.colorIndex]}60`,
                        filter: "blur(1px)",
                    }}
                />
            ))}
        </div>
    );
};

// 2. Falling/Floating Particles (Grass, Bug, Ice, Ground, Rock, Fairy)
const FloatingParticles = ({ colors, gravity = 1 }: { colors: string[], gravity?: number }) => {
    const particles = React.useMemo(() => {
        const random = seededRandom(123);
        return [...Array(14)].map((_, i) => {
            const angle = (i / 14) * Math.PI * 2 + random() * 0.5;
            const startRadius = 20 + random() * 15;
            const endRadius = 40 + random() * 15;
            const direction = gravity > 0 ? 1 : -1;

            return {
                size: random() * 8 + 4,
                startX: 50 + Math.cos(angle) * startRadius,
                startY: 50 + Math.sin(angle) * startRadius - direction * 10,
                endX: 50 + Math.cos(angle + 0.3) * endRadius,
                endY: 50 + Math.sin(angle + 0.3) * endRadius + direction * 15,
                delay: i * 0.2,
                duration: 2.5 + random() * 1.5,
                rotation: random() * 720 - 360,
                colorIndex: i % colors.length,
            };
        });
    }, [gravity, colors.length]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    variants={{
                        initial: {
                            left: `${p.startX}%`,
                            top: `${p.startY}%`,
                            opacity: 0,
                            rotate: 0
                        },
                        hover: {
                            left: [`${p.startX}%`, `${p.endX}%`],
                            top: [`${p.startY}%`, `${p.endY}%`],
                            opacity: [0, 0.8, 0.6, 0],
                            rotate: p.rotation,
                            transition: {
                                duration: p.duration,
                                repeat: Infinity,
                                delay: p.delay,
                                ease: "linear"
                            }
                        }
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                    <div
                        className="rounded-sm"
                        style={{
                            backgroundColor: colors[p.colorIndex],
                            width: p.size + "px",
                            height: p.size + "px",
                            boxShadow: `0 0 ${p.size}px ${colors[p.colorIndex]}50`,
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

// 3. Electric Sparks (Electric)
const ElectricSparks = ({ colors }: { colors: string[] }) => {
    const sparks = React.useMemo(() => {
        const random = seededRandom(456);
        return [...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 + random() * 0.5;
            const radius = 25 + random() * 20;
            return {
                x: 50 + Math.cos(angle) * radius,
                y: 50 + Math.sin(angle) * radius,
                size: random() * 18 + 12,
                delay: random() * 0.6,
                duration: 0.12 + random() * 0.15,
                repeatDelay: random() * 0.4,
                colorIndex: i % colors.length,
            };
        });
    }, [colors.length]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {sparks.map((s, i) => (
                <motion.div
                    key={i}
                    variants={{
                        initial: { opacity: 0, scale: 0 },
                        hover: {
                            opacity: [0, 1, 0.8, 0],
                            scale: [0.5, 1.3, 0.9, 0],
                            transition: {
                                duration: s.duration,
                                repeat: Infinity,
                                repeatDelay: s.delay + s.repeatDelay,
                                ease: "easeOut"
                            }
                        }
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size + "px",
                        height: s.size + "px",
                    }}
                >
                    <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
                        <path
                            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                            fill={colors[s.colorIndex]}
                            style={{ filter: `drop-shadow(0 0 6px ${colors[s.colorIndex]})` }}
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

// 4. Energy Pulse (Normal, Psychic, Dragon, Steel, Flying, Fighting)
const EnergyPulse = ({ colors }: { colors: string[] }) => {
    const orbs = React.useMemo(() => {
        const random = seededRandom(789);
        return [...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 + random() * 0.4;
            const radius = 20 + random() * 20;
            const endAngle = angle + random() * 1.5 - 0.75;
            const endRadius = 25 + random() * 20;
            return {
                x: 50 + Math.cos(angle) * radius,
                y: 50 + Math.sin(angle) * radius,
                size: random() * 10 + 5,
                delay: i * 0.15,
                duration: 2 + random() * 1.5,
                endX: 50 + Math.cos(endAngle) * endRadius,
                endY: 50 + Math.sin(endAngle) * endRadius,
                colorIndex: i % colors.length,
            };
        });
    }, [colors.length]);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Expanding ripples */}
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={`ripple-${i}`}
                    variants={{
                        initial: {
                            width: "25%",
                            height: "25%",
                            opacity: 0,
                            borderWidth: "0px",
                        },
                        hover: {
                            width: ["25%", "100%"],
                            height: ["25%", "100%"],
                            opacity: [0.6, 0],
                            borderWidth: ["2px", "0px"],
                            transition: {
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: (i - 1) * 0.4
                            }
                        }
                    }}
                    className="absolute rounded-full border border-dashed"
                    style={{ borderColor: colors[(i - 1) % colors.length] }}
                />
            ))}

            {/* Floating orbs */}
            {orbs.map((o, i) => (
                <motion.div
                    key={`orb-${i}`}
                    variants={{
                        initial: {
                            left: `${o.x}%`,
                            top: `${o.y}%`,
                            opacity: 0,
                            scale: 0.5
                        },
                        hover: {
                            left: [`${o.x}%`, `${o.endX}%`, `${o.x}%`],
                            top: [`${o.y}%`, `${o.endY}%`, `${o.y}%`],
                            opacity: [0, 0.9, 0.7, 0.9, 0],
                            scale: [0.5, 1.1, 0.9, 1.1, 0.5],
                            transition: {
                                duration: o.duration,
                                repeat: Infinity,
                                delay: o.delay,
                                ease: "easeInOut"
                            }
                        }
                    }}
                    className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        backgroundColor: colors[o.colorIndex],
                        width: o.size + "px",
                        height: o.size + "px",
                        boxShadow: `0 0 ${o.size * 2}px ${o.size}px ${colors[o.colorIndex]}50`,
                    }}
                />
            ))}
        </div>
    );
};

// 5. Stellar Effect (Stellar) - Cosmic twinkling stars
const StellarEffect = ({ colors }: { colors: string[] }) => {
    const stars = React.useMemo(() => {
        const random = seededRandom(101);
        return [...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2 + random() * 0.5;
            const radius = 20 + random() * 25;
            return {
                x: 50 + Math.cos(angle) * radius,
                y: 50 + Math.sin(angle) * radius,
                size: random() * 12 + 6,
                delay: random() * 1.5,
                duration: 0.8 + random() * 0.8,
                colorIndex: i % colors.length,
            };
        });
    }, [colors.length]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {stars.map((s, i) => (
                <motion.div
                    key={i}
                    variants={{
                        initial: { opacity: 0, scale: 0, rotate: 0 },
                        hover: {
                            opacity: [0, 1, 0.8, 1, 0],
                            scale: [0.2, 1.2, 0.8, 1.1, 0.2],
                            rotate: [0, 180, 360],
                            transition: {
                                duration: s.duration,
                                repeat: Infinity,
                                repeatDelay: s.delay,
                                ease: "easeInOut"
                            }
                        }
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                    }}
                >
                    <svg width={s.size} height={s.size} viewBox="0 0 24 24" className="overflow-visible">
                        <path
                            d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8l-6.4 4.4 2.4-7.2-6-4.8h7.6z"
                            fill={colors[s.colorIndex]}
                            style={{ filter: `drop-shadow(0 0 6px ${colors[s.colorIndex]})` }}
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

// 6. Unknown Effect (Unknown) - Mysterious glitchy particles
const UnknownEffect = ({ colors }: { colors: string[] }) => {
    const glitches = React.useMemo(() => {
        const random = seededRandom(202);
        return [...Array(14)].map((_, i) => {
            const angle = (i / 14) * Math.PI * 2 + random() * 0.6;
            const radius = 18 + random() * 28;
            return {
                x: 50 + Math.cos(angle) * radius,
                y: 50 + Math.sin(angle) * radius,
                size: random() * 10 + 4,
                delay: random() * 0.5,
                duration: 0.1 + random() * 0.15,
                glitchX: random() * 10 - 5,
                repeatDelay: random() * 0.3,
                colorIndex: i % colors.length,
            };
        });
    }, [colors.length]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {glitches.map((g, i) => (
                <motion.div
                    key={i}
                    variants={{
                        initial: { opacity: 0, scaleX: 1 },
                        hover: {
                            opacity: [0, 1, 0, 0.8, 0],
                            scaleX: [1, 2, 0.5, 1.5, 1],
                            x: [0, g.glitchX, 0],
                            transition: {
                                duration: g.duration,
                                repeat: Infinity,
                                repeatDelay: g.delay + g.repeatDelay,
                                ease: "linear"
                            }
                        }
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: `${g.x}%`,
                        top: `${g.y}%`,
                        width: g.size * 2 + "px",
                        height: g.size / 2 + "px",
                        backgroundColor: colors[g.colorIndex],
                        boxShadow: `0 0 ${g.size}px ${colors[g.colorIndex]}`,
                    }}
                />
            ))}
        </div>
    );
};


// --- Main Controller ---

export const PokemonTypeEffect = ({ types }: TypeEffectProps) => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !types || types.length === 0) return null;

    // Resolve all colors explicitly
    const resolvedColors = types.map(t => {
        const typeName = t.type.name.toLowerCase().trim();
        return getTypeColor(typeName);
    });

    const mainType = types[0].type.name.toLowerCase().trim();

    // Map Types to Archetypes
    switch (mainType) {
        case "fire":
            return <RisingParticles colors={resolvedColors} speed={1.5} />;
        case "water":
            return <RisingParticles colors={resolvedColors} speed={0.8} />;
        case "ghost":
        case "poison":
        case "dark":
            return <RisingParticles colors={resolvedColors} speed={0.5} />;

        case "grass":
        case "bug":
        case "fairy":
            return <FloatingParticles colors={resolvedColors} gravity={1} />;
        case "ice":
        case "ground":
        case "rock":
            return <FloatingParticles colors={resolvedColors} gravity={1} />;

        case "electric":
            return <ElectricSparks colors={resolvedColors} />;

        case "stellar":
            return <StellarEffect colors={resolvedColors} />;

        case "unknown":
            return <UnknownEffect colors={resolvedColors} />;

        case "normal":
        case "psychic":
        case "dragon":
        case "steel":
        case "flying":
        case "fighting":
        default:
            return <EnergyPulse colors={resolvedColors} />;
    }
};
