"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    className?: string;
    label?: string;
    fallbackPath?: string;
}

export function BackButton({ className, label = "Back", fallbackPath = "/" }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackPath);
        }
    };

    return (
        <button
            onClick={handleBack}
            className={cn(
                "group inline-flex items-center gap-2 text-text-muted hover:text-accent transition-all duration-300",
                className
            )}
        >
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">{label}</span>
        </button>
    );
}
