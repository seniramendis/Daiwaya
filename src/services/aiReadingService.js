const GEMINI_API_KEY = "AIzaSyBvdtDShC69xyWe_AJN6k07x74gPXmkSNk";

export const generateAIReading = async (chartData, language = 'en') => {
  const c = chartData.center || 1;
  const money = chartData.moneyChannel?.heart || chartData.right || 1;
  const love = chartData.relationshipChannel?.heart || chartData.bottom || 1;
  const lifePath = chartData.lifePath || 1;
  const karmic = chartData.karmicTail?.top || 1;
  const purpose = chartData.purpose?.spiritual || 1;
  const sky = chartData.skyNode || 1;
  const earth = chartData.earthNode || 1;
  const name = chartData.fullName || '';

  const lang = language === 'si' ? 'Sinhala (සිංහල)' : 'English';

  const prompt = `You are Daiwaya, a master Matrix of Destiny numerologist and spiritual guide specializing in Sri Lankan cosmic wisdom.

Generate a DEEPLY PERSONALIZED, mystical, and professional Matrix of Destiny reading for a person with these exact calculated nodes:

MATRIX NODES:
- Soul Center (Core Archetype): ${c}
- Life Path: ${lifePath}
- Day Node (Left): ${chartData.left || 1}
- Month Node (Top): ${chartData.top || 1}
- Year Node (Right): ${chartData.right || 1}
- Destiny Sum (Bottom): ${chartData.bottom || 1}
- Money Channel Heart: ${money}
- Relationship Channel Heart: ${love}
- Karmic Tail Peak: ${karmic}
- Spiritual Purpose: ${purpose}
- Sky Diagonal: ${sky}
- Earth Diagonal: ${earth}
${name ? `- Person's Name Vibration context: ${name}` : ''}

LANGUAGE: Respond ENTIRELY in ${lang}. Every word must be in ${lang}.

FORMAT — use these EXACT markdown headings, nothing else:

### ✦ Soul Archetype — Node ${c}
Write 3 rich paragraphs about their core soul essence, identity, inner power, and spiritual mission.

### ✦ Life Path — Node ${lifePath}
Write 2 paragraphs about their life journey, karmic lessons, and soul evolution path.

### ✦ Wealth & Abundance — Node ${money}
Write 2 paragraphs about their money energy, ideal career fields, and how wealth flows to them.

### ✦ Love & Relationships — Node ${love}
Write 2 paragraphs about romantic energy, relationship patterns, and what they need in a partner.

### ✦ Karmic Mission — Node ${karmic}
Write 2 paragraphs about past life karma, current life mission, and what they must heal or master.

### ✦ Spiritual Purpose — Node ${purpose}
Write 2 paragraphs about their higher calling, spiritual gifts, and how they serve the world.

### ✦ 2025–2026 Personal Forecast
Write 2 paragraphs about key cosmic themes, opportunities, and warnings for this period based on their nodes.

TONE: Mystical, poetic, deeply personal, encouraging, and profound. Use cosmic and spiritual language. Make it feel like a sacred reading, not generic content. Reference the specific node numbers throughout.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.85, maxOutputTokens: 2048 },
        }),
      }
    );
    if (!response.ok) {
      const err = await response.json();
      console.error('Gemini error:', err);
      throw new Error(`API ${response.status}`);
    }
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Reading unavailable. Please try again.';
  } catch (e) {
    console.error('AI Reading failed:', e);
    return 'The cosmic guides are resting. Please refresh and try again.';
  }
};