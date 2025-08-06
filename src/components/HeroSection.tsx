import { useEffect, useRef, useState } from 'react';
import heroImage from '@/assets/fintech-hero.jpg';

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        parallaxRef.current.style.transform = `translateY(${rate}px) translateX(${mousePosition.x * 0.02}px) scale(1.1)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMousePosition({ x, y });
      
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        parallaxRef.current.style.transform = `translateY(${rate}px) translateX(${x}px) translateZ(${y * 0.5}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition.x]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden particle-bg">
      {/* Animated Fintech Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 parallax-container transition-transform duration-75 ease-out fintech-animation"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.1)',
          filter: 'brightness(1.1) contrast(1.05)',
        }}
      />
      
      {/* Data Flow Animation Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent data-flow-animation" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent data-flow-vertical" />
      </div>
      
      {/* Floating Financial Data Points */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute financial-data-point"
            style={{
              left: `${8 + i * 8}%`,
              top: `${20 + (i % 5) * 12}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + i * 0.8}s`,
            }}
          >
            <div className="w-2 h-2 bg-primary/30 rounded-full pulse-glow" />
            <div className="absolute -top-1 -left-1 w-4 h-4 border border-gold/20 rounded-full animate-spin" 
                 style={{ animationDuration: `${6 + i * 2}s` }} />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
          Empowering industries with{' '}
          <span className="bg-gradient-sky-gold bg-clip-text text-transparent">
            fluid intelligence
          </span>{' '}
          and precision.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Next-generation AI solutions that transform your business vision into reality
        </p>

        {/* Floating CTA */}
        <button className="btn-glow bg-primary text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold hover:bg-primary-glow transition-all duration-500 float-animation">
          Discover Our Intelligence
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;