# 📺 Retro CRT TV Portfolio

A highly creative and interactive personal portfolio website designed to look and feel like an **old retro CRT television from the 80s/90s**. Each section of the portfolio is accessed by "changing TV channels" - creating a nostalgic, cinematic user experience.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

## 🎯 Core Concept

Instead of a traditional scrolling website, visitors interact with a vintage CRT TV interface where:
- Different portfolio sections are **TV channels**
- Users switch channels using an **on-screen remote** or **keyboard controls**
- Authentic **CRT effects** (scanlines, VHS distortion, screen curvature)
- Retro **sound effects** enhance the nostalgic experience
- Easter eggs and hidden features reward exploration

## ✨ Features

### 📺 Channel Lineup

- **Channel 1: About Me** - Vintage talk show format introducing yourself
- **Channel 2: Projects** - Infomercial-style showcase of your work
- **Channel 3: Skills** - Teletext-style technical skills database
- **Channel 4: Resume** - News broadcast format presenting experience
- **Channel 5: Contact** - 90s hotline-style contact interface
- **Channel 0: Secret Game** - Hidden retro Snake game (press 0)
- **Channel 404: Error** - Nostalgic error screen with TV color bars

### 🎮 Interactive Controls

- **TV Remote UI** - Floating remote control with channel/volume buttons
- **Keyboard Shortcuts**:
  - `SPACE` - Power on/off
  - `↑/↓` or `←/→` - Change channels
  - `1-5` - Direct channel access
  - `0` - Secret channel
  - `ESC` - Mute/unmute

### 🎨 Retro Visual Effects

- **CRT Scanlines** - Authentic horizontal scan lines
- **VHS Distortion** - Slight chromatic aberration and tracking issues
- **Screen Curvature** - Curved screen borders
- **Glow Effects** - Phosphor glow around bright elements
- **Power On/Off Animations** - Classic CRT turn-on effect
- **Static Noise** - During channel transitions
- **Flicker** - Subtle screen flicker for authenticity

### 🔊 Audio Experience

- TV power on/off sounds
- Channel flip effects
- Button click feedback
- Ambient CRT hum (looped)
- Static noise bursts

### 🥚 Easter Eggs

- **Hidden Channel 0** - Secret Snake game
- **Channel 404** - 5% random chance when switching
- **Idle Detection** - "Broadcast interruption" after 60s inactivity
- **Random Ad Breaks** - Vintage-style intermission messages

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.5** - React framework with App Router
- **React 19.1** - UI library
- **TypeScript 5** - Type safety

### Styling & Animation
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion 12** - Smooth animations
- **GSAP 3** - Advanced animations (ready to use)
- **Custom CSS** - CRT effects and retro styling

### 3D & Graphics (Optional)
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js

### Audio
- **Howler.js 2.2** - Audio management and playback

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
crt-tv-portfolio/
├── components/
│   ├── Channels/          # Channel content components
│   │   ├── Channel0.tsx   # Secret game channel
│   │   ├── Channel1.tsx   # About Me (Talk Show)
│   │   ├── Channel2.tsx   # Projects (Infomercial)
│   │   ├── Channel3.tsx   # Skills (Teletext)
│   │   ├── Channel4.tsx   # Resume (News)
│   │   ├── Channel5.tsx   # Contact (Hotline)
│   │   └── Channel404.tsx # Error channel
│   ├── Effects/           # Visual effect components
│   │   ├── Scanlines.tsx
│   │   ├── StaticNoise.tsx
│   │   ├── VHSDistortion.tsx
│   │   └── PowerAnimation.tsx
│   ├── Games/             # Mini-games
│   │   └── SnakeGame.tsx
│   ├── Remote/            # Remote control UI
│   │   └── TVRemote.tsx
│   ├── TV/                # Main TV components
│   │   └── CRTScreen.tsx
│   └── UI/                # UI elements
│       ├── ChannelIndicator.tsx
│       ├── VolumeBar.tsx
│       └── IdleScreen.tsx
├── context/
│   ├── TVContext.tsx      # TV state management
│   └── AudioContext.tsx   # Audio system
├── hooks/
│   ├── useChannelSwitcher.ts
│   ├── useKeyboardControls.ts
│   └── useIdleDetection.ts
├── data/
│   ├── channels.ts        # Channel metadata
│   └── copywriting.ts     # Content and messages
├── styles/
│   └── crt-effects.css    # CRT visual effects
├── public/
│   └── audio/             # Sound effect files
└── src/
    └── app/
        ├── layout.tsx     # Root layout with providers
        ├── page.tsx       # Main page
        └── globals.css    # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd crt-tv-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Add audio files** (optional but recommended)

Place the following MP3 files in `public/audio/`:
- `tv-static.mp3`
- `tv-click.mp3`
- `channel-flip.mp3`
- `power-on.mp3`
- `power-off.mp3`
- `ambient-hum.mp3`

See `public/audio/README.md` for sources and specifications.

4. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personalizing Content

1. **Update Channel 1 (About Me)**
   - Edit `components/Channels/Channel1.tsx`
   - Replace `[YOUR NAME]` with your actual name
   - Update bio content

2. **Add Your Projects (Channel 2)**
   - Edit `components/Channels/Channel2.tsx`
   - Update the `projects` array with your real projects
   - Add links to live demos and repositories

3. **Update Skills (Channel 3)**
   - Edit `components/Channels/Channel3.tsx`
   - Modify the `skills` object with your tech stack

4. **Add Experience (Channel 4)**
   - Edit `components/Channels/Channel4.tsx`
   - Update `experiences` and `education` arrays
   - Add your resume PDF

5. **Configure Contact Info (Channel 5)**
   - Edit `components/Channels/Channel5.tsx`
   - Update social media links
   - Configure email submission

### Styling & Colors

Colors are defined in `styles/crt-effects.css`:

```css
:root {
  --crt-green: #00ff41;      /* Main CRT color */
  --vhs-purple: #ff00ff;     /* Accent color */
  --amber-glow: #ffb000;     /* Warning/highlight */
  --screen-black: #0a0a0a;   /* Background */
}
```

### Audio Configuration

Modify audio settings in `context/AudioContext.tsx`:
- Adjust volume levels
- Change loop settings
- Add new sound effects

## 📱 Responsive Design

The portfolio is fully responsive:
- **Desktop**: Full TV experience with remote
- **Tablet**: Optimized layout, touch-friendly controls
- **Mobile**: Simplified interface, gesture support

## ⚡ Performance Optimization

- **Code splitting** - Components loaded on demand
- **Image optimization** - Next.js automatic optimization
- **CSS optimization** - Tailwind CSS purging
- **Audio lazy loading** - Sounds loaded after initial render
- **Smooth animations** - GPU-accelerated CSS/Framer Motion

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Deploy with one click

```bash
npm run build
npm run start
```

### Deploy on Netlify

```bash
npm run build
# Deploy the .next folder
```

### Other Platforms

Build the static export:
```bash
npm run build
```

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - feel free to use this for your own portfolio

## 🙏 Acknowledgments

- Inspired by 80s/90s CRT TVs and VHS aesthetics
- Retro fonts: VT323, Press Start 2P
- Sound effects from Freesound.org community

## 📞 Contact

- Update your contact information in Channel 5
- Add your social media links
- Configure email form submission

---

**Made with ❤️ and nostalgia** 📺✨

Press SPACE to power on and start exploring!
