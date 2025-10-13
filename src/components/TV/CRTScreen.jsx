import React from 'react';
import { useTVContext } from '../../context/TVContext';
import { useAudioContext } from '../../context/AudioContext';
import Scanlines from '../Effects/Scanlines';
import StaticNoise from '../Effects/StaticNoise';
import VHSDistortion from '../Effects/VHSDistortion';
import PowerAnimation from '../Effects/PowerAnimation';
import ChannelSwitchingAnimation from '../Effects/ChannelSwitchingAnimation';
import ChannelIndicator from '../UI/ChannelIndicator';
import VolumeBar from '../UI/VolumeBar';
import LandingScreen from '../UI/LandingScreen';
import HomeScreen from '../UI/HomeScreen';
import Channel1 from '../Channels/Channel1';
import Channel2 from '../Channels/Channel2';
import Channel3 from '../Channels/Channel3';
import Channel4 from '../Channels/Channel4';
import Channel5 from '../Channels/Channel5';
import Channel6 from '../Channels/Channel6';
import Channel404 from '../Channels/Channel404';
import Channel0 from '../Channels/Channel0';
import CRTFrame from './CRTFrame';

const CRTScreen = () => {
  const { state, togglePower, switchChannel } = useTVContext();
  const { playSound, stopSound } = useAudioContext();

  React.useEffect(() => {
    if (state.isPoweredOn) {
      playSound('power-on');
      setTimeout(() => {
        playSound('ambient-hum', { loop: true, volume: 0.2 });
      }, 1000);
    } else {
      playSound('power-off');
      stopSound('ambient-hum');
    }
  }, [state.isPoweredOn, playSound, stopSound]);

  // Listen for landing page power on button
  React.useEffect(() => {
    const handleLandingPowerOn = () => {
      if (!state.isPoweredOn) {
        togglePower();
      }
    };
    
    window.addEventListener('landingPowerOn', handleLandingPowerOn);
    return () => window.removeEventListener('landingPowerOn', handleLandingPowerOn);
  }, [state.isPoweredOn, togglePower]);

  const renderChannel = () => {
    // Don't render channel content while power animation is showing
    if (!state.isPoweredOn || state.showPowerAnimation) return null;

    switch (state.currentChannel) {
      case 99:
        return <HomeScreen onChannelSelect={(channelId) => switchChannel(channelId)} />;
      case 0:
        return <Channel0 />;
      case 1:
        return <Channel1 />;
      case 2:
        return <Channel2 />;
      case 3:
        return <Channel3 />;
      case 4:
        return <Channel4 />;
      case 5:
        return <Channel5 />;
      case 6:
        return <Channel6 />;
      case 404:
        return <Channel404 />;
      default:
        return <HomeScreen onChannelSelect={(channelId) => switchChannel(channelId)} />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* TV Frame - Padding adjusted to show content inside frame */}
      <div className="tv-frame absolute inset-0 p-8 sm:p-10 md:p-12 lg:p-14">
        
        {/* CRT Screen Container */}
        <div 
          className={`crt-screen relative w-full h-full overflow-hidden rounded-md sm:rounded-lg transition-all duration-300 ${
            state.screenMode === 'blackAndWhite' ? 'grayscale' : ''
          }`}
        >
          
          {/* Landing Screen / Power Off Screen - Inside frame with CRT effects */}
          <LandingScreen 
            isFirstBoot={state.isFirstBoot} 
            isPoweredOn={state.isPoweredOn} 
          />
          
          {/* Power Animation Overlay - Shows when powering on (every time, not just first boot) */}
          {state.showPowerAnimation && <PowerAnimation />}
          
          {/* Screen Content - Only show after power animation completes */}
          <div className={`relative w-full h-full ${state.isPoweredOn ? 'screen-glow' : ''}`}>
            
            {/* Channel Switching Animation - shown during transitions */}
            {state.isTransitioning && <ChannelSwitchingAnimation currentChannel={state.targetChannel} />}
            
            {/* Channel Content */}
            <div className={`relative w-full h-full transition-opacity duration-300 ${
              state.isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {renderChannel()}
            </div>
            
            {/* CRT Effects Overlays - Show on landing screen, shutdown, and when powered on with effects enabled */}
            {(state.isFirstBoot || !state.isPoweredOn || (state.isPoweredOn && state.crtEffectsEnabled)) && (
              <>
                <Scanlines />
                <VHSDistortion />
              </>
            )}
            
            {/* Always show these UI elements when powered on */}
            {state.isPoweredOn && (
              <>
                <ChannelIndicator />
                <VolumeBar />
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* CRT TV Frame Border - Always on top */}
      <CRTFrame />
    </div>
  );
};

export default CRTScreen;

