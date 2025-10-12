import React, { useState, useEffect } from 'react';

const PowerAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!showAnimation) return null;

  return (
    <div className="absolute inset-0 z-[1002] power-on-animation bg-black flex items-center justify-center">
      <div className="text-4xl retro-text animate-pulse">⚡ POWERING ON ⚡</div>
    </div>
  );
};

export default PowerAnimation;

