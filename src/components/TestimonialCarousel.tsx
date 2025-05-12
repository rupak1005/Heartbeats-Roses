import React, { useState } from 'react';
import PhotoFrame from './PhotoFrame';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface Testimonial {
  src: string;
  caption: string;
  name?: string;
  role?: string;
  testimonial?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PhotoFrame
            src={testimonials[activeIndex].src}
            caption={testimonials[activeIndex].caption}
            name={testimonials[activeIndex].name}
            role={testimonials[activeIndex].role}
            testimonial={testimonials[activeIndex].testimonial}
            onNext={handleNext}
            onPrevious={handlePrevious}
            showControls={true}
          />
        </motion.div>
      </AnimatePresence>
    </div>
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

export default TestimonialCarousel;
