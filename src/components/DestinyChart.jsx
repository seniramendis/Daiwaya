import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Globe } from 'lucide-react';
import { generateAIReading } from '../services/aiReadingService';
import ReactMarkdown from 'react-markdown';

// ─── OCTAGRAM GEOMETRY ────────────────────────────────────────────────────────
const CX = 200, CY = 200, R_OUTER = 155, R_INNER = 65, R_MID = 108;

// 8 points of the octagram: 0=top, 1=top-right, 2=right, 3=bottom-right,
//                            4=bottom, 5=bottom-left, 6=left, 7=top-left
const octaPt = (i, r = R_OUTER) => {
  const angle = (i * 45 - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
};

// Star polygon: connect every other outer point
const starPath = () => {
  const pts = [0, 2, 4, 6, 0, 2].map(i => octaPt(i));
  const q = [1, 3, 5, 7, 1, 3].map(i => octaPt(i));
  // Two overlapping squares rotated 45°
  const sq = (indices) => indices.map(i => octaPt(i, R_OUTER));
  const s1 = [0,2,4,6].map(i => octaPt(i, R_OUTER));
  const s2 = [1,3,5,7].map(i => octaPt(i, R_OUTER));
  return {
    square1: s1.map((p,i) => `${i===0?'M':'L'}${p.x},${p.y}`).join(' ') + ' Z',
    square2: s2.map((p,i) => `${i===0?'M':'L'}${p.x},${p.y}`).join(' ') + ' Z',
  };
};

// Channel lines connecting nodes
const channelLine = (from, to) => {
  const a = octaPt(from), b = octaPt(to);
  return `M${a.x},${a.y} L${b.x},${b.y}`;
};

// Node label positions (outer ring)
const NODE_LABELS = [
  { idx: 0, label: 'Month', key: 'top' },
  { idx: 1, label: 'Sky', key: 'skyNode' },
  { idx: 2, label: 'Year', key: 'right' },
  { idx: 3, label: 'Money ♥', key: 'moneyHeart' },
  { idx: 4, label: 'Destiny', key: 'bottom' },
  { idx: 5, label: 'Karmic', key: 'karmicMid' },
  { idx: 6, label: 'Day', key: 'left' },
  { idx: 7, label: 'Earth', key: 'earthNode' },
];

const MID_NODES = [
  { angle: 0, label: 'Month Ent.', key: 'top' },   // placeholder for mid ring
  { angle: 2, label: 'Money Ent.', key: 'moneyEnt' },
  { angle: 4, label: 'Love Ent.', key: 'loveEnt' },
  { angle: 6, label: 'Life Path', key: 'lifePath' },
];

function NodeCircle({ x, y, value, label, size = 22, accent = false, pulse = false }) {
  return (
    <g>
      {pulse && (
        <circle cx={x} cy={y} r={size + 8} fill="none" stroke="#c99700" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values={`${size+4};${size+14};${size+4}`} dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      )}
      <circle cx={x} cy={y} r={size} fill={accent ? 'rgba(201,151,0,0.18)' : 'rgba(11,26,48,0.9)'}
        stroke={accent ? '#c99700' : 'rgba(255,255,255,0.2)'} strokeWidth={accent ? 1.5 : 1} />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
        fontSize={size > 20 ? 13 : 11} fontWeight="700" fill={accent ? '#f5c842' : '#e8e8f0'}
        fontFamily="'Cormorant Garamond', serif">
        {value}
      </text>
      {label && (
        <text x={x} y={y + size + 11} textAnchor="middle" dominantBaseline="middle"
          fontSize="7.5" fill="rgba(201,151,0,0.75)" fontFamily="Inter, sans-serif"
          letterSpacing="0.08em" fontWeight="600" textTransform="uppercase">
          {label.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function OctagramChart({ chart }) {
  const vals = {
    top: chart.top,
    right: chart.right,
    bottom: chart.bottom,
    left: chart.left,
    skyNode: chart.skyNode,
    earthNode: chart.earthNode,
    moneyHeart: chart.moneyChannel?.heart,
    karmicMid: chart.karmicTail?.middle,
    moneyEnt: chart.moneyChannel?.entrance,
    loveEnt: chart.relationshipChannel?.entrance,
    lifePath: chart.lifePath,
    root: chart.root,
    loveHeart: chart.relationshipChannel?.heart,
    karmicTop: chart.karmicTail?.top,
    purpose: chart.purpose?.spiritual,
  };

  const { square1, square2 } = starPath();

  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl" style={{ maxWidth: 460 }}>
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f1e35" />
          <stop offset="100%" stopColor="#030712" />
        </radialGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,151,0,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="goldGlowFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <circle cx={CX} cy={CY} r="198" fill="url(#bgGrad)" />
      <circle cx={CX} cy={CY} r="198" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Outer ring guide */}
      <circle cx={CX} cy={CY} r={R_OUTER + 28} fill="none" stroke="rgba(201,151,0,0.08)" strokeWidth="0.5" strokeDasharray="3 6" />
      <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="rgba(201,151,0,0.12)" strokeWidth="0.5" />
      <circle cx={CX} cy={CY} r={R_MID} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="2 5" />
      <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="rgba(201,151,0,0.12)" strokeWidth="0.5" />

      {/* Gold glow at center */}
      <circle cx={CX} cy={CY} r="80" fill="url(#goldGlow)" />

      {/* Octagram: two overlapping squares */}
      <path d={square1} fill="rgba(201,151,0,0.04)" stroke="rgba(201,151,0,0.35)" strokeWidth="0.8" filter="url(#glow)" />
      <path d={square2} fill="rgba(100,140,220,0.04)" stroke="rgba(150,180,255,0.2)" strokeWidth="0.8" filter="url(#glow)" />

      {/* Channel lines */}
      {/* Money channel: right → center */}
      <line x1={octaPt(2).x} y1={octaPt(2).y} x2={CX} y2={CY}
        stroke="rgba(201,151,0,0.25)" strokeWidth="0.8" strokeDasharray="4 3" />
      {/* Love channel: bottom → center */}
      <line x1={octaPt(4).x} y1={octaPt(4).y} x2={CX} y2={CY}
        stroke="rgba(150,180,255,0.2)" strokeWidth="0.8" strokeDasharray="4 3" />
      {/* Karmic: left → center */}
      <line x1={octaPt(6).x} y1={octaPt(6).y} x2={CX} y2={CY}
        stroke="rgba(200,100,200,0.18)" strokeWidth="0.8" strokeDasharray="4 3" />
      {/* Diagonals */}
      <line x1={octaPt(1).x} y1={octaPt(1).y} x2={octaPt(5).x} y2={octaPt(5).y}
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      <line x1={octaPt(3).x} y1={octaPt(3).y} x2={octaPt(7).x} y2={octaPt(7).y}
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      <line x1={octaPt(0).x} y1={octaPt(0).y} x2={octaPt(4).x} y2={octaPt(4).y}
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      <line x1={octaPt(2).x} y1={octaPt(2).y} x2={octaPt(6).x} y2={octaPt(6).y}
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />

      {/* Mid-ring nodes */}
      {[
        { i: 0, val: vals.top, lbl: '' },
        { i: 2, val: vals.moneyEnt, lbl: '' },
        { i: 4, val: vals.loveEnt, lbl: '' },
        { i: 6, val: vals.lifePath, lbl: '' },
      ].map(({ i, val, lbl }) => {
        const p = octaPt(i, R_MID);
        return (
          <NodeCircle key={`mid-${i}`} x={p.x} y={p.y} value={val} label={lbl} size={16} />
        );
      })}

      {/* Outer 8 nodes */}
      {NODE_LABELS.map(({ idx, label, key }) => {
        const p = octaPt(idx, R_OUTER);
        const v = key === 'moneyHeart' ? vals.moneyHeart
                : key === 'karmicMid' ? vals.karmicMid
                : vals[key];
        const isAccent = ['top','right','bottom','left'].includes(key);
        return (
          <NodeCircle key={`outer-${idx}`} x={p.x} y={p.y} value={v}
            label={label} size={22} accent={isAccent} />
        );
      })}

      {/* Center — Soul Archetype */}
      <NodeCircle x={CX} y={CY} value={chart.center} label="SOUL" size={32} accent pulse />

      {/* Corner sub-labels for purpose nodes */}
      {[
        { i: 1, val: vals.skyNode, lbl: 'SKY' },
        { i: 3, val: vals.moneyHeart, lbl: 'WEALTH ♥' },
        { i: 5, val: vals.karmicMid, lbl: 'KARMA' },
        { i: 7, val: vals.earthNode, lbl: 'EARTH' },
      ].map(({ i, val, lbl }) => {
        // Already rendered above as outer nodes, just add sub-label
        return null;
      })}

      {/* Purpose triangle at bottom (spiritual, personal, social) */}
      {(() => {
        const sp = { x: CX, y: CY + R_INNER - 5 };
        return (
          <g opacity="0.7">
            <text x={CX} y={CY + R_INNER + 20} textAnchor="middle"
              fontSize="7" fill="rgba(201,151,0,0.5)" fontFamily="Inter,sans-serif" letterSpacing="0.1em">
              PURPOSE · {vals.purpose}
            </text>
          </g>
        );
      })()}

      {/* Age ring tick marks */}
      {[...Array(36)].map((_, i) => {
        const angle = (i * 10 - 90) * (Math.PI / 180);
        const r1 = R_OUTER + 18, r2 = R_OUTER + (i % 9 === 0 ? 28 : 22);
        return (
          <line key={`tick-${i}`}
            x1={CX + r1 * Math.cos(angle)} y1={CY + r1 * Math.sin(angle)}
            x2={CX + r2 * Math.cos(angle)} y2={CY + r2 * Math.sin(angle)}
            stroke={i % 9 === 0 ? 'rgba(201,151,0,0.4)' : 'rgba(255,255,255,0.1)'}
            strokeWidth={i % 9 === 0 ? 1.2 : 0.5} />
        );
      })}
    </svg>
  );
}

// ─── MARKDOWN RENDERER ────────────────────────────────────────────────────────
function ReadingSection({ content }) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        components={{
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-gold mt-8 mb-3 pb-2 border-b border-gold/20 font-display tracking-wide">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-silver/85 leading-8 mb-4 text-sm">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function DestinyChart({ chart, profile }) {
  const [lang, setLang] = useState('en');
  const [reading, setReading] = useState('');
  const [loading, setLoading] = useState(false);
  const prevKey = useRef('');

  useEffect(() => {
    if (!chart?.center) return;
    const key = `${chart.center}-${lang}`;
    if (key === prevKey.current) return;
    prevKey.current = key;

    setLoading(true);
    setReading('');
    generateAIReading({ ...chart, fullName: profile?.fullName }, lang)
      .then(text => { setReading(text); setLoading(false); });
  }, [chart, lang]);

  if (!chart) return null;

  const dob = profile?.dateOfBirth?.split('T')[0] || profile?.dateOfBirth || '';

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/70">Daiwaya.lk · Matrix of Destiny</p>
        <h2 className="text-3xl font-black text-white font-display">
          {profile?.fullName || 'Your Destiny Blueprint'}
        </h2>
        {dob && (
          <p className="text-sm text-silver/50 tracking-wide">{dob}</p>
        )}
      </div>

      {/* Octagram Chart */}
      <div className="relative rounded-[32px] border border-white/10 bg-[#030a1a] p-6 shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute inset-0 rounded-[32px] opacity-30"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,151,0,0.12), transparent 70%)' }} />

        <div className="relative flex justify-center">
          <div className="w-full" style={{ maxWidth: 460 }}>
            <OctagramChart chart={chart} />
          </div>
        </div>

        {/* Node legend */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: 'Soul Center', value: chart.center, accent: true },
            { label: 'Life Path', value: chart.lifePath },
            { label: 'Wealth ♥', value: chart.moneyChannel?.heart },
            { label: 'Love ♥', value: chart.relationshipChannel?.heart },
            { label: 'Day Node', value: chart.left },
            { label: 'Month Node', value: chart.top },
            { label: 'Year Node', value: chart.right },
            { label: 'Karmic Peak', value: chart.karmicTail?.top },
          ].map(({ label, value, accent }) => (
            <div key={label}
              className={`rounded-2xl border p-3 text-center ${accent
                ? 'border-gold/40 bg-gold/10'
                : 'border-white/8 bg-white/3'}`}>
              <p className="text-xs text-silver/50 uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-2xl font-black font-display ${accent ? 'text-gold' : 'text-white'}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Reading Section */}
      <div className="rounded-[32px] border border-white/10 bg-[#080f1e] shadow-2xl overflow-hidden">

        {/* Reading header + language toggle */}
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gold/10">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Cosmic Intelligence</p>
              <h3 className="text-xl font-bold text-white font-display">Your Personal Destiny Reading</h3>
            </div>
          </div>
          <div className="flex gap-2">
            {[['en', 'English'], ['si', 'සිංහල']].map(([code, label]) => (
              <button key={code} onClick={() => setLang(code)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  lang === code
                    ? 'bg-gold text-slate-900 shadow-lg shadow-gold/20'
                    : 'bg-white/5 text-silver/70 hover:bg-white/10'
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reading body */}
        <div className="p-6 min-h-[300px]">
          {loading ? (
            <div className="space-y-5 py-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <p className="text-sm text-gold/60 italic">Consulting the cosmic matrix...</p>
              </div>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  {i % 3 === 0 && <div className="h-3 w-40 rounded-full bg-gold/15 animate-pulse mb-4" />}
                  <div className="h-2.5 w-full rounded-full bg-white/5 animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
                  <div className="h-2.5 w-11/12 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  <div className="h-2.5 w-4/5 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
                </div>
              ))}
            </div>
          ) : reading ? (
            <ReadingSection content={reading} />
          ) : (
            <div className="flex items-center justify-center h-48 text-silver/30 text-sm">
              Reading will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}