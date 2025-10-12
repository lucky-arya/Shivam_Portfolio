import { useEffect } from 'react';
import { useTVContext } from '../context/TVContext';
import { useChannelSwitcher } from './useChannelSwitcher';

export const useKeyboardControls = () => {
  const { togglePower, toggleMute, state } = useTVContext();
  const { handleChannelSwitch, goToChannel } = useChannelSwitcher();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore keyboard shortcuts when typing in input fields
      const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName);
      
      // Only Left/Right arrows for channel switching
      // Up/Down arrows are handled by individual components for navigation/scrolling
      if (['ArrowRight', 'ArrowLeft'].includes(e.key) && !isTyping) {
        e.preventDefault();
      }

      switch(e.key) {
        case 'ArrowRight':
          if (!isTyping) handleChannelSwitch('up');
          break;
        case 'ArrowLeft':
          if (!isTyping) handleChannelSwitch('down');
          break;
        case ' ':
          // Don't toggle power when typing in form fields
          if (!isTyping) {
            e.preventDefault();
            togglePower();
          }
          break;
        case 'Escape':
          if (!isTyping) toggleMute();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          if (state.isPoweredOn && !isTyping) {
            goToChannel(parseInt(e.key));
          }
          break;
        case '0':
          // Secret channel 0 - mini game
          if (state.isPoweredOn && !isTyping) {
            goToChannel(0);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleChannelSwitch, togglePower, toggleMute, goToChannel, state.isPoweredOn]);
};
