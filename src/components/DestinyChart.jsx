import { Star } from 'lucide-react';

function DestinyChart({ chart, profile }) {
  const labels = [
    { position: 'left', label: 'Day', value: chart.left },
    { position: 'top', label: 'Month', value: chart.top },
    { position: 'right', label: 'Year', value: chart.right },
    { position: 'bottom', label: 'Anchor', value: chart.bottom },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-gold/90">Octagram of Destiny</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Symmetrical Chart View</h3>
        <p className="mt-3 text-sm leading-6 text-silver/80">
          Your name and birth time are transformed into a sacred geometry chart. Explore the nodes of your Matrix of Destiny.
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-[36px] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-2xl">
        <div className="relative mx-auto h-[360px] w-[360px] sm:h-[380px] sm:w-[380px]">
          <svg viewBox="0 0 380 380" className="h-full w-full">
            <defs>
              <linearGradient id="goldGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c99700" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f4e3a8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <circle cx="190" cy="190" r="170" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <g stroke="url(#goldGlow)" strokeWidth="2" strokeLinecap="round">
              <line x1="190" y1="20" x2="190" y2="360" />
              <line x1="20" y1="190" x2="360" y2="190" />
              <line x1="70" y1="70" x2="310" y2="310" />
              <line x1="310" y1="70" x2="70" y2="310" />
            </g>
            <g fill="rgba(255,255,255,0.95)">
              <circle cx="190" cy="190" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
              {labels.map((item) => {
                const coords = {
                  left: { x: 60, y: 190 },
                  top: { x: 190, y: 60 },
                  right: { x: 320, y: 190 },
                  bottom: { x: 190, y: 320 },
                }[item.position];
                return (
                  <g key={item.position}>
                    <circle cx={coords.x} cy={coords.y} r="32" fill="rgba(201, 151, 0, 0.18)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" />
                    <text x={coords.x} y={coords.y - 10} textAnchor="middle" fontSize="12" fill="#f8f8fb" opacity="0.86">
                      {item.label}
                    </text>
                    <text x={coords.x} y={coords.y + 12} textAnchor="middle" fontSize="24" fontWeight="700" fill="#fff">
                      {item.value}
                    </text>
                  </g>
                );
              })}
              <circle cx="190" cy="190" r="52" fill="rgba(255,255,255,0.04)" stroke="rgba(201, 151, 0, 0.45)" strokeWidth="2" />
              <text x="190" y="176" textAnchor="middle" fontSize="12" fill="#f5f5f7" opacity="0.8">
                Center Archetype
              </text>
              <text x="190" y="202" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fff">
                {chart.center}
              </text>
            </g>
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/80">
            <Star className="mx-auto h-12 w-12" />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {labels.map((item) => (
            <div key={item.position} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-silver/60">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Life Path</p>
            <p className="mt-2 text-3xl font-semibold text-white">{chart.lifePath}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Root Number</p>
            <p className="mt-2 text-3xl font-semibold text-white">{chart.root}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Time Pulse</p>
            <p className="mt-2 text-3xl font-semibold text-white">{chart.timePulse}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Soul Number</p>
            <p className="mt-2 text-3xl font-semibold text-white">{chart.soulNumber}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Expression</p>
            <p className="mt-2 text-3xl font-semibold text-white">{chart.expressionNumber}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Personality</p>
            <p className="mt-2 text-3xl font-semibold text-white">{chart.personalityNumber}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Name Vibration</p>
            <p className="mt-2 text-3xl font-semibold text-white">{chart.nameVibration}</p>
          </div>
          <div className="sm:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Soul Archetype</p>
            <p className="mt-2 text-3xl font-semibold text-gold">{chart.center}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-silver/90">
        <p className="font-medium text-white">Birth Details</p>
        <p className="mt-2">Name: {profile.fullName}</p>
        <p>
          Born:{' '}
          {new Date(`${profile.dateOfBirth}T${profile.timeOfBirth}`).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
      </div>
    </div>
  );
}

export default DestinyChart;
