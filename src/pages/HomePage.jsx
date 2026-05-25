import { Sparkles, Star, Zap, Moon, ArrowRight, ChevronDown } from 'lucide-react';
import DaiwayaLogo from '../../Images/Logo/Daiwaya_Logo-removebg-preview.png';

const FEATURES = [
  { icon: Star,     title: 'Soul Archetype',    desc: 'Discover your core Matrix archetype from Nodes 1–22' },
  { icon: Zap,      title: 'Wealth Channel',     desc: 'Unlock your unique money frequency and career destiny' },
  { icon: Moon,     title: 'Karmic Blueprint',   desc: 'Reveal past-life karma and your liberation mission' },
  { icon: Sparkles, title: 'AI Cosmic Reading',  desc: 'Gemini-powered predictions in English & Sinhala' },
];

const FEATURED_NODES = [
  { n: 1,  name: 'The Magician',       sn: 'ජාදුකාරයා'   },
  { n: 7,  name: 'The Chariot',        sn: 'රථය'          },
  { n: 9,  name: 'The Hermit',         sn: 'තවුසා'        },
  { n: 11, name: 'Justice',            sn: 'යුක්තිය'      },
  { n: 14, name: 'Temperance',         sn: 'සමබරතාව'     },
  { n: 19, name: 'The Sun',            sn: 'සූර්යයා'     },
  { n: 22, name: 'Master Builder',     sn: 'ශිල්පාචාර්ය'  },
];

export default function HomePage({ onNavigate }) {
  return (
    <div className="page-enter min-h-screen">

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, rgba(201,151,0,0.12), transparent 65%)' }}/>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, rgba(80,100,220,0.15), transparent 70%)' }}/>
        </div>
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"/>

        <div className="relative space-y-8 max-w-3xl mx-auto">
          <div className="stagger-1 inline-flex items-center gap-2 rounded-full border border-gold/20
            bg-gold/8 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold/80">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"/>
            Sri Lanka's Premier Numerology Platform
          </div>

          <div className="stagger-2 space-y-5">
            <div className="flex justify-center">
              <img src={DaiwayaLogo} alt="Daiwaya" className="w-36 h-36 object-contain"
                style={{ filter: 'drop-shadow(0 0 36px rgba(201,151,0,0.38))' }}/>
            </div>
            <h1 className="font-display text-6xl sm:text-7xl font-black leading-[0.92] tracking-tight">
              <span className="text-white">Unlock Your</span><br/>
              <span className="text-gold-gradient">Cosmic Blueprint</span>
            </h1>
          </div>

          <p className="stagger-3 text-base sm:text-lg text-silver/50 leading-8 max-w-xl mx-auto">
            The Matrix of Destiny reveals the sacred numerical code hidden in your birth date —
            your soul archetype, karmic mission, wealth frequency, and love blueprint.
          </p>

          <div className="stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onNavigate('chart')}
              className="group flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm
                font-bold uppercase tracking-[0.2em] text-slate-950 transition-all duration-300
                hover:bg-[#e5b300] hover:scale-[1.03] active:scale-[0.98]"
              style={{ boxShadow: '0 8px 32px rgba(201,151,0,0.35)' }}>
              <Sparkles className="h-4 w-4"/>
              Reveal My Destiny
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
            </button>
            <button onClick={() => onNavigate('about')}
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/4
                px-8 py-4 text-sm font-medium text-silver/60 transition-all
                hover:border-gold/25 hover:text-white hover:bg-white/8">
              Learn More
            </button>
          </div>

          <div className="stagger-5 flex justify-center pt-2">
            <ChevronDown className="h-5 w-5 text-silver/20 animate-bounce"/>
          </div>
        </div>
      </section>

      {/* NODE SHOWCASE */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/60 mb-3">The 22 Archetypes</p>
            <h2 className="font-display text-4xl font-black text-white">Which Node Governs Your Soul?</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[...Array(22)].map((_,i) => {
              const n = i + 1;
              const f = FEATURED_NODES.find(x => x.n === n);
              return (
                <button key={n} onClick={() => onNavigate('chart')}
                  className={`group relative rounded-2xl border transition-all duration-300 hover:scale-110
                    ${f
                      ? 'border-gold/30 bg-gold/10 px-4 py-3 hover:border-gold/50 hover:bg-gold/16'
                      : 'border-white/8 bg-white/3 w-12 h-12 flex items-center justify-center hover:border-white/20 hover:bg-white/8'
                    }`}>
                  <div className={`font-display font-black text-white ${f ? 'text-2xl' : 'text-lg'}`}>{n}</div>
                  {f && (
                    <div className="mt-0.5">
                      <p className="text-[9px] text-gold/70 font-semibold uppercase tracking-wide">{f.name}</p>
                      <p className="text-[8px] text-silver/30">{f.sn}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-center mt-6 text-xs text-silver/30">Enter your birth date to discover your archetype</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/60 mb-3">What's Inside</p>
            <h2 className="font-display text-4xl font-black text-white">Your Complete Reading</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="card-glow rounded-[22px] border border-white/8 bg-[#070f1d] p-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gold"/>
                </div>
                <h3 className="font-display text-lg font-bold text-white">{title}</h3>
                <p className="text-xs text-silver/45 leading-6">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[32px] border border-gold/20 bg-gradient-to-b from-gold/8 to-transparent p-12 space-y-6"
            style={{ boxShadow: 'inset 0 1px 0 rgba(201,151,0,0.15)' }}>
            <div className="mx-auto w-20 h-20 rounded-full border border-gold/25 bg-gold/10
              flex items-center justify-center font-display text-3xl font-black text-gold">✦</div>
            <h2 className="font-display text-4xl font-black text-white">
              Your stars are aligned.<br/>
              <span className="text-gold-gradient">Are you ready?</span>
            </h2>
            <p className="text-sm text-silver/50 leading-7 max-w-md mx-auto">
              Your Matrix of Destiny awaits — free, instant, and deeply personal.
            </p>
            <button onClick={() => onNavigate('chart')}
              className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-sm
                font-bold uppercase tracking-[0.2em] text-slate-950 hover:bg-[#e5b300] hover:scale-[1.02] transition-all"
              style={{ boxShadow: '0 8px 32px rgba(201,151,0,0.3)' }}>
              <Sparkles className="h-4 w-4"/>
              Begin Free Reading
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}