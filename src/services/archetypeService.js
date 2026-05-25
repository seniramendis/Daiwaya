// src/services/archetypeService.js

// Vite reads `VITE_` prefixed environment variables at build time.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const getFallbackReading = (chartData, language = 'en') => {
  const centerNode = chartData.center || 1;
  const moneyNode = chartData.moneyChannel?.heart || chartData.right || 1;
  const loveNode = chartData.relationshipChannel?.heart || chartData.bottom || 1;

  if (language === 'si') {
    return `ඔබේ ආත්මික රේඛාව Node ${centerNode} ය. මේ කේන්ද්‍රය ඔබට සාමාන්‍යයෙන් නිරෝගී භාවය සහ ව්‍යාපාරික උපරිමය ලබා දීමට උදව් කරයි. ඔබේ මූල්‍ය චැනලය Node ${moneyNode} මඟින් නායකත්වය, නිර්මාණශීලීත්වය සහ ස්වාධීනත්වය සලකා බලයි. සම්බන්ධතා Channel Node ${loveNode} මඟින් සංවේදී, සත්‍ය සහ ආදරණීය සම්බන්ධතා ඔබට කෘත්‍යානුකූලව ලැබේ. AI සේවාව ලබාගත නොහැකිවීම නිසා, මේ දැනුම ඔබේ Destiny nodes වල පිහිටීම ගැන උපකාරී මාර්ගය විදියට තියවයි.`;
  }

  return `Your soul archetype is centered at Node ${centerNode}, which suggests that your core destiny is shaped by strong self-expression and intentional leadership. Your wealth channel at Node ${moneyNode} points to opportunities where creativity and independence create the clearest path to success. Your relationship channel at Node ${loveNode} highlights emotional depth, mutual respect, and honest communication as the foundation for your most fulfilling partnerships. While the AI reading service is unavailable, this fallback guidance still gives you a grounded sense of how your destiny nodes interact.`;
};

export const generateAIReading = async (chartData, language = 'en') => {
  const centerNode = chartData.center || 1;
  const moneyNode = chartData.moneyChannel?.heart || chartData.right || 1;
  const loveNode = chartData.relationshipChannel?.heart || chartData.bottom || 1;

  const promptText = `
    You are an expert Matrix of Destiny numerologist and spiritual advisor for Daiwaya.lk.
    Generate a deep, professional, and mystical reading based on these specific nodes:
    - Core Soul Archetype: ${centerNode}
    - Wealth Path: ${moneyNode}
    - Relationship Path: ${loveNode}

    The reading MUST be in: ${language === 'si' ? 'Sinhalese (සිංහල)' : 'English'}.
    
    Format the response using Markdown with these headings:
    ### 1. Your Soul Archetype (Node ${centerNode})
    (Write 2 detailed paragraphs about identity, purpose, and inner power)
    
    ### 2. Wealth & Finance Channel (Node ${moneyNode})
    (Write 2 detailed paragraphs about attracting wealth and ideal career paths)
    
    ### 3. Love & Relationship Channel (Node ${loveNode})
    (Write 2 detailed paragraphs about romantic needs and karmic patterns)
    
    Tone: Mystical, encouraging, professional, and insightful.
  `;

  if (!GEMINI_API_KEY) {
    console.warn('Missing VITE_GEMINI_API_KEY. Returning fallback archetype reading.');
    return getFallbackReading(chartData, language);
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error Details:", errorData);
        return getFallbackReading(chartData, language);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
         return data.candidates[0].content.parts[0].text;
    } else {
        return getFallbackReading(chartData, language);
    }
  } catch (error) {
    console.error("AI Generation Failed:", error);
    return getFallbackReading(chartData, language);
  }
};