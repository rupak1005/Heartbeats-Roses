
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        romantic: {
          light: "#FFDEE2", // Soft pink
          DEFAULT: "#FF8FAB", // Medium pink
          dark: "#FFDEE2", // Deep red
          peach: "#FDE1D3", // Soft peach
          lavender: "#E6E6FA", // Soft lavender
          purple: {
            light: "#9D8AC0", // Light purple
            DEFAULT: "#7E69AB", // Medium purple
            dark: "#1A1F2C", // Dark purple
          },
          gold: {
            light: "#F0E6D0", // Light gold
            DEFAULT: "#DAA520", // Medium gold
            dark: "#B8860B", // Dark gold
          },
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float-heart": {
          "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) translateX(20px) rotate(20deg)", opacity: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 5px 0 rgba(255, 143, 171, 0.5)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 20px 10px rgba(255, 143, 171, 0.3)",
            transform: "scale(1.05)"
          },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" }
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-up": "float-up 0.5s ease-out forwards",
        "float-heart": "float-heart 15s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite linear",
        "pulse-glow": "pulse-glow 3s infinite ease-in-out",
        "border-flow": "border-flow 3s infinite alternate linear",
        "text-reveal": "text-reveal 1s ease-out forwards",
        "spin-slow": "spin-slow 10s linear infinite",
      },
      backgroundImage: {
        'romantic-gradient': 'linear-gradient(180deg, #FFDEE2 0%, #FDE1D3 100%)',
        'romantic-dark-gradient': 'linear-gradient(180deg, #1A1F2C 0%, #33293E 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
        'dark-glass-gradient': 'linear-gradient(135deg, rgba(30,30,40,0.4) 0%, rgba(30,30,40,0.1) 100%)',
        'card-border': 'linear-gradient(to right, #FF8FAB, #FDE1D3, #E6E6FA, #FF8FAB)',
        'card-border-dark': 'linear-gradient(to right, #7E69AB, #B8860B, #9D8AC0, #7E69AB)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
