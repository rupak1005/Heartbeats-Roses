
import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const HeartBackground: React.FC = () => {
  // Get mobile state
  const isMobile = useIsMobile();
  
  // Scale down the number of elements on mobile
  const heartCount = isMobile ? 15 : 30;
  const sparkleCount = isMobile ? 8 : 15;
  const starCount = isMobile ? 10 : 20;
  const floatingStarCount = isMobile ? 8 : 15;
  
  // Create an array of hearts with randomized positions and animations
  const hearts = Array.from({ length: heartCount }, (_, i) => {
    const size = Math.floor(Math.random() * 24) + (isMobile ? 8 : 10); // Smaller on mobile
    const left = Math.floor(Math.random() * 100); // Random left position
    const animationDuration = Math.floor(Math.random() * 10) + 15; // Random duration between 15-25s
    const animationDelay = Math.floor(Math.random() * 5); // Random delay between 0-5s
    const opacity = (Math.random() * 0.8) + 0.2; // Random opacity between 0.2-1.0
    
    return {
      id: i,
      size,
      style: {
        left: `${left}%`,
        bottom: `-${size}px`,
        animation: `float-heart ${animationDuration}s linear ${animationDelay}s infinite`,
        opacity
      }
    };
  });

  const sparkles = Array.from({ length: sparkleCount }, (_, i) => {
    const size = Math.floor(Math.random() * 12) + (isMobile ? 4 : 6); // Smaller on mobile
    const left = Math.floor(Math.random() * 100); // Random left position
    const top = Math.floor(Math.random() * 100); // Random top position
    const animationDuration = Math.floor(Math.random() * 4) + 2; // Random duration between 2-6s
    const animationDelay = Math.floor(Math.random() * 3); // Random delay between 0-3s
    const opacity = (Math.random() * 0.7) + 0.3; // More visible
    
    return {
      id: i,
      size,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        animation: `twinkle ${animationDuration}s ease-in-out ${animationDelay}s infinite alternate`,
        opacity
      }
    };
  });

  const stars = Array.from({ length: starCount }, (_, i) => {
    const size = Math.floor(Math.random() * 16) + (isMobile ? 6 : 8); // Smaller on mobile
    const right = Math.floor(Math.random() * 100); // Random right position
    const top = Math.floor(Math.random() * 70) + 10; // Random top position between 10-80%
    const rotate = Math.floor(Math.random() * 360); // Random rotation
    const animationDelay = Math.floor(Math.random() * 5); // Random delay
    const opacity = (Math.random() * 0.7) + 0.3; // More visible 0.3-1.0
    
    return {
      id: i,
      size,
      style: {
        right: `${right}%`,
        top: `${top}%`,
        transform: `rotate(${rotate}deg)`,
        animation: `float-star 20s ease-in-out ${animationDelay}s infinite`,
        opacity
      }
    };
  });

  // New array for additional stars with different animations
  const floatingStars = Array.from({ length: floatingStarCount }, (_, i) => {
    const size = Math.floor(Math.random() * 14) + (isMobile ? 4 : 6); // Smaller on mobile
    const left = Math.floor(Math.random() * 100); // Random left position
    const animationDuration = Math.floor(Math.random() * 8) + 12; // Random duration between 12-20s
    const animationDelay = Math.floor(Math.random() * 10); // Random delay between 0-10s
    const opacity = (Math.random() * 0.6) + 0.4; // Random opacity between 0.4-1.0
    
    return {
      id: i,
      size,
      style: {
        left: `${left}%`,
        bottom: `-${size}px`,
        animation: `float-heart ${animationDuration}s linear ${animationDelay}s infinite`,
        opacity
      }
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-20">
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-light/10 via-romantic-peach/5 to-romantic-lavender/10"></div>
      
      {hearts.map((heart) => (
        <Heart 
          key={`heart-${heart.id}`}
          className="floating-heart"
          size={heart.size}
          fill="#FF8FAB" // Add fill color to make more visible
          style={heart.style as React.CSSProperties}
        />
      ))}

      {sparkles.map((sparkle) => (
        <Sparkles 
          key={`sparkle-${sparkle.id}`}
          className="absolute text-romantic-gold-light"
          size={sparkle.size}
          style={sparkle.style as React.CSSProperties}
        />
      ))}

      {stars.map((star) => (
        <Star 
          key={`star-${star.id}`}
          className="absolute text-romantic"
          size={star.size}
          fill="#FDE1D3"
          style={star.style as React.CSSProperties}
        />
      ))}

      {floatingStars.map((star) => (
        <Star 
          key={`floating-star-${star.id}`}
          className="absolute text-romantic-gold"
          size={star.size}
          fill="#DAA520" 
          style={star.style as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default HeartBackground;
