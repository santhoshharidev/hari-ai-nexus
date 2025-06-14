
import { useState, useEffect } from 'react';
import { User, Briefcase, Settings, Mail } from 'lucide-react';

interface FloatingNavProps {
  onNavigate: (section: 'hero' | 'about' | 'projects' | 'services' | 'contact') => void;
}

const FloatingNav = ({ onNavigate }: FloatingNavProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'services', icon: Settings, label: 'Services' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as any);
                onNavigate(item.id as any);
              }}
              className={`p-2 rounded-full transition-all duration-300 group relative ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default FloatingNav;
