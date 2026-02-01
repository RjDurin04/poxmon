"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface PaginatedGridProps {
    items: { name: string }[];
    title: string;
    description: string;
    basePath: string;
    rowsLocked?: number;
    gridColsClass?: string;
    useModal?: boolean;
}

function PaginatedGridContent({
    items,
    title,
    description,
    basePath,
    rowsLocked = 10,
    gridColsClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    useModal = false
}: PaginatedGridProps) {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cols, setCols] = useState(0); // Initialize with 0 to detect first client-side run
    const [isMounted, setIsMounted] = useState(false);
    const gridTopRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    // Track columns based on window size to maintain row lock
    useEffect(() => {
        if (!isMounted) return;

        const updateCols = () => {
            const width = window.innerWidth;
            if (width < 640) setCols(2);
            else if (width < 768) setCols(3);
            else if (width < 1024) setCols(4);
            else if (width < 1280) setCols(5);
            else setCols(6);
        };

        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, [isMounted]);

    // Use a stable default columns for SSR to match initial render
    const effectiveCols = cols || 2;
    const itemsPerPage = effectiveCols * rowsLocked;

    const filtered = useMemo(() =>
        items.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        ),
        [items, query]
    );

    // Ensure currentPage is valid (reset if out of bounds)
    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

    const startIndex = (safePage - 1) * itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    // Scroll to top of grid on page change
    useEffect(() => {
        if (gridTopRef.current) {
            gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [safePage]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="pt-32 pb-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
                        {title}
                    </h1>
                    <div className="text-text-secondary text-lg mb-8">
                        {description}
                    </div>

                    <div className="relative max-w-md">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder={`Search ${title.toLowerCase()}...`}
                            className="w-full px-4 py-3 bg-bg-tertiary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8" ref={gridTopRef}>
                <div className="flex justify-between items-end mb-6">
                    <div className="text-sm text-text-secondary">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} {title.toLowerCase()}
                    </div>
                </div>

                <motion.div
                    layout
                    className={cn("grid gap-3 min-h-[400px] content-start", gridColsClass)}
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedItems.map((item) => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("selected", item.name);
                            const modalHref = `${pathname}?${params.toString()}`;
                            const linkHref = `${basePath}/${item.name}`;

                            return (
                                <motion.div
                                    key={item.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href={useModal ? modalHref : linkHref}
                                        scroll={!useModal}
                                        className="block p-3 bg-bg-secondary border border-border rounded-lg hover:border-accent/50 hover:bg-bg-tertiary transition-all text-sm capitalize text-center"
                                    >
                                        {item.name.replace(/-/g, " ")}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-text-muted">
                        No results found matching &quot;{query}&quot;
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={safePage === 1}
                            className="p-2 rounded-lg border border-border bg-bg-secondary text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
                            {Array.from({ length: totalPages }, (_, i) => {
                                const pageNum = i + 1;
                                const isVisible =
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= safePage - 1 && pageNum <= safePage + 1);

                                if (!isVisible) {
                                    if (pageNum === 2 || pageNum === totalPages - 1) {
                                        return <span key={pageNum} className="px-1 text-text-muted self-center">...</span>;
                                    }
                                    return null;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={cn(
                                            "w-10 h-10 flex-shrink-0 rounded-lg border text-sm font-medium transition-all",
                                            safePage === pageNum
                                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                                : "bg-bg-secondary border-border text-text-secondary hover:text-text-primary hover:border-text-secondary"
                                        )}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={safePage === totalPages}
                            className="p-2 rounded-lg border border-border bg-bg-secondary text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export function PaginatedGrid(props: PaginatedGridProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen p-20 text-center animate-pulse">
                <div className="h-10 w-48 bg-bg-secondary rounded-lg mx-auto mb-4" />
                <div className="h-4 w-64 bg-bg-secondary rounded-lg mx-auto" />
            </div>
        }>
            <PaginatedGridContent {...props} />
        </Suspense>
    );
}
