/**
 * aiReadingService.js
 * 6 parallel Gemini API calls with full error logging.
 * 
 * ⚠️  REPLACE THE API KEY BELOW WITH YOUR OWN:
 *     1. Go to https://aistudio.google.com/app/apikey
 *     2. Click "Create API Key"
 *     3. Paste it below
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";
const MODEL = "gemini-1.5-flash";

const callGemini = async (prompt, temperature = 0.82, maxTokens = 650) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    throw new Error("No Gemini API key set. Add VITE_GEMINI_API_KEY to your .env file.");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature, maxOutputTokens: maxTokens },
      }),
    }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const msg = errBody?.error?.message || `HTTP ${res.status}`;
    console.error(`[Gemini] API Error ${res.status}:`, msg, errBody);
    throw new Error(`Gemini ${res.status}: ${msg}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error('Gemini returned empty response');
  return text;
};

const safe = async (fn, fallback = '') => {
  try { return await fn(); }
  catch (e) { console.error('[AI Reading] Section failed:', e.message); return fallback; }
};

// ─── PROMPTS ──────────────────────────────────────────────────────────────────

const soulPrompt = (c, lifePath, expression, soulUrge, name, lang, planets, moonPhase) => `
You are Daiwaya — Sri Lanka's most revered Matrix of Destiny oracle.

Write a DEEPLY PERSONAL soul essence reading in ${lang} for ${name || 'the seeker'}.

MATRIX NODES:
- Soul Center: Node ${c}
- Life Path: Node ${lifePath}
- Expression: Node ${expression}
- Soul Urge: Node ${soulUrge}

LIVE COSMIC CONTEXT:
- Sun is in ${planets?.sun?.sign || 'Taurus'}
- Moon Phase: ${moonPhase?.phase || 'Waxing'} (${moonPhase?.energy || 'Building'} energy, ${moonPhase?.illumination || 60}% illuminated)

Write EXACTLY 3 rich flowing paragraphs (no headings, no bullets, pure sacred prose):
1. Their core soul DNA — what Node ${c} reveals about their fundamental nature and energy signature
2. How Node ${lifePath} and Node ${c} create a unique destiny signature and unlock inner powers
3. Their soul mission in this incarnation — what they came to master and leave as legacy. Reference the current ${moonPhase?.phase || 'moon phase'} as a mirror to their soul journey.

Tone: Sacred, poetic, intimate, prophetic. Language: ${lang}.
`.trim();

const wealthPrompt = (money, moneyEnt, center, timing, name, lang, planets) => `
You are Daiwaya — a master of wealth codes in the Matrix of Destiny system.

Write a SPECIFIC wealth & career reading in ${lang} for ${name || 'the seeker'}.

WEALTH NODES:
- Money Channel Heart: Node ${money}
- Money Channel Entrance: Node ${moneyEnt}
- Soul Center: Node ${center}

LIVE TIMING:
- Personal Year: ${timing?.personalYear || 1} (${timing?.yearTheme || 'New Beginnings'})
- Personal Month: ${timing?.personalMonth || 1} (${timing?.monthTheme || 'Action'})
- Jupiter is in ${planets?.jupiter?.sign || 'Gemini'}
- Saturn is in ${planets?.saturn?.sign || 'Pisces'}

Write EXACTLY 2 rich paragraphs:
1. Their money archetype — how Node ${money} defines their wealth frequency and how abundance flows to them. Reference Jupiter in ${planets?.jupiter?.sign || 'Gemini'}.
2. Name at least 4 specific career paths/industries, their peak earning style, and one bold financial warning based on Saturn's position.

Language: ${lang}. Be specific and practical.
`.trim();

const lovePrompt = (love, loveEnt, center, name, lang, planets, moonPhase) => `
You are Daiwaya — Sri Lanka's foremost Matrix of Destiny relationship guide.

Write a DEEPLY PERSONAL love reading in ${lang} for ${name || 'the seeker'}.

LOVE NODES:
- Relationship Heart: Node ${love}
- Relationship Entrance: Node ${loveEnt}
- Soul Center: Node ${center}

COSMIC CONTEXT:
- Venus is in ${planets?.venus?.sign || 'Aries'}
- Mars is in ${planets?.mars?.sign || 'Cancer'}
- Moon: ${moonPhase?.phase || 'Waxing'} — ${moonPhase?.advice || ''}

Write EXACTLY 2 rich paragraphs:
1. Their love nature — what Node ${love} reveals about how they love, what they crave, and their romantic patterns. Weave in Venus in ${planets?.venus?.sign || 'Aries'}.
2. Their soul-mate frequency and one karmic love pattern they must heal. Reference Mars's position.

Language: ${lang}. Be intimate and specific.
`.trim();

const karmicPrompt = (karmic, karmicMid, base, center, name, lang, planets) => `
You are Daiwaya — a karmic Matrix of Destiny oracle.

Write a PROFOUND karmic reading in ${lang} for ${name || 'the seeker'}.

KARMIC NODES:
- Karmic Peak: Node ${karmic}
- Karmic Middle: Node ${karmicMid}
- Karmic Base: Node ${base}
- Soul Center: Node ${center}

KARMA CONTEXT:
- Saturn (lord of karma) is in ${planets?.saturn?.sign || 'Pisces'}

Write EXACTLY 2 profound paragraphs:
1. Their past life karmic legacy — what Node ${karmic} represents, what soul wound was carried in, what repeating life theme it creates
2. Their karmic liberation mission — what Node ${karmicMid} demands, and how Saturn in ${planets?.saturn?.sign || 'Pisces'} is accelerating this healing.

Language: ${lang}. This is the most sacred part of the reading.
`.trim();

const purposePrompt = (purpose, personal, social, center, skyNode, earthNode, name, lang, personalYear, planets) => `
You are Daiwaya — a spiritual purpose guide using Matrix of Destiny.

Write a TRANSFORMATIONAL spiritual purpose reading in ${lang} for ${name || 'the seeker'}.

PURPOSE NODES:
- Spiritual Purpose: Node ${purpose}
- Personal Purpose: Node ${personal}
- Social Purpose: Node ${social}
- Soul Center: Node ${center}
- Sky Node: Node ${skyNode}
- Earth Node: Node ${earthNode}

TIMING:
- Personal Year: ${personalYear}

Write EXACTLY 2 powerful paragraphs:
1. Their cosmic calling — what Node ${purpose} reveals as their highest contribution, how Sky Node ${skyNode} and Earth Node ${earthNode} bridge heavenly gifts and earthly expression
2. Who they serve, what form their greatest work takes, and how Personal Year ${personalYear} is aligning them with their purpose.

Language: ${lang}. Make them feel their destiny.
`.trim();

const forecastPrompt = (center, lifePath, timing, moonPhase, planets, activations, name, lang) => `
You are Daiwaya — Sri Lanka's most precise Matrix of Destiny forecaster.

Write a BOLD, SPECIFIC cosmic forecast in ${lang} for ${name || 'the seeker'}.

MATRIX:
- Soul Center: Node ${center} | Life Path: Node ${lifePath}
- Personal Year: ${timing?.personalYear || 1} (${timing?.yearTheme || 'New Beginnings'})
- Personal Month: ${timing?.personalMonth || 1} (${timing?.monthTheme || 'Action'})

LIVE PLANETARY DATA:
- Sun in ${planets?.sun?.sign || 'Taurus'} | Moon in ${planets?.moon?.sign || 'Scorpio'} (${moonPhase?.phase || 'Full Moon'})
- Mercury in ${planets?.mercury?.sign || 'Gemini'} | Venus in ${planets?.venus?.sign || 'Aries'}
- Mars in ${planets?.mars?.sign || 'Cancer'} | Jupiter in ${planets?.jupiter?.sign || 'Gemini'} | Saturn in ${planets?.saturn?.sign || 'Pisces'}
- Moon advice: ${moonPhase?.advice || ''}
${activations?.length ? `\nACTIVE PLANETARY INFLUENCES:\n${activations.map(a => `- ${a.planet} in ${a.inSign}: ${a.interpretation}`).join('\n')}` : ''}

Write EXACTLY 3 bold paragraphs:
1. The dominant cosmic theme for Personal Year ${timing?.personalYear} meeting Soul Center ${center} RIGHT NOW
2. Specific opportunities in the next 3–6 months — which life domains, what timing windows, how to use Jupiter in ${planets?.jupiter?.sign || 'Gemini'}
3. Warnings and shadow work — what Saturn demands, what karmic tests are incoming, one action to take before the next ${moonPhase?.phase || 'Full Moon'}

Language: ${lang}. Be prophetic, bold, and specific.
`.trim();

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export const generateAllReadings = async (chartData, language = 'en', cosmicData = {}) => {
  const lang = language === 'si' ? 'Sinhala (සිංහල)' : 'English';
  const name = chartData.fullName || '';
  const { planets = {}, moonPhase = {}, timing = {}, activations = [] } = cosmicData;

  const c         = chartData.center || 1;
  const lifePath  = chartData.lifePath || 1;
  const money     = chartData.moneyChannel?.heart || 1;
  const moneyEnt  = chartData.moneyChannel?.entrance || 1;
  const love      = chartData.relationshipChannel?.heart || 1;
  const loveEnt   = chartData.relationshipChannel?.entrance || 1;
  const karmic    = chartData.karmicTail?.top || 1;
  const karmicMid = chartData.karmicTail?.middle || 1;
  const karmicBase= chartData.karmicTail?.base || 1;
  const purpose   = chartData.purpose?.spiritual || 1;
  const personal  = chartData.purpose?.personal || 1;
  const social    = chartData.purpose?.social || 1;
  const skyNode   = chartData.skyNode || 1;
  const earthNode = chartData.earthNode || 1;
  const expression= chartData.expressionNumber || 1;
  const soulUrge  = chartData.soulNumber || 1;

  console.log('[AI Reading] Starting 6 parallel Gemini calls for Soul Center:', c);

  const [soul, wealth, loveR, karmic_r, purposeR, forecast] = await Promise.all([
    safe(() => callGemini(soulPrompt(c, lifePath, expression, soulUrge, name, lang, planets, moonPhase), 0.88, 700)),
    safe(() => callGemini(wealthPrompt(money, moneyEnt, c, timing, name, lang, planets), 0.75, 650)),
    safe(() => callGemini(lovePrompt(love, loveEnt, c, name, lang, planets, moonPhase), 0.85, 650)),
    safe(() => callGemini(karmicPrompt(karmic, karmicMid, karmicBase, c, name, lang, planets), 0.82, 650)),
    safe(() => callGemini(purposePrompt(purpose, personal, social, c, skyNode, earthNode, name, lang, timing?.personalYear, planets), 0.82, 650)),
    safe(() => callGemini(forecastPrompt(c, lifePath, timing, moonPhase, planets, activations, name, lang), 0.78, 750)),
  ]);

  console.log('[AI Reading] Done. Soul reading length:', soul?.length);
  return { soul, wealth, love: loveR, karmic: karmic_r, purpose: purposeR, forecast };
};

export const generateAIReading = async (chartData, language = 'en') => {
  const readings = await generateAllReadings(chartData, language, {});
  return Object.values(readings).filter(Boolean).join('\n\n');
};