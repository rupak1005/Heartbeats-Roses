import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, Music, Image, Paintbrush } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
// import { ThemeSwitcher } from './ThemeSwitcher';

type NavbarProps = {
  changeBackground: () => void;
  isDarkBackground: boolean;
};

const Navbar = ({ changeBackground, isDarkBackground }: NavbarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={16} /> },
    { path: '/music', label: 'Music', icon: <Music size={16} /> },
    { path: '/gallery', label: 'Gallery', icon: <Image size={16} /> },
  ];

  // Determine text color based on background
  const textClasses = isDarkBackground 
    ? "text-white dark:text-white" 
    : "text-romantic-dark dark:text-romantic-gold-light";

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md", // Added blur effect
        isScrolled
          ? "bg-white/1 dark:bg-black/70 shadow-md py-2" // Adjusted background opacity
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-romantic dark:text-romantic-gold">
          <Heart className="h-6 w-6" fill="#FF8FAB" />
          <span className="font-playfair text-lg md:text-xl font-bold">LoveLetter</span>
        </Link>
        
        {isMobile ? (
          <>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={changeBackground}
                className="bg-red-400 text-white hover:bg-red-500 hover:text-white rounded-full"
                title="Change Background"
              >
                <Paintbrush size={16} />
              </Button>
              
              {/* <ThemeSwitcher /> */}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="md:hidden text-romantic-dark dark:text-romantic-gold"
              >
                <div className="w-6 flex flex-col gap-1">
                  <span className={cn("block h-0.5 w-full bg-current transition-all", 
                    isMenuOpen ? "rotate-45 translate-y-1.5" : "")}></span>
                  <span className={cn("block h-0.5 w-full bg-current transition-all", 
                    isMenuOpen ? "opacity-0" : "opacity-100")}></span>
                  <span className={cn("block h-0.5 w-full bg-current transition-all", 
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : "")}></span>
                </div>
              </Button>
            </div>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-white/1 dark:bg-black/90 backdrop-blur-lg shadow-lg py-4 mt-2 rounded-b-lg">
                <nav className="flex flex-col space-y-2 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "px-4 py-2 rounded-md transition-colors flex items-center space-x-2",
                        location.pathname === item.path
                          ? "bg-romantic/30 dark:bg-romantic-purple/30 text-white"
                          : "hover:text-romantic text-white"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-4 py-2 rounded-md transition-colors flex items-center space-x-2",
                        location.pathname === item.path
                          ? "bg-romantic/30 dark:bg-romantic-purple/30 text-white"
                          : "hover:text-romantic text-white"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button
              variant="outline"
              size="sm"
              onClick={changeBackground}
              className="bg-romantic-light text-grey-500  hover:bg-romantic hover:text-grey rounded-full"
              title="Change Background"
            >
              <Paintbrush size={16} className="mr-1" />
              <span className="hidden sm:inline">Change BG</span>
            </Button>
            
            
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
