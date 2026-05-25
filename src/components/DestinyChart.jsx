import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Moon, Sun, Star, Zap, Heart, Compass, RefreshCcw, AlertCircle, Download } from 'lucide-react';
import DownloadPDFButton from './DownloadPDFButton';
import { generateAllReadings } from '../services/aiReadingService';
import { getMoonPhase, getPlanetaryPositions, getTimingCycles, getCosmicActivations } from '../services/cosmicDataService';

// ─── OCTAGRAM GEOMETRY ────────────────────────────────────────────────────────
const CX = 200, CY = 200, R_OUTER = 152, R_MID = 105;

const octaPt = (i, r = R_OUTER) => {
  const angle = (i * 45 - 90) * (Math.PI / 180);
  return { x: +(CX + r * Math.cos(angle)).toFixed(2), y: +(CY + r * Math.sin(angle)).toFixed(2) };
};

function NodeCircle({ x, y, value, label, size = 22, accent = false, pulse = false }) {
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
      <circle cx={x} cy={y} r={size}
        fill={accent ? 'rgba(201,151,0,0.18)' : 'rgba(8,18,38,0.92)'}
        stroke={accent ? '#c99700' : 'rgba(255,255,255,0.18)'}
        strokeWidth={accent ? 1.5 : 0.8}/>
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

  const outerNodes = [
    { i:0, val: chart.top,                       label:'MONTH',   accent:true  },
    { i:1, val: chart.skyNode,                   label:'SKY',     accent:false },
    { i:2, val: chart.right,                     label:'YEAR',    accent:true  },
    { i:3, val: chart.moneyChannel?.heart,       label:'WEALTH♥', accent:false },
    { i:4, val: chart.bottom,                    label:'DESTINY', accent:true  },
    { i:5, val: chart.karmicTail?.middle,        label:'KARMA',   accent:false },
    { i:6, val: chart.left,                      label:'DAY',     accent:true  },
    { i:7, val: chart.earthNode,                 label:'EARTH',   accent:false },
  ];

  const midNodes = [
    { i:0, val: chart.moneyChannel?.entrance },
    { i:2, val: chart.lifePath              },
    { i:4, val: chart.relationshipChannel?.entrance },
    { i:6, val: chart.root                  },
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
      <circle cx={CX} cy={CY} r="199" fill="url(#chartBg)"/>
      <circle cx={CX} cy={CY} r="199" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      <circle cx={CX} cy={CY} r={R_OUTER + 30} fill="none" stroke="rgba(201,151,0,0.06)" strokeWidth="0.5" strokeDasharray="3 8"/>
      <circle cx={CX} cy={CY} r={R_OUTER}      fill="none" stroke="rgba(201,151,0,0.10)" strokeWidth="0.5"/>
      <circle cx={CX} cy={CY} r={R_MID}        fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 6"/>
      <circle cx={CX} cy={CY} r="62"           fill="none" stroke="rgba(201,151,0,0.10)" strokeWidth="0.5"/>
      <circle cx={CX} cy={CY} r="85" fill="url(#centerGlow)"/>
      <path d={sq(s1)} fill="rgba(201,151,0,0.03)" stroke="rgba(201,151,0,0.30)" strokeWidth="0.7" filter="url(#softGlow)"/>
      <path d={sq(s2)} fill="rgba(100,140,255,0.03)" stroke="rgba(120,160,255,0.15)" strokeWidth="0.7" filter="url(#softGlow)"/>
      {[[2,'rgba(201,151,0,0.22)'],[4,'rgba(200,100,160,0.18)'],[6,'rgba(160,100,220,0.16)'],[0,'rgba(100,160,255,0.12)']].map(([i,color]) => {
        const p = octaPt(i);
        return <line key={i} x1={p.x} y1={p.y} x2={CX} y2={CY} stroke={color} strokeWidth="0.8" strokeDasharray="4 3"/>;
      })}
      {[[0,4],[2,6],[1,5],[3,7]].map(([a,b],i) => {
        const p1 = octaPt(a), p2 = octaPt(b);
        return <line key={`x${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>;
      })}
      {[...Array(36)].map((_,i) => {
        const a = (i*10-90)*Math.PI/180, r1 = R_OUTER+16, r2 = R_OUTER+(i%9===0?26:20);
        return <line key={`t${i}`} x1={CX+r1*Math.cos(a)} y1={CY+r1*Math.sin(a)} x2={CX+r2*Math.cos(a)} y2={CY+r2*Math.sin(a)} stroke={i%9===0?'rgba(201,151,0,0.35)':'rgba(255,255,255,0.08)'} strokeWidth={i%9===0?1.2:0.5}/>;
      })}
      {midNodes.map(({ i, val }) => {
        const p = octaPt(i, R_MID);
        return <NodeCircle key={`m${i}`} x={p.x} y={p.y} value={val} size={15}/>;
      })}
      {outerNodes.map(({ i, val, label, accent }) => {
        const p = octaPt(i, R_OUTER);
        return <NodeCircle key={`o${i}`} x={p.x} y={p.y} value={val} label={label} size={21} accent={accent}/>;
      })}
      <NodeCircle x={CX} y={CY} value={chart.center} label="SOUL" size={31} accent pulse/>
    </svg>
  );
}

// ─── READING CARD ─────────────────────────────────────────────────────────────
function ReadingCard({ icon: Icon, title, subtitle, content, color, loading, error }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-[22px] border border-white/8 bg-[#060e1c] overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl" style={{ background: color + '18' }}>
            <Icon className="h-4 w-4" style={{ color }}/>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: color + 'bb' }}>{subtitle}</p>
            <h4 className="text-base font-bold text-white font-display">{title}</h4>
          </div>
        </div>
        <span className="text-silver/30 text-xl font-light select-none">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5">
          {loading ? (
            <div className="space-y-3 pt-5">
              {[100,90,95,85,92].map((w,i) => (
                <div key={i} className="h-2 rounded-full animate-pulse"
                  style={{ width:`${w}%`, background: color+'20', animationDelay:`${i*100}ms` }}/>
              ))}
              <p className="text-xs italic pt-3" style={{ color: color+'66' }}>Consulting the cosmic matrix...</p>
            </div>
          ) : error ? (
            <div className="pt-4 flex items-start gap-2 text-red-400/70">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0"/>
              <p className="text-xs leading-5">{error}</p>
            </div>
          ) : content ? (
            <div className="pt-4 space-y-4">
              {content.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-sm leading-7 text-silver/80">{para.replace(/^#+\s*/,'')}</p>
              ))}
            </div>
          ) : (
            <p className="pt-4 text-xs text-silver/25 italic">No reading generated.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── COSMIC DASHBOARD ─────────────────────────────────────────────────────────
function CosmicDashboard({ moonPhase, planets, timing, activations }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-[22px] border border-white/8 bg-[#06101e] overflow-hidden">
      <button onClick={() => setOpen(o=>!o)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10">
            <Compass className="h-4 w-4 text-blue-400"/>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-blue-400/70 font-semibold">Live Cosmic Data</p>
            <h4 className="text-base font-bold text-white font-display">Current Cosmic Climate</h4>
          </div>
        </div>
        <span className="text-silver/30 text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/5 space-y-4 pt-4">
          {moonPhase && (
            <div className="flex items-center gap-4 p-3 rounded-2xl border border-white/6 bg-white/3">
              <span className="text-3xl">{moonPhase.symbol}</span>
              <div>
                <p className="text-sm font-bold text-white">{moonPhase.phase}</p>
                <p className="text-xs text-silver/50">{moonPhase.energy} · {moonPhase.illumination}% illuminated</p>
                <p className="text-xs text-silver/40 mt-1 leading-5">{moonPhase.advice}</p>
              </div>
            </div>
          )}
          {timing && (
            <div className="grid grid-cols-3 gap-2">
              {[
                { label:'Personal Year',  value: timing.personalYear,  sub: timing.yearTheme },
                { label:'Personal Month', value: timing.personalMonth, sub: timing.monthTheme },
                { label:'Universal Year', value: timing.universalYear, sub: '2026 Energy' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-silver/35 mb-1">{label}</p>
                  <p className="text-2xl font-black text-gold font-display">{value}</p>
                  <p className="text-[9px] text-silver/40 mt-0.5 leading-3">{sub}</p>
                </div>
              ))}
            </div>
          )}
          {planets && (
            <div>
              <p className="text-[9px] uppercase tracking-wider text-silver/30 mb-2 font-semibold">Planetary Positions Today</p>
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
          {activations?.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-wider text-gold/40 mb-2 font-semibold">Your Active Planetary Influences</p>
              <div className="space-y-1.5">
                {activations.map((a,i) => (
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
  const [error, setError] = useState(null);
  const [cosmicData, setCosmicData] = useState(null);

  // Compute cosmic data immediately — pure JS, no API needed
  useEffect(() => {
    if (!chart?.center) return;
    const dob = (profile?.dateOfBirth || '').split('T')[0];
    setCosmicData({
      planets:     getPlanetaryPositions(new Date()),
      moonPhase:   getMoonPhase(new Date()),
      timing:      getTimingCycles(dob, new Date()),
      activations: getCosmicActivations(chart, getPlanetaryPositions(new Date())),
    });
  }, [chart, profile]);

  // Fetch AI readings — triggered by button or language change
  const fetchReadings = useCallback(async (currentLang) => {
    if (!chart?.center) return;
    setLoading(true);
    setError(null);
    setReadings(null);
    try {
      const cosmic = cosmicData || {
        planets:   getPlanetaryPositions(new Date()),
        moonPhase: getMoonPhase(new Date()),
        timing:    getTimingCycles((profile?.dateOfBirth || '').split('T')[0], new Date()),
        activations: [],
      };
      const result = await generateAllReadings(
        { ...chart, fullName: profile?.fullName },
        currentLang,
        cosmic
      );
      setReadings(result);
    } catch (e) {
      console.error('[DestinyChart] Reading failed:', e);
      setError(e.message || 'Failed to generate reading. Check your API key.');
    } finally {
      setLoading(false);
    }
  }, [chart, profile, cosmicData]);

  // Auto-fetch when chart first loads
  useEffect(() => {
    if (!chart?.center) return;
    fetchReadings(lang);
  }, [chart]); // only on chart change, not lang

  if (!chart) return null;
  const dob = (profile?.dateOfBirth || '').split('T')[0];

  const SECTIONS = [
    { key:'soul',     icon: Star,    title:'Soul Essence',         subtitle:'Core Archetype', color:'#c99700' },
    { key:'wealth',   icon: Zap,     title:'Wealth & Career',      subtitle:'Money Channel',  color:'#60c080' },
    { key:'love',     icon: Heart,   title:'Love & Relationships',  subtitle:'Heart Channel',  color:'#e080a0' },
    { key:'karmic',   icon: Moon,    title:'Karmic Legacy',         subtitle:'Soul Karma',     color:'#a080d0' },
    { key:'purpose',  icon: Sun,     title:'Spiritual Purpose',     subtitle:'Higher Calling', color:'#6090e0' },
    { key:'forecast', icon: Compass, title:'Cosmic Forecast',       subtitle:'2025–2026',      color:'#e09050' },
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

      {/* Octagram Chart */}
      <div className="relative rounded-[28px] border border-white/8 bg-[#040c1a] overflow-hidden">
        <div className="absolute inset-0 rounded-[28px]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,151,0,0.08), transparent 65%)' }}/>
        <div className="relative flex justify-center p-4">
          <div className="w-full" style={{ maxWidth: 440 }}>
            <OctagramChart chart={chart}/>
          </div>
        </div>
        <div className="border-t border-white/6 px-5 py-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {[
            { label:'Soul',     v: chart.center,                       accent: true },
            { label:'Life',     v: chart.lifePath },
            { label:'Wealth ♥', v: chart.moneyChannel?.heart },
            { label:'Love ♥',   v: chart.relationshipChannel?.heart },
            { label:'Day',      v: chart.left },
            { label:'Month',    v: chart.top },
            { label:'Year',     v: chart.right },
            { label:'Karmic',   v: chart.karmicTail?.top },
          ].map(({ label, v, accent }) => (
            <div key={label} className={`text-center rounded-xl p-2 border ${accent ? 'border-gold/35 bg-gold/10' : 'border-white/6 bg-white/3'}`}>
              <p className="text-[8px] uppercase tracking-wider text-silver/35 mb-1 leading-3">{label}</p>
              <p className={`text-xl font-black font-display ${accent ? 'text-gold' : 'text-white'}`}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic Dashboard */}
      {cosmicData && (
        <CosmicDashboard
          moonPhase={cosmicData.moonPhase}
          planets={cosmicData.planets}
          timing={cosmicData.timing}
          activations={cosmicData.activations}
        />
      )}

      {/* AI Readings Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold"/>
          <h3 className="text-lg font-bold text-white font-display">Personalized Cosmic Reading</h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex gap-1.5">
            {[['en','English'],['si','සිංහල']].map(([code, label]) => (
              <button key={code}
                onClick={() => { setLang(code); fetchReadings(code); }}
                disabled={loading}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  lang === code
                    ? 'bg-gold text-slate-900 shadow-lg shadow-gold/20'
                    : 'bg-white/6 text-silver/60 hover:bg-white/10'
                } disabled:opacity-40`}>
                {label}
              </button>
            ))}
          </div>
          {/* Regenerate button */}
          <button onClick={() => fetchReadings(lang)} disabled={loading}
            className="p-2 rounded-full bg-white/6 text-silver/50 hover:bg-white/12 hover:text-white transition-all disabled:opacity-40">
            <RefreshCcw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}/>
          </button>
        </div>
      </div>

      {/* Global error banner */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-2xl border border-red-500/25 bg-red-950/30">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5"/>
          <div>
            <p className="text-sm font-semibold text-red-300">Reading failed</p>
            <p className="text-xs text-red-400/70 mt-0.5 leading-5">{error}</p>
            <p className="text-xs text-silver/40 mt-2">
              Make sure your <code className="bg-white/8 px-1 rounded text-white/60">VITE_GEMINI_API_KEY</code> is set in <code className="bg-white/8 px-1 rounded text-white/60">.env</code> and restart the dev server.
              Get a free key at <span className="text-blue-400">aistudio.google.com/app/apikey</span>
            </p>
          </div>
        </div>
      )}

      {/* Reading Sections */}
      <div className="space-y-3">
        {SECTIONS.map(({ key, icon, title, subtitle, color }) => (
          <ReadingCard
            key={key}
            icon={icon}
            title={title}
            subtitle={subtitle}
            content={readings?.[key]}
            color={color}
            loading={loading}
            error={!loading && error && !readings ? error : null}
          />
        ))}
      </div>

      {/* Download PDF export area */}
      <div className="pt-2">
        <p className="text-[10px] uppercase tracking-[0.25em] text-silver/30 mb-3 px-1">Export</p>
        {readings && !loading ? (
          <DownloadPDFButton
            chart={chart}
            profile={profile}
            readings={readings}
            cosmicData={cosmicData}
          />
        ) : (
          <button disabled
            className="w-full flex items-center gap-4 rounded-[20px] border border-white/12 bg-white/5 px-5 py-4 text-left text-silver/50 cursor-not-allowed">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl border border-white/10 bg-white/10 flex items-center justify-center">
              <Download className="h-4 w-4"/>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Download PDF Report</p>
              <p className="text-xs opacity-50 mt-0.5">
                {loading ? 'Generating your readings...' : error ? 'Fix the reading error above to enable download.' : 'Generate your reading to unlock the PDF button.'}
              </p>
            </div>
          </button>
        )}
      </div>

    </div>
  );
}