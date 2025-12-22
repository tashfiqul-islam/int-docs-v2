import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
          className="group relative block h-full w-full"
          key={keyExtractor(item, idx)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                className="absolute inset-0 block h-full w-full rounded-2xl border-2 border-[#f16a22]/20 bg-linear-to-br from-[#f16a22]/10 via-[#f16a22]/5 to-transparent dark:border-[#f16a22]/30 dark:from-[#f16a22]/20 dark:via-[#f16a22]/10 dark:to-transparent"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15 },
                }}
                initial={{ opacity: 0 }}
                layoutId="hoverBackground"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
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

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-fd-foreground/10 bg-linear-to-br from-white via-white to-[hsl(0,0%,98%)] p-4 transition-colors duration-300 group-hover:border-[#f16a22]/30 dark:border-white/10 dark:bg-linear-to-br dark:from-[hsl(0,0%,12%)] dark:via-[hsl(0,0%,12%)] dark:to-[hsl(0,0%,16%)] dark:group-hover:border-[#f16a22]/40",
      className
    )}
  >
    <div className="relative z-50">
      <div className="p-4">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4
    className={cn(
      "mt-4 font-bold text-fd-foreground tracking-wide transition-colors duration-300 group-hover:text-[#f16a22] dark:text-zinc-100 dark:group-hover:text-[#f16a22]",
      className
    )}
  >
    {children}
  </h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "mt-8 text-fd-muted-foreground text-sm leading-relaxed tracking-wide dark:text-zinc-400",
      className
    )}
  >
    {children}
  </p>
);
