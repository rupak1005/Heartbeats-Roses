
import React from 'react';
import { cn } from '@/lib/utils';

interface LyricSectionProps {
  lyrics: string[];
  className?: string;
}

const LyricSection: React.FC<LyricSectionProps> = ({ lyrics, className }) => {
  return (
    <div className={cn("relative p-8", className)}>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjIwIiB5Mj0iMCIgc3R5bGU9InN0cm9rZTojRkY4RkFCMTA7IHN0cm9rZS13aWR0aDoxIiAvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiBvcGFjaXR5PSIwLjEiIC8+PC9zdmc+')]] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjIwIiB5Mj0iMCIgc3R5bGU9InN0cm9rZTojN0U2OUFCMjA7IHN0cm9rZS13aWR0aDoxIiAvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiBvcGFjaXR5PSIwLjIiIC8+PC9zdmc+')]" style={{ opacity: 0.1 }}></div>
      <div className="handwritten-text space-y-4 relative z-10">
        {lyrics.map((line, index) => (
          <p key={index} className={line.trim() === "" ? "my-4" : ""}>
            {line.trim() === "" ? (
              <br />
            ) : (
              <span className="shimmer-underline">{line}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LyricSection;
