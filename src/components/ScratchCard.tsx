
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScratchCardProps {
  hiddenMessage: string;
  coverText: string;
  className?: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ 
  hiddenMessage, 
  coverText, 
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentRevealed, setPercentRevealed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      if (container && canvas) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Draw initial state
        ctx.fillStyle = '#FFDEE2';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some hearts to the cover
        drawHearts(ctx, canvas.width, canvas.height);
        
        // Add the cover text
        ctx.font = '16px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ea384c';
        ctx.fillText(coverText, canvas.width / 2, canvas.height / 2);
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Scratch functionality
    let isDrawing = false;
    
    const getPosition = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };
    
    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      
      const pos = getPosition(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };
    
    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      
      const pos = getPosition(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      
      // Calculate percentage revealed
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;
      let transparentPixels = 0;
      
      for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] === 0) transparentPixels++;
      }
      
      const totalPixels = canvas.width * canvas.height;
      const newPercentRevealed = Math.round((transparentPixels / totalPixels) * 100);
      setPercentRevealed(newPercentRevealed);
      
      // Auto-reveal if more than 50% is scratched
      if (newPercentRevealed > 50 && !isRevealed) {
        setIsRevealed(true);
      }
    };
    
    const stopDrawing = () => {
      isDrawing = false;
      ctx.closePath();
    };
    
    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch support
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [coverText]);
  
  // Helper function to draw hearts
  const drawHearts = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw a few decorative hearts
    const drawHeart = (x: number, y: number, size: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(
        x, y, 
        x - size / 2, y, 
        x - size / 2, y + size / 4
      );
      ctx.bezierCurveTo(
        x - size / 2, y + size / 2, 
        x, y + size * 3/4, 
        x, y + size
      );
      ctx.bezierCurveTo(
        x, y + size * 3/4, 
        x + size / 2, y + size / 2, 
        x + size / 2, y + size / 4
      );
      ctx.bezierCurveTo(
        x + size / 2, y, 
        x, y, 
        x, y + size / 4
      );
      ctx.fillStyle = '#FF8FAB';
      ctx.fill();
      ctx.restore();
    };
    
    // Draw random hearts
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 10 + Math.random() * 15;
      drawHeart(x, y, size);
    }
  };
  
  return (
    <div 
      className={cn(
        "relative h-[200px] w-full rounded-lg shadow-md overflow-hidden",
        className
      )}
      ref={containerRef}
    >
      {/* Hidden message */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm p-6 transition-opacity duration-500",
          isRevealed ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="text-red-400 text-center font-playfair italic text-xl">
          {hiddenMessage}
        </p>
      </div>
      
      {/* Scratch overlay */}
      <canvas 
        ref={canvasRef}
        className={cn(
          "absolute inset-0 cursor-pointer transition-opacity duration-500",
          isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />
      
      {/* Instructions */}
      <div className="absolute bottom-2 right-2 text-xs text-black/70">
        {!isRevealed && percentRevealed > 0 && (
          <span>{percentRevealed}% revealed</span>
        )}
      </div>
    </div>
  );
};

export default ScratchCard;
