
import { useEffect, useRef, useState } from 'react';

const CursorFollowingRobot = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateRobotPosition = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const robotX = window.innerWidth - scrollbarWidth - 80; // Position near scrollbar
      const robotY = window.innerHeight / 2; // Middle of screen
      setRobotPosition({ x: robotX, y: robotY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('resize', updateRobotPosition);
    updateRobotPosition();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', updateRobotPosition);
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
    const maxMovement = 8;
    const normalizedX = (deltaX / distance) * Math.min(distance / 50, maxMovement);
    const normalizedY = (deltaY / distance) * Math.min(distance / 50, maxMovement);
    
    return { x: normalizedX || 0, y: normalizedY || 0 };
  };

  const eyePos = eyeDirection();

  return (
    <div
      ref={robotRef}
      className="fixed z-50 pointer-events-none transition-all duration-300 hover:scale-110"
      style={{
        left: `${robotPosition.x}px`,
        top: `${robotPosition.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Robot Body */}
      <div className="relative">
        {/* Robot Head */}
        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl border-2 border-blue-400/50 shadow-lg relative overflow-hidden">
          {/* Head glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl"></div>
          
          {/* Eyes container */}
          <div ref={eyesRef} className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {/* Left Eye */}
            <div className="relative w-4 h-4 bg-gray-800 rounded-full border border-blue-300/50">
              <div 
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg transition-all duration-150"
                style={{
                  left: `${6 + eyePos.x}px`,
                  top: `${6 + eyePos.y}px`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
                }}
              />
            </div>
            
            {/* Right Eye */}
            <div className="relative w-4 h-4 bg-gray-800 rounded-full border border-blue-300/50">
              <div 
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg transition-all duration-150"
                style={{
                  left: `${6 + eyePos.x}px`,
                  top: `${6 + eyePos.y}px`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
                }}
              />
            </div>
          </div>
          
          {/* Antenna */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-0.5 h-4 bg-gradient-to-t from-blue-400 to-cyan-300"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto animate-pulse"></div>
          </div>
          
          {/* Mouth */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-600 rounded-full opacity-50"></div>
        </div>
        
        {/* Robot Body (partially hidden) */}
        <div className="w-12 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-b-lg border-x-2 border-b-2 border-blue-400/50 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
          
          {/* Body details */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        {/* Spectating indicator */}
        <div className="absolute -top-8 -right-8 opacity-0 animate-pulse group-hover:opacity-100 transition-opacity">
          <div className="bg-gray-800/90 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap border border-blue-400/50">
            👀 Watching...
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorFollowingRobot;
