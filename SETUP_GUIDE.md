# 🎯 Complete Setup & Customization Guide

## 📋 Quick Start Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Add audio files to `public/audio/` (optional)
- [ ] Customize Channel 1 (About Me) with your info
- [ ] Update Channel 2 (Projects) with your projects
- [ ] Modify Channel 3 (Skills) with your tech stack
- [ ] Edit Channel 4 (Resume) with your experience
- [ ] Configure Channel 5 (Contact) with your info
- [ ] Test all channels and interactions
- [ ] Build and deploy

## 🎨 Step-by-Step Customization

### 1. Personal Information (Channel 1 - About Me)

**File:** `components/Channels/Channel1.tsx`

Replace placeholder text:
```tsx
// Line 20-21: Update your name
<h1 className="retro-text text-5xl md:text-7xl mb-4 chromatic-aberration">
  🎬 LATE NIGHT WITH SHIVAM
</h1>
<p className="text-[var(--amber-glow)] text-2xl font-mono">
  Tonight's Special Guest... Also Shivam!
</p>

// Lines 29-35: Write your bio
<p className="text-white text-lg leading-relaxed">
  Welcome to the show! I'm a passionate full-stack developer...
</p>
```

### 2. Projects Showcase (Channel 2)

**File:** `components/Channels/Channel2.tsx`

Update the projects array (starting line 7):
```tsx
const projects = [
  {
    name: "Your Amazing Project",
    tagline: "One-liner that sells it!",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    tech: "React, Node.js, MongoDB",
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/yourusername/project"
  },
  // Add more projects...
];
```

Add click handlers to buttons (around line 68):
```tsx
<button 
  onClick={() => window.open(project.liveUrl, '_blank')}
  className="flex-1 bg-green-500..."
>
  VIEW PROJECT
</button>
```

### 3. Technical Skills (Channel 3)

**File:** `components/Channels/Channel3.tsx`

Modify the skills object (line 7):
```tsx
const skills = {
  "Frontend": ["React", "Next.js", "TypeScript", "Your Skills..."],
  "Backend": ["Node.js", "Python", "Your Skills..."],
  "Database": ["PostgreSQL", "MongoDB", "Your Skills..."],
  "DevOps": ["Docker", "AWS", "Your Skills..."],
  "Tools": ["VS Code", "Figma", "Your Tools..."]
};
```

### 4. Resume & Experience (Channel 4)

**File:** `components/Channels/Channel4.tsx`

Update experiences array (line 7):
```tsx
const experiences = [
  {
    role: "Your Job Title",
    company: "Company Name",
    period: "2022 - Present",
    achievements: [
      "Your key achievement #1",
      "Your key achievement #2",
      "Your key achievement #3"
    ]
  },
  // Add more experiences...
];
```

Update education array (line 28):
```tsx
const education = [
  {
    degree: "Your Degree",
    school: "Your School",
    year: "2020",
    honors: "Any honors or achievements"
  }
];
```

Add resume PDF download (line 132):
```tsx
<button 
  onClick={() => window.open('/path-to-your-resume.pdf', '_blank')}
  className="bg-white text-black..."
>
  DOWNLOAD PDF
</button>
```

### 5. Contact Information (Channel 5)

**File:** `components/Channels/Channel5.tsx`

Update form submission (line 14):
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Option 1: Email using FormSubmit or EmailJS
  // Option 2: Your own API endpoint
  // Option 3: Mailto link
  
  const mailtoLink = `mailto:your@email.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
  window.location.href = mailtoLink;
  
  setFormData({ name: '', email: '', message: '' });
};
```

Update social media links (line 114):
```tsx
const socials = [
  { 
    icon: '💼', 
    label: 'LinkedIn', 
    color: 'bg-blue-600',
    url: 'https://linkedin.com/in/yourprofile'
  },
  { 
    icon: '🐙', 
    label: 'GitHub', 
    color: 'bg-gray-800',
    url: 'https://github.com/yourusername'
  },
  { 
    icon: '🐦', 
    label: 'Twitter', 
    color: 'bg-sky-500',
    url: 'https://twitter.com/yourhandle'
  },
  { 
    icon: '✉️', 
    label: 'Email', 
    color: 'bg-red-600',
    url: 'mailto:your@email.com'
  }
];

// Then in the map function:
<motion.button
  onClick={() => window.open(social.url, '_blank')}
  className={`${social.color}...`}
>
```

### 6. Channel Metadata

**File:** `data/channels.ts`

Update channel descriptions (line 10):
```tsx
{
  id: 1,
  name: 'About Me',
  title: "LATE NIGHT WITH YOUR NAME",
  subtitle: "Tonight's special guest... also Your Name!",
  description: 'A vintage talk show format showcasing who I am...',
  theme: 'talk-show',
},
```

### 7. Site Metadata

**File:** `src/app/layout.tsx`

Update metadata (line 13):
```tsx
export const metadata: Metadata = {
  title: "Your Name | Retro Portfolio",
  description: "Your custom description here",
  keywords: ["your", "keywords", "here"],
};
```

