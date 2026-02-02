'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Unhandled Runtime Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glitch Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#ef4444_0.5px,_transparent_0.5px)] bg-[size:40px_40px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-bg-secondary/30 backdrop-blur-3xl border border-red-500/20 rounded-[2.5rem] p-8 md:p-12 relative z-10 shadow-2xl shadow-red-500/5"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Terminal className="w-3 h-3 text-red-500/50" />
                            <span className="text-[10px] font-black text-red-500/50 uppercase tracking-[0.3em]">System Failure</span>
                        </div>
                        <h2 className="text-xl font-black text-text-primary uppercase tracking-tight">Runtime Exception</h2>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                        <p className="text-sm font-mono text-red-400 leading-relaxed italic">
                            {error.message || "An unexpected deviation occurred in the data stream."}
                        </p>
                        {error.digest && (
                            <p className="mt-2 text-[10px] font-mono text-text-muted">
                                Digest ID: {error.digest}
                            </p>
                        )}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed opacity-70">
                        The connection to the central database was terminated or returned an invalid response.
                        This usually occurs during heavy load or scheduled maintenance.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-accent text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent-hover transition-all active:scale-95 shadow-xl shadow-accent/20"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Retry
                    </button>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 text-white/70 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                </div>

                {/* Technical Footer */}
                <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.4em]">Status: Offline</span>
                    <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.4em]">Err_Conn_Refused</span>
                </div>
            </motion.div>
        </div>
    );
}
