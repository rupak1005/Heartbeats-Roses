
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "#FFDEE2", // Light pink
  gradientBackgroundEnd = "#FF8FAB", // Medium pink
  firstColor = "#FDE1D3", // Soft peach
  secondColor = "#E6E6FA", // Soft lavender
  thirdColor = "#7E69AB", // Medium purple
  fourthColor = "#DAA520", // Medium gold
  fifthColor = "#ea384c", // Deep red
  pointerColor = "transparent",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  
  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactive) {
        setTgX(window.innerWidth / 2);
        setTgY(window.innerHeight / 2);
      }
      setCurX(curX => curX + (tgX - curX) / 20);
      setCurY(curY => curY + (tgY - curY) / 20);
      requestAnimationFrame(move);
    }

    move();
  }, [tgX, tgY, interactive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      setTgX(event.clientX);
      setTgY(event.clientY);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn("h-full w-full relative overflow-hidden", containerClassName)}
        onMouseMove={handleMouseMove}
      >
        <div
          className={cn(
            "gradients-container h-full w-full blur-lg",
            className
          )}
          style={
            {
              "--x": curX + "px",
              "--y": curY + "px",
            } as React.CSSProperties
          }
        >
          <div className="absolute inset-0 opacity-[0.25] bg-[length:100%_100%] z-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),var(--first-color)_0%,transparent_45%)]"></div>
          <div className="absolute inset-0 opacity-[0.35] bg-[length:100%_100%] z-10 bg-[radial-gradient(circle_at_calc(100%_-_var(--x))_calc(100%_-_var(--y)),var(--second-color)_0%,transparent_35%)]"></div>
          <div className="absolute inset-0 opacity-[0.25] bg-[length:100%_100%] z-20 bg-[radial-gradient(circle_at_calc(75%_-_var(--x))_calc(var(--y)_-_150px),var(--third-color)_0%,transparent_40%)]"></div>
          <div className="absolute inset-0 opacity-[0.25] bg-[length:100%_100%] z-30 bg-[radial-gradient(circle_at_calc(var(--x)_-_100px)_calc(var(--y)_+_200px),var(--fourth-color)_0%,transparent_40%)]"></div>
          <div className="absolute inset-0 opacity-[0.2] bg-[length:100%_100%] z-40 bg-[radial-gradient(circle_at_calc(var(--x)_+_150px)_calc(var(--y)_-_100px),var(--fifth-color)_0%,transparent_40%)]"></div>
        </div>

        <div className="relative z-50 w-full h-full">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};
