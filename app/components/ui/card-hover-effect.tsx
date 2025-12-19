import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export const HoverEffect = <T,>({
  items,
  renderItem,
  keyExtractor,
  className,
}: {
  items: T[];
  renderItem: (
    item: T,
    handlers: { onMouseEnter: () => void; onMouseLeave: () => void }
  ) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          className="group relative block h-full w-full p-2"
          key={keyExtractor(item, idx)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                className="absolute inset-0 block h-full w-full rounded-3xl bg-fd-accent/80 dark:bg-fd-accent/50"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
                initial={{ opacity: 0 }}
                layoutId="hoverBackground"
              />
            )}
          </AnimatePresence>
          <div className="relative z-20 h-full w-full">
            {renderItem(item, {
              onMouseEnter: () => setHoveredIndex(idx),
              onMouseLeave: () => setHoveredIndex(null),
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
