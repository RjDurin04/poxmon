import React from "react";
import { Loader2 } from "lucide-react";

export default function RootLoading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:40px_40px] opacity-[0.03]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-8">
                    <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
                </div>

                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-2">
                    Initializing Link
                </h2>
                <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1 h-1 bg-accent rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>

            {/* Technical Detail */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="h-px w-8 bg-border" />
                <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest whitespace-nowrap">
                    Synchronizing specimen database...
                </span>
                <div className="h-px w-8 bg-border" />
            </div>
        </div>
    );
}
