
import { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import HeartBackground from '@/components/HeartBackground';
import AudioPlayer from '@/components/AudioPlayer';
import LoveItem from '@/components/LoveItem';
import LyricSection from '@/components/LyricSection';
import ScratchCard from '@/components/ScratchCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { useIsMobile } from '@/hooks/use-mobile';

type IndexProps = {
  backgroundIndex: number;
  isDarkBackground: boolean;
};

const Index = ({ backgroundIndex, isDarkBackground }: IndexProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    lyrics: false,
    list: false,
    photos: false,
  });

  // Fix: Use HTMLDivElement instead of HTMLElement for the refs
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    lyrics: null,
    list: null,
    photos: null,
  });
  
  // Get mobile state
  const isMobile = useIsMobile();

  const loveReasons = [
    "she somehow knows when i'm upset *before* i do… psychic girlfriend things 😭",
    "her voice? calming, chaotic, cute—all in one. literally serotonin in sound form",
    "she'll steal my hoodie and then call it *hers* like girl… okay fine, take my heart too 😩",
    "when she sends 3 texts in a row and then a meme? elite communication skills fr",
    "the way she gets excited over tiny things? my heart can't take it 😭💖",
    "her little 'i told you so' face? annoying and adorable. help 😅",
    "she calls me out when i need it but also holds me like i’m the softest thing alive",
    "she somehow makes me laugh even when i’m mad… rude, but i love it",
    "she’ll say 'i’m not that pretty today' like girl what mirror are YOU using 😤💅",
    "her hugs feel like home. like… how did i live without this??",
    "she makes playlists that sound like love letters and idk how to act 😭🎧",
    "she calls me 'her person' and suddenly the day gets 1000x better",
    "the way she dances around the room when no one’s watching (except me 👀)",
    "she brings peace to my chaos and chaos to my boring—perfect balance tbh",
    "she looks good in everything. even my oversized shirt that reaches her knees 😭",
    "she’ll roast me but then tuck me in like??? pick a lane ma’am 😩",
    "she's unintentionally poetic when she's sleepy. actual dream girl vibes",
    "she sends me voice notes with that sleepy voice and suddenly i’m in love all over again",
    "she supports every wild idea i have and still keeps me grounded. like magic ✨",
    "she *is* my peace, my chaos, my best friend, my love—all rolled into one gorgeous human"
  ];
  

  const lyrics = [
    "Watch the sunrise along the coast",
    "As we're both getting old",
    "I can't describe what I'm feeling",
    "And all I know is we're going home",
    "",
    "So please don't let me go",
    "Don't let me go",
    "",
    "And if it's right",
    "I don't care how long it takes",
    "As long as I'm with you",
    "I've got a smile on my face",
    "",
    "Save your tears, it'll be okay",
    "All I know is you're here with me",
    "",
  ];

  const testimonials = [
    { 
      src: "/backgrounds/bg2.jpg", 
      caption: "lorem",
      name: "lopremepson",
      testimonial: "From the moment our eyes met, I knew you were special. Every day with you confirms that feeling."
    },
    { 
      src: "/backgrounds/bg7.jpg", 
      caption: "lorem5",
      name: "Safe Haven",
      testimonial: "My favorite place is right here, wrapped up in your arms arms🫶"
    },
    { 
      src: "placeholder.svg", 
      caption: "Cuties since day 1",
      name: "Growing Together",
      testimonial: "Cuties since day 1."
    },
  ];
  
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

  const nextReason = () => {
    setCurrentReasonIndex((prev) => (prev + 1) % loveReasons.length);
  };

  const prevReason = () => {
    setCurrentReasonIndex((prev) => (prev - 1 + loveReasons.length) % loveReasons.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % loveReasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [loveReasons.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    // Properly observe elements with correct TypeScript typing
    Object.entries(sectionRefs.current).forEach(([key, element]) => {
      if (element) observer.observe(element);
    });

    return () => {
      Object.entries(sectionRefs.current).forEach(([key, element]) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Determine text color classes based on background
  const textClasses = isDarkBackground 
    ? "text-white dark:text-white" 
    : "text-romantic-dark dark:text-romantic-gold-light";

  const headingClasses = isDarkBackground
    ? "text-white dark:text-white"
    : "text-romantic-dark dark:text-romantic-gold-light";

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient animation */}
      <BackgroundGradientAnimation 
        gradientBackgroundStart="#FFDEE2" 
        gradientBackgroundEnd="#FF8FAB"
        firstColor="#FDE1D3"
        secondColor="#E6E6FA"
        thirdColor="#7E69AB"
        fourthColor="#DAA520"
        fifthColor="#ea384c"
        className="absolute inset-0 z-0"
        interactive={true}
        containerClassName="fixed inset-0"
      />
      
      <HeartBackground />
      
      <div className="relative z-20 container max-w-4xl mx-auto px-4 py-8 md:py-16 pt-20">
        <header className="text-center mb-8 md:mb-16">
          <GlassmorphicCard className="py-6 md:py-8 px-3 md:px-4">
            <h1 className={`text-4xl md:text-7xl text-red-300 font-playfair font-bold italic ${headingClasses} mb-2 md:mb-4`}>
              For My Love
            </h1>
            <p className={`text-base md:text-lg italic ${textClasses} max-w-2xl mx-auto`}>
              A collection of all the reasons why you make my heart skip a beat every single day
            </p>
          </GlassmorphicCard>
        </header>

        <section className="mb-8 md:mb-16">
          <h2 className={`text-3xl md:text-5xl text-red-300/90 font-playfair italic ${headingClasses} mb-4 md:mb-6 text-center`}>
            A Hidden Message
          </h2>
          <GlassmorphicCard className="p-4">
            <div className="max-w-md mx-auto">
              <ScratchCard
                hiddenMessage="You are the most beautiful soul I have ever met. Wolf u so much!"
                coverText="Scratch here to reveal a secret message..."
              />
            </div>
          </GlassmorphicCard>
        </section>

        <section
          id="list"
          ref={(el) => (sectionRefs.current.list = el)}
          className="mb-8 md:mb-16"
        >
          <h2 className={`text-3xl md:text-5xl text-red-300/90 font-playfair italic ${headingClasses} mb-4 md:mb-6 text-center`}>
            Things I Love About You
          </h2>
          <GlassmorphicCard>
            <div className="min-h-[200px] md:min-h-[250px] flex flex-col items-center justify-center p-4 md:p-6">
              <div className="w-full max-w-lg mx-auto mb-4">
                <LoveItem
                  text={loveReasons[currentReasonIndex]}
                  index={currentReasonIndex}
                  active={true}
                />
              </div>
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={prevReason} 
                      className="bg-romantic/90 dark:bg-romantic-purple/20 hover:bg-romantic/30 dark:hover:bg-romantic-purple/30 rounded-full"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <div className="px-2 text-sm text-romantic-light ">
                      {currentReasonIndex + 1} / {loveReasons.length}
                    </div>
                  </PaginationItem>
                  <PaginationItem>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={nextReason} 
                      className="bg-romantic/90 dark:bg-romantic-purple/20 hover:bg-romantic/30 dark:hover:bg-romantic-purple/30 rounded-full"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </GlassmorphicCard>
        </section>

        <section
          id="photos"
          ref={(el) => (sectionRefs.current.photos = el)}
          className="mb-8 md:mb-16"
        >
          <h2 className={`text-red-300/90 text-3xl md:text-5xl font-playfair italic ${headingClasses} mb-4 md:mb-6 text-center`}>
            Our Moments
          </h2>
          <div
            className="transition-all duration-1000 transform"
            style={{
              opacity: isVisible.photos ? 1 : 0,
              transform: isVisible.photos ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        <section
          id="lyrics"
          ref={(el) => (sectionRefs.current.lyrics = el)}
          className="mb-8 md:mb-16"
        >
          <h2 className={`text-red-300/90 text-3xl md:text-5xl font-playfair italic ${headingClasses} mb-4 md:mb-6 text-center`}>
            Our Song
          </h2>
          <div
            className={`transition-all duration-1000 transform ${textClasses}`}
            style={{
              opacity: isVisible.lyrics ? 1 : 0,
              transform: isVisible.lyrics ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <GlassmorphicCard>
              <LyricSection lyrics={lyrics} className="max-w-2xl mx-auto" />
            </GlassmorphicCard>
          </div>
        </section>

        <section className="mb-8 md:mb-16">
          <div className="flex justify-center py-4">
            <AudioPlayer 
              initialSong={{
                id: "song-1",
                title: "Lover's Rock",
                artist: "TV Girl",
                audioSrc: "/TV Girl - Lovers Rock [wcJY0WDe-H4].mp3",
                coverImage: "bg5.jpg"
              }} 
            />
          </div>
        </section>

        <footer className="text-center pt-6 md:pt-8 border-t border-romantic/30 dark:border-romantic-purple/30">
          <div className="flex items-center justify-center mb-2">
            <Heart
              className="text-romantic dark:text-romantic-purple mr-2"
              size={16}
              fill="#FF8FAB"
            />
            <p className={`text-sm ${textClasses} italic`}>
              Forever & Always
            </p>
            <Sparkles
              className="text-romantic dark:text-romantic-gold ml-2"
              size={16}
            />
          </div>
          <p className={`text-xs ${textClasses}`}>
            Made with love, just for you
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
