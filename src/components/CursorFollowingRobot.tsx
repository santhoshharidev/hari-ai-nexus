
import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CursorFollowingRobot = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [smoothEyePosition, setSmoothEyePosition] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Chat functionality states
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Santhosh's AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    services: "Santhosh offers custom web development, AI agent integration, and workflow automation. Would you like to know more about any specific service?",
    contact: "You can reach Santhosh through LinkedIn, Instagram, X (Twitter), his Fiverr profile, or email at santhoshhari.tech@gmail.com. Which would you prefer?",
    projects: "Santhosh has worked on AI-powered e-commerce platforms, smart workflow automation systems, and interactive dashboards. Check out his GitHub for more details!",
    about: "Santhosh is a passionate Web Developer and AI Agent Builder who specializes in creating intelligent interfaces and automation solutions. He combines technical expertise with creative problem-solving.",
    skills: "Santhosh is skilled in React, TypeScript, Node.js, Python, AI/ML, OpenAI integration, automation, and UI/UX design. He stays updated with the latest technologies!",
    default: "I can help you learn more about Santhosh's services, projects, contact information, or background. What would you like to know?",
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do') || lowerMessage.includes('offer')) {
      return predefinedResponses.services;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return predefinedResponses.contact;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return predefinedResponses.projects;
    } else if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('background')) {
      return predefinedResponses.about;
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      return predefinedResponses.skills;
    } else {
      return predefinedResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Smooth eye tracking animation with improved responsiveness
    const smoothEyeTracking = () => {
      if (!robotRef.current) return;
      
      const robotRect = robotRef.current.getBoundingClientRect();
      const robotCenterX = robotRect.left + robotRect.width / 2;
      const robotCenterY = robotRect.top + robotRect.height / 2;
      
      const deltaX = mousePosition.x - robotCenterX;
      const deltaY = mousePosition.y - robotCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Improved eye movement with better responsiveness
      const maxEyeMovement = 12;
      const sensitivity = 0.02; // Increased sensitivity for faster response
      const targetX = distance > 0 ? (deltaX * sensitivity) * Math.min(distance / 100, maxEyeMovement) : 0;
      const targetY = distance > 0 ? (deltaY * sensitivity) * Math.min(distance / 100, maxEyeMovement) : 0;
      
      // Faster interpolation for smoother tracking
      setSmoothEyePosition(prev => ({
        x: prev.x + (targetX - prev.x) * 0.25,
        y: prev.y + (targetY - prev.y) * 0.25
      }));

      // Head rotation based on cursor position
      const headRotationX = distance > 0 ? Math.max(-20, Math.min(20, (deltaY / distance) * (distance / 60))) : 0;
      const headRotationY = distance > 0 ? Math.max(-20, Math.min(20, (deltaX / distance) * (distance / 60))) : 0;
      
      setHeadRotation(prev => ({
        x: prev.x + (headRotationX - prev.x) * 0.12,
        y: prev.y + (headRotationY - prev.y) * 0.12
      }));
    };

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    // Faster tracking interval for better responsiveness
    const trackingInterval = setInterval(smoothEyeTracking, 8); // ~120fps for smoother tracking

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(blinkInterval);
      clearInterval(trackingInterval);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Robot positioned in bottom right corner */}
      <div
        ref={robotRef}
        className="fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-300 hover:scale-110 group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Robot Container */}
        <div className="relative">
          {/* Fixed Robot Body */}
          <div className="relative w-20 h-28 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-3xl shadow-2xl border border-gray-300/50 overflow-hidden">
            {/* Body glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 via-blue-100/10 to-teal-100/20 rounded-3xl"></div>
            
            {/* Power button on body */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 border-2 border-white rounded-full relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-white"></div>
                </div>
              </div>
            </div>
            
            {/* Body decorative elements */}
            <div className="absolute bottom-12 left-3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-16 right-3 w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Movable Robot Head */}
          <div 
            ref={headRef}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 transition-transform duration-100"
            style={{
              transform: `translateX(-50%) rotateX(${headRotation.x}deg) rotateY(${headRotation.y}deg)`,
              transformOrigin: 'center bottom'
            }}
          >
            <div className="relative w-16 h-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Head glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 via-cyan-100/20 to-blue-100/30 rounded-full"></div>
              
              {/* Eyes Container */}
              <div className="flex justify-center items-center space-x-1.5 pt-2">
                {/* Left Eye */}
                <div className="relative w-5 h-6 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-full shadow-inner overflow-hidden">
                  {!isBlinking ? (
                    <div 
                      className="absolute w-3 h-3 bg-gradient-to-br from-cyan-300 via-teal-400 to-cyan-500 rounded-full transition-all duration-75 shadow-lg"
                      style={{
                        left: `${10 + smoothEyePosition.x}px`,
                        top: `${12 + smoothEyePosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 12px rgba(34, 211, 238, 0.9), inset 0 0 6px rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      {/* Pupil */}
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-teal-700 rounded-full"></div>
                  )}
                </div>
                
                {/* Right Eye */}
                <div className="relative w-5 h-6 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-full shadow-inner overflow-hidden">
                  {!isBlinking ? (
                    <div 
                      className="absolute w-3 h-3 bg-gradient-to-br from-cyan-300 via-teal-400 to-cyan-500 rounded-full transition-all duration-75 shadow-lg"
                      style={{
                        left: `${10 + smoothEyePosition.x}px`,
                        top: `${12 + smoothEyePosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 12px rgba(34, 211, 238, 0.9), inset 0 0 6px rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      {/* Pupil */}
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-teal-700 rounded-full"></div>
                  )}
                </div>
              </div>
              
              {/* Cute smile */}
              <div className="flex justify-center mt-1">
                <div className="w-4 h-2 border-2 border-gray-600 border-t-0 rounded-b-full"></div>
              </div>
              
              {/* Head decorative elements */}
              <div className="absolute top-1 right-2 w-1 h-1 bg-teal-400 rounded-full animate-pulse"></div>
              <div className="absolute top-3 left-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          {/* Robot Arms */}
          <div className="absolute top-8 -left-2 w-3 h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-lg opacity-90"></div>
          <div className="absolute top-8 -right-2 w-3 h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-lg opacity-90"></div>
          
          {/* Hover message */}
          {isHovered && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-300">
              <div className="bg-gray-900/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm border border-cyan-400/30">
                👋 Hi! I'm AI Assistant
              </div>
            </div>
          )}
          
          {/* Floating particles */}
          <div className="absolute -top-4 -left-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute -top-6 right-0 w-0.5 h-0.5 bg-teal-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute -bottom-2 -left-3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-36 right-6 z-50 w-80 h-96 bg-gray-900/95 backdrop-blur-sm border border-gray-700 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Santhosh's AI Assistant
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                className="p-1 h-auto bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full pb-4">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-800 text-gray-200'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CursorFollowingRobot;
