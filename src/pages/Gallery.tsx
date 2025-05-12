
import React from 'react';
import { Card3d } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

type GalleryProps = {
  backgroundIndex: number;
  isDarkBackground: boolean;
};

const GalleryPage = ({ backgroundIndex, isDarkBackground }: GalleryProps) => {
  const isMobile = useIsMobile();
  
  // Placeholder images
  const images = [
    {
      id: "img1",
      src: "/backgrounds/bg2.jpg",
      alt: "Gallery Image 1",
      title: "Special Moment",
      description: "A wonderful memory captured forever."
    },
    {
      id: "img2",
      src: "/backgrounds/bg9.jpg",
      alt: "Gallery Image 2",
      title: "Together Always",
      description: "Every moment with you is precious."
    },
    {
      id: "img3",
      src: "/backgrounds/bg5.jpg",
      alt: "Gallery Image 3",
      title: "Perfect Day",
      description: "Creating memories that last a lifetime."
    },
    {
      id: "img4",
      src: "/backgrounds/bg11.jpg",
      alt: "Gallery Image 4",
      title: "Add Your Photo",
      description: "Replace with your special moment."
    },
    {
      id: "img5",
      src: "/backgrounds/bg2.jpg",
      alt: "Gallery Image 5",
      title: "Your Memory",
      description: "Another placeholder for your photos."
    },
    {
      id: "img6",
      src: "/backgrounds/bg11.jpg",
      alt: "Gallery Image 6",
      title: "Capture Love",
      description: "One more space for your treasured images."
    },
  ];

  // Determine text color classes based on background
  const textClasses = isDarkBackground 
    ? "text-white dark:text-white" 
    : "text-romantic-dark dark:text-romantic-gold-light";

  const headingClasses = isDarkBackground
    ? "text-white dark:text-white"
    : "text-romantic-dark dark:text-romantic-gold-light";

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Dark gradient background with animation */}
      <BackgroundGradientAnimation 
        gradientBackgroundStart="#000"
        gradientBackgroundEnd="#121212"
        firstColor="rgb(15, 15, 15)"
        secondColor="rgb(25, 25, 25)"
        thirdColor="rgb(35, 35, 35)"
        fourthColor="rgb(50, 50, 50)"
        fifthColor="#222"
        className="absolute inset-0 z-[5] opacity-80"
        interactive={true}
        containerClassName="fixed inset-0"
      />
      
      <div className="absolute inset-0 z-[6] bg-[radial-gradient(circle_at_center,rgba(255,143,171,0.1),transparent_50%)]"></div>

      <div className="relative z-[15] container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <ImageIcon className="h-7 w-7 text-romantic dark:text-romantic-gold" />
          <h1 className={`text-4xl hover:text-red-300/90 md:text-5xl font-playfair font-bold italic ${headingClasses}`}>Our Gallery</h1>
        </div>
        
        <p className={`mb-8 text-lg  italic ${textClasses} max-w-2xl`}>
          A collection of our favorite moments together - each image tells a story of love, laughter, and memories we've created.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image) => (
            <div key={image.id} className="h-[300px] sm:h-[350px]">
              <Card3d 
                className="bg-black/50" 
                containerClassName="w-full h-full"
                cardClassName="border border-white/10 bg-black/20 backdrop-blur-sm group-hover:border-romantic/30 transition-all duration-500"
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                      <Star className="h-4 w-4 text-romantic-gold" fill="#DAA520" />
                    </div>
                    <p className="text-sm text-white/70">{image.description}</p>
                  </div>
                </div>
              </Card3d>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
