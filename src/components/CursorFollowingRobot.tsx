
import { useEffect, useRef, useState } from 'react';

const CursorFollowingRobot = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [smoothEyePosition, setSmoothEyePosition] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateRobotPosition = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const robotX = window.innerWidth - scrollbarWidth - 80;
      const robotY = window.innerHeight / 2;
      setRobotPosition({ x: robotX, y: robotY });
    };

    // Smooth eye tracking animation
    const smoothEyeTracking = () => {
      if (!robotRef.current) return;
      
      const robotRect = robotRef.current.getBoundingClientRect();
      const robotCenterX = robotRect.left + robotRect.width / 2;
      const robotCenterY = robotRect.top + robotRect.height / 2;
      
      const deltaX = mousePosition.x - robotCenterX;
      const deltaY = mousePosition.y - robotCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Smooth eye movement with responsive speed
      const maxEyeMovement = 8;
      const targetX = distance > 0 ? (deltaX / distance) * Math.min(distance / 60, maxEyeMovement) : 0;
      const targetY = distance > 0 ? (deltaY / distance) * Math.min(distance / 60, maxEyeMovement) : 0;
      
      // Smooth interpolation for eyes
      setSmoothEyePosition(prev => ({
        x: prev.x + (targetX - prev.x) * 0.15,
        y: prev.y + (targetY - prev.y) * 0.15
      }));

      // Head rotation based on cursor position
      const headRotationX = distance > 0 ? Math.max(-15, Math.min(15, (deltaY / distance) * (distance / 80))) : 0;
      const headRotationY = distance > 0 ? Math.max(-15, Math.min(15, (deltaX / distance) * (distance / 80))) : 0;
      
      setHeadRotation(prev => ({
        x: prev.x + (headRotationX - prev.x) * 0.08,
        y: prev.y + (headRotationY - prev.y) * 0.08
      }));
    };

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    // Smooth tracking interval
    const trackingInterval = setInterval(smoothEyeTracking, 16); // ~60fps

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('resize', updateRobotPosition);
    updateRobotPosition();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', updateRobotPosition);
      clearInterval(blinkInterval);
      clearInterval(trackingInterval);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      ref={robotRef}
      className="fixed z-50 pointer-events-none transition-all duration-500 hover:scale-110 group"
      style={{
        right: '20px',
        top: `${robotPosition.y}px`,
        transform: 'translateY(-50%)',
      }}
    >
      {/* Robot Container */}
      <div className="relative">
        {/* Fixed Robot Body */}
        <div className="relative w-24 h-32 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-3xl shadow-2xl border border-gray-300/50 overflow-hidden">
          {/* Body glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 via-blue-100/10 to-teal-100/20 rounded-3xl"></div>
          
          {/* Power button on body */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 border-2 border-white rounded-full relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-white"></div>
              </div>
            </div>
          </div>
          
          {/* Body decorative elements */}
          <div className="absolute bottom-16 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Movable Robot Head */}
        <div 
          ref={headRef}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 transition-transform duration-200"
          style={{
            transform: `translateX(-50%) rotateX(${headRotation.x}deg) rotateY(${headRotation.y}deg)`,
            transformOrigin: 'center bottom'
          }}
        >
          <div className="relative w-20 h-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-2xl border border-gray-200/50 overflow-hidden">
            {/* Head glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 via-cyan-100/20 to-blue-100/30 rounded-full"></div>
            
            {/* Eyes Container */}
            <div className="flex justify-center items-center space-x-2 pt-3">
              {/* Left Eye */}
              <div className="relative w-6 h-8 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-full shadow-inner overflow-hidden">
                {!isBlinking ? (
                  <div 
                    className="absolute w-4 h-4 bg-gradient-to-br from-cyan-300 via-teal-400 to-cyan-500 rounded-full transition-all duration-75 shadow-lg"
                    style={{
                      left: `${12 + smoothEyePosition.x}px`,
                      top: `${16 + smoothEyePosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 15px rgba(34, 211, 238, 0.9), inset 0 0 8px rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    {/* Pupil */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-teal-700 rounded-full"></div>
                )}
              </div>
              
              {/* Right Eye */}
              <div className="relative w-6 h-8 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-full shadow-inner overflow-hidden">
                {!isBlinking ? (
                  <div 
                    className="absolute w-4 h-4 bg-gradient-to-br from-cyan-300 via-teal-400 to-cyan-500 rounded-full transition-all duration-75 shadow-lg"
                    style={{
                      left: `${12 + smoothEyePosition.x}px`,
                      top: `${16 + smoothEyePosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 15px rgba(34, 211, 238, 0.9), inset 0 0 8px rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    {/* Pupil */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-teal-700 rounded-full"></div>
                )}
              </div>
            </div>
            
            {/* Cute smile */}
            <div className="flex justify-center mt-2">
              <div className="w-6 h-3 border-2 border-gray-600 border-t-0 rounded-b-full"></div>
            </div>
            
            {/* Head decorative elements */}
            <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
            <div className="absolute top-4 left-3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        {/* Robot Arms */}
        <div className="absolute top-12 -left-3 w-4 h-12 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-lg opacity-90"></div>
        <div className="absolute top-12 -right-3 w-4 h-12 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-lg opacity-90"></div>
        
        {/* Hover message */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gray-900/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm border border-cyan-400/30">
            👋 Hello there!
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-6 -left-3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute -top-8 right-1 w-0.5 h-0.5 bg-teal-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute -bottom-3 -left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
      </div>
    </div>
  );
};

export default CursorFollowingRobot;
