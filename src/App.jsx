import { useMemo, useState } from 'react';
import { ArrowRight, RefreshCcw, Sparkles, Star } from 'lucide-react';
import OnboardingForm from './components/OnboardingForm';
import DestinyChart from './components/DestinyChart';
import Predictions from './components/Predictions';
import { fetchArchetype } from './services/archetypeService';
import { getDestinyNodes, reduceTo22, getNameVibration, getExpressionNumber, getSoulNumber, getPersonalityNumber } from './utils/matrixEngine';
import DaiwayaLogo from '../Images/Logo/Daiwaya_Logo.png';

function App() {
  const [profile, setProfile] = useState(null);
  const [chart, setChart] = useState(null);
  const [archetype, setArchetype] = useState(null);
  const [loadingArchetype, setLoadingArchetype] = useState(false);

  const handleGenerate = async (values) => {
    const nodes = getDestinyNodes({ dateOfBirth: values.dateOfBirth, timeOfBirth: values.timeOfBirth });
    const center = reduceTo22(nodes.left + nodes.top + nodes.right + nodes.bottom);
    const nameVibration = getNameVibration(values.fullName);
    const expressionNumber = getExpressionNumber(values.fullName);
    const soulNumber = getSoulNumber(values.fullName);
    const personalityNumber = getPersonalityNumber(values.fullName);

    setProfile(values);
    setChart({
      ...nodes,
      center,
      nameVibration,
      expressionNumber,
      soulNumber,
      personalityNumber,
    });
    setArchetype(null);
    setLoadingArchetype(true);

    const fetchedArchetype = await fetchArchetype(center);
    setArchetype(fetchedArchetype);
    setLoadingArchetype(false);
  };

  const activeArchetype = useMemo(() => {
    if (!chart) return null;
    return archetype || { title: `Archetype ${chart.center}`, description: 'Loading insight...' };
  }, [archetype, chart]);

  const reset = () => {
    setProfile(null);
    setChart(null);
  };

  return (
    <div className="min-h-screen bg-cosmic px-4 py-6 text-silver">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <nav className="flex flex-col gap-5 rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={DaiwayaLogo} alt="Daiwaya.lk logo" className="h-14 w-14 rounded-3xl object-contain border border-white/10 bg-slate-950/70 p-2" />
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold/90">Daiwaya.lk</p>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl font-display">Daiwaya.lk</h1>
              <p className="text-base font-semibold text-gold font-display">දෛවය.lk</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-right sm:items-end sm:text-right">
            <p className="text-sm text-silver/80">Premium Matrix of Destiny numerology for Sri Lanka.</p>
            <p className="text-xs uppercase tracking-[0.28em] text-silver/50">Future-ready analytics with local insight</p>
          </div>
        </nav>

        <header className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.28em] text-gold/90">Matrix of Destiny</p>
              <h2 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl font-display">
                Your premium Sri Lankan destiny chart, crafted with cosmic clarity.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-silver/80">
                Daiwaya.lk generates a more authentic Matrix of Destiny profile with birth time precision, name vibration, and bilingual archetype guidance. The result is cleaner, richer, and professionally presented.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold">
                  Premium Sri Lankan UX
                </span>
                <span className="rounded-full border border-silver/20 bg-slate-950/60 px-4 py-2 text-xs uppercase tracking-[0.24em] text-silver/80">
                  API-ready intelligence
                </span>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 text-center shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-gold/90">Next-level chart preview</p>
              <div className="mt-6 inline-flex h-36 w-36 items-center justify-center rounded-full bg-white/5 text-5xl font-black text-gold shadow-[0_0_60px_rgba(201,151,0,0.18)]">
                22
              </div>
              <p className="mt-5 text-sm leading-6 text-silver/80">
                A smarter archetype engine with richer numerology context that supports both local fallback and remote API enrichment.
              </p>
            </div>
          </div>
        </header>

        <main className={chart ? 'space-y-8' : 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'}>
          <section className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-gold/90">Cosmic Onboarding</p>
                  <h2 className="text-3xl font-semibold text-white">Matrix of Destiny Builder</h2>
                </div>
                <Sparkles className="h-8 w-8 text-gold" />
              </div>
              <OnboardingForm onGenerate={handleGenerate} initialValues={profile} />
            </div>

            {chart && (
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-gold/90">Destiny Profile Generated</p>
                    <h3 className="mt-1 text-2xl font-semibold text-white font-display">Soul Archetype {chart.center}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/70 px-4 py-2 text-sm font-medium text-silver transition hover:border-gold/40 hover:bg-slate-800/90"
                  >
                    <RefreshCcw className="h-4 w-4 text-gold" /> Recalculate
                  </button>
                </div>

                <Predictions chart={chart} profile={profile} archetype={activeArchetype} />

                <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
                  <DestinyChart chart={chart} profile={profile} />
                </div>
              </div>
            )}
          </section>

          <aside className={chart ? 'hidden' : 'space-y-6'}>
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="rounded-3xl bg-gold/10 p-3 text-gold">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gold/90">Premium Numerology</p>
                  <h4 className="text-xl font-semibold text-white">Sacred Sri Lankan Guidance</h4>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-silver/80">
                Designed for mobile-first Sri Lankan users, Daiwaya.lk fuses elegant celestial styling with an intuitive Matrix of Destiny flow. The chart responds instantly, with a seamless reset path back to the form.
              </p>
            </div>

            {chart ? (
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
                <DestinyChart chart={chart} profile={profile} />
              </div>
            ) : (
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-gold/90">Ready for your chart?</p>
                <p className="mt-3 text-sm leading-7 text-silver/80">
                  Enter your exact birth details to generate a harmonious octagram representation of your Matrix of Destiny. The center archetype is revealed with bilingual guidance.
                </p>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
