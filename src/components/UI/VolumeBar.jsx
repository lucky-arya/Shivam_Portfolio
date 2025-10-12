import React, { useState, useEffect } from 'react';
import { useTVContext } from '../../context/TVContext';

const VolumeBar = () => {
  const { state } = useTVContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.volume, state.isMuted]);

  if (!visible) return null;

  const volumePercentage = Math.round(state.volume * 100);

  return (
    <div className="absolute bottom-8 right-8 z-[1001] bg-black/80 border-2 border-[var(--crt-green)] p-4 rounded">
      <div className="retro-text text-lg mb-2">
        {state.isMuted ? '🔇 MUTED' : '🔊 VOLUME'}
      </div>
      <div className="w-48 h-4 bg-gray-800 border border-[var(--crt-green)] relative">
        <div 
          className="h-full bg-[var(--crt-green)] transition-all duration-200"
          style={{ width: `${volumePercentage}%` }}
        />
      </div>
      <div className="retro-text text-sm mt-1 text-center">{volumePercentage}%</div>
    </div>
  );
};

export default VolumeBar;

