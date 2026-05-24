// Replace this string with your actual Gemini API Key
const GEMINI_API_KEY = "AIzaSyBvdtDShC69xyWe_AJN6k07x74gPXmkSNk"; 

export const generateAIReading = async (chartData, language = 'en') => {
  const centerNode = chartData.center || 1;
  const moneyNode = chartData.moneyChannel?.heart || chartData.right || 1;
  const loveNode = chartData.relationshipChannel?.heart || chartData.bottom || 1;

  const promptText = `
    You are an expert Matrix of Destiny numerologist.
    Generate a highly personalized reading based on these specific calculated Matrix nodes:
    - Core Soul Archetype: ${centerNode}
    - Wealth Path: ${moneyNode}
    - Relationship Path: ${loveNode}

    The reading MUST be in: ${language === 'si' ? 'Sinhalese (සිංහල)' : 'English'}.
    
    Structure the response clearly using Markdown with these exact three headings:
    ### 1. Your Soul Archetype (Node ${centerNode})
    (Write 2 paragraphs about their inner power)
    
    ### 2. Wealth & Finance Channel (Node ${moneyNode})
    (Write 2 paragraphs about money and career)
    
    ### 3. Love & Relationship Channel (Node ${loveNode})
    (Write 2 paragraphs about romantic needs)
    
    Tone: Mystical, encouraging, professional.
  `;

  try {
    // We construct the request body exactly as Google expects for gemini-1.5-flash
    const requestBody = {
      contents: [
        {
          parts: [
            { text: promptText }
          ]
        }
      ]
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        // If it fails, let's log the actual error message from Google so we know why
        const errorData = await response.json();
        console.error("Gemini API Details:", errorData);
        throw new Error(`API Error: ${response.status} - Check console for details`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts[0].text) {
         return data.candidates[0].content.parts[0].text;
    } else {
        return "Could not decode the matrix at this time. Please try again.";
    }

  } catch (error) {
    console.error("AI Generation Failed:", error);
    return "The spiritual guides are currently unavailable. Please try your reading again later.";
  }
};