import React from 'react';
import { getRandomAdBreak } from '../../data/copywriting';

const IdleScreen = () => {
  const [message] = React.useState(getRandomAdBreak());

  return (
    <div className="absolute inset-0 z-[1001] bg-black/90 flex items-center justify-center animate-pulse">
      <div className="text-center p-8">
        <div className="retro-text text-4xl mb-4">📺</div>
        <div className="retro-text text-2xl mb-4">BROADCAST INTERRUPTED</div>
        <div className="text-[var(--crt-green)] text-xl font-mono">{message}</div>
        <div className="text-gray-500 text-sm mt-8">Press any key to continue...</div>
      </div>
    </div>
  );
};

export default IdleScreen;

