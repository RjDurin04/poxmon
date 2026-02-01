"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    className?: string;
    label?: string;
    fallbackPath?: string;
    variant?: "default" | "floating";
}

export function BackButton({ className, label = "Back", fallbackPath = "/", variant = "default" }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        // More robust check: if we're at the start of the session or the previous entry is unknown
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackPath);
        }
    };

    if (variant === "floating") {
        return (
            <button
                onClick={handleBack}
                className={cn(
                    "group w-10 h-10 rounded-full bg-bg-secondary/40 backdrop-blur-xl border border-border shadow-2xl flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-all duration-300 relative z-[100] cursor-pointer",
                    className
                )}
                title={label}
            >
                <ArrowLeft className="w-5 h-5 text-text-primary group-hover:text-accent transition-colors pointer-events-none" />
            </button>
        );
    }

    return (
        <button
            onClick={handleBack}
            className={cn(
                "group inline-flex items-center gap-2 text-text-muted hover:text-accent transition-all duration-300 relative z-[100] cursor-pointer",
                className
            )}
        >
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors pointer-events-none">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] pointer-events-none">{label}</span>
        </button>
    );
}
