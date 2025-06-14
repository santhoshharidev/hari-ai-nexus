
import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Instagram, Twitter, Mail, Code, Bot, Zap, Globe, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingNav from '@/components/FloatingNav';
import ChatBot from '@/components/ChatBot';
import MagicalCursor from '@/components/MagicalCursor';
import CursorFollowingRobot from '@/components/CursorFollowingRobot';

const Index = () => {
  console.log('Index component is rendering');
  
  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log('Index component mounted');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const sections = [heroRef, projectsRef, servicesRef, contactRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "AI-Powered E-commerce Platform",
      description: "Full-stack e-commerce solution with intelligent product recommendations",
      tech: ["React", "Node.js", "AI/ML", "MongoDB"],
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Smart Workflow Automation",
      description: "Custom AI agents for automating business processes and workflows",
      tech: ["Python", "OpenAI", "Automation", "APIs"],
      gradient: "from-teal-600 to-blue-600"
    },
    {
      title: "Interactive Dashboard Suite",
      description: "Real-time analytics dashboard with dynamic data visualization",
      tech: ["React", "TypeScript", "D3.js", "WebSocket"],
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const services = [
    {
      icon: Globe,
      title: "Custom Web Development",
      description: "Modern, responsive websites and web applications tailored to your needs",
      color: "text-blue-400"
    },
    {
      icon: Bot,
      title: "AI Agent Integration",
      description: "Intelligent automation solutions that streamline your business processes",
      color: "text-purple-400"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Custom scripts and tools to optimize your daily operations and productivity",
      color: "text-teal-400"
    }
  ];

  console.log('About to render main content');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
      <ParticleBackground />
      <MagicalCursor />
      <CursorFollowingRobot />
      <FloatingNav 
        onNavigate={(section) => {
          console.log('Navigating to section:', section);
          if (section === 'hero') scrollToSection(heroRef);
          else if (section === 'about') scrollToSection(heroRef);
          else if (section === 'projects') scrollToSection(projectsRef);
          else if (section === 'services') scrollToSection(servicesRef);
          else scrollToSection(contactRef);
        }}
      />

      {/* Hero Section - This should be visible immediately */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Name and Description */}
            <div className="space-y-8">
              <div>
                {/* Decorative top border */}
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-teal-400 rounded-full mb-8"></div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-yellow-400 via-purple-500 to-teal-400 bg-clip-text text-transparent relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-purple-500 to-teal-400 bg-clip-text text-transparent blur-lg opacity-50 animate-pulse">
                      SANTHOSH HARI
                    </span>
                    <span className="relative drop-shadow-2xl">
                      SANTHOSH HARI
                    </span>
                  </span>
                </h1>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Hi, I am a Web Developer & AI Agent Builder
                </h2>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                  I'm a passionate Web Developer and AI Agent Builder with a vision to bridge the gap between cutting-edge technology and human creativity. I craft beautiful, functional web experiences while building intelligent automation systems that streamline business processes and enhance productivity.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 'OpenAI'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-700 hover:border-blue-400 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Side - Photo */}
            <div className="relative">
              <div className="relative group">
                {/* Glowing background effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Main image container */}
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-2 border border-gray-700/50">
                  <img 
                    src="/lovable-uploads/6306526b-9949-4fa7-8be0-5b7466535601.png"
                    alt="Santhosh Hari - Web Developer & AI Agent Builder"
                    className="w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                    onLoad={() => console.log('Image loaded successfully')}
                    onError={() => console.log('Image failed to load')}
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full animate-pulse opacity-80"></div>
                  <div className="absolute top-1/4 -left-6 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-ping opacity-60"></div>
                </div>
              </div>
              
              {/* Buttons below image */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Button 
                  onClick={() => {
                    console.log('View My Work clicked');
                    scrollToSection(projectsRef);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  View My Work
                </Button>
                <Button 
                  onClick={() => {
                    console.log('Let\'s Connect clicked');
                    scrollToSection(contactRef);
                  }}
                  variant="outline" 
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Let's Connect
                </Button>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-16">
            <ArrowDown className="h-8 w-8 text-blue-400 animate-bounce cursor-pointer mx-auto" onClick={() => scrollToSection(projectsRef)} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:transform hover:scale-105 group">
                <CardContent className="p-6">
                  <div className={`h-2 w-full bg-gradient-to-r ${project.gradient} rounded-full mb-4`}></div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => window.open('https://github.com/santhoshharidev', '_blank')}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              See All on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:transform hover:scale-105 group">
                <CardContent className="p-8 text-center">
                  <service.icon className={`h-16 w-16 ${service.color} mx-auto mb-6 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Button 
              onClick={() => window.open('https://www.linkedin.com/in/santhoshhari16', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Linkedin className="mr-3 h-6 w-6" />
              LinkedIn
            </Button>
            
            <Button 
              onClick={() => window.open('https://www.instagram.com/_santhosh.hari_?igsh=dGpqNmgwanBvZHF5', '_blank')}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white p-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="mr-3 h-6 w-6" />
              Instagram
            </Button>
            
            <Button 
              onClick={() => window.open('https://x.com/SanthoshHa55695', '_blank')}
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-600"
            >
              <Twitter className="mr-3 h-6 w-6" />
              X (Twitter)
            </Button>
            
            <Button 
              onClick={() => window.open('https://www.fiverr.com/santhosh_hari_', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="mr-3 h-6 w-6" />
              Fiverr Profile
            </Button>
            
            <Button 
              onClick={() => window.open('mailto:santhoshhari.tech@gmail.com', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1"
            >
              <Mail className="mr-3 h-6 w-6" />
              Email Me
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Santhosh Hari. Made with <span className="text-red-500">❤️</span> by Santhosh Hari
          </p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default Index;
