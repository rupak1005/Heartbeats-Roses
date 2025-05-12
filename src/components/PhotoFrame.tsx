
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoFrameProps {
  src?: string;
  caption?: string;
  name?: string;
  role?: string;
  testimonial?: string;
  className?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  showControls?: boolean;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src = "/placeholder.svg",
  caption = "Beautiful moment captured",
  name = "Your Name",
  role = "My Cutie",
  testimonial = "Add your testimonial or description here. This can be a few sentences about the memory captured in this photo.",
  className,
  onNext,
  onPrevious,
  showControls = false,
}) => {
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-gradient-to-r from-romantic/10 to-romantic-purple/20 dark:from-[#0f0f0f] dark:to-[#1a1a1a] rounded-3xl shadow-2xl",
      className
    )}>
      <motion.div
        key={src}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-auto"
      >
        <img
          src={src}
          alt={caption || name}
          className="rounded-3xl w-full md:w-72 h-72 object-cover shadow-lg"
        />
      </motion.div>

      <div className="flex flex-col justify-center max-w-lg text-white/90 dark:text-white">
        <h3 className="text-3xl font-bold">{name}</h3>
        <p className="text-md text-romantic dark:text-gray-400 mb-4">{role}</p>
        <p className="text-xl">{testimonial}</p>
        
        {(showControls || onNext || onPrevious) && (
          <div className="flex gap-4 mt-6">
            {onPrevious && (
              <button
                onClick={onPrevious}
                className="bg-romantic/30 hover:bg-romantic/50 dark:bg-gray-800 dark:hover:bg-gray-700 text-white p-2 rounded-full"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="bg-romantic/30 hover:bg-romantic/50 dark:bg-gray-800 dark:hover:bg-gray-700 text-white p-2 rounded-full"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoFrame;
