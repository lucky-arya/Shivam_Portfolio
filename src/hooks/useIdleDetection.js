import { useState, useEffect } from 'react';
import { useTVContext } from '../context/TVContext';

export const useIdleDetection = (timeout = 60000) => {
  const [isIdle, setIsIdle] = useState(false);
  const { state, updateLastInteraction } = useTVContext();

  useEffect(() => {
    let idleTimer;

    const checkIdle = () => {
      const timeSinceLastInteraction = Date.now() - state.lastInteraction;
      if (timeSinceLastInteraction >= timeout && state.isPoweredOn) {
        setIsIdle(true);
      } else {
        setIsIdle(false);
      }
    };

    const resetTimer = () => {
      setIsIdle(false);
      updateLastInteraction();
    };

    // Check idle status periodically
    idleTimer = setInterval(checkIdle, 5000);

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      clearInterval(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [timeout, state.lastInteraction, state.isPoweredOn, updateLastInteraction]);

  return isIdle;
};
