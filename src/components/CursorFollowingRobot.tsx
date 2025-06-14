
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
      
      // Fixed eye movement with proper constraints
      const maxEyeMovement = 6; // Reduced for better visibility
      const sensitivity = 0.003; // Reduced sensitivity for smoother movement
      const targetX = distance > 0 ? Math.max(-maxEyeMovement, Math.min(maxEyeMovement, deltaX * sensitivity)) : 0;
      const targetY = distance > 0 ? Math.max(-maxEyeMovement, Math.min(maxEyeMovement, deltaY * sensitivity)) : 0;
      
      // Faster interpolation for smoother tracking
      setSmoothEyePosition(prev => ({
        x: prev.x + (targetX - prev.x) * 0.15,
        y: prev.y + (targetY - prev.y) * 0.15
      }));

      // Head rotation based on cursor position
      const headRotationX = distance > 0 ? Math.max(-15, Math.min(15, (deltaY / distance) * (distance / 80))) : 0;
      const headRotationY = distance > 0 ? Math.max(-15, Math.min(15, (deltaX / distance) * (distance / 80))) : 0;
      
      setHeadRotation(prev => ({
        x: prev.x + (headRotationX - prev.x) * 0.1,
        y: prev.y + (headRotationY - prev.y) * 0.1
      }));
    };

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    // Faster tracking interval for better responsiveness
    const trackingInterval = setInterval(smoothEyeTracking, 16); // ~60fps

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
          {/* Modern Robot Body */}
          <div className="relative w-24 h-32 bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 rounded-2xl shadow-2xl border-2 border-blue-400/30 overflow-hidden">
            {/* Body glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-cyan-400/10 rounded-2xl"></div>
            
            {/* Chest panel */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-blue-400/40">
              <div className="flex justify-center items-center h-full">
                <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded opacity-80 animate-pulse"></div>
              </div>
            </div>
            
            {/* Body LED indicators */}
            <div className="absolute top-8 left-3 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <div className="absolute top-12 left-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-16 left-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '1s' }}></div>
            
            {/* Right side indicators */}
            <div className="absolute top-8 right-3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-80"></div>
            <div className="absolute top-12 right-3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-80" style={{ animationDelay: '0.3s' }}></div>
          </div>
          
          {/* Modern Robot Head */}
          <div 
            ref={headRef}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 transition-transform duration-100"
            style={{
              transform: `translateX(-50%) rotateX(${headRotation.x}deg) rotateY(${headRotation.y}deg)`,
              transformOrigin: 'center bottom'
            }}
          >
            <div className="relative w-20 h-20 bg-gradient-to-br from-slate-700 via-blue-800 to-purple-800 rounded-2xl shadow-2xl border-2 border-cyan-400/40 overflow-hidden">
              {/* Head glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-2xl"></div>
              
              {/* Forehead panel */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded opacity-60"></div>
              
              {/* Eyes Container */}
              <div className="flex justify-center items-center space-x-3 pt-6">
                {/* Left Eye */}
                <div className="relative w-6 h-6 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-inner border border-cyan-400/50 overflow-hidden">
                  {!isBlinking ? (
                    <div 
                      className="absolute w-4 h-4 bg-gradient-to-br from-cyan-300 via-blue-400 to-cyan-500 rounded-full transition-all duration-100"
                      style={{
                        left: `${12 + smoothEyePosition.x}px`,
                        top: `${12 + smoothEyePosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 15px rgba(34, 211, 238, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      {/* Pupil */}
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                      {/* Light reflection */}
                      <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-80"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gray-900 rounded-full"></div>
                  )}
                </div>
                
                {/* Right Eye */}
                <div className="relative w-6 h-6 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-inner border border-cyan-400/50 overflow-hidden">
                  {!isBlinking ? (
                    <div 
                      className="absolute w-4 h-4 bg-gradient-to-br from-cyan-300 via-blue-400 to-cyan-500 rounded-full transition-all duration-100"
                      style={{
                        left: `${12 + smoothEyePosition.x}px`,
                        top: `${12 + smoothEyePosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 15px rgba(34, 211, 238, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      {/* Pupil */}
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                      {/* Light reflection */}
                      <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-80"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gray-900 rounded-full"></div>
                  )}
                </div>
              </div>
              
              {/* Speaker/mouth area */}
              <div className="flex justify-center mt-2">
                <div className="w-8 h-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full border border-cyan-400/30">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    <div className="w-0.5 h-1 bg-cyan-400 rounded opacity-60"></div>
                    <div className="w-0.5 h-1.5 bg-cyan-400 rounded opacity-80"></div>
                    <div className="w-0.5 h-1 bg-cyan-400 rounded opacity-60"></div>
                  </div>
                </div>
              </div>
              
              {/* Head side indicators */}
              <div className="absolute top-4 left-2 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-80"></div>
              <div className="absolute top-4 right-2 w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          {/* Modern Robot Arms */}
          <div className="absolute top-12 -left-3 w-4 h-12 bg-gradient-to-b from-slate-700 to-slate-800 rounded-full shadow-lg border border-blue-400/30"></div>
          <div className="absolute top-12 -right-3 w-4 h-12 bg-gradient-to-b from-slate-700 to-slate-800 rounded-full shadow-lg border border-blue-400/30"></div>
          
          {/* Hover message */}
          {isHovered && (
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-300">
              <div className="bg-gray-900/95 text-white text-sm px-4 py-2 rounded-full whitespace-nowrap backdrop-blur-sm border border-cyan-400/50 shadow-lg">
                <span className="mr-2">🤖</span>Hi! I'm AI Assistant
              </div>
            </div>
          )}
          
          {/* Floating energy particles */}
          <div className="absolute -top-6 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute -top-8 right-2 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute -bottom-3 -left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute -bottom-2 -right-3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.8s' }}></div>
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
