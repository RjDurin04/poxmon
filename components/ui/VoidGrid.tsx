"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoidGridProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
}

export function VoidGrid<T>({ items, renderItem, className }: VoidGridProps<T>) {
    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4", className)}>
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={cn(
                        "relative",
                        // Asymmetric layout logic: 
                        // Every 7th item spans 2 cols (if screen large enough)
                        // Every 11th item spans 2 rows
                        index % 7 === 0 && "md:col-span-2",
                        index % 11 === 0 && "md:row-span-2"
                    )}
                >
                    {renderItem(item, index)}
                </motion.div>
            ))}
        </div>
    );
}
