

import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CursorFollowingRobot = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
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

    const updateEyePosition = () => {
      if (!robotRef.current) return;
      
      const robotRect = robotRef.current.getBoundingClientRect();
      const robotCenterX = robotRect.left + robotRect.width / 2;
      const robotCenterY = robotRect.top + 40; // Head center position
      
      const deltaX = mousePosition.x - robotCenterX;
      const deltaY = mousePosition.y - robotCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance > 0) {
        // Much more responsive and smooth eye tracking
        const maxEyeDistance = 8; // Maximum distance eyes can move from center
        const angle = Math.atan2(deltaY, deltaX);
        
        // Smooth scaling based on distance for natural movement
        const scaleFactor = Math.min(distance / 200, 1); // Reduced from 100 to 200 for smoother scaling
        const targetX = Math.cos(angle) * maxEyeDistance * scaleFactor;
        const targetY = Math.sin(angle) * maxEyeDistance * scaleFactor;
        
        // Ultra-smooth interpolation with higher responsiveness
        setEyePosition(prev => ({
          x: prev.x + (targetX - prev.x) * 0.25, // Increased from 0.15 to 0.25 for better responsiveness
          y: prev.y + (targetY - prev.y) * 0.25
        }));
      }
    };

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    // High-frequency eye tracking for ultra-smooth movement
    const trackingInterval = setInterval(updateEyePosition, 5); // Increased to ~200fps for ultra-smooth movement

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(blinkInterval);
      clearInterval(trackingInterval);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Modern Robot positioned in bottom right corner */}
      <div
        ref={robotRef}
        className="fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-300 hover:scale-110 group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Robot Container */}
        <div className="relative">
          {/* Robot Body - White rounded design */}
          <div className="relative w-20 h-28 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-3xl shadow-2xl border-2 border-gray-300 overflow-hidden">
            {/* Body highlights */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/80 to-transparent rounded-2xl"></div>
            
            {/* Power button on chest */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-cyan-400 rounded-full relative">
                <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-cyan-400 transform -translate-x-1/2 -translate-y-1"></div>
              </div>
            </div>
            
            {/* Side accents */}
            <div className="absolute top-6 left-2 w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full"></div>
            <div className="absolute top-6 right-2 w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full"></div>
          </div>
          
          {/* Robot Head - Large rounded design like the image */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="relative w-24 h-24 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-3xl shadow-2xl border-2 border-gray-300 overflow-hidden">
              {/* Head highlights */}
              <div className="absolute inset-2 bg-gradient-to-br from-white/80 to-transparent rounded-2xl"></div>
              
              {/* Dark screen area for face */}
              <div className="absolute top-3 left-3 right-3 bottom-8 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl border border-slate-600 overflow-hidden">
                {/* Screen glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-transparent rounded-2xl"></div>
                
                {/* Eyes */}
                <div className="flex justify-center items-center space-x-4 pt-4">
                  {/* Left Eye */}
                  <div className="relative w-6 h-6 bg-slate-700 rounded-full overflow-hidden">
                    {!isBlinking ? (
                      <div 
                        className="absolute w-4 h-4 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full"
                        style={{
                          left: `${4 + eyePosition.x}px`,
                          top: `${4 + eyePosition.y}px`,
                          boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
                          transition: 'none', // Remove CSS transition to let React handle smooth updates
                        }}
                      >
                        {/* Eye highlight */}
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-90"></div>
                      </div>
                    ) : (
                      <div className="w-4 h-0.5 bg-cyan-500 rounded-full mt-3 ml-1"></div>
                    )}
                  </div>
                  
                  {/* Right Eye */}
                  <div className="relative w-6 h-6 bg-slate-700 rounded-full overflow-hidden">
                    {!isBlinking ? (
                      <div 
                        className="absolute w-4 h-4 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full"
                        style={{
                          left: `${4 + eyePosition.x}px`,
                          top: `${4 + eyePosition.y}px`,
                          boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
                          transition: 'none', // Remove CSS transition to let React handle smooth updates
                        }}
                      >
                        {/* Eye highlight */}
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-90"></div>
                      </div>
                    ) : (
                      <div className="w-4 h-0.5 bg-cyan-500 rounded-full mt-3 ml-1"></div>
                    )}
                  </div>
                </div>
                
                {/* Smile */}
                <div className="flex justify-center mt-3">
                  <div className="w-8 h-4 border-2 border-cyan-400 border-t-0 rounded-b-full opacity-80"></div>
                </div>
              </div>
              
              {/* Head antennas */}
              <div className="absolute -top-2 left-4 w-1 h-4 bg-slate-600 rounded-full transform rotate-12"></div>
              <div className="absolute -top-2 right-4 w-1 h-4 bg-slate-600 rounded-full transform -rotate-12"></div>
            </div>
          </div>
          
          {/* Robot Arms */}
          <div className="absolute top-8 -left-4 w-3 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full shadow-lg border border-gray-400"></div>
          <div className="absolute top-8 -right-4 w-3 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full shadow-lg border border-gray-400"></div>
          
          {/* Cloud-like speech bubble on left side */}
          {isHovered && (
            <div className="absolute top-1/2 -left-48 transform -translate-y-1/2 opacity-100 transition-all duration-300 ease-out animate-fade-in z-10">
              {/* Speech bubble container */}
              <div className="relative">
                {/* Main cloud bubble */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-2xl border-2 border-cyan-200/50 relative">
                  {/* Cloud-like decorative circles */}
                  <div className="absolute -top-2 left-4 w-6 h-6 bg-white/90 rounded-full shadow-lg"></div>
                  <div className="absolute -top-1 left-8 w-4 h-4 bg-white/80 rounded-full shadow-md"></div>
                  <div className="absolute -top-0.5 left-11 w-3 h-3 bg-white/70 rounded-full shadow-sm"></div>
                  
                  {/* Message content */}
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="text-2xl animate-bounce">🤖</div>
                    <div>
                      <p className="text-gray-800 font-medium text-sm whitespace-nowrap">
                        Hi! I'm AI Assistant
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        Click to chat with me
                      </p>
                    </div>
                  </div>
                  
                  {/* Speech bubble tail pointing to robot */}
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-[12px] border-l-white/95 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                    <div className="absolute top-1/2 -right-0.5 transform -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-cyan-200/50 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/30 to-blue-100/30 rounded-3xl -z-10 blur-sm"></div>
                </div>
                
                {/* Floating sparkles around the bubble */}
                <div className="absolute -top-4 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute -bottom-3 left-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
                <div className="absolute top-2 -right-3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-70"></div>
              </div>
            </div>
          )}
          
          {/* Floating particles */}
          <div className="absolute -top-6 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute -top-8 right-2 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute -bottom-3 -left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
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
