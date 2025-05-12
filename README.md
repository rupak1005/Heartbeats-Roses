# Heartbeats & Roses 💖

I built **Heartbeats & Roses** as a digital love letter disguised as a website—a blend of heartfelt emotions and my passion for tech. It’s a React-powered love story, and honestly, it turned out to be one of the most personal projects I’ve ever made. Every section reflects how much I care, not just about my girlfriend, but about crafting a meaningful experience through design and code.

> **Note:** The lines and content in this public version are AI-generated and slightly altered to protect my privacy. I’ve removed personal images and original messages. You're welcome to customize it with your own memories and words.

---

# Screenshots
**Home**
![Screenshot 2025-05-12 at 21-59-36 heartbeats-and-roses](https://github.com/user-attachments/assets/3da1bc79-4c62-4534-b92d-ebc6416e0f86)
![Screenshot 2025-05-12 at 21-59-51 heartbeats-and-roses](https://github.com/user-attachments/assets/a5e0ba4d-38ed-4287-ac0c-c94792eeb296)
![Screenshot 2025-05-12 at 22-00-02 heartbeats-and-roses](https://github.com/user-attachments/assets/5daff5dd-a72a-4889-ba3c-87acb1c89d3d)
**Music Section**
![Screenshot 2025-05-12 at 21-44-29 heartbeats-and-roses](https://github.com/user-attachments/assets/c50ef9a0-5b61-4730-bbd9-60a6599207d8)
**Gallery Section**
![Screenshot 2025-05-12 at 21-44-42 heartbeats-and-roses](https://github.com/user-attachments/assets/d2c49fe0-69fa-49dc-9b77-f4dc32d01721)



##  Key Features

### 1. Mood-Setting Backgrounds  
I added a rotating set of backgrounds to really set the vibe—soft pinks, moody purples, and even darker themes for those quiet, late-night sessions where love and code merge perfectly. I wanted it to feel like love had a UI theme.

### 2. A Personalized Playlist  
The **Music.tsx** page is like our relationship in audio form. I handpicked a playlist that means a lot to us, and even added a placeholder so others could personalize it too. Think of it as an open-source love mixtape.

### 3. Gallery of Memories  
The **Gallery.tsx** page showcases special moments in beautiful 3D cards. For this version, I’ve removed my personal photos, but the structure is still there—ready for anyone to add their own memories and create their own story.

### 4. Why I Love Her  
On **Index.tsx**, I originally listed all the reasons I love her—from her “psychic girlfriend” moments to her elite communication. In this public version, those lines have been changed or removed for privacy, but the section is ready for anyone to express their own reasons.

### 5. Scratch-to-Reveal Messages  
I couldn’t resist adding an interactive twist. The scratch card feature reveals hidden love notes—because what's more fun than discovering a little secret someone coded just for you?

### 6. Custom Audio Player  
I made a sleek audio player in **AudioPlayer.tsx** with smooth animations and glowing elements, because I wanted music to *feel* as good as it sounds. It even auto-plays the playlist like a tiny Spotify for just us.

### 7. Heart Animations Everywhere  
Backgrounds, footers, icons—they all pulse with that “I love you” energy. It’s intentionally over-the-top, because hey, this *is* a love letter after all.

### 8. Responsive Design, Because Love is Everywhere  
Whether she’s viewing it on her phone, tablet, or laptop—it just works. I paid extra attention to the mobile experience so it feels just as special on every screen.

### 9. Sassy Toast Notifications  
I added toast alerts with a bit of personality. Even when something breaks, it does so with charm.

### 10. All-in-One Navbar  
The navbar includes a mood-setting background changer and smooth navigation—because love should never lag.

---

##  Technical Magic

- **React Router Dom** for seamless transitions  
- **Framer Motion** for delightful animations  
- **Custom Hooks** (`useIsMobile`) for device-specific optimization  
- **Expandable Cards & Grids** for flexible UI  
- **Gradient Animations** for a lively, dreamy feel

---
Heartbeats&Roses/
├── public/                     # Static assets
│   ├── images/                 # Images used in the project
│   │   ├── gallery/            # Gallery images
│   │   ├── icons/              # Icons (e.g., hearts, play buttons)
│   │   └── logo.png            # Site logo
│   ├── audio/                  # Audio files for the playlist
│   │   ├── track1.mp3
│   │   ├── track2.mp3
│   │   └── ...                 
│   └── index.html              # Main HTML file
├── src/                        # Source code
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── AudioPlayer.tsx     # Custom audio player
│   │   ├── ScratchCard.tsx     # Scratch card component
│   │   ├── Toast.tsx           # Toast notifications
│   │   ├── HeartAnimation.tsx  # Floating/pulsating hearts
│   │   ├── GradientBackground.tsx # Animated gradient backgrounds
│   │   └── Button.tsx          # Custom button component
│   ├── pages/                  # Page components
│   │   ├── Index.tsx           # Home page (Reasons to Love)
│   │   ├── Gallery.tsx         # Gallery page
│   │   ├── Music.tsx           # Music playlist page
│   │   └── NotFound.tsx        # 404 page
│   ├── hooks/                  # Custom React hooks
│   │   ├── useIsMobile.ts      # Hook to detect mobile devices
│   │   └── useAudioPlayer.ts   # Hook for audio player logic
│   ├── styles/                 # Styling files
│   │   ├── global.css          # Global styles
│   │   ├── components/         # Component-specific styles
│   │   │   ├── Navbar.css
│   │   │   ├── AudioPlayer.css
│   │   │   └── ...
│   │   └── pages/              # Page-specific styles
│   │       ├── Index.css
│   │       ├── Gallery.css
│   │       └── ...
│   ├── utils/                  # Utility functions
│   │   ├── formatDate.ts       # Helper to format dates
│   │   ├── randomizeArray.ts   # Helper to randomize arrays
│   │   └── ...
│   ├── App.tsx                 # Main app component
│   ├── index.tsx               # Entry point for React
│   └── routes.tsx              # Route definitions
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── README.md                   # Project documentation
└── LICENSE                     # Open-source license
---

##  Funny Takeaways

### For My Fellow Devs  
Yes, I actually made a love letter in React. And yes, it has Framer Motion. If you're single, this might be your blueprint.

### For My Girlfriend  
This one was for her—and she knows it. The real content is private, but the heart behind it is here.

### For Others  
Feel free to clone it, tweak it, and make it yours. Love deserves good UI/UX too.

---

##  Final Thoughts

**Heartbeats & Roses** is where emotion meets execution. I poured love into every pixel, line of code, and interaction. While I’ve removed or replaced personal content for privacy, the soul of the project remains. It’s open to reinterpretation, because love—like code—should be shared and customized.
