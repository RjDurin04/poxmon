"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function GlitchText({ text, className, as: Component = "span" }: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Component
            className={cn("relative inline-block cursor-pointer select-none group font-display uppercase tracking-widest", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10 block">{text}</span>
            {isHovered && (
                <>
                    <motion.span
                        className="absolute top-0 left-0 -z-10 text-void-acid opacity-80 mix-blend-screen"
                        animate={{ x: [-2, 2, -1, 0, 3], y: [1, -2, 0, 2] }}
                        transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }}
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        className="absolute top-0 left-0 -z-10 text-void-error opacity-80 mix-blend-multiply"
                        animate={{ x: [2, -2, 1, 0, -3], y: [-1, 2, 0, -2] }}
                        transition={{ repeat: Infinity, duration: 0.15, ease: "linear" }}
                    >
                        {text}
                    </motion.span>
                </>
            )}
        </Component>
    );
}
