import { useState } from 'react';
import { Menu, X, Sparkles, Star, Moon, BookOpen, Phone } from 'lucide-react';
import DaiwayaLogo from '../../Images/Logo/Daiwaya_Logo-removebg-preview.png';

const NAV_LINKS = [
  { id: 'chart',       label: 'My Chart',    icon: Star,      desc: 'Build your destiny chart' },
  { id: 'about',       label: 'About',       icon: BookOpen,  desc: 'What is Matrix of Destiny' },
  { id: 'readings',    label: 'Readings',    icon: Moon,      desc: 'Sample cosmic readings' },
  { id: 'contact',     label: 'Contact',     icon: Phone,     desc: 'Connect with us' },
];

export default function Header({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-enter fixed top-0 left-0 right-0 z-40 px-4 pt-4">
      <nav className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-[20px] border border-white/8
          bg-[#060e1e]/90 px-5 py-3 shadow-2xl backdrop-blur-2xl"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

          {/* Logo + brand */}
          <button onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(201,151,0,0.3)' }}/>
              <img src={DaiwayaLogo} alt="Daiwaya"
                className="relative h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110"
                style={{ filter: 'drop-shadow(0 0 10px rgba(201,151,0,0.35))' }}/>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-black text-white tracking-wide">
                Daiwaya<span className="text-gold-gradient">.lk</span>
              </span>
              <span className="font-display text-xs text-gold/50 tracking-widest mt-0.5">
                දෛවය · Matrix of Destiny
              </span>
            </div>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => onNavigate(id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activePage === id
                    ? 'text-gold bg-gold/10 border border-gold/20'
                    : 'text-silver/60 hover:text-silver hover:bg-white/5'
                }`}>
                <Icon className="h-3.5 w-3.5"/>
                {label}
                {activePage === id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"/>
                )}
              </button>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('chart')}
              className="hidden sm:flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs
                font-bold uppercase tracking-[0.15em] text-slate-950 transition-all duration-200
                hover:bg-[#e5b300] hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: '0 4px 20px rgba(201,151,0,0.3)' }}>
              <Sparkles className="h-3.5 w-3.5"/>
              Free Reading
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-xl border border-white/8 text-silver/60 hover:text-white hover:bg-white/5 transition-all">
              {menuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mt-2 rounded-[18px] border border-white/8 bg-[#060e1e]/95 backdrop-blur-2xl
            overflow-hidden shadow-2xl"
            style={{ animation: 'page-enter 0.25s ease-out both' }}>
            {NAV_LINKS.map(({ id, label, icon: Icon, desc }) => (
              <button key={id} onClick={() => { onNavigate(id); setMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left border-b border-white/5
                  last:border-0 transition-colors hover:bg-white/4 ${
                  activePage === id ? 'bg-gold/8 text-gold' : 'text-silver/70'
                }`}>
                <div className={`p-2 rounded-xl ${activePage === id ? 'bg-gold/15' : 'bg-white/5'}`}>
                  <Icon className="h-4 w-4"/>
                </div>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-silver/35 mt-0.5">{desc}</p>
                </div>
              </button>
            ))}
            <div className="p-4">
              <button onClick={() => { onNavigate('chart'); setMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm
                  font-bold uppercase tracking-[0.15em] text-slate-950 hover:bg-[#e5b300] transition-colors">
                <Sparkles className="h-4 w-4"/>
                Get Your Free Reading
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}