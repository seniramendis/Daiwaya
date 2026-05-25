export default function AboutPage() {
  return (
    <div className="page-enter min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/60">The System</p>
          <h1 className="font-display text-5xl font-black text-white">What is Matrix of Destiny?</h1>
          <p className="text-silver/50 leading-8 text-sm max-w-xl mx-auto">
            A sacred numerological system originating in ancient metaphysical traditions,
            revealing the cosmic blueprint encoded in your exact birth date.
          </p>
        </div>
        {[
          { title: 'The 22 Archetypes', body: 'Each position in the Matrix corresponds to one of 22 archetypal energies — from The Magician (1) to The Master Builder (22). These aren\'t random — they describe the frequency your soul chose before incarnating.' },
          { title: 'The Octagram Structure', body: 'Your birth day, month, and year create four cardinal nodes. From these, a full octagram of 8+ positions is calculated, each revealing a different life channel: money, love, karma, purpose, and more.' },
          { title: 'Why Sri Lanka?', body: 'Daiwaya.lk is built specifically for our culture — bilingual readings in English and Sinhala, with interpretations rooted in both Vedic numerological wisdom and the Matrix of Destiny system.' },
          { title: 'AI-Powered Readings', body: 'Unlike static charts, every reading is generated fresh using Google Gemini AI — with your real planetary positions, personal timing cycles, and unique matrix node combination woven into every word.' },
        ].map(({ title, body }) => (
          <div key={title} className="card-glow rounded-[24px] border border-white/8 bg-[#070f1d] p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-silver/60 leading-8 text-sm">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}