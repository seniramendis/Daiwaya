function Predictions({ chart, profile, archetype }) {
  const numberMeanings = {
    1: 'Leadership, Independence, Pioneering Spirit',
    2: 'Diplomacy, Harmony, Intuition',
    3: 'Creativity, Communication, Expression',
    4: 'Stability, Structure, Foundation',
    5: 'Freedom, Adventure, Change',
    6: 'Responsibility, Care, Balance',
    7: 'Spirituality, Analysis, Wisdom',
    8: 'Power, Abundance, Achievement',
    9: 'Compassion, Completion, Humanitarianism',
    10: 'Potential, New Beginnings, Wholeness',
    11: 'Intuition, Vision, Inspiration',
    12: 'Sacrifice, Rebirth, Transformation',
    13: 'Evolution, Rebirth, Spiritual Growth',
    14: 'Temperance, Balance, Harmony',
    15: 'Challenge, Evolution, Temptation',
    16: 'Sudden Change, Revelation, Awakening',
    17: 'Hope, Inspiration, Guidance',
    18: 'Illusion, Mystery, Intuition',
    19: 'Success, Clarity, Achievement',
    20: 'Awakening, Judgment, Renewal',
    21: 'Completion, Fulfillment, Integration',
    22: 'Mastery, Vision, Legacy',
  };

  const interpretations = {
    career: {
      1: 'Natural born leader. Pursue entrepreneurial ventures or leadership roles.',
      2: 'Excellent mediator and diplomat. Thrive in partnerships and collaborative roles.',
      3: 'Creative professional with strong communication skills.',
      4: 'Structured thinker who excels in organization and planning.',
      5: 'Adaptable and versatile in various professional environments.',
      6: 'Caring professional, suited for roles involving service and responsibility.',
      7: 'Analytical and spiritual, excels in research, philosophy, or spiritual counseling.',
      8: 'Business acumen and ability to accumulate wealth and power.',
      9: 'Humanitarian values, suited for charitable or social work.',
      10: 'Leader with potential for new ventures and fresh starts.',
      11: 'Visionary with strong intuition, suited for innovation.',
      12: 'Transformative role, excellent for healing and counseling professions.',
      13: 'Pioneer in transformation and spiritual growth fields.',
      14: 'Balanced approach to work, suited for diplomacy and negotiation.',
      15: 'Challenge-lover who thrives in dynamic and evolving environments.',
      16: 'Transformative impact in career, naturally breaks outdated systems.',
      17: 'Inspirational guide, excellent mentor and beacon of hope.',
      18: 'Intuitive professional, suited for roles involving mystery or imagination.',
      19: 'Achiever with clarity of vision, natural success.',
      20: 'Awakened professional with renewal energy, excellent for training and development.',
      21: 'Completes projects successfully, master of integration.',
      22: 'Master builder and visionary leader with lasting legacy.',
    },
    love: {
      1: 'Independent spirit, seeks partner who respects autonomy.',
      2: 'Seeks deep emotional connection and partnership.',
      3: 'Communicative and fun-loving in relationships.',
      4: 'Loyal and committed, values stability in love.',
      5: 'Seeks freedom and adventure in romantic relationships.',
      6: 'Caring and responsible partner, creates harmonious home.',
      7: 'Seeks deep spiritual and intellectual connection.',
      8: 'Ambitious partner who values respect and equality.',
      9: 'Compassionate and universal in love, values service.',
      10: 'Potential for powerful new romantic beginnings.',
      11: 'Intuitive and spiritual connection with partner.',
      12: 'Transformative love that heals and renews.',
      13: 'Evolving relationship that promotes spiritual growth.',
      14: 'Balanced and harmonious romantic partnership.',
      15: 'Passionate and intense emotional connection.',
      16: 'Transformative meeting that changes life direction.',
      17: 'Inspiring and hopeful love that guides.',
      18: 'Mysterious and intuitive romantic connection.',
      19: 'Clear and successful romantic partnership.',
      20: 'Awakening love that brings renewal and judgment.',
      21: 'Complete and fulfilled romantic integration.',
      22: 'Master relationship with legendary quality.',
    },
    health: {
      1: 'Active lifestyle needed. Be mindful of overexertion.',
      2: 'Balance physical and emotional well-being. Stress management essential.',
      3: 'Creative outlets support mental health. Avoid nervous tension.',
      4: 'Strong constitution. Regular routine and exercise maintain wellness.',
      5: 'Variety in exercise keeps you healthy. Avoid extremes.',
      6: 'Responsible health habits. Balance care for self and others.',
      7: 'Spiritual practices support healing. Meditation beneficial.',
      8: 'Manage stress through power practices like martial arts.',
      9: 'Humanitarian health pursuits. Universal healing energy.',
      10: 'Fresh starts with health regimens. Powerful potential for renewal.',
      11: 'Intuitive health awareness. Trust your body\'s signals.',
      12: 'Healing through transformation and sacrifice.',
      13: 'Spiritual evolution supports healing journey.',
      14: 'Balance in diet and exercise for optimal health.',
      15: 'Challenge yourself with health goals. Intensity aids growth.',
      16: 'Sudden health revelations lead to powerful change.',
      17: 'Inspired wellness journey with hopeful outcomes.',
      18: 'Trust intuition for mysterious health insights.',
      19: 'Clear health goals achieve success.',
      20: 'Awakening to true wellness potential.',
      21: 'Complete health integration and fulfillment.',
      22: 'Master of holistic health and legacy.',
    },
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.28em] text-gold/90">Complete Numerology Report</p>
          <h3 className="mt-2 text-3xl font-semibold text-white font-display">Your Personal Destiny Reading</h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Soul Archetype</p>
            <p className="mt-3 text-5xl font-black text-gold">{chart.center}</p>
            <p className="mt-4 text-sm font-medium text-white">{numberMeanings[chart.center]}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Life Path</p>
            <p className="mt-3 text-5xl font-black text-gold">{chart.lifePath}</p>
            <p className="mt-4 text-sm font-medium text-white">{numberMeanings[chart.lifePath]}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-silver/60">Expression</p>
            <p className="mt-3 text-5xl font-black text-gold">{chart.expressionNumber}</p>
            <p className="mt-4 text-sm font-medium text-white">{numberMeanings[chart.expressionNumber]}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <h3 className="mb-6 text-2xl font-semibold text-white font-display">Career & Life Purpose</h3>
        <p className="text-base leading-8 text-silver/90">{interpretations.career[chart.center]}</p>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <h3 className="mb-6 text-2xl font-semibold text-white font-display">Love & Relationships</h3>
        <p className="text-base leading-8 text-silver/90">{interpretations.love[chart.center]}</p>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <h3 className="mb-6 text-2xl font-semibold text-white font-display">Health & Wellness</h3>
        <p className="text-base leading-8 text-silver/90">{interpretations.health[chart.center]}</p>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <h3 className="mb-6 text-2xl font-semibold text-white font-display">Your Archetype Guide</h3>
        <div className="space-y-4 text-sm leading-8 text-silver/90">
          {archetype && (
            <>
              <p className="text-xl font-semibold text-gold">{archetype.title}</p>
              {archetype.description.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Predictions;
