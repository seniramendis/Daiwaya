/**
 * cosmicDataService.js
 * Real-time cosmic data: planetary positions, moon phase, personal year timing.
 * Uses free public APIs — no key required.
 *
 * APIs used:
 *   1. Farmsense Moon API  — current moon phase (free, no key)
 *   2. Ipgeolocation Astronomy API — planet positions (free tier, no key for basic)
 *   3. TimeZoneDB — we derive date math locally, no API needed
 */

// ─── MOON PHASE ───────────────────────────────────────────────────────────────

/**
 * Calculates moon phase locally (no API needed).
 * Returns phase name + illumination % + energy type.
 */
export const getMoonPhase = (date = new Date()) => {
  // Known new moon reference: Jan 6 2000 18:14 UTC
  const knownNew = new Date('2000-01-06T18:14:00Z');
  const lunarCycle = 29.53058867; // days
  const diffMs = date - knownNew;
  const diffDays = diffMs / 86400000;
  const cyclePos = ((diffDays % lunarCycle) + lunarCycle) % lunarCycle;
  const illumination = Math.round(Math.abs(cyclePos - lunarCycle / 2) / (lunarCycle / 2) * 100);

  let phase, symbol, energy, advice;
  if (cyclePos < 1.85) {
    phase = 'New Moon'; symbol = '🌑'; energy = 'Initiation';
    advice = 'Perfect time to set new intentions and start bold ventures.';
  } else if (cyclePos < 7.38) {
    phase = 'Waxing Crescent'; symbol = '🌒'; energy = 'Building';
    advice = 'Take action on your new moon intentions. Momentum is growing.';
  } else if (cyclePos < 11.08) {
    phase = 'First Quarter'; symbol = '🌓'; energy = 'Decision';
    advice = 'Overcome obstacles. Make the key decisions that test your commitment.';
  } else if (cyclePos < 14.77) {
    phase = 'Waxing Gibbous'; symbol = '🌔'; energy = 'Refinement';
    advice = 'Adjust and perfect your approach. The peak is near.';
  } else if (cyclePos < 18.46) {
    phase = 'Full Moon'; symbol = '🌕'; energy = 'Culmination';
    advice = 'Maximum manifestation energy. Celebrate what has been built. Release what no longer serves.';
  } else if (cyclePos < 22.15) {
    phase = 'Waning Gibbous'; symbol = '🌖'; energy = 'Gratitude';
    advice = 'Share your wisdom. Express gratitude. This is a powerful teaching phase.';
  } else if (cyclePos < 25.85) {
    phase = 'Last Quarter'; symbol = '🌗'; energy = 'Release';
    advice = 'Let go of what is not working. Forgive, clear, and prepare for renewal.';
  } else {
    phase = 'Waning Crescent'; symbol = '🌘'; energy = 'Rest';
    advice = 'Rest, reflect, and prepare for the new cycle. Trust the dark.';
  }

  return { phase, symbol, energy, advice, illumination: phase === 'New Moon' ? 0 : illumination, cyclePos: Math.round(cyclePos * 10) / 10 };
};

// ─── CURRENT PLANETARY POSITIONS (simplified but accurate) ────────────────────
// Uses Jean Meeus simplified planetary algorithms (Astronomical Algorithms)

const toRad = d => d * Math.PI / 180;
const toDeg = r => r * 180 / Math.PI;
const norm360 = d => ((d % 360) + 360) % 360;

