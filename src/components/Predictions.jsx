import React from 'react';

const ARCHETYPE_NAMES = {
  1:'The Magician',2:'The High Priestess',3:'The Empress',4:'The Emperor',
  5:'The Hierophant',6:'The Lovers',7:'The Chariot',8:'Strength',
  9:'The Hermit',10:'Wheel of Fortune',11:'Justice',12:'The Hanged Man',
  13:'Death',14:'Temperance',15:'The Devil',16:'The Tower',
  17:'The Star',18:'The Moon',19:'The Sun',20:'Judgement',
  21:'The World',22:'The Master Builder',
};

const QUALITIES = {
  1:'Leadership · Manifestation · Willpower',
  2:'Intuition · Diplomacy · Balance',
  3:'Creativity · Expression · Abundance',
  4:'Structure · Discipline · Foundation',
  5:'Freedom · Change · Adventure',
  6:'Harmony · Love · Responsibility',
  7:'Wisdom · Spirituality · Analysis',
  8:'Power · Wealth · Achievement',
  9:'Compassion · Completion · Wisdom',
  10:'Fortune · Cycles · Timing',
  11:'Truth · Justice · Clarity',
  12:'Surrender · Reflection · Patience',
  13:'Transformation · Release · Rebirth',
  14:'Balance · Flow · Integration',
  15:'Ambition · Shadow · Liberation',
  16:'Revelation · Awakening · Courage',
  17:'Hope · Renewal · Inspiration',
  18:'Mystery · Depth · Intuition',
  19:'Joy · Success · Radiance',
  20:'Awakening · Renewal · Accountability',
  21:'Completion · Mastery · Integration',
  22:'Vision · Legacy · Mastery',
};

function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`rounded-2xl border p-4 text-center transition-all hover:scale-[1.02] ${
      accent
        ? 'border-gold/40 bg-gradient-to-b from-gold/15 to-gold/5 shadow-lg shadow-gold/10'
        : 'border-white/8 bg-white/3 hover:border-white/15'
    }`}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-silver/50 mb-2">{label}</p>
      <p className={`text-4xl font-black font-display mb-1 ${accent ? 'text-gold' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-[10px] text-silver/40 leading-4">{sub}</p>}
    </div>
  );
}

export default function Predictions({ chart, profile }) {
  if (!chart) return null;

  const centerName = ARCHETYPE_NAMES[chart.center] || `Archetype ${chart.center}`;
  const centerQuality = QUALITIES[chart.center] || '';

  return (
    <div className="space-y-6">

      {/* Soul Archetype hero card */}
      <div className="rounded-[28px] border border-gold/25 bg-gradient-to-br from-[#0d1a2e] to-[#050d1a] p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c99700, transparent)', transform: 'translate(30%,-30%)' }} />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-2">Soul Archetype</p>
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-20 h-20 rounded-3xl border border-gold/30 bg-gold/10
              flex items-center justify-center text-4xl font-black text-gold font-display shadow-lg">
              {chart.center}
            </div>
            <div>
              <h3 className="text-2xl font-black text-white font-display">{centerName}</h3>
              <p className="text-sm text-gold/70 mt-1">{centerQuality}</p>
              <p className="text-xs text-silver/45 mt-2">
                Generated for {profile?.fullName || 'You'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Numbers Grid */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-silver/40 mb-3 px-1">Core Matrix Numbers</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Soul Center" value={chart.center} accent
            sub={ARCHETYPE_NAMES[chart.center]} />
          <StatCard label="Life Path" value={chart.lifePath}
            sub={ARCHETYPE_NAMES[chart.lifePath]} />
          <StatCard label="Expression" value={chart.expressionNumber}
            sub={ARCHETYPE_NAMES[chart.expressionNumber]} />
          <StatCard label="Soul Urge" value={chart.soulNumber}
            sub={ARCHETYPE_NAMES[chart.soulNumber]} />
        </div>
      </div>

      {/* Channels Grid */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-silver/40 mb-3 px-1">Energy Channels</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Wealth ♥" value={chart.moneyChannel?.heart}
            sub={QUALITIES[chart.moneyChannel?.heart]} />
          <StatCard label="Love ♥" value={chart.relationshipChannel?.heart}
            sub={QUALITIES[chart.relationshipChannel?.heart]} />
          <StatCard label="Karmic Peak" value={chart.karmicTail?.top}
            sub={ARCHETYPE_NAMES[chart.karmicTail?.top]} />
          <StatCard label="Purpose" value={chart.purpose?.spiritual}
            sub={QUALITIES[chart.purpose?.spiritual]} />
        </div>
      </div>

      {/* Day/Month/Year breakdown */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-silver/40 mb-3 px-1">Birth Node Breakdown</p>
        <div className="rounded-[24px] border border-white/8 bg-white/3 divide-y divide-white/5">
          {[
            { label: 'Day Node', value: chart.left, desc: 'Physical energy & natural talents' },
            { label: 'Month Node', value: chart.top, desc: 'Emotional energy & karmic gifts' },
            { label: 'Year Node', value: chart.right, desc: 'Ancestral energy & life purpose' },
            { label: 'Destiny Sum', value: chart.bottom, desc: 'Accumulated soul mission' },
          ].map(({ label, value, desc }) => (
            <div key={label} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-silver/45 mt-0.5">{desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-silver/40">{ARCHETYPE_NAMES[value]}</span>
                <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5
                  flex items-center justify-center text-lg font-black text-white font-display">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}