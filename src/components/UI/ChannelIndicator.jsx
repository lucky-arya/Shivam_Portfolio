import React, { useState, useEffect } from 'react';
import { useTVContext } from '../../context/TVContext';

const ChannelIndicator = () => {
  const { state } = useTVContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.currentChannel]);

  if (!visible) return null;

  return (
    <div className="channel-indicator">
      CH: {state.currentChannel === 404 ? '404' : state.currentChannel.toString().padStart(2, '0')}
    </div>
  );
};

export default ChannelIndicator;

