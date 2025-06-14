
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChatBot = () => {
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

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-gray-900/95 backdrop-blur-sm border border-gray-700 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Santhosh's AI Assistant
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

export default ChatBot;
