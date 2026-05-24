/**
 * predictionEngine.js
 * Deterministic, locally-computed predictions derived from Matrix nodes.
 * No API needed — instant, accurate, fully personalized.
 */

// ─── ARCHETYPE DATA ────────────────────────────────────────────────────────────
export const ARCHETYPES = {
  1:  { name:'The Magician',      element:'Fire',  planet:'Mercury', color:'#e05252', gem:'Ruby',      day:'Tuesday' },
  2:  { name:'The High Priestess',element:'Water', planet:'Moon',    color:'#8b9fd4', gem:'Pearl',     day:'Monday' },
  3:  { name:'The Empress',       element:'Earth', planet:'Venus',   color:'#7dbd7d', gem:'Emerald',   day:'Friday' },
  4:  { name:'The Emperor',       element:'Fire',  planet:'Mars',    color:'#d46b4a', gem:'Garnet',    day:'Tuesday' },
  5:  { name:'The Hierophant',    element:'Earth', planet:'Jupiter', color:'#c4a44a', gem:'Topaz',     day:'Thursday' },
  6:  { name:'The Lovers',        element:'Air',   planet:'Venus',   color:'#d48fb0', gem:'Rose Quartz',day:'Friday' },
  7:  { name:'The Chariot',       element:'Water', planet:'Moon',    color:'#6bafd4', gem:'Moonstone', day:'Monday' },
  8:  { name:'Strength',          element:'Fire',  planet:'Sun',     color:'#e5a030', gem:'Tiger Eye',  day:'Sunday' },
  9:  { name:'The Hermit',        element:'Earth', planet:'Mercury', color:'#9b8ec4', gem:'Amethyst',  day:'Wednesday' },
  10: { name:'Wheel of Fortune',  element:'Fire',  planet:'Jupiter', color:'#e0a020', gem:'Citrine',   day:'Thursday' },
  11: { name:'Justice',           element:'Air',   planet:'Saturn',  color:'#a0b8d0', gem:'Sapphire',  day:'Saturday' },
  12: { name:'The Hanged Man',    element:'Water', planet:'Neptune', color:'#7fb8d4', gem:'Aquamarine',day:'Wednesday' },
  13: { name:'Death',             element:'Water', planet:'Pluto',   color:'#8a5ca8', gem:'Obsidian',  day:'Tuesday' },
  14: { name:'Temperance',        element:'Fire',  planet:'Jupiter', color:'#78c4b0', gem:'Turquoise', day:'Thursday' },
  15: { name:'The Devil',         element:'Earth', planet:'Saturn',  color:'#c45a5a', gem:'Onyx',      day:'Saturday' },
  16: { name:'The Tower',         element:'Fire',  planet:'Mars',    color:'#e06030', gem:'Fire Opal', day:'Tuesday' },
  17: { name:'The Star',          element:'Air',   planet:'Uranus',  color:'#7090e0', gem:'Labradorite',day:'Wednesday' },
  18: { name:'The Moon',          element:'Water', planet:'Moon',    color:'#a090d0', gem:'Selenite',  day:'Monday' },
  19: { name:'The Sun',           element:'Fire',  planet:'Sun',     color:'#f0c030', gem:'Sunstone',  day:'Sunday' },
  20: { name:'Judgement',         element:'Fire',  planet:'Pluto',   color:'#d080a0', gem:'Diamond',   day:'Sunday' },
  21: { name:'The World',         element:'Earth', planet:'Saturn',  color:'#60c080', gem:'Jade',      day:'Saturday' },
  22: { name:'The Master Builder',element:'Earth', planet:'Uranus',  color:'#c09840', gem:'Golden Topaz',day:'Wednesday' },
};

// ─── COMPATIBILITY MAP ─────────────────────────────────────────────────────────
const COMPAT = {
  Fire:  ['Fire','Air'],
  Water: ['Water','Earth'],
  Earth: ['Earth','Water'],
  Air:   ['Air','Fire'],
};

export const getCompatibleArchetypes = (centerNode) => {
  const arch = ARCHETYPES[centerNode];
  if (!arch) return [];
  const goodElements = COMPAT[arch.element] || [];
  return Object.entries(ARCHETYPES)
    .filter(([n, a]) => Number(n) !== centerNode && goodElements.includes(a.element))
    .map(([n, a]) => ({ node: Number(n), ...a }))
    .slice(0, 4);
};