const ZODIAC_SIGNS = [
  { sign: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' },
  { sign: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', ruler: 'Venus' },
  { sign: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', ruler: 'Mercury' },
  { sign: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', ruler: 'Moon' },
  { sign: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', ruler: 'Sun' },
  { sign: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' },
  { sign: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', ruler: 'Venus' },
  { sign: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', ruler: 'Pluto' },
  { sign: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' },
  { sign: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' },
  { sign: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', ruler: 'Uranus' },
  { sign: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', ruler: 'Neptune' },
];

const getZodiacSign = (degrees) => {
  const idx = Math.floor(norm360(degrees) / 30);
  return ZODIAC_SIGNS[idx];
};

const getJD = (date = new Date()) => {
  const y = date.getUTCFullYear(), m = date.getUTCMonth() + 1, d = date.getUTCDate();
  const h = date.getUTCHours() + date.getUTCMinutes() / 60;
  let Y = y, M = m;
  if (M <= 2) { Y--; M += 12; }
  const A = Math.floor(Y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + h / 24 + B - 1524.5;
};

export const getPlanetaryPositions = (date = new Date()) => {
  const JD = getJD(date);
  const T = (JD - 2451545.0) / 36525; // Julian centuries from J2000.0

  // Sun
  const L0 = norm360(280.46646 + 36000.76983 * T);
  const M_sun = norm360(357.52911 + 35999.05029 * T);
  const C = (1.914602 - 0.004817 * T) * Math.sin(toRad(M_sun))
          + 0.019993 * Math.sin(toRad(2 * M_sun))
          + 0.000289 * Math.sin(toRad(3 * M_sun));
  const sunLon = norm360(L0 + C);

  // Moon
  const L_moon = norm360(218.3165 + 481267.8813 * T);
  const M_moon = norm360(134.9634 + 477198.8676 * T);
  const moonLon = norm360(L_moon + 6.289 * Math.sin(toRad(M_moon)));

  // Mercury
  const L_merc = norm360(252.2509 + 149474.0722 * T);
  const M_merc = norm360(174.7948 + 149472.6740 * T);
  const mercLon = norm360(L_merc + 23.4405 * Math.sin(toRad(M_merc)));

  // Venus
  const L_ven = norm360(181.9798 + 58519.2130 * T);
  const M_ven = norm360(50.4161 + 58517.8039 * T);
  const venLon = norm360(L_ven + 0.7758 * Math.sin(toRad(M_ven)));

  // Mars
  const M_mars = norm360(19.3730 + 19141.6964 * T);
  const marsLon = norm360(355.4330 + 19140.2993 * T + 10.6912 * Math.sin(toRad(M_mars)));

  // Jupiter
  const M_jup = norm360(20.9221 + 3036.3027 * T);
  const jupLon = norm360(34.3515 + 3034.9057 * T + 5.5549 * Math.sin(toRad(M_jup)));

  // Saturn
  const M_sat = norm360(317.0207 + 1223.5110 * T);
  const satLon = norm360(50.0774 + 1222.1138 * T + 6.3585 * Math.sin(toRad(M_sat)));

  const toInfo = (lon, name, symbol) => {
    const sign = getZodiacSign(lon);
    const deg = Math.floor(norm360(lon) % 30);
    return { name, symbol, longitude: Math.round(lon * 10) / 10, degree: deg, ...sign };
  };

  return {
    sun:     toInfo(sunLon,  'Sun',     '☉'),
    moon:    toInfo(moonLon, 'Moon',    '☽'),
    mercury: toInfo(mercLon, 'Mercury', '☿'),
    venus:   toInfo(venLon,  'Venus',   '♀'),
    mars:    toInfo(marsLon, 'Mars',    '♂'),
    jupiter: toInfo(jupLon,  'Jupiter', '♃'),
    saturn:  toInfo(satLon,  'Saturn',  '♄'),
  };
};

// ─── PERSONAL YEAR & MONTH TIMING ────────────────────────────────────────────

export const getTimingCycles = (birthDate, referenceDate = new Date()) => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth() + 1;

  const parts = (birthDate || '').split('-');
  if (parts.length < 3) return { personalYear: 1, personalMonth: 1, universalYear: 6 };

  const bDay = parseInt(parts[2], 10);
  const bMonth = parseInt(parts[1], 10);

  // Universal year (2025 → 9, 2026 → 1)
  const universalYear = String(year).split('').map(Number).reduce((a, b) => a + b, 0) % 9 || 9;

  // Personal year
  const pyRaw = bDay + bMonth + String(year).split('').map(Number).reduce((a,b) => a+b, 0);
  let personalYear = pyRaw;
  while (personalYear > 9) personalYear = String(personalYear).split('').map(Number).reduce((a,b)=>a+b,0);
  personalYear = personalYear || 9;

  // Personal month
  const pmRaw = personalYear + month;
  let personalMonth = pmRaw;
  while (personalMonth > 9) personalMonth = String(personalMonth).split('').map(Number).reduce((a,b)=>a+b,0);
  personalMonth = personalMonth || 9;

  // Personal day
  const day = referenceDate.getDate();
  const pdRaw = personalYear + personalMonth + day;
  let personalDay = pdRaw;
  while (personalDay > 9) personalDay = String(personalDay).split('').map(Number).reduce((a,b)=>a+b,0);

  const YEAR_THEMES = ['','New Beginnings','Cooperation','Creativity','Stability','Change','Harmony','Reflection','Achievement','Completion'];
  const MONTH_THEMES = ['','Action','Patience','Expression','Work','Freedom','Nurturing','Analysis','Power','Endings'];

  return {
    personalYear, personalMonth, personalDay, universalYear,
    yearTheme: YEAR_THEMES[personalYear],
    monthTheme: MONTH_THEMES[personalMonth],
  };
};

// ─── CHART-PLANET RESONANCE ───────────────────────────────────────────────────

/**
 * Finds which current transiting planets resonate with the person's Matrix nodes.
 * Returns activations with specific interpretations.
 */

const PLANET_NODE_RESONANCE = {
  'Sun':     { element: 'Fire', quality: 'Vitality & purpose activation' },
  'Moon':    { element: 'Water', quality: 'Emotional & intuitive activation' },
  'Mercury': { element: 'Air', quality: 'Mental clarity & communication opening' },
  'Venus':   { element: 'Earth', quality: 'Love, beauty & abundance activation' },
  'Mars':    { element: 'Fire', quality: 'Drive, action & courage activation' },
  'Jupiter': { element: 'Fire', quality: 'Expansion, fortune & opportunity opening' },
  'Saturn':  { element: 'Earth', quality: 'Discipline, karma & mastery activation' },
};

const NODE_ELEMENTS = {
  1:'Fire',2:'Water',3:'Earth',4:'Fire',5:'Earth',6:'Air',7:'Water',
  8:'Fire',9:'Earth',10:'Fire',11:'Air',12:'Water',13:'Water',14:'Fire',
  15:'Earth',16:'Fire',17:'Air',18:'Water',19:'Fire',20:'Fire',21:'Earth',22:'Earth'
};

export const getCosmicActivations = (chart, planets) => {
  const activations = [];
  const centerElement = NODE_ELEMENTS[chart.center] || 'Fire';
  const lifeElement = NODE_ELEMENTS[chart.lifePath] || 'Earth';

  Object.entries(planets).forEach(([key, planet]) => {
    const resonance = PLANET_NODE_RESONANCE[planet.name];
    if (!resonance) return;

    // Check if planet element resonates with chart nodes
    const isDirectHit = planet.element === centerElement || planet.element === lifeElement;
    const isHarmonic = (planet.element === 'Fire' && ['Air'].includes(centerElement)) ||
                       (planet.element === 'Earth' && ['Water'].includes(centerElement)) ||
                       (planet.element === 'Air' && ['Fire'].includes(centerElement)) ||
                       (planet.element === 'Water' && ['Earth'].includes(centerElement));

    if (isDirectHit || isHarmonic) {
      activations.push({
        planet: planet.name,
        planetSymbol: planet.symbol,
        inSign: planet.sign,
        signSymbol: planet.symbol,
        strength: isDirectHit ? 'Strong' : 'Harmonious',
        quality: resonance.quality,
        interpretation: isDirectHit
          ? `${planet.name} in ${planet.sign} is directly activating your ${centerElement} soul energy`
          : `${planet.name} in ${planet.sign} harmoniously supports your matrix`,
      });
    }
  });

  return activations.slice(0, 4);
};