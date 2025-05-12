import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  "bg-transparent dark:bg-romantic-purple-dark/15 backdrop-blur-3xl rounded-xl dark:border-white/10 shadow-lg relative overflow-hidden transition-all duration-500 shadow-xl group",
  {
    variants: {
      variant: {
        default: "bg-white/10 dark:bg-romantic-purple-dark/20",
        outline: "border border-white/10 dark:border-romantic-purple/20",
        filled: "bg-white/10 dark:bg-romantic-purple-dark/30",
        shimmer: "bg-white/10 dark:bg-romantic-purple-dark/20 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full before:animate-shimmer before:transition-all before:duration-1000",
        glass: "bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
      rounded: {
        default: "rounded-xl",
        sm: "rounded-lg",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      animation: {
        none: "",
        shimmer: "before:translate-x-full before:transform-gpu before:ease-in-out before:transition-all before:duration-&lsqb;1.5s&rsqb;",
        glow: "shadow-[0_0_15px_2px_rgba(255,143,171,0.3)]",
        breathe: "animate-pulse-glow",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      animation: "none"
    },
  }
);

interface GlassmorphicCardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ 
  children, 
  className,
  variant,
  size,
  rounded,
  animation,
  gradient = true
}) => {
  return (
    <div 
      className={cn(
        cardVariants({ variant, size, rounded, animation }),
        className
      )}
    >
      {/* Enhanced background gradient overlay */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-romantic-light/1 to-romantic-peach/4 dark:from-romantic-purple/20 dark:to-romantic-gold/20 rounded-xl -z-10 opacity-50"></div>
      )}
      
      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-100 transition-opacity duration-500 -z-10" 
           style={{ 
             boxShadow: "0 0 15px 2px rgba(255, 143, 171, 0.2), inset 0 0 5px 1px rgba(255, 143, 171, 0.1)",
           }}></div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-90 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transform-gpu ease-in-out" style={{ transitionDuration: '1.5s' }}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassmorphicCard;
