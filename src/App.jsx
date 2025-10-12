import CRTScreen from './components/TV/CRTScreen';
import TVRemote from './components/Remote/TVRemote';
import IdleScreen from './components/UI/IdleScreen';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useIdleDetection } from './hooks/useIdleDetection';

function App() {
  // Enable keyboard controls
  useKeyboardControls();
  
  // Detect idle state (60 seconds)
  const isIdle = useIdleDetection(60000);

  return (
    <main className="relative w-screen h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden touch-none">
      {/* Main CRT TV */}
      <CRTScreen />
      
      {/* TV Remote Control */}
      <TVRemote />
      
      {/* Idle Screen Overlay */}
      {isIdle && <IdleScreen />}
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10 sm:opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[var(--crt-green)] rounded-full blur-[100px] sm:blur-[150px]" />
      </div>
    </main>
  );
}

export default App;

