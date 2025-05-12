
import React, { useRef, useEffect } from 'react';
import { Music as MusicIcon, Play, Heart } from 'lucide-react';
import { ExpandableCard, ExpandableGrid } from '@/components/ui/expandable-card';
import { useIsMobile } from '@/hooks/use-mobile';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

type MusicProps = {
  backgroundIndex: number;
  isDarkBackground: boolean;
};

const Music = ({ backgroundIndex, isDarkBackground }: MusicProps) => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
      });
    }
  }, []);
  
  // Songs data
  const songs = [
    {
      title: "Here With Me",
      artist: "d4vd",
      spotifyId: "0dS2u2UFd88TIzDDaZDLvS",
      genre: "Indie Pop",
      description: "A soulful love ballad with gentle guitar strums and heartfelt lyrics about connection."
    },
    {
      title: "Lover's Rock",
      artist: "TV Girl",
      spotifyId: "6dBUzqjtbnIa1TwYbyw5CM",
      genre: "Indie Pop",
      description: "A dreamy, nostalgic track with lo-fi production and poetic lyrics about love."
    },
    {
      title: "Fools (Can't Help Falling In Love)",
      artist: "Sody & Sarcastic Sounds",
      spotifyId: "4VEEDnEFLI9dUy5QA51rom",
      genre: "Pop, Cover",
      description: "A modern reimagining of the classic Elvis song with a gentle electronic beat."
    },
    {
      title: "Add Your Song",
      artist: "Favorite Artist",
      spotifyId: "",
      genre: "Pop",
      description: "Replace this with details about your next favorite song."
    }
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
      {/* Background video with overlay */}
      <div className="fixed inset-0 z-[5] opacity-40">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-small-pink-flowers-in-the-breeze-6594-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={`absolute inset-0 ${isDarkBackground ? 'bg-black/60' : 'bg-black/30'}`}></div>
      </div>

      {/* Gradient overlay */}
      <BackgroundGradientAnimation 
        gradientBackgroundStart="rgba(0,0,0,0)"
        gradientBackgroundEnd="rgba(0,0,0,0)"
        firstColor="rgba(255,143,171,0.1)"
        secondColor="rgba(230,230,250,0.1)"
        thirdColor="rgba(126,105,171,0.1)"
        fourthColor="rgba(218,165,32,0.1)"
        fifthColor="rgba(234,56,76,0.1)"
        className="absolute inset-0 z-[6] opacity-60"
        interactive={true}
        containerClassName="fixed inset-0"
      />

      <div className="relative z-[15] container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <MusicIcon className={`h-7 w-7 ${isDarkBackground ? "text-romantic-gold" : "text-romantic"}`} />
          <h1 className={`text-4xl hover:text-red-300/90 md:text-5xl font-playfair font-bold  italic ${headingClasses}`}>Our Playlist</h1>
        </div>
        
        <p className={`mb-8 text-lg italic ${textClasses} max-w-2xl`}>
          The soundtrack of our love story - songs that remind us of special moments together.
        </p>

        <ExpandableGrid className="mb-12">
          {songs.map((song, idx) => (
            <ExpandableCard key={idx} cardTitle={`${song.title} - ${song.artist}`}>
              <div className="space-y-4">
                <div className="bg-black/20 dark:bg-white/5 rounded-md overflow-hidden">
                  {song.spotifyId ? (
                    <iframe 
                      src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0`}
                      width="100%" 
                      height="152" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      className="border-0 rounded-md"
                    ></iframe>
                  ) : (
                    <div className="h-[152px] flex items-center justify-center bg-gradient-to-r from-romantic-dark/20 to-romantic-purple/20 rounded-md">
                      <div className="text-center px-4">
                        <Play className="mx-auto h-10 w-10 text-romantic-gold opacity-70 mb-2" />
                        <p className="text-sm text-white/70">Spotify embed will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${textClasses}`}>Genre: {song.genre}</span>
                    <Heart className="h-4 w-4 text-romantic" fill="#FF8FAB" />
                  </div>
                  <p className={`text-sm ${textClasses}`}>{song.description}</p>
                </div>
              </div>
            </ExpandableCard>
          ))}
        </ExpandableGrid>
      </div>
    </div>
  );
};

export default Music;
