
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Toggle 
      pressed={isDark}
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full w-10 h-10 bg-red-500 backdrop-blur-sm dark:bg-romantic-purple-dark/50 hover:bg-romantic/20 dark:hover:bg-romantic-purple/20 transition-all duration-300"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-romantic-gold animate-spin-slow" />
      ) : (
        <Sun className="h-5 w-5 text-romantic-dark animate-spin-slow" />
      )}
    </Toggle>
  );
}