// ─── LUCKY NUMBERS ─────────────────────────────────────────────────────────────
export const getLuckyNumbers = (chart) => {
  const base = [chart.center, chart.lifePath, chart.left, chart.top];
  const derived = [
    (chart.center * 3) % 22 || 22,
    (chart.lifePath + chart.center) % 22 || 22,
    (chart.moneyChannel?.heart + chart.center) % 22 || 22,
  ];
  // Lucky single digits
  const single = [...new Set([...base, ...derived].map(n => n % 9 || 9))].slice(0, 3);
  return { matrix: base, single, power: chart.center };
};

// ─── FAVORABLE COLORS ──────────────────────────────────────────────────────────
export const getFavorableColors = (chart) => {
  const nodes = [chart.center, chart.lifePath, chart.moneyChannel?.heart, chart.relationshipChannel?.heart];
  return [...new Set(nodes.map(n => ARCHETYPES[n]?.color).filter(Boolean))].slice(0, 4);
};

// ─── CAREER PATHS ──────────────────────────────────────────────────────────────
const CAREER_MAP = {
  1:  ['Entrepreneur','CEO','Innovator','Inventor','Sales Director'],
  2:  ['Counselor','Diplomat','Nurse','Mediator','HR Specialist'],
  3:  ['Artist','Writer','Designer','Musician','Brand Strategist'],
  4:  ['Architect','Engineer','Project Manager','Accountant','Army Officer'],
  5:  ['Journalist','Teacher','Politician','Philosopher','PR Manager'],
  6:  ['Doctor','Social Worker','Interior Designer','Chef','Therapist'],
  7:  ['Researcher','Scientist','Analyst','Mystic','Software Developer'],
  8:  ['Banker','Real Estate Agent','Judge','Financial Advisor','COO'],
  9:  ['Humanitarian','NGO Director','Healer','Spiritual Teacher','Artist'],
  10: ['Investor','Trader','Entertainment CEO','Marketing Director','Coach'],
  11: ['Lawyer','Judge','Philosopher','Academic','Ethicist'],
  12: ['Therapist','Monk','Artist','Writer','Hospice Worker'],
  13: ['Surgeon','Psychologist','Researcher','Occultist','Crisis Manager'],
  14: ['Chef','Nutritionist','Diplomat','Alchemist','Integrative Doctor'],
  15: ['Executive','Motivational Speaker','PR Specialist','Lobbyist','Investor'],
  16: ['Revolutionary','Emergency Responder','Whistleblower','Reformer','Journalist'],
  17: ['Astronomer','Visionary Artist','Healer','Innovator','Futurist'],
  18: ['Poet','Psychic','Marine Biologist','Filmmaker','Dream Analyst'],
  19: ['Performer','Life Coach','Media Personality','Politician','Educator'],
  20: ['Judge','Spiritual Leader','Historian','Awakening Coach','Preacher'],
  21: ['World Traveler','International Diplomat','Global Entrepreneur','Master Teacher','UN Worker'],
  22: ['Architect','City Planner','Global Leader','Master Engineer','Legacy Builder'],
};

export const getCareerPaths = (chart) => {
  const primary = CAREER_MAP[chart.center] || [];
  const secondary = (CAREER_MAP[chart.lifePath] || []).filter(c => !primary.includes(c)).slice(0, 2);
  return { primary: primary.slice(0, 4), secondary };
};

