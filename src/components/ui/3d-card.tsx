
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const Card3d = ({
  children,
  className,
  cardClassName,
  containerClassName,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateSize = () => {
    if (cardRef.current) {
      const { width: cardWidth, height: cardHeight } = cardRef.current.getBoundingClientRect();
      setWidth(cardWidth);
      setHeight(cardHeight);
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      x.set(mouseX / 25);
      y.set(mouseY / 25);
    }
  };

  const rotateXOutput = [-15, 15];
  const rotateYOutput = [15, -15];

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex items-center justify-center",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        ...style,
      }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: mouseYSpring,
          rotateY: mouseXSpring,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full w-full transform-gpu rounded-xl bg-transparent transition-transform duration-200 will-change-transform",
          cardClassName
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-br from-romantic/50 to-romantic-purple/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            className
          )}
        />
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0)",
          }}
          className="absolute inset-4 rounded-lg overflow-hidden"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
