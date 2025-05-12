
"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowClassName?: string;
}

export const GlowingEffect = ({
  children,
  className,
  containerClassName,
  glowClassName,
}: GlowingEffectProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/[0.1] bg-white/5 dark:bg-black/20 backdrop-blur-md",
        containerClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500",
          glowClassName
        )}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,143,171,.15), transparent 40%)`,
        }}
      />
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
};
