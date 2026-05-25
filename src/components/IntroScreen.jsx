import { useEffect, useState } from 'react';
import DaiwayaLogo from '../../Images/Logo/Daiwaya_Logo-removebg-preview.png';

export default function IntroScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit at 3.8s, call onComplete at 4.6s
    const exitTimer = setTimeout(() => setExiting(true), 3800);
    const doneTimer = setTimeout(() => onComplete(), 4600);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${exiting ? 'intro-exit' : ''}`}
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0e1b30 0%, #030712 70%)' }}
    >
      {/* Starfield dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width:  Math.random() > 0.85 ? 2 : 1,
              height: Math.random() > 0.85 ? 2 : 1,
              top:  `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
              animation: `intro-glow-pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Outer decorative rings */}
      <div className="absolute" style={{ width: 420, height: 420 }}>
        {/* Rotating ring 1 */}
        <svg className="intro-ring1 absolute inset-0" viewBox="0 0 420 420" fill="none">
          <circle cx="210" cy="210" r="200" stroke="rgba(201,151,0,0.12)" strokeWidth="0.8"
            strokeDasharray="6 18" />
          {[0,45,90,135,180,225,270,315].map(angle => {
            const x = 210 + 200 * Math.cos((angle - 90) * Math.PI / 180);
            const y = 210 + 200 * Math.sin((angle - 90) * Math.PI / 180);
            return <circle key={angle} cx={x} cy={y} r="3" fill="rgba(201,151,0,0.35)"/>;
          })}
        </svg>
        {/* Rotating ring 2 */}
        <svg className="intro-ring2 absolute inset-0" viewBox="0 0 420 420" fill="none">
          <circle cx="210" cy="210" r="175" stroke="rgba(201,151,0,0.08)" strokeWidth="0.5"
            strokeDasharray="3 12" />
        </svg>
        {/* Static outer ring */}
        <svg className="absolute inset-0" viewBox="0 0 420 420" fill="none">
          <circle cx="210" cy="210" r="195" stroke="rgba(201,151,0,0.06)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Center glow */}
      <div className="intro-glow absolute rounded-full"
        style={{
          width: 260, height: 260,
          background: 'radial-gradient(circle, rgba(201,151,0,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div className="relative intro-logo" style={{ width: 220, height: 220 }}>
        <div className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,151,0,0.08), transparent 70%)' }}/>
        <img
          src={DaiwayaLogo}
          alt="Daiwaya"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 24px rgba(201,151,0,0.4))' }}
        />
      </div>

      {/* Text content */}
      <div className="relative mt-10 text-center space-y-3 px-8">
        <h1 className="intro-title font-display text-5xl font-black text-white tracking-wide"
          style={{ textShadow: '0 0 60px rgba(201,151,0,0.3)' }}>
          Daiwaya<span className="text-gold-gradient">.lk</span>
        </h1>

        <div className="intro-line mx-auto h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          style={{ width: 80 }}/>

        <p className="intro-sub font-display text-2xl text-gold/80 tracking-[0.15em]">
          දෛවය · Destiny
        </p>

        <p className="intro-tagline text-xs uppercase tracking-[0.4em] text-silver/35 mt-4">
          Matrix of Destiny · Sri Lanka
        </p>
      </div>

      {/* Bottom progress line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-32 h-px bg-white/8 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold/40 to-gold rounded-full"
            style={{ animation: 'intro-line-expand 3.5s ease-out forwards', width: 0 }}/>
        </div>
        <p className="text-center mt-3 text-[9px] uppercase tracking-[0.35em] text-white/15">
          Awakening your destiny
        </p>
      </div>
    </div>
  );
}