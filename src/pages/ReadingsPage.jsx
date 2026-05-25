import { Star, Zap, Moon, Heart } from 'lucide-react';

const SAMPLES = [
  { icon: Star,  color: '#c99700', node: 7,  name: 'The Chariot',     title: 'Soul Essence Sample',
    text: 'Node 7 carries the energy of the sacred warrior — a soul that came to earth to prove, through sheer will and determined movement, that spirit can overcome all material resistance. You do not wait for permission. You were born moving forward.' },
  { icon: Zap,   color: '#60c080', node: 8,  name: 'Strength',        title: 'Wealth Channel Sample',
    text: 'Your Node 8 Wealth Channel draws power through leadership and authority. Money flows to you through positions of influence — entrepreneurship, management, and any domain where your natural command energy can set the terms of engagement.' },
  { icon: Moon,  color: '#a080d0', node: 12, name: 'The Hanged Man',   title: 'Karmic Legacy Sample',
    text: 'Node 12 at your karmic peak speaks of a past life pattern of martyrdom — giving everything and receiving little. This life, Saturn is demanding you learn the revolutionary act of receiving gracefully, without guilt.' },
  { icon: Heart, color: '#e080a0', node: 6,  name: 'The Lovers',      title: 'Love Channel Sample',
    text: 'Node 6 at your relationship heart means love, for you, is always a choice — a conscious, sacred commitment. You do not fall in love accidentally. You decide to love, and when you do, it is total, harmonious, and devotional.' },
];

export default function ReadingsPage({ onNavigate }) {
  return (
    <div className="page-enter min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/60">Sample Readings</p>
          <h1 className="font-display text-5xl font-black text-white">Cosmic Readings</h1>
          <p className="text-silver/50 text-sm leading-7 max-w-xl mx-auto">
            See the depth of insight your personal Matrix generates. These are sample readings — yours will be tailored entirely to your unique node combination.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {SAMPLES.map(({ icon: Icon, color, node, name, title, text }) => (
            <div key={title} className="card-glow rounded-[24px] border border-white/8 bg-[#070f1d] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl" style={{ background: color + '18' }}>
                  <Icon className="h-4 w-4" style={{ color }}/>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: color + 'aa' }}>{title}</p>
                  <p className="text-sm font-bold text-white">Node {node} — {name}</p>
                </div>
              </div>
              <p className="text-xs text-silver/55 leading-7 italic">"{text}"</p>
            </div>
          ))}
        </div>
        <div className="text-center pt-4">
          <button onClick={() => onNavigate('chart')}
            className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-sm
              font-bold uppercase tracking-[0.2em] text-slate-950 hover:bg-[#e5b300] hover:scale-[1.02] transition-all"
            style={{ boxShadow: '0 8px 32px rgba(201,151,0,0.3)' }}>
            Get My Full Reading
          </button>
        </div>
      </div>
    </div>
  );
}