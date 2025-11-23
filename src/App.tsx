import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { ThemeProvider } from './ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import profileImg from './mehmetresitgul.com.png';

function AppContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === null ? true : saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Sayfa geçişi animasyonu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Dot {
      x: number;
      y: number;
      originalX: number;
      originalY: number;
      offsetX: number;
      offsetY: number;
      brightness: number;
      targetBrightness: number;
      trail: number;
    }

    const dots: Dot[] = [];
    const spacing = 20;
    const mouseRadius = 120;
    const repelRadius = 80;
    const repelStrength = 15;
    const ripples: { x: number; y: number; radius: number; maxRadius: number }[] = [];
    const mouseTrail: { x: number; y: number; timestamp: number }[] = [];

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          offsetX: 0,
          offsetY: 0,
          brightness: 0,
          targetBrightness: 0,
          trail: 0
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      mouseTrail.forEach((trail, index) => {
        if (currentTime - trail.timestamp > 1500) {
          mouseTrail.splice(index, 1);
        }
      });

      ripples.forEach((ripple, index) => {
        ripple.radius += 3;
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(index, 1);
        }
      });

      dots.forEach((dot) => {
        const dx = mousePos.current.x - dot.originalX;
        const dy = mousePos.current.y - dot.originalY;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (distanceToMouse < repelRadius && distanceToMouse > 0) {
          const repelForce = (1 - distanceToMouse / repelRadius) * repelStrength;
          const angle = Math.atan2(dot.originalY - mousePos.current.y, dot.originalX - mousePos.current.x);
          targetOffsetX = Math.cos(angle) * repelForce;
          targetOffsetY = Math.sin(angle) * repelForce;
        }

        dot.offsetX += (targetOffsetX - dot.offsetX) * 0.1;
        dot.offsetY += (targetOffsetY - dot.offsetY) * 0.1;

        dot.x = dot.originalX + dot.offsetX;
        dot.y = dot.originalY + dot.offsetY;

        let maxBrightness = 0;
        let maxTrail = 0;

        if (distanceToMouse < mouseRadius) {
          const mouseBrightness = 1 - (distanceToMouse / mouseRadius);
          maxBrightness = Math.max(maxBrightness, mouseBrightness);
        }

        mouseTrail.forEach((trail) => {
          const trailDx = dot.originalX - trail.x;
          const trailDy = dot.originalY - trail.y;
          const distanceToTrail = Math.sqrt(trailDx * trailDx + trailDy * trailDy);
          const trailAge = (currentTime - trail.timestamp) / 1500;

          if (distanceToTrail < mouseRadius) {
            const trailBrightness = (1 - distanceToTrail / mouseRadius) * (1 - trailAge) * 0.8;
            maxTrail = Math.max(maxTrail, trailBrightness);
          }
        });

        ripples.forEach((ripple) => {
          const rippleDx = dot.originalX - ripple.x;
          const rippleDy = dot.originalY - ripple.y;
          const distanceToRipple = Math.sqrt(rippleDx * rippleDx + rippleDy * rippleDy);
          const rippleThickness = 40;

          if (Math.abs(distanceToRipple - ripple.radius) < rippleThickness) {
            const rippleBrightness = 1 - (Math.abs(distanceToRipple - ripple.radius) / rippleThickness);
            const fadeOut = 1 - (ripple.radius / ripple.maxRadius);
            maxBrightness = Math.max(maxBrightness, rippleBrightness * fadeOut);
          }
        });

        dot.targetBrightness = Math.max(maxBrightness, maxTrail);
        dot.brightness += (dot.targetBrightness - dot.brightness) * 0.15;
        dot.trail += (maxTrail - dot.trail) * 0.1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);

        const baseGray = isDark ? 100 : 40;
        const baseAlpha = isDark ? 0.3 : 0.7;
        const white = 255;

        const brightnessFactor = Math.max(dot.brightness, dot.trail);
        const r = baseGray + (white - baseGray) * brightnessFactor;
        const g = baseGray + (white - baseGray) * brightnessFactor;
        const b = baseGray + (white - baseGray) * brightnessFactor;
        const alpha = baseAlpha + (0.9 - baseAlpha) * brightnessFactor;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      const prevPos = mousePos.current;

      const distance = Math.sqrt(
        Math.pow(newPos.x - prevPos.x, 2) + Math.pow(newPos.y - prevPos.y, 2)
      );

      if (distance > 5) {
        mouseTrail.push({
          x: newPos.x,
          y: newPos.y,
          timestamp: Date.now()
        });

        if (mouseTrail.length > 30) {
          mouseTrail.shift();
        }
      }

      mousePos.current = newPos;
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 300
      });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dots.length = 0;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({
            x,
            y,
            originalX: x,
            originalY: y,
            offsetX: 0,
            offsetY: 0,
            brightness: 0,
            targetBrightness: 0,
            trail: 0
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  const navigationPaths: { [key: string]: string } = {
    home: '/',
    about: '/about',
    experience: '/experience',
    contact: '/contact',
  };

  const currentPath = location.pathname;
  const activeSection = Object.keys(navigationPaths).find(
    key => navigationPaths[key] === currentPath
  ) || 'home';

  const navigateTo = (section: string) => {
    navigate(navigationPaths[section]);
  };

  return (
    <div
      className={`relative overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}
      style={{
        backgroundColor: isDark ? '#0F0F0F' : '#ffffff',
        minHeight: '100vh'
      }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-auto mx-auto px-4">
        <div
          className={`backdrop-blur-xl border rounded-full px-12 py-3 shadow-[inset_0_0_2px_1px_rgba(255,255,255,0.35),inset_0_0_10px_4px_rgba(255,255,255,0.15),0_4px_16px_rgba(17,17,26,0.05),0_8px_24px_rgba(17,17,26,0.05),0_16px_56px_rgba(17,17,26,0.05)] transition-all duration-300 flex items-center justify-between min-w-[800px] ${
            isDark
              ? 'bg-black/15 border-white/20 hover:bg-black/35 hover:border-white/30'
              : 'bg-white/15 border-gray-300/50 hover:bg-white/35 hover:border-gray-300/70'
          }`}
        >
          <div className="flex items-center gap-2">
            <img
              src={profileImg}
              alt="Mehmet Resit Gul"
              className={`w-10 h-10 rounded-full border object-cover ${
                isDark ? 'border-white/20' : 'border-gray-300/50'
              }`}
            />
            <button
              onClick={() => navigateTo('home')}
              className={`text-xl font-medium transition-colors ${
                isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-600'
              }`}
            >
              Mehmet
            </button>
          </div>
          <div className="flex items-center gap-10">
            <button
              onClick={() => navigateTo('about')}
              className={`text-sm font-normal transition-colors relative ${
                activeSection === 'about'
                  ? (isDark ? 'text-cyan-400' : 'text-cyan-600')
                  : (isDark ? 'hover:text-gray-300' : 'hover:text-gray-600')
              }`}
            >
              <span className="relative z-10">about me</span>
              {activeSection === 'about' && (
                <span className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => navigateTo('experience')}
              className={`text-sm font-normal transition-colors relative ${
                activeSection === 'experience'
                  ? (isDark ? 'text-cyan-400' : 'text-cyan-600')
                  : (isDark ? 'hover:text-gray-300' : 'hover:text-gray-600')
              }`}
            >
              <span className="relative z-10">experience</span>
              {activeSection === 'experience' && (
                <span className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`text-sm font-normal transition-colors relative ${
                activeSection === 'contact'
                  ? (isDark ? 'text-cyan-400' : 'text-cyan-600')
                  : (isDark ? 'hover:text-gray-300' : 'hover:text-gray-600')
              }`}
            >
              <span className="relative z-10">contact</span>
              {activeSection === 'contact' && (
                <span className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full"></span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className={`ml-6 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                  : 'bg-gray-800/10 hover:bg-gray-800/20 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              <div className="transition-transform duration-300 hover:rotate-180">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </div>
            </button>
          </div>
        </div>
      </nav>
      
      <ThemeProvider isDark={isDark}>
        <div key={location.pathname} className="animate-fadeIn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </ThemeProvider>

      <footer className={`py-8 text-center text-sm absolute bottom-0 left-0 right-0 z-10 transition-colors duration-300 ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <p>&copy; 2025 Mehmet Reşit Gül</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
