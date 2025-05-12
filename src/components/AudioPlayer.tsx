
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useIsMobile } from '@/hooks/use-mobile';

interface Song {
  id: string;
  title: string;
  artist: string;
  audioSrc: string;
  coverImage: string;
}

interface AudioPlayerProps {
  className?: string;
  initialSong?: Song;
  playlist?: Song[];
}

// Playlist songs
const defaultPlaylist: Song[] = [
  {
    id: "song-1",
    title: "Lover's Rock",
    artist: "TV Girl",
    audioSrc: "/TV Girl - Lovers Rock [wcJY0WDe-H4].mp3",
    coverImage: "/backgrounds/music0.jpg"
  },
  {
    id: "song-2",
    title: "Here With Me",
    artist: "d4vd",
    audioSrc: "d4vd - Here With Me (Official Audio) [B7Y4LHbpXv0].mp3", 
    coverImage: "/backgrounds/music1.jpg"
  },
  {
    id: "song-3",
    title: "fools(can't help falling in love)",
    artist: "foster",
    audioSrc: "fools (can't help falling in love) ft. Sody & Sarcastic Sounds (Lyric Video) [3B5M8TyYpeg].mp3",
    coverImage: "/backgrounds/music2.jpg"
  }
];

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  className,
  initialSong,
  playlist = defaultPlaylist
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const currentSong = playlist[currentSongIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((e) => {
            console.error("Audio playback failed:", e);
            toast({
              title: "Playback Error",
              description: "Please try again or check if audio is available.",
              variant: "destructive",
            });
          });
      }
    }
  };

  const nextSong = () => {
    const newIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setIsLoaded(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * audioRef.current.duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(percent * 100);
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    // Set the source
    audio.src = currentSong.audioSrc;
    // Store reference
    audioRef.current = audio;
    
    // Set up event listeners
    const handleCanPlayThrough = () => {
      console.log("Audio can play through, ready to start");
      setIsLoaded(true);
      setDuration(audio.duration);
      
      // Auto-play when loaded
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.error("Auto-play failed:", e);
          // Don't show toast on initial auto-play failure (may be due to browser policies)
        });
    };
    
    const handlePlaybackError = (e: Event) => {
      console.error("Audio playback error:", e);
      toast({
        title: "Audio Error",
        description: "Could not load the audio file.",
        variant: "destructive",
      });
    };

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    // Add event listeners
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handlePlaybackError);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    
    // Auto-play configuration
    audio.preload = "auto";
    audio.autoplay = true; // Enable autoplay
    audio.load();
    
    // Clean up
    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handlePlaybackError);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [currentSong]);

  return (
    <div className={cn(
      "w-full max-w-sm bg-gradient-to-b backdrop-blur-xl from-romantic-purple-dark/60 to-red/500 rounded-3xl p-4 md:p-6 shadow-2xl text-white relative overflow-hidden",
      className
    )}>
      {/* Song Banner */}
      <div className="relative h-40 md:h-56 w-full rounded-2xl overflow-hidden shadow-lg mb-3 md:mb-4">
        <motion.img
          src={currentSong.coverImage}
          alt={`${currentSong.title} by ${currentSong.artist}`}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isPlaying ? 1.05 : 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          key={currentSong.id}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Song Info */}
      <div className="mt-3 md:mt-4 text-center">
        <h2 className="text-lg md:text-xl font-bold text-romantic-gold-light">{currentSong.title}</h2>
        <p className="text-xs md:text-sm text-romantic-light">{currentSong.artist}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center mt-4 md:mt-6 gap-3 md:gap-4">
        <motion.button
          onClick={togglePlay}
          disabled={!isLoaded}
          className={cn(
            "bg-romantic/90 hover:bg-romantic-dark/90 rounded-full p-3 md:p-4 shadow-lg",
            isLoaded ? "" : "opacity-60"
          )}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          animate={isPlaying ? {
            boxShadow: ["0 0 0 0 rgba(255, 143, 171, 0.7)", "0 0 0 10px rgba(255, 143, 171, 0)", "0 0 0 0 rgba(255, 143, 171, 0)"],
          } : {}}
          transition={isPlaying ? {
            repeat: Infinity,
            duration: 1.5,
          } : {}}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={isMobile ? 24 : 32} />
          ) : (
            <Play size={isMobile ? 24 : 32} className="ml-1" />
          )}
        </motion.button>
        
        <motion.button
          onClick={nextSong}
          className="bg-romantic-purple/90 hover:bg-romantic-purple-dark/90 rounded-full p-3 md:p-4 shadow-lg"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Next song"
        >
          <SkipForward size={isMobile ? 20 : 24} />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 md:mt-6 space-y-1 md:space-y-2">
        <div 
          className="w-full bg-gray-700/50 rounded-full h-1.5 md:h-2 cursor-pointer"
          onClick={handleProgressClick}
          ref={progressRef}
        >
          <div
            className="bg-romantic h-1.5 md:h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-romantic-light/70">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Song placeholder info */}
      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-romantic-light/10">
        <p className="text-xs text-center text-romantic-light/50">
          Playlist: {currentSongIndex + 1}/{playlist.length}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
