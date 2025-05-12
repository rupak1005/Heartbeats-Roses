
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoveItemProps {
  text: string;
  index: number;
  active: boolean;
}

const LoveItem: React.FC<LoveItemProps> = ({ text, index, active }) => {
  const [show, setShow] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setShow(true);
        setIsTyping(true);
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i <= text.length) {
            setDisplayText(text.slice(0, i));
            i++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, 30);
        
        return () => {
          clearInterval(typeInterval);
        };
      }, 200);
      
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      setDisplayText('');
    }
  }, [active, text]);

  return (
    <div className={cn(
      "transition-all duration-700 transform",
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="bg-white/80 dark:bg-romantic-purple-dark/70 backdrop-blur-sm p-4 rounded-lg shadow-md mb-3 border border-romantic/20 dark:border-romantic-gold/20">
        <div className="relative overflow-hidden">
          <p>{displayText}</p>
          {isTyping && <span className="animate-pulse ml-1">|</span>}
        </div>
      </div>
    </div>
  );
};

export default LoveItem;
