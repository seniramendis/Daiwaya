import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Globe, Moon, Sun, Star, Zap, Heart, Compass } from 'lucide-react';
import { generateAllReadings } from '../services/aiReadingService';
import { getMoonPhase, getPlanetaryPositions, getTimingCycles, getCosmicActivations } from '../services/cosmicDataService';

// ─── OCTAGRAM GEOMETRY ────────────────────────────────────────────────────────
const CX = 200, CY = 200, R_OUTER = 152, R_MID = 105, R_INNER = 62;

const octaPt = (i, r = R_OUTER) => {
  const angle = (i * 45 - 90) * (Math.PI / 180);
  return { x: +(CX + r * Math.cos(angle)).toFixed(2), y: +(CY + r * Math.sin(angle)).toFixed(2) };
};

function NodeCircle({ x, y, value, label, size = 22, accent = false, pulse = false, color }) {
  const fill = color ? color + '22' : accent ? 'rgba(201,151,0,0.18)' : 'rgba(8,18,38,0.92)';
  const stroke = color || (accent ? '#c99700' : 'rgba(255,255,255,0.18)');
  return (
    <g>
      {pulse && (
        <>
          <circle cx={x} cy={y} r={size + 10} fill="none" stroke="#c99700" strokeWidth="1" opacity="0.15">
            <animate attributeName="r" values={`${size+6};${size+18};${size+6}`} dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx={x} cy={y} r={size + 4} fill="none" stroke="#c99700" strokeWidth="0.8" opacity="0.25">
            <animate attributeName="r" values={`${size+2};${size+10};${size+2}`} dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite"/>
          </circle>
        </>
      )}
      <circle cx={x} cy={y} r={size} fill={fill} stroke={stroke} strokeWidth={accent ? 1.5 : 0.8}/>
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
        fontSize={size >= 30 ? 14 : size >= 22 ? 12 : 9.5} fontWeight="700"
        fill={accent ? '#fdd85e' : '#e8e8f2'} fontFamily="'Cormorant Garamond', serif">
        {value}
      </text>
      {label && (
        <text x={x} y={y + size + 10} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fill="rgba(201,151,0,0.65)" fontFamily="Inter, sans-serif"
          letterSpacing="0.1em" fontWeight="600">
          {label.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function OctagramChart({ chart }) {
  const s1 = [0, 2, 4, 6].map(i => octaPt(i));
  const s2 = [1, 3, 5, 7].map(i => octaPt(i));
  const sq = pts => pts.map((p,i) => `${i===0?'M':'L'}${p.x},${p.y}`).join(' ') + 'Z';

  const OUTER_NODES = [
    { i:0, key:'top',      label:'MONTH',   accent:true },
    { i:1, key:'skyNode',  label:'SKY',     accent:false },
    { i:2, key:'right',    label:'YEAR',    accent:true },
    { i:3, key:'moneyH',   label:'WEALTH♥', accent:false },
    { i:4, key:'bottom',   label:'DESTINY', accent:true },
    { i:5, key:'karmicM',  label:'KARMA',   accent:false },
    { i:6, key:'left',     label:'DAY',     accent:true },
    { i:7, key:'earthNode',label:'EARTH',   accent:false },
  ];

  const getVal = key => {
    if (key === 'moneyH') return chart.moneyChannel?.heart;
    if (key === 'karmicM') return chart.karmicTail?.middle;
    return chart[key];
  };

  const MID_NODES = [
    { i:0, r:R_MID, val: chart.moneyChannel?.entrance, label:'' },
    { i:2, r:R_MID, val: chart.lifePath, label:'' },
    { i:4, r:R_MID, val: chart.relationshipChannel?.entrance, label:'' },
    { i:6, r:R_MID, val: chart.root, label:'' },
  ];

  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="chartBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#101e36"/>
          <stop offset="100%" stopColor="#040810"/>
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,151,0,0.22)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* BG */}
      <circle cx={CX} cy={CY} r="199" fill="url(#chartBg)"/>
      <circle cx={CX} cy={CY} r="199" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

      {/* Guide circles */}
      <circle cx={CX} cy={CY} r={R_OUTER + 30} fill="none" stroke="rgba(201,151,0,0.06)" strokeWidth="0.5" strokeDasharray="3 8"/>
      <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="rgba(201,151,0,0.1)" strokeWidth="0.5"/>
      <circle cx={CX} cy={CY} r={R_MID}   fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 6"/>
      <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="rgba(201,151,0,0.1)" strokeWidth="0.5"/>

      {/* Center glow */}
      <circle cx={CX} cy={CY} r="85" fill="url(#centerGlow)"/>

      {/* Octagram star squares */}
      <path d={sq(s1)} fill="rgba(201,151,0,0.03)" stroke="rgba(201,151,0,0.3)" strokeWidth="0.7" filter="url(#softGlow)"/>
      <path d={sq(s2)} fill="rgba(100,140,255,0.03)" stroke="rgba(120,160,255,0.15)" strokeWidth="0.7" filter="url(#softGlow)"/>

      {/* Channel lines */}
      {[
        { from: octaPt(2), color:'rgba(201,151,0,0.22)' },  // Money: year→center
        { from: octaPt(4), color:'rgba(200,100,160,0.18)' }, // Love: destiny→center
        { from: octaPt(6), color:'rgba(160,100,220,0.16)' }, // Karmic: day→center
        { from: octaPt(0), color:'rgba(100,160,255,0.12)' }, // Purpose: month→center
      ].map(({ from, color }, i) => (
        <line key={i} x1={from.x} y1={from.y} x2={CX} y2={CY}
          stroke={color} strokeWidth="0.8" strokeDasharray="4 3"/>
      ))}

      {/* Cross lines */}
      {[[0,4],[2,6],[1,5],[3,7]].map(([a,b],i) => {
        const p1 = octaPt(a), p2 = octaPt(b);
        return <line key={`cross-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>;
      })}

      {/* Age tick ring */}
      {[...Array(36)].map((_, i) => {
        const angle = (i * 10 - 90) * (Math.PI / 180);
        const r1 = R_OUTER + 16, r2 = R_OUTER + (i%9===0 ? 26 : 20);
        const isMajor = i%9===0;
        return (
          <line key={`t${i}`}
            x1={CX + r1*Math.cos(angle)} y1={CY + r1*Math.sin(angle)}
            x2={CX + r2*Math.cos(angle)} y2={CY + r2*Math.sin(angle)}
            stroke={isMajor ? 'rgba(201,151,0,0.35)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={isMajor ? 1.2 : 0.5}/>
        );
      })}

      {/* Mid ring */}
      {MID_NODES.map(({ i, r, val }) => {
        const p = octaPt(i, r);
        return <NodeCircle key={`mid${i}`} x={p.x} y={p.y} value={val} size={15}/>;
      })}

      {/* Outer nodes */}
      {OUTER_NODES.map(({ i, key, label, accent }) => {
        const p = octaPt(i, R_OUTER);
        return <NodeCircle key={`out${i}`} x={p.x} y={p.y} value={getVal(key)}
          label={label} size={21} accent={accent}/>;
      })}

      {/* Center — Soul */}
      <NodeCircle x={CX} y={CY} value={chart.center} label="SOUL" size={31} accent pulse/>
    </svg>
  );
}

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
function ReadingCard({ icon: Icon, title, subtitle, content, color = '#c99700', loading, index }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-[24px] border border-white/8 bg-[#060e1c] overflow-hidden transition-all"
      style={{ animationDelay: `${index * 80}ms` }}>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl" style={{ background: color + '18' }}>
            <Icon className="h-4 w-4" style={{ color }}/>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: color + 'bb' }}>{subtitle}</p>
            <h4 className="text-base font-bold text-white font-display">{title}</h4>
          </div>
        </div>
        <span className="text-silver/30 text-lg font-light select-none">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-white/5">
          {loading ? (
            <div className="space-y-3 pt-4">
              {[100, 92, 96, 88, 94].map((w, i) => (
                <div key={i} className="h-2 rounded-full animate-pulse" style={{
                  width: `${w}%`, background: color + '18',
                  animationDelay: `${i * 120}ms`
                }}/>
              ))}
              <p className="text-xs italic pt-2" style={{ color: color + '55' }}>Channeling cosmic wisdom...</p>
            </div>
          ) : content ? (
            <div className="pt-4 space-y-3">
              {content.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-sm leading-7 text-silver/80">{para}</p>
              ))}
            </div>
          ) : (
            <div className="pt-4">
              <p className="text-xs text-silver/25 italic">Reading unavailable. Please regenerate.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── COSMIC DASHBOARD ─────────────────────────────────────────────────────────
function CosmicDashboard({ moonPhase, planets, timing, activations }) {
  const [open, setOpen] = useState(true);
  if (!moonPhase && !planets) return null;

  return (
    <div className="rounded-[24px] border border-white/8 bg-[#06101e] overflow-hidden">
      <button onClick={() => setOpen(o=>!o)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10">
            <Compass className="h-4 w-4 text-blue-400"/>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-blue-400/70 font-semibold">Live Data</p>
            <h4 className="text-base font-bold text-white font-display">Current Cosmic Climate</h4>
          </div>
        </div>
        <span className="text-silver/30 text-lg">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 space-y-4 pt-4">
          {/* Moon phase */}
          {moonPhase && (
            <div className="flex items-center gap-4 p-3 rounded-2xl border border-white/6 bg-white/3">
              <span className="text-3xl">{moonPhase.symbol}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{moonPhase.phase}</p>
                <p className="text-xs text-silver/50">{moonPhase.energy} · {moonPhase.illumination}% illuminated</p>
                <p className="text-xs text-silver/40 mt-1 leading-5">{moonPhase.advice}</p>
              </div>
            </div>
          )}

          {/* Timing cycles */}
          {timing && (
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Personal Year', value: timing.personalYear, sub: timing.yearTheme },
                { label: 'Personal Month', value: timing.personalMonth, sub: timing.monthTheme },
                { label: 'Universal Year', value: timing.universalYear, sub: '2026 Energy' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-silver/35 mb-1">{label}</p>
                  <p className="text-2xl font-black text-gold font-display">{value}</p>
                  <p className="text-[9px] text-silver/40 mt-0.5 leading-3">{sub}</p>
                </div>
              ))}
            </div>
          )}

          {/* Planets */}
          {planets && (
            <div>
              <p className="text-[9px] uppercase tracking-wider text-silver/30 mb-2 font-semibold">Current Planetary Positions</p>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {Object.values(planets).map(p => (
                  <div key={p.name} className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/6 bg-white/3">
                    <span className="text-sm">{p.symbol}</span>
                    <div className="min-w-0">
                      <p className="text-[9px] text-silver/40">{p.name}</p>
                      <p className="text-[10px] font-semibold text-white truncate">{p.sign} {p.degree}°</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activations */}
          {activations?.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-wider text-gold/40 mb-2 font-semibold">Your Active Planetary Influences</p>
              <div className="space-y-1.5">
                {activations.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl border border-gold/12 bg-gold/5">
                    <span className="text-xs font-bold text-gold mt-0.5">{a.planetSymbol}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">{a.planet} in {a.inSign}
                        <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full border border-gold/20 text-gold/70">{a.strength}</span>
                      </p>
                      <p className="text-[10px] text-silver/45 mt-0.5">{a.interpretation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function DestinyChart({ chart, profile }) {
  const [lang, setLang] = useState('en');
  const [readings, setReadings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cosmicData, setCosmicData] = useState(null);
  const prevKey = useRef('');

  // Compute cosmic data once (no API needed — all local math)
  useEffect(() => {
    if (!chart?.center) return;
    const planets = getPlanetaryPositions(new Date());
    const moonPhase = getMoonPhase(new Date());
    const dob = profile?.dateOfBirth?.split('T')[0] || profile?.dateOfBirth;
    const timing = getTimingCycles(dob, new Date());
    const activations = getCosmicActivations(chart, planets);
    setCosmicData({ planets, moonPhase, timing, activations });
  }, [chart, profile]);

  // Trigger AI readings when chart or language changes
  useEffect(() => {
    if (!chart?.center || !cosmicData) return;
    const key = `${chart.center}-${chart.lifePath}-${lang}`;
    if (key === prevKey.current) return;
    prevKey.current = key;

    setLoading(true);
    setReadings(null);
    generateAllReadings({ ...chart, fullName: profile?.fullName }, lang, cosmicData)
      .then(r => { setReadings(r); setLoading(false); });
  }, [chart, lang, cosmicData]);

  if (!chart) return null;
  const dob = profile?.dateOfBirth?.split('T')[0] || '';

  const SECTIONS = [
    { key:'soul',     icon: Star,    title:'Soul Essence',        subtitle:'Core Archetype', color:'#c99700' },
    { key:'wealth',   icon: Zap,     title:'Wealth & Career',     subtitle:'Money Channel',  color:'#60c080' },
    { key:'love',     icon: Heart,   title:'Love & Relationships', subtitle:'Heart Channel',  color:'#e080a0' },
    { key:'karmic',   icon: Moon,    title:'Karmic Legacy',        subtitle:'Soul Karma',     color:'#a080d0' },
    { key:'purpose',  icon: Sun,     title:'Spiritual Purpose',    subtitle:'Higher Calling', color:'#6090e0' },
    { key:'forecast', icon: Compass, title:'Cosmic Forecast',      subtitle:'2025–2026',      color:'#e09050' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold/60">Daiwaya.lk · Matrix of Destiny</p>
        <h2 className="text-3xl font-black text-white font-display">
          {profile?.fullName || 'Your Destiny Blueprint'}
        </h2>
        {dob && <p className="text-xs text-silver/40 tracking-widest">{dob}</p>}
      </div>

      {/* Octagram */}
      <div className="relative rounded-[28px] border border-white/8 bg-[#040c1a] overflow-hidden">
        <div className="absolute inset-0 rounded-[28px]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,151,0,0.08), transparent 65%)' }}/>
        <div className="relative flex justify-center p-4">
          <div className="w-full" style={{ maxWidth: 440 }}>
            <OctagramChart chart={chart}/>
          </div>
        </div>
        {/* Legend */}
        <div className="border-t border-white/6 px-5 py-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {[
            { label:'Soul', v: chart.center, accent:true },
            { label:'Life Path', v: chart.lifePath },
            { label:'Wealth ♥', v: chart.moneyChannel?.heart },
            { label:'Love ♥', v: chart.relationshipChannel?.heart },
            { label:'Day', v: chart.left },
            { label:'Month', v: chart.top },
            { label:'Year', v: chart.right },
            { label:'Karmic', v: chart.karmicTail?.top },
          ].map(({ label, v, accent }) => (
            <div key={label} className={`text-center rounded-xl p-2 border ${
              accent ? 'border-gold/35 bg-gold/10' : 'border-white/6 bg-white/3'
            }`}>
              <p className="text-[8px] uppercase tracking-wider text-silver/35 mb-1 leading-3">{label}</p>
              <p className={`text-xl font-black font-display ${accent ? 'text-gold' : 'text-white'}`}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic dashboard */}
      {cosmicData && (
        <CosmicDashboard
          moonPhase={cosmicData.moonPhase}
          planets={cosmicData.planets}
          timing={cosmicData.timing}
          activations={cosmicData.activations}
        />
      )}

      {/* AI Readings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold"/>
            <h3 className="text-lg font-bold text-white font-display">Your Personalized Cosmic Reading</h3>
          </div>
          <div className="flex gap-2">
            {[['en','English'],['si','සිංහල']].map(([code, label]) => (
              <button key={code} onClick={() => setLang(code)}
                disabled={loading}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  lang === code
                    ? 'bg-gold text-slate-900 shadow-gold/20 shadow-lg'
                    : 'bg-white/6 text-silver/60 hover:bg-white/10'
                } disabled:opacity-50`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {SECTIONS.map(({ key, icon, title, subtitle, color }, i) => (
            <ReadingCard
              key={key}
              icon={icon}
              title={title}
              subtitle={subtitle}
              content={readings?.[key]}
              color={color}
              loading={loading && !readings?.[key]}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}