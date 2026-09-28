# Our Little Story ♡

*A little interactive love story, made with a lot of heart.*

**Author**: Sajeeb The Analyst

[**✨ View Live Demo ✨**](https://littlesuprises.netlify.app/)

## Project Overview

This is an interactive romantic surprise website that transforms a simple question into a playful and emotional digital experience. The journey flows beautifully from a warm welcome to a playful interaction, leading up to a celebration of love, personalized memories, and a touching final surprise.

**Journey**: Welcome → Interactive Question → Playful YES/NO Interaction → Celebration → Love Message → Memories → Final Surprise

## Key Features

- Interactive romantic welcome screen
- Playful YES/NO interaction
- Dynamic NO button behaviour (shrinks and avoids clicks/touches)
- Changing NO button messages
- Growing YES button interaction with glowing hover effects
- Heart explosion and celebration animations
- Floating 3D ambient heart particles and sparkles
- Typewriter-style love message
- Scroll-based animations
- Personalized memories section
- Background music (with custom start time)
- Music controls
- Replay experience
- Mobile-first responsive design

## User Experience

From the moment the visitor opens the link, they are immersed in a soft, glowing environment. They are greeted with a personalized welcome screen, which smoothly transitions into an interactive question. 

Attempting to choose "NO" leads to a playful mini-game where the button shrinks and evades the user while displaying cute, changing messages. Meanwhile, the "YES" button grows larger and more inviting, making the choice inevitable. Once "YES" is clicked, the screen bursts into a celebratory heart explosion, followed by a deeply emotional typewriter message, a beautiful gallery of shared memories, and a touching final surprise.

## Personalization

This project is built to be easily customizable. All personal details, messages, images, and audio are centralized in a single configuration file.

### What can be customized:
Located in `src/config.ts`, you can edit the following properties:
- **Girlfriend's Name**
- **Your Name**
- **Love Messages** (including the typewriter effect message)
- **Final Message**
- **NO Button Messages**
- **Images/Photos** (for the memories section)
- **Background Music** (URL and start time)

## Tech Stack

- **React** (v19)
- **TypeScript**
- **Tailwind CSS** (v4)
- **Vite**
- **Motion** (for animations)
- **Lucide React** (for beautiful SVG icons)

## Project Structure

```text
src/
├── components/
│   ├── CelebrationScreen.tsx
│   ├── FinalSection.tsx
│   ├── FloatingHearts.tsx
│   ├── LoveMessage.tsx
│   ├── MemoriesSection.tsx
│   ├── MusicControl.tsx
│   ├── QuestionScreen.tsx
│   └── WelcomeScreen.tsx
├── config.ts         <-- Edit this file to personalize!
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/our-little-story.git
   cd our-little-story
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the local URL**
   Open your browser and navigate to the local server URL provided in the terminal (usually `http://localhost:3000`).

## Customization Guide

1. Open `src/config.ts` in your code editor.
2. Update the `girlfriendName` and `myName` strings.
3. Modify the `loveMessage` string to express your feelings.
4. Add direct links to your personal photos in the `memories` array.
5. Provide a valid direct audio URL (like an mp3 file) for `musicUrl` and set the `musicStartTime`.
6. Save the file and see the changes reflect instantly in your local preview!

## Deployment

You can easily deploy this website to Netlify (or Vercel).

### Deploying to Netlify:
1. Create a free account on [Netlify](https://www.netlify.com/).
2. Connect your GitHub account and import this repository.
3. Netlify will automatically detect the Vite framework and setup the build command.
4. Leave the default build settings (Build command: `npm run build` and Publish directory: `dist`) and click **Deploy Site**.
5. Once deployed, share the link with your special someone!

## Design Philosophy

- **Mobile-first:** Designed to feel like a premium native mobile app experience since it's most likely to be opened on a smartphone.
- **Minimal but emotional:** Clean glassmorphism cards and elegant typography that lets the content shine.
- **Smooth animations:** Beautiful transitions, 3D ambient floating hearts, and scroll reveals that don't overwhelm the device.
- **Playful interactions:** The evasive NO button provides a fun and memorable micro-interaction.
- **Personalization:** Hardcoded logic is separated from content, making it a reusable template for love.
- **Performance:** Lightweight SVG icons, optimized React rendering, and CSS-based ambient effects.

## Privacy & Personalization Note

⚠️ **Important:** Please be careful when adding personal information or private photos to the `config.ts` file. If you are uploading this project to a public GitHub repository, your photos and messages will be publicly visible. Consider keeping the repository private or using generic placeholder images before committing, and only using your real photos on your deployed private version.

## Future Improvements

- More interactive story chapters
- More memory timeline features
- Advanced animations
- Custom themes
- Password-protected private experiences
- Shareable personalized links

## License

MIT License

---

Built as a small digital surprise for someone special. ♡
