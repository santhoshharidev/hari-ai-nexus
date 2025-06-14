
import { useEffect, useRef, useState } from 'react';

const CursorFollowingRobot = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateRobotPosition = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const robotX = window.innerWidth - scrollbarWidth - 60; // Position near scrollbar
      const robotY = window.innerHeight / 2; // Middle of screen
      setRobotPosition({ x: robotX, y: robotY });
    };

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('resize', updateRobotPosition);
    updateRobotPosition();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', updateRobotPosition);
      clearInterval(blinkInterval);
    };
  }, []);

  // Calculate eye direction
  const eyeDirection = () => {
    if (!robotRef.current) return { x: 0, y: 0 };
    
    const robotRect = robotRef.current.getBoundingClientRect();
    const robotCenterX = robotRect.left + robotRect.width / 2;
    const robotCenterY = robotRect.top + robotRect.height / 2;
    
    const deltaX = mousePosition.x - robotCenterX;
    const deltaY = mousePosition.y - robotCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Limit eye movement
    const maxMovement = 6;
    const normalizedX = (deltaX / distance) * Math.min(distance / 80, maxMovement);
    const normalizedY = (deltaY / distance) * Math.min(distance / 80, maxMovement);
    
    return { x: normalizedX || 0, y: normalizedY || 0 };
  };

  const eyePos = eyeDirection();

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
        {/* Main Robot Body - Sleek white design */}
        <div className="relative w-20 h-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-blue-100/20 to-purple-100/30 rounded-3xl"></div>
          
          {/* Robot Head Area */}
          <div className="relative pt-3">
            {/* Eyes Container */}
            <div className="flex justify-center space-x-3 mb-2">
              {/* Left Eye */}
              <div className="relative w-5 h-5 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner">
                {!isBlinking ? (
                  <div 
                    className="absolute w-3 h-3 bg-gradient-to-br from-cyan-400 via-blue-500 to-teal-500 rounded-full transition-all duration-200 shadow-lg"
                    style={{
                      left: `${10 + eyePos.x}px`,
                      top: `${10 + eyePos.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 12px rgba(6, 182, 212, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)',
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
                )}
              </div>
              
              {/* Right Eye */}
              <div className="relative w-5 h-5 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner">
                {!isBlinking ? (
                  <div 
                    className="absolute w-3 h-3 bg-gradient-to-br from-cyan-400 via-blue-500 to-teal-500 rounded-full transition-all duration-200 shadow-lg"
                    style={{
                      left: `${10 + eyePos.x}px`,
                      top: `${10 + eyePos.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 12px rgba(6, 182, 212, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)',
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
                )}
              </div>
            </div>
            
            {/* Cute mouth/speaker */}
            <div className="flex justify-center">
              <div className="w-8 h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full opacity-60 shadow-inner"></div>
            </div>
          </div>
          
          {/* Body section with power button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 border-2 border-cyan-400 rounded-full relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-4 left-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Robot Arms - partially hidden */}
        <div className="absolute top-8 -left-2 w-3 h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-lg opacity-80"></div>
        <div className="absolute top-8 -right-2 w-3 h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-lg opacity-80"></div>
        
        {/* Floating animation indicators */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gray-900/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm border border-cyan-400/30">
            👋 Hello there!
          </div>
        </div>
        
        {/* Subtle floating particles */}
        <div className="absolute -top-4 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute -top-6 right-0 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute -bottom-2 -left-3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
      </div>
    </div>
  );
};

export default CursorFollowingRobot;
