import { useState, useMemo } from 'react';
import { RefreshCcw, Sparkles, Star } from 'lucide-react';
import OnboardingForm from '../components/OnboardingForm';
import DestinyChart from '../components/DestinyChart';
import Predictions from '../components/Predictions';
import { generateAIReading } from '../services/archetypeService';
import { getDestinyNodes, getNameVibration, getExpressionNumber, getSoulNumber, getPersonalityNumber } from '../utils/matrixEngine';

export default function ChartPage() {
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
    const chartData = {
      ...nodes,
      fullName: values.fullName,
      nameVibration:    getNameVibration(values.fullName),
      expressionNumber: getExpressionNumber(values.fullName),
      soulNumber:       getSoulNumber(values.fullName),
      personalityNumber:getPersonalityNumber(values.fullName),
    };

    setProfile(values);
    setChart(chartData);
    setArchetype(null);
    setLoadingArchetype(true);

    const readingText = await generateAIReading(chartData, 'en').catch(() => '');
    setArchetype({ title: `Soul Archetype ${nodes.center}`, description: readingText });
    setLoadingArchetype(false);
  };

  const activeArchetype = useMemo(() => {
    if (!chart) return null;
    return archetype || { title: `Archetype ${chart.center}`, description: 'Loading insight...' };
  }, [archetype, chart]);

  const reset = () => { setProfile(null); setChart(null); setArchetype(null); };

  return (
    <div className="page-enter min-h-screen pt-28 pb-20 px-4">
      <div className="mx-auto max-w-5xl flex flex-col gap-8">

        {!chart ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Form */}
            <div className="space-y-6">
              <div className="card-glow rounded-[28px] border border-white/8 bg-[#070f1d] p-6 shadow-glow">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Cosmic Onboarding</p>
                    <h2 className="text-2xl font-bold text-white font-display mt-0.5">Matrix of Destiny Builder</h2>
                  </div>
                  <Sparkles className="h-6 w-6 text-gold opacity-70"/>
                </div>
                <OnboardingForm onGenerate={handleGenerate} initialValues={profile}/>
              </div>
            </div>

            {/* Feature list */}
            <aside className="space-y-5">
              <div className="card-glow rounded-[28px] border border-white/8 bg-[#070f1d] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-2xl bg-gold/10">
                    <Star className="h-5 w-5 text-gold"/>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">What You Get</p>
                    <h4 className="text-lg font-bold text-white">Sacred Destiny Reading</h4>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-silver/60">
                  {[
                    '✦ Full octagram Matrix of Destiny chart',
                    '✦ Soul Archetype & Life Path analysis',
                    '✦ Wealth & Relationship channel readings',
                    '✦ Karmic tail & spiritual purpose nodes',
                    '✦ Live planetary positions & moon phase',
                    '✦ AI-generated personalized predictions',
                    '✦ English & Sinhala bilingual readings',
                    '✦ 2025–2026 personal cosmic forecast',
                  ].map(f => <li key={f} className="leading-6">{f}</li>)}
                </ul>
              </div>
              <div className="rounded-[28px] border border-gold/15 bg-gold/5 p-5 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 border border-gold/25
                  flex items-center justify-center font-display text-2xl font-black text-gold mb-3">22</div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold/50 mb-1">Master Builder</p>
                <p className="text-xs text-silver/40 leading-6">
                  No two Matrix charts are alike. Yours is generated fresh from your exact birth data.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Profile bar */}
            <div className="flex items-center justify-between rounded-[24px] border border-white/8 bg-[#070f1d] px-6 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Destiny Profile Active</p>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">
                  {profile?.fullName} · Soul {chart.center}
                </h3>
              </div>
              <button onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-white/12
                  bg-[#0a1428] px-4 py-2 text-sm font-medium text-silver/60 transition
                  hover:border-gold/30 hover:text-white">
                <RefreshCcw className="h-4 w-4 text-gold"/> New Reading
              </button>
            </div>

            <Predictions chart={chart} profile={profile} archetype={activeArchetype}/>

            <div className="rounded-[32px] border border-white/8 bg-[#070f1d] p-6">
              <DestinyChart chart={chart} profile={profile}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}