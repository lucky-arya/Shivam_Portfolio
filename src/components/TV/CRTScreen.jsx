import React from 'react';
import { useTVContext } from '../../context/TVContext';
import { useAudioContext } from '../../context/AudioContext';
import Scanlines from '../Effects/Scanlines';
import StaticNoise from '../Effects/StaticNoise';
import VHSDistortion from '../Effects/VHSDistortion';
import PowerAnimation from '../Effects/PowerAnimation';
import ChannelIndicator from '../UI/ChannelIndicator';
import VolumeBar from '../UI/VolumeBar';
import LandingScreen from '../UI/LandingScreen';
import Channel1 from '../Channels/Channel1';
import Channel2 from '../Channels/Channel2';
import Channel3 from '../Channels/Channel3';
import Channel4 from '../Channels/Channel4';
import Channel5 from '../Channels/Channel5';
import Channel404 from '../Channels/Channel404';
import Channel0 from '../Channels/Channel0';

const CRTScreen = () => {
  const { state, togglePower } = useTVContext();
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
    if (!state.isPoweredOn) return null;

    switch (state.currentChannel) {
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
      case 404:
        return <Channel404 />;
      default:
        return <Channel1 />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Landing Screen / Power Off Screen */}
      <LandingScreen 
        isFirstBoot={state.isFirstBoot} 
        isPoweredOn={state.isPoweredOn} 
      />

      {/* TV Frame - Wood texture */}
      <div className="tv-frame absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12">
        
        {/* CRT Screen Container */}
        <div 
          className={`crt-screen relative w-full h-full overflow-hidden rounded-md sm:rounded-lg transition-all duration-300 ${
            state.screenMode === 'blackAndWhite' ? 'grayscale' : ''
          }`}
        >
          
          {/* Power Animation Overlay */}
          {state.isPoweredOn && <PowerAnimation />}
          
          {/* Screen Content */}
          <div className={`relative w-full h-full ${state.isPoweredOn ? 'screen-glow' : ''}`}>
            
            {/* Static Noise (shown during transitions) */}
            {state.isTransitioning && <StaticNoise />}
            
            {/* Channel Content */}
            <div className={`relative w-full h-full transition-opacity duration-300 ${
              state.isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {renderChannel()}
            </div>
            
            {/* CRT Effects Overlays */}
            {state.isPoweredOn && (
              <>
                <Scanlines />
                <VHSDistortion />
                <ChannelIndicator />
                <VolumeBar />
              </>
            )}
          </div>
          
          {/* Off Screen - Only show if not first boot */}
          {!state.isPoweredOn && !state.isFirstBoot && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-gray-800 text-center px-4">
                <p className="text-xs sm:text-sm opacity-50">
                  Press SPACE or click Power to turn on
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRTScreen;

