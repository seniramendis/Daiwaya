import { useState, useCallback } from 'react';
import IntroScreen from './components/IntroScreen';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ChartPage from './pages/ChartPage';
import AboutPage from './pages/AboutPage';
import ReadingsPage from './pages/ReadingsPage';
import ContactPage from './pages/ContactPage';

// Floating starfield background
function Starfield() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(11,26,48,0.8) 0%, #030712 60%)' }}/>
      {/* Gold nebula glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] opacity-30"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,0,0.08), transparent 60%)' }}/>
      {/* Stars */}
      {[...Array(60)].map((_,i) => {
        const size = Math.random() > 0.9 ? 2 : 1;
        const opacity = Math.random() * 0.5 + 0.1;
        const animDur = 2 + Math.random() * 4;
        const animDelay = Math.random() * 3;
        return (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: size, height: size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity,
              animation: `intro-glow-pulse ${animDur}s ease-in-out ${animDelay}s infinite`,
            }}/>
        );
      })}
    </div>
  );
}

// Footer
function Footer({ onNavigate }) {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-10 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg font-black text-white">
            Daiwaya<span className="text-gold-gradient">.lk</span>
          </p>
          <p className="text-xs text-silver/30 mt-0.5">Matrix of Destiny · Sri Lanka</p>
        </div>
        <div className="flex items-center gap-6 text-xs text-silver/30">
          {['chart','about','readings','contact'].map(p => (
            <button key={p} onClick={() => onNavigate(p)}
              className="capitalize hover:text-gold/70 transition-colors">
              {p === 'chart' ? 'My Chart' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-silver/20 uppercase tracking-wider">
          © 2025 Daiwaya.lk · All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [page, setPage] = useState('home');

  const handleNavigate = useCallback((target) => {
    setPage(target === 'home' ? 'home' : target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const PAGE_MAP = {
    home:     <HomePage     onNavigate={handleNavigate}/>,
    chart:    <ChartPage/>,
    about:    <AboutPage/>,
    readings: <ReadingsPage onNavigate={handleNavigate}/>,
    contact:  <ContactPage/>,
  };

  return (
    <>
      {/* Intro splash — shown until animation completes */}
      {!introComplete && (
        <IntroScreen onComplete={() => setIntroComplete(true)}/>
      )}

      {/* Main app — fades in after intro */}
      {introComplete && (
        <div className="relative min-h-screen text-silver" style={{ opacity: 1 }}>
          <Starfield/>
          <Header activePage={page} onNavigate={handleNavigate}/>
          <main className="relative z-10">
            {PAGE_MAP[page] || PAGE_MAP.home}
          </main>
          <Footer onNavigate={handleNavigate}/>
        </div>
      )}
    </>
  );
}