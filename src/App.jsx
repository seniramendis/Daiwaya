import { useMemo, useState } from 'react';
import { RefreshCcw, Sparkles, Star } from 'lucide-react';
import OnboardingForm from './components/OnboardingForm';
import DestinyChart from './components/DestinyChart';
import Predictions from './components/Predictions';
import { generateAIReading } from './services/archetypeService';
import { getDestinyNodes, getNameVibration, getExpressionNumber, getSoulNumber, getPersonalityNumber } from './utils/matrixEngine';
import DaiwayaLogo from '../Images/Logo/Daiwaya_Logo.png';

function App() {
  const [profile, setProfile] = useState(null);
  const [chart, setChart] = useState(null);
  const [archetype, setArchetype] = useState(null);
  const [loadingArchetype, setLoadingArchetype] = useState(false);

  const handleGenerate = async (values) => {
    const dateOnly = values.dateOfBirth.split('T')[0];
    const timeOnly = values.dateOfBirth.includes('T')
      ? values.dateOfBirth.split('T')[1]
      : (values.timeOfBirth || '00:00');

    const nodes = getDestinyNodes({ dateOfBirth: dateOnly, timeOfBirth: timeOnly });
    const nameVibration = getNameVibration(values.fullName);
    const expressionNumber = getExpressionNumber(values.fullName);
    const soulNumber = getSoulNumber(values.fullName);
    const personalityNumber = getPersonalityNumber(values.fullName);

    const chartData = {
      ...nodes,
      fullName: values.fullName,
      nameVibration,
      expressionNumber,
      soulNumber,
      personalityNumber,
    };

    setProfile(values);
    setChart(chartData);
    setArchetype(null);
    setLoadingArchetype(true);

    const readingText = await generateAIReading(chartData, 'en');
    setArchetype({ title: `Soul Archetype ${nodes.center}`, description: readingText });
    setLoadingArchetype(false);
  };

  const activeArchetype = useMemo(() => {
    if (!chart) return null;
    return archetype || { title: `Archetype ${chart.center}`, description: 'Loading insight...' };
  }, [archetype, chart]);

  const reset = () => { setProfile(null); setChart(null); setArchetype(null); };

  return (
    <div className="min-h-screen bg-cosmic px-4 py-6 text-silver">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">

        {/* Nav */}
        <nav className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/4 p-5 shadow-glow backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={DaiwayaLogo} alt="Daiwaya.lk logo"
              className="h-12 w-12 rounded-2xl object-contain border border-white/10 bg-slate-950/70 p-1.5" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Daiwaya.lk</p>
              <h1 className="text-3xl font-black tracking-tight text-white font-display">දෛවය.lk</h1>
              <p className="text-xs text-silver/50">Matrix of Destiny · Sri Lanka</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-silver/60">Premium numerology for Sri Lanka</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-silver/35 mt-0.5">AI-powered cosmic intelligence</p>
          </div>
        </nav>

        {/* Main content */}
        {!chart ? (
          /* Pre-generation layout */
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/4 p-6 shadow-glow backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Cosmic Onboarding</p>
                    <h2 className="text-2xl font-bold text-white mt-0.5">Matrix of Destiny Builder</h2>
                  </div>
                  <Sparkles className="h-6 w-6 text-gold opacity-70" />
                </div>
                <OnboardingForm onGenerate={handleGenerate} initialValues={profile} />
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[28px] border border-white/10 bg-white/4 p-6 shadow-glow backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-2xl bg-gold/10"><Star className="h-5 w-5 text-gold" /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80">What You Get</p>
                    <h4 className="text-lg font-bold text-white">Sacred Destiny Reading</h4>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-silver/70">
                  {[
                    '✦ Full octagram Matrix of Destiny chart',
                    '✦ Soul Archetype & Life Path analysis',
                    '✦ Wealth & Relationship channel readings',
                    '✦ Karmic tail & spiritual purpose',
                    '✦ AI-generated personalized predictions',
                    '✦ English & Sinhala bilingual readings',
                    '✦ 2025–2026 personal cosmic forecast',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2 leading-6">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-gold/20 bg-gold/5 p-5 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/30
                  flex items-center justify-center text-3xl font-black text-gold font-display mb-3">
                  22
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold/60 mb-1">Master Builder</p>
                <p className="text-sm text-silver/50 leading-6">
                  The center archetype is revealed from your exact birth data — no two charts are alike.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          /* Post-generation layout */
          <div className="space-y-8">
            {/* Profile bar */}
            <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/4 px-6 py-4 shadow-glow backdrop-blur-xl">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Destiny Profile Active</p>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">
                  {profile?.fullName} · Soul {chart.center}
                </h3>
              </div>
              <button onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/70
                  px-4 py-2 text-sm font-medium text-silver transition hover:border-gold/40 hover:bg-slate-800/90">
                <RefreshCcw className="h-4 w-4 text-gold" /> New Reading
              </button>
            </div>

            {/* Stats summary */}
            <Predictions chart={chart} profile={profile} archetype={activeArchetype} />

            {/* Octagram chart + AI reading */}
            <div className="rounded-[32px] border border-white/10 bg-white/3 p-6 shadow-glow backdrop-blur-xl">
              <DestinyChart chart={chart} profile={profile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;