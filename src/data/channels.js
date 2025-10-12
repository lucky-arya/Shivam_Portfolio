export const channels = [
  {
    id: 0,
    name: 'Secret Channel',
    title: '🎮 RETRO ARCADE',
    subtitle: 'Easter Egg Unlocked!',
    description: 'You found the secret gaming channel!',
    theme: 'game',
  },
  {
    id: 1,
    name: 'About Me',
    title: "LATE NIGHT WITH Shivam Kumar",
    subtitle: "Tonight's special guest... also [Your Name]!",
    description: 'A vintage talk show format showcasing who I am, my journey, and what drives me.',
    theme: 'talk-show',
  },
  {
    id: 2,
    name: 'Projects',
    title: '🎪 AMAZING PROJECTS!',
    subtitle: 'But wait... there\'s MORE!',
    description: 'Infomercial-style showcase of incredible projects and applications.',
    theme: 'infomercial',
  },
  {
    id: 3,
    name: 'Skills',
    title: '⚡ TECHNICAL SKILLS ',
    subtitle: 'Page 101 • Last updated: October 2025',
    description: 'Teletext-style display of technical skills and expertise.',
    theme: 'teletext',
  },
  {
    id: 4,
    name: 'Resume',
    title: '📰 BREAKING NEWS: Developer Profile',
    subtitle: 'Live from the Resume Center',
    description: 'News broadcast format presenting professional experience and education.',
    theme: 'news',
  },
  {
    id: 5,
    name: 'Contact',
    title: '📞 CALL NOW! Operators standing by!',
    subtitle: '1-800-HIRE-ME',
    description: '90s hotline-style contact interface. Don\'t miss this opportunity!',
    theme: 'hotline',
  },
  {
    id: 404,
    name: 'Error Channel',
    title: '⚠️ SIGNAL LOST',
    subtitle: 'CH: 404 - BROADCAST NOT FOUND',
    description: 'Technical difficulties. Please stand by.',
    theme: 'error',
  },
];

export const getChannelById = (id) => {
  return channels.find(channel => channel.id === id);
};