## 🎨 Visual Customization

### Change Color Scheme

**File:** `styles/crt-effects.css`

Modify CSS variables (line 3):
```css
:root {
  /* Change these colors */
  --crt-green: #00ff41;      /* Main accent color */
  --vhs-purple: #ff00ff;     /* Secondary accent */
  --amber-glow: #ffb000;     /* Highlights */
  --screen-black: #0a0a0a;   /* Background */
  --static-gray: #808080;    /* Neutral */
  --neon-blue: #00ffff;      /* Tertiary accent */
}
```

### Adjust CRT Effects

In the same file:
```css
:root {
  --scanline-opacity: 0.15;  /* Lower = less visible scanlines */
  --glow-intensity: 20px;    /* Higher = stronger glow */
  --curve-radius: 2%;        /* Screen curvature */
}
```

### Custom Fonts

**File:** `src/app/layout.tsx`

Add more Google Fonts or custom fonts:
```tsx
import { VT323, Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});
```

## 🔊 Audio Setup

### Where to Get Sounds

1. **Freesound.org** (Free, Creative Commons)
   - Search: "TV static", "channel change", "power on"
   - Download as MP3
   - Requires free account

2. **Zapsplat.com** (Free with attribution)
   - Professional quality
   - Easy downloads
   - Large selection

3. **Mixkit.co** (Free, no attribution)
   - High-quality effects
   - Modern interface
   - Quick downloads

### Recommended Sounds

Download these and rename appropriately:
- **tv-static.mp3**: White noise, 0.5-1s
- **tv-click.mp3**: Short click, 0.1s
- **channel-flip.mp3**: Quick swoosh/beep, 0.3s
- **power-on.mp3**: Surge/hum, 1-2s
- **power-off.mp3**: Fade out, 0.5-1s
- **ambient-hum.mp3**: Low electrical hum, 2-5s loop

### Adjust Audio Settings

**File:** `context/AudioContext.tsx`

Modify volumes (line 37):
```tsx
const sounds = {
  'tv-static': new Howl({ 
    src: ['/audio/tv-static.mp3'], 
    volume: 0.3  // Adjust volume here
  }),
  // ...other sounds
};
```

## 🎮 Customize Controls

### Add More Keyboard Shortcuts

**File:** `hooks/useKeyboardControls.ts`

Add cases in the switch statement (line 18):
```tsx
case 'h':  // Add 'H' for help
  showHelp();
  break;
case 'f':  // Add 'F' for fullscreen
  toggleFullscreen();
  break;
```

### Modify Channel Switching Logic

**File:** `hooks/useChannelSwitcher.ts`

Change Easter egg probability (line 22):
```tsx
// Change from 5% to your desired percentage
if (Math.random() < 0.10 && newChannel !== 404) {  // 10% chance
  newChannel = 404;
}
```

## 📱 Mobile Optimization

### Touch Gestures

Add swipe support in `components/TV/CRTScreen.tsx`:
```tsx
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => handleChannelSwitch('up'),
  onSwipedRight: () => handleChannelSwitch('down'),
});

return <div {...handlers}>...</div>;
```

## 🚀 Performance Tips

1. **Optimize Images**
   - Use Next.js Image component
   - WebP format for better compression
   - Lazy load images

2. **Reduce Audio File Sizes**
   - Keep under 100KB each
   - Use 128kbps bitrate
   - Trim silence

3. **Code Splitting**
   - Already implemented via Next.js
   - Lazy load heavy components if needed

4. **CSS Optimization**
   - Tailwind automatically purges unused CSS
   - Keep custom CSS minimal

## 🐛 Troubleshooting

### Import Errors
- Make sure `tsconfig.json` paths are correct
- Restart dev server after changes

### Audio Not Playing
- Check browser console for 404 errors
- Verify file names match exactly
- Some browsers require user interaction first

### Styling Issues
- Clear browser cache
- Check for CSS conflicts
- Verify Tailwind config

### TypeScript Errors
- Run `npm run build` to see all errors
- Check type definitions
- Ensure all imports are correct

## 📦 Build & Deploy

### Local Build Test
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Complete portfolio"
git push

# Import on Vercel dashboard
# Deploy automatically
```

### Environment Variables
If using email/API services, add to `.env.local`:
```
NEXT_PUBLIC_EMAILJS_KEY=your_key
NEXT_PUBLIC_API_URL=your_api
```

## ✅ Pre-Launch Checklist

- [ ] All personal info updated
- [ ] Projects have working links
- [ ] Contact form functional
- [ ] Audio files added (or removed references if not using)
- [ ] Tested on desktop browser
- [ ] Tested on mobile device
- [ ] All keyboard shortcuts work
- [ ] No console errors
- [ ] Build succeeds locally
- [ ] Metadata/SEO updated
- [ ] Analytics added (optional)
- [ ] Favicon added
- [ ] Social media preview image set

## 🎉 You're Done!

Your retro CRT portfolio is ready to amaze visitors! 

Press SPACE to power on and start sharing! 📺✨
