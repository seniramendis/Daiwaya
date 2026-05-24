// src/services/archetypeService.js

// Paste your key here exactly as copied from the Google AI Studio dashboard
const GEMINI_API_KEY = "AIzaSyA0HtSY5-l1YVa1W6eBDJbE229juJD-8PA"; 

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
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
         return data.candidates[0].content.parts[0].text;
    } else {
        return "Could not generate reading at this time. Please try again.";
    }
  } catch (error) {
    console.error("AI Generation Failed:", error);
    return "The spiritual guides are currently unavailable. Please check your network connection and try again.";
  }
};