// ─── HEALTH ZONES ──────────────────────────────────────────────────────────────
const HEALTH_MAP = {
  1:  { focus:'Heart & Circulation',  practices:['Cardio','Morning runs','Breathwork'],     caution:'Burnout from overwork' },
  2:  { focus:'Nervous System',       practices:['Meditation','Yoga','Moon rituals'],        caution:'Emotional overwhelm' },
  3:  { focus:'Throat & Lungs',       practices:['Singing','Dance','Creative movement'],     caution:'Suppressed expression' },
  4:  { focus:'Spine & Bones',        practices:['Weight training','Pilates','Structure'],   caution:'Rigidity & tension' },
  5:  { focus:'Liver & Gut',          practices:['Varied diet','Adventure sports','Travel'], caution:'Excess & restlessness' },
  6:  { focus:'Heart & Chest',        practices:['Gentle yoga','Art therapy','Nature'],      caution:'Giving too much' },
  7:  { focus:'Brain & Crown',        practices:['Meditation','Fasting','Silence'],          caution:'Isolation & overthinking' },
  8:  { focus:'Kidneys & Blood',      practices:['Martial arts','Power yoga','Sauna'],       caution:'Stress & dominance' },
  9:  { focus:'Immune & Digestive',   practices:['Service work','Fasting','Retreats'],       caution:'Martyrdom patterns' },
  10: { focus:'Joints & Circulation', practices:['Walking','Cycling','Timing fasts'],        caution:'Chance-taking with health' },
  11: { focus:'Glands & Balance',     practices:['Swimming','Balanced diet','Law of rhythm'],caution:'Imbalance & excess' },
  12: { focus:'Feet & Lymph',         practices:['Reflexology','Float tanks','Surrender'],   caution:'Stagnation & sacrifice' },
  13: { focus:'Colon & Detox',        practices:['Detox fasting','Rebirthing','Cold showers'],caution:'Holding onto old toxins' },
  14: { focus:'Hips & Metabolism',    practices:['Tai chi','Swimming','Moderate diet'],      caution:'Extremes in eating' },
  15: { focus:'Skin & Adrenals',      practices:['Shadow work','Earthing','Physical labor'], caution:'Addictive patterns' },
  16: { focus:'Head & Nervous',       practices:['Breathwork','Emergency preparedness','Grounding'],caution:'Sudden shocks' },
  17: { focus:'Ankles & Circulation', practices:['Stargazing walks','Aqua therapy','Hope journaling'],caution:'Disconnection from body' },
  18: { focus:'Lymph & Subconscious', practices:['Dream journaling','Moon baths','Intuitive healing'],caution:'Psychic overwhelm' },
  19: { focus:'Eyes & Spine',         practices:['Sun gazing (safe)','Dance','Joy practices'],caution:'Ego-driven burnout' },
  20: { focus:'Ears & Soul',          practices:['Sound healing','Spiritual fasting','Service'],caution:'Ignoring the call' },
  21: { focus:'Whole Body Integration',practices:['World travel','Integrative medicine','Completion rituals'],caution:'Spreading too thin' },
  22: { focus:'Skeletal & Foundation',practices:['Architecture of health','Cold therapy','Master plans'],caution:'Carrying others\' burdens' },
};

export const getHealthInsights = (chart) => HEALTH_MAP[chart.center] || HEALTH_MAP[1];

// ─── MONTHLY ENERGY FORECAST (based on personal year + chart) ─────────────────
export const getPersonalYear = (chart, birthDate) => {
  const currentYear = new Date().getFullYear();
  if (!birthDate) return chart.lifePath;
  const parts = birthDate.split('-');
  if (parts.length < 2) return chart.lifePath;
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2]?.split('T')[0] || parts[2], 10);
  const yearSum = String(currentYear).split('').map(Number).reduce((s, d) => s + d, 0);
  const raw = day + month + yearSum;
  let py = raw;
  while (py > 22) py = String(py).split('').map(Number).reduce((s,d) => s+d, 0);
  return py || 1;
};

const MONTH_THEMES = ['Initiation','Receptivity','Expression','Foundation','Change','Harmony','Reflection','Power','Completion','Fortune','Balance','Surrender'];

export const getMonthlyForecast = (chart, personalYear) => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed
  return MONTH_THEMES.map((theme, i) => {
    const monthOffset = (currentMonth + i) % 12;
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const energy = ((personalYear + i) % 22) || 22;
    const intensity = energy <= 11 ? 'Rising' : energy <= 17 ? 'Peak' : 'Waning';
    const focus = [
      'Career & Purpose','Love & Relationships','Wealth & Finance',
      'Health & Body','Spiritual Growth','Family & Home',
      'Creativity','Travel','Learning','Social','Karma','Rest',
    ][(personalYear + i + chart.center) % 12];
    return { month: monthNames[monthOffset], theme, energy, intensity, focus };
  }).slice(0, 6);
};

// ─── RELATIONSHIP COMPATIBILITY ────────────────────────────────────────────────
const RELATIONSHIP_STYLE = {
  1:'Independent lover who needs space to lead',
  2:'Deeply devoted, seeks emotional mirror',
  3:'Playful and expressive, needs creative partner',
  4:'Loyal and stable, builds love like a fortress',
  5:'Free-spirited, loves adventure and variety',
  6:'Nurturing, creates a beautiful home-heart',
  7:'Seeks deep soul connection over surface love',
  8:'Powerful partner, needs respect and equality',
  9:'Universal love, can over-give in relationships',
  10:'Attracted to fate-like meetings and destiny',
  11:'Seeks justice and balance in all partnerships',
  12:'Loves through sacrifice and spiritual devotion',
  13:'Transforms partners, loves through deep change',
  14:'Balanced and flowing, natural harmonizer',
  15:'Intensely magnetic, battles between freedom and passion',
  16:'Love comes through sudden, life-changing meetings',
  17:'Romantic idealist who loves with hope',
  18:'Deeply intuitive lover, feels before thinking',
  19:'Bright and joyful partner, loves to celebrate',
  20:'Seeks awakening through love and partnership',
  21:'Loves globally and completely, very fulfilling',
  22:'Builds legendary love stories that last generations',
};

