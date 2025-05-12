"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ExpandableCard = ({
  children,
  className,
  cardTitle,
}: {
  children: React.ReactNode;
  className?: string;
  cardTitle: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "group relative overflow-hidden bg-white/10 backdrop-blur-md dark:bg-black/20 border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-black/30 transition-colors rounded-lg",
        className
      )}
    >
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={cn("p-4 cursor-pointer flex items-center justify-between")}
      >
        <h3 className="font-bold text-lg text-romantic-dark dark:text-romantic-gold">{cardTitle}</h3>
        <motion.div
          variants={{
            open: { rotate: 45 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          className="relative flex h-4 w-4 items-center justify-center"
        >
          <div className="absolute bg-romantic-dark dark:bg-romantic-gold h-0.5 w-full"></div>
          <div className="absolute bg-romantic-dark dark:bg-romantic-gold h-full w-0.5"></div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={{
          open: {
            height: "auto",
            opacity: 1,
            transition: { 
              height: { duration: 0.4 },
              opacity: { duration: 0.3, delay: 0.1 }
            },
          },
          closed: { 
            height: 0,
            opacity: 0,
            transition: { 
              height: { duration: 0.4 },
              opacity: { duration: 0.2 }
            }
          },
        }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0">{children}</div>
      </motion.div>
    </motion.div>
  );
};


export const ExpandableGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("flex flex-col gap-4", className)} // Changed from grid to flex with vertical direction
    >
      {children}
    </div>
  );
};