export const getRelationshipProfile = (chart) => ({
  style: RELATIONSHIP_STYLE[chart.center] || '',
  loveNode: chart.relationshipChannel?.heart,
  soulMateNode: chart.relationshipChannel?.entrance,
  challengeNode: chart.karmicTail?.top,
  compatible: getCompatibleArchetypes(chart.center),
});

// ─── POWER DAYS ───────────────────────────────────────────────────────────────
export const getPowerDays = (chart) => {
  const arch = ARCHETYPES[chart.center];
  const lifeArch = ARCHETYPES[chart.lifePath];
  const days = [...new Set([arch?.day, lifeArch?.day].filter(Boolean))];
  const numbers = [chart.center, chart.lifePath, chart.left].filter(n => n <= 28);
  return { days, numbers };
};

// ─── MANTRA & AFFIRMATION ──────────────────────────────────────────────────────
const MANTRAS = {
  1: 'I create. I lead. I am the source of my reality.',
  2: 'I flow. I harmonize. My intuition guides me perfectly.',
  3: 'I express. I create beauty. Abundance flows through my art.',
  4: 'I build. I endure. My foundation is unshakeable.',
  5: 'I am free. I embrace change. Every door leads to expansion.',
  6: 'I love. I nurture. My heart is a sacred sanctuary.',
  7: 'I know. I reflect. Wisdom lives in the silence within.',
  8: 'I am power. I attract wealth. My energy commands respect.',
  9: 'I serve. I complete. The universe flows through my compassion.',
  10: 'I trust timing. Fortune spins in my favor. I am destiny.',
  11: 'I see truth. I honor balance. Justice flows through my choices.',
  12: 'I surrender. I gain. In stillness, my highest self emerges.',
  13: 'I transform. I release. Death of the old births my glory.',
  14: 'I blend. I flow. I am the alchemist of my own life.',
  15: 'I am free from chains. I master my shadow. I rise sovereign.',
  16: 'I welcome the storm. From ruins I build something greater.',
  17: 'I am light. I carry hope. The stars sing my name.',
  18: 'I trust my depths. The moon speaks through me. I am guided.',
  19: 'I radiate joy. I am the sun. Abundance follows my light.',
  20: 'I answer the call. I am awakened. My purpose is clear.',
  21: 'I am complete. I hold the world. My mastery is whole.',
  22: 'I build legacy. I manifest vision. My work echoes through time.',
};

export const getMantra = (chart) => MANTRAS[chart.center] || MANTRAS[1];

// ─── SHADOW WORK ───────────────────────────────────────────────────────────────
const SHADOWS = {
  1: 'Arrogance and fear of dependency',
  2: 'People-pleasing and losing self in others',
  3: 'Scattered energy and avoiding depth',
  4: 'Rigidity, control, and fear of change',
  5: 'Commitment-phobia and recklessness',
  6: 'Martyrdom and over-responsibility',
  7: 'Isolation, cynicism, and spiritual bypass',
  8: 'Greed, dominance, and workaholic cycles',
  9: 'Victimhood, resentment, and giving from emptiness',
  10: 'Gambling on fate instead of building',
  11: 'Cold judgment and inability to forgive',
  12: 'Self-sabotage and chosen suffering',
  13: 'Fear of endings and clinging to what must go',
  14: 'Avoidance of extremes needed for growth',
  15: 'Addiction, manipulation, and shadow projection',
  16: 'Ego destruction without rebuilding',
  17: 'False hope and spiritual bypassing',
  18: 'Paranoia, illusion, and fear of the dark',
  19: 'Ego inflation and attention dependency',
  20: "Ignoring the soul's call and spiritual guilt",
  21: "Inability to commit to one path — spreading too thin",
  22: 'Megalomania and carrying the weight of the world alone',
};

export const getShadowWork = (chart) => ({
  primary: SHADOWS[chart.center] || '',
  karmic: SHADOWS[chart.karmicTail?.top] || '',
});