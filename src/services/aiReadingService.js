// src/services/aiReadingService.js

const GEMINI_API_KEY = "AIzaSyA0HtSY5-l1YVa1W6eBDJbE229juJD-8PA";

const archetypeDictionary = {
  1: {
    name: "The Magician", siName: "මැජීෂන්",
    essence: "the raw power of creation, innovative thinking, and taking absolute control of your destiny", siEssence: "නිර්මාණශීලීත්වය, නවෝත්පාදනය සහ ඔබේ ඉරණම පාලනය කිරීමේ බලය",
    wealthPath: "pioneering independent ventures, personal branding, and turning unique ideas into physical reality", siWealthPath: "ස්වාධීන ව්‍යාපාර, ඔබේම සන්නාමයක් ගොඩනැගීම සහ නව අදහස් යථාර්ථයක් කිරීම",
    loveNeed: "a dynamic partner who respects your independence, challenges your intellect, and supports your ambitious drive", siLoveNeed: "ඔබේ නිදහසට ගරු කරන, ඔබේ බුද්ධියට අභියෝග කරන සහ ඔබේ අරමුණු වලට සහාය දෙන සහකරුවෙකු"
  },
  2: {
    name: "The High Priestess", siName: "හයි ප්‍රීස්ටස්",
    essence: "deep intuition, uncovering hidden truths, and maintaining harmony through diplomacy", siEssence: "ගැඹුරු සහජ බුද්ධිය, රහස් සෙවීම සහ රාජ්‍ය තාන්ත්‍රිකභාවය හරහා සමගිය පවත්වා ගැනීම",
    wealthPath: "psychology, esoteric sciences, counseling, and careers that require keen observation and secrecy", siWealthPath: "මනෝවිද්‍යාව, උපදේශනය සහ ගැඹුරු නිරීක්ෂණ අවශ්‍ය වන වෘත්තීන්",
    loveNeed: "a profoundly spiritual connection where communication happens beyond words, requiring absolute emotional safety", siLoveNeed: "වචන වලින් ඔබ්බට ගිය සන්නිවේදනයක් සහ පූර්ණ චිත්තවේගීය ආරක්ෂාවක් ඇති අධ්‍යාත්මික බැඳීමක්"
  },
  3: {
    name: "The Empress", siName: "එම්ප්‍රස්",
    essence: "absolute abundance, nurturing care, material comfort, and the creation of beauty in the physical world", siEssence: "පූර්ණ සශ්‍රීකත්වය, රැකවරණය, භෞතික සැපපහසුව සහ සුන්දරත්වය නිර්මාණය කිරීම",
    wealthPath: "design, real estate, aesthetics, and creating businesses that nurture or provide comfort to others", siWealthPath: "නිර්මාණකරණය, දේපළ වෙළඳාම් සහ අන් අයට රැකවරණය සපයන ව්‍යාපාර",
    loveNeed: "a warm, physically affectionate, and deeply devoted partner who appreciates luxury and family stability", siLoveNeed: "පවුලේ ස්ථාවරත්වය සහ සුඛෝපභෝගීත්වය අගය කරන, ආදරණීය සහ කැපවූ සහකරුවෙකු"
  },
  4: {
    name: "The Emperor", siName: "එම්පරර්",
    essence: "unyielding structure, logical authority, discipline, and building empires that stand the test of time", siEssence: "නොසැලෙන ව්‍යුහය, අධිකාරිය, විනය සහ දිගුකල් පවතින දේවල් ගොඩනැගීම",
    wealthPath: "corporate leadership, management, structured finance, and taking responsibility for large-scale operations", siWealthPath: "ආයතනික නායකත්වය, කළමනාකරණය සහ මහා පරිමාණ මෙහෙයුම් වල වගකීම ගැනීම",
    loveNeed: "a loyal, grounded partner who values security, clear rules, and mutual respect over chaotic passion", siLoveNeed: "ආරක්ෂාව, පැහැදිලි නීති සහ අන්‍යෝන්‍ය ගෞරවය අගය කරන විශ්වාසවන්ත සහකරුවෙකු"
  },
  5: {
    name: "The Hierophant", siName: "හයිරොෆන්ට්",
    essence: "teaching, upholding sacred traditions, spiritual guidance, and passing down generational wisdom", siEssence: "ඉගැන්වීම, පූජනීය සම්ප්‍රදායන් ආරක්ෂා කිරීම සහ අධ්‍යාත්මික මඟපෙන්වීම",
    wealthPath: "education, law, mentoring, and working within established, highly respected traditional institutions", siWealthPath: "අධ්‍යාපනය, නීතිය, උපදේශනය සහ ගෞරවනීය සාම්ප්‍රදායික ආයතනවල වැඩ කිරීම",
    loveNeed: "a traditional, deeply committed relationship built on shared values, shared faith, and societal respect", siLoveNeed: "පොදු වටිනාකම් සහ සමාජ ගෞරවය මත පදනම් වූ සාම්ප්‍රදායික, කැපවූ සම්බන්ධතාවයක්"
  },
  6: {
    name: "The Lovers", siName: "ලවර්ස්",
    essence: "harmonious choices, deep emotional alignment, aesthetic appreciation, and unconditional love", siEssence: "සුහද තීරණ, ගැඹුරු චිත්තවේගීය ගැලපීම, සුන්දරත්වය අගය කිරීම සහ කොන්දේසි විරහිත ආදරය",
    wealthPath: "partnerships, event planning, public relations, and careers that require socializing and aesthetic judgment", siWealthPath: "හවුල්කාරිත්වයන්, උත්සව සැලසුම් කිරීම සහ මහජන සම්බන්ධතා",
    loveNeed: "a soulmate connection filled with romance, mutual admiration, and an intense, emotional vulnerability", siLoveNeed: "ආදරය, අන්‍යෝන්‍ය ගෞරවය සහ දැඩි චිත්තවේගීය බැඳීමක් ඇති ආත්මීය සහකරුවෙකු"
  },
  7: {
    name: "The Chariot", siName: "චාරියට්",
    essence: "relentless forward movement, overcoming obstacles, setting clear goals, and achieving ultimate victory", siEssence: "නොනවත්වා ඉදිරියට යාම, බාධක ජය ගැනීම, පැහැදිලි ඉලක්ක තබා ගැනීම සහ ජයග්‍රහණය",
    wealthPath: "transportation, technology, highly competitive fields, and careers that involve constant travel or rapid growth", siWealthPath: "ප්‍රවාහනය, තාක්ෂණය, තරඟකාරී ක්ෂේත්‍ර සහ නිරන්තර සංචාරය ඇතුළත් වෘත්තීන්",
    loveNeed: "an ambitious co-pilot who is willing to move fast, share your extreme goals, and support your life's momentum", siLoveNeed: "ඔබේ වේගයට ගැලපෙන, ඉලක්ක බෙදාගන්නා සහ ඔබේ ගමනට සහාය දෙන අභිලාෂකාමී සහකරුවෙකු"
  },
  8: {
    name: "Justice", siName: "ජස්ටිස්",
    essence: "absolute truth, karmic balance, fairness, and taking responsibility for your actions across lifetimes", siEssence: "පරම සත්‍යය, කර්ම සමතුලිතතාවය, සාධාරණත්වය සහ ක්‍රියාවන්හි වගකීම ගැනීම",
    wealthPath: "legal systems, auditing, balancing accounts, and environments where strict honesty and logic are required", siWealthPath: "නීති පද්ධති, විගණනය සහ දැඩි අවංකභාවය සහ තර්කනය අවශ්‍ය වන පරිසරයන්",
    loveNeed: "an honest, equal partnership where responsibilities are shared perfectly and deception is non-existent", siLoveNeed: "වගකීම් සමානව බෙදාගන්නා සහ කිසිදු රැවටීමක් නොමැති අවංක, සමාන හවුල්කාරිත්වයක්"
  },
  9: {
    name: "The Hermit", siName: "හර්මිට්",
    essence: "solitary introspection, acquiring deep esoteric wisdom, and guiding others through your own experiences", siEssence: "හුදකලා ආවර්ජනය, ගැඹුරු ප්‍රඥාව ලබා ගැනීම සහ ඔබේ අත්දැකීම් හරහා අන් අයට මඟ පෙන්වීම",
    wealthPath: "research, writing, specialized healing, and working in quiet, solitary environments where you can focus deeply", siWealthPath: "පර්යේෂණ, ලිවීම සහ ගැඹුරින් අවධානය යොමු කළ හැකි නිස්කලංක පරිසරයක වැඩ කිරීම",
    loveNeed: "a patient partner who understands your extreme need for personal space and quiet, intellectual intimacy", siLoveNeed: "ඔබේ පෞද්ගලික ඉඩකඩ අවශ්‍යතාවය තේරුම් ගන්නා සහ බුද්ධිමය සමීපත්වයක් ඇති ඉවසිලිවන්ත සහකරුවෙකු"
  },
  10: {
    name: "Wheel of Fortune", siName: "වීල් ඔෆ් ෆෝචූන්",
    essence: "adaptability, embracing life's cycles, karmic luck, and moving dynamically with the universe's flow", siEssence: "අනුවර්තනය වීම, ජීවිතයේ චක්‍ර වැළඳ ගැනීම, වාසනාව සහ විශ්වයේ ප්‍රවාහය සමඟ ගමන් කිරීම",
    wealthPath: "investments, cyclical business, gambling with calculated risks, and environments that change constantly", siWealthPath: "ආයෝජන, චක්‍රීය ව්‍යාපාර සහ නිරන්තරයෙන් වෙනස් වන පරිසරයන්",
    loveNeed: "an open-minded, adventurous soul who can handle the extreme highs and lows of an unpredictable destiny", siLoveNeed: "අනපේක්ෂිත ඉරණමක උස් පහත් වීම් දරාගත හැකි විවෘත මනසක් ඇති, ත්‍රාසජනක සහකරුවෙකු"
  },
  11: {
    name: "Strength", siName: "ස්ට්‍රෙන්ත්",
    essence: "taming inner beasts, psychological resilience, gentle control, and facing extreme adversity with a smile", siEssence: "අභ්‍යන්තර බිය මැඩපැවැත්වීම, මානසික ඔරොත්තු දීමේ හැකියාව සහ සිනහවකින් අභියෝග වලට මුහුණ දීම",
    wealthPath: "fitness, coaching, animal care, and roles requiring extreme psychological endurance and physical vitality", siWealthPath: "ශාරීරික යෝග්‍යතාවය, පුහුණු කිරීම සහ දැඩි මානසික විඳදරාගැනීම අවශ්‍ය වන භූමිකාවන්",
    loveNeed: "a passionate but respectful partner who honors your inner power and doesn't try to dominate or suppress you", siLoveNeed: "ඔබේ අභ්‍යන්තර ශක්තියට ගරු කරන, ඔබව පාලනය කිරීමට උත්සාහ නොකරන ආදරණීය සහකරුවෙකු"
  },
  12: {
    name: "The Hanged Man", siName: "හැන්ග්ඩ් මෑන්",
    essence: "viewing the world from an inverted perspective, voluntary sacrifice for a higher good, and deep enlightenment", siEssence: "ලෝකය වෙනස් කෝණයකින් දැකීම, යහපත උදෙසා කැපවීම සහ ගැඹුරු බුද්ධෝත්පාදනය",
    wealthPath: "music, esoteric arts, charity work, and unconventional careers that defy standard corporate logic", siWealthPath: "සංගීතය, කලාව, පුණ්‍ය කටයුතු සහ සාමාන්‍ය ආයතනික රාමුවෙන් ඔබ්බට ගිය වෘත්තීන්",
    loveNeed: "a profoundly empathetic partner who understands your emotional sacrifices and values spiritual growth over materialism", siLoveNeed: "භෞතිකවාදයට වඩා අධ්‍යාත්මික වර්ධනය අගය කරන, ඔබේ කැපවීම් තේරුම් ගන්නා සහකරුවෙකු"
  },
  "default": {
    name: "Cosmic Architect", siName: "විශ්වීය නිර්මාණකරු",
    essence: "navigating complex life cycles, balancing intense energies, and achieving deep spiritual awakening", siEssence: "සංකීර්ණ ජීවන චක්‍ර හැසිරවීම, ශක්තීන් සමතුලිත කිරීම සහ ගැඹුරු අධ්‍යාත්මික පිබිදීමක් ලබා ගැනීම",
    wealthPath: "adapting to modern challenges, utilizing your unique talents, and breaking free from traditional restrictions", siWealthPath: "නවීන අභියෝග වලට අනුවර්තනය වීම, ඔබේ අද්විතීය හැකියාවන් භාවිතා කිරීම සහ සාම්ප්‍රදායික සීමාවන්ගෙන් මිදීම",
    loveNeed: "a partner who matches your cosmic frequency, respects your karmic journey, and offers unwavering loyalty", siLoveNeed: "ඔබේ කර්ම ගමනට ගරු කරන සහ නොසැලෙන විශ්වාසවන්තභාවයක් ලබා දෙන සහකරුවෙකු"
  }
};

const getDynamicFallback = (chartData, language) => {
  const soulNode = chartData.center || 1;
  const wealthNode = chartData.moneyChannel?.heart || chartData.right || 1;
  const loveNode = chartData.relationshipChannel?.heart || chartData.bottom || 1;
  const karmicNode = chartData.karmicTail?.top || 1;

  const soul = archetypeDictionary[soulNode] || archetypeDictionary["default"];
  const wealth = archetypeDictionary[wealthNode] || archetypeDictionary["default"];
  const love = archetypeDictionary[loveNode] || archetypeDictionary["default"];
  const karmic = archetypeDictionary[karmicNode] || archetypeDictionary["default"];

  if (language === 'si') {
    return {
      soul: `ඔබේ ප්‍රධාන ආත්මීය ශක්තිය මුළුමනින්ම ගැලපෙන්නේ '${soul.siName}' (Node ${soulNode}) නැමති ප්‍රබල ශක්ති රටාව සමඟයි. ඉරණම් න්‍යාසයට අනුව, මෙයින් අදහස් කරන්නේ ඔබේ ජීවිතයේ ප්‍රධානතම අරමුණ වන්නේ ${soul.siEssence} යන්නයි. ඔබ මෙම ශක්තිය නිවැරදිව භාවිතා කරන විට, ඔබට ඕනෑම අභියෝගයක් ජයගත හැක. එහෙත්, මෙම ශක්තියේ සෘණාත්මක පැතිකඩ පිළිබඳව ඔබ නිරන්තරයෙන් අවධානයෙන් සිටිය යුතුය. අලසකම හෝ බිය පසෙකලා, මෙම අද්විතීය බලය සම්පූර්ණයෙන්ම වැලඳ ගැනීම ඔබේ සාර්ථකත්වයේ රහසයි.`,
      
      wealth: `ඔබේ මූල්‍ය සහ වෘත්තීය රේඛාව පාලනය වන්නේ '${wealth.siName}' (Node ${wealthNode}) ශක්තිය මගිනි. ධනය ඔබ වෙත වඩාත් වේගයෙන් ගලා එන්නේ ${wealth.siWealthPath} කෙරෙහි ඔබ අවධානය යොමු කරන විටදීය. ඔබට නොගැලපෙන, දැඩි නීතිරීති සහිත රැකියා පරිසරයන් ඔබේ මූල්‍ය ප්‍රවාහය අවහිර කරනු ඇත. ඔබේ ස්වාභාවික දක්ෂතාවයන් විශ්වාස කරමින්, නිදහස්ව ක්‍රියා කරන විට, විශාල මූල්‍ය සාර්ථකත්වයක් අත්කර ගැනීමට ඔබට හැකියාව ඇත.`,
      
      love: `ආදරය සහ සබඳතා වලදී, ඔබ '${love.siName}' (Node ${loveNode}) කම්පනය නියෝජනය කරයි. ඔබේ සම්බන්ධතාවයක් දිගුකාලීනව සාර්ථක වීමට නම්, ඔබට අවශ්‍ය වන්නේ ${love.siLoveNeed} ය. මතුපිටින් පෙනෙන ආදරයට වඩා, චිත්තවේගීයව සහ අධ්‍යාත්මිකව ගැඹුරින් බැඳුණු සබඳතාවයක් ඔබ නිතරම අපේක්ෂා කරයි. මෙම ශක්තිය නිවැරදිව හඳුනාගන්නා සහකරුවෙකු සමඟ පමණක් ඔබට සැබෑ සතුට සොයාගත හැක.`,
      
      karmic: `ඔබේ කර්ම රේඛාව පෙන්වා දෙන්නේ ඔබ අතීතයෙන් ගෙන ආ '${karmic.siName}' (Node ${karmicNode}) හා බැඳුණු අභියෝගයන් ය. මෙම ජන්මයේදී ඔබ විසින් නිවැරදි කළ යුතු ප්‍රධාන පාඩම වන්නේ ${karmic.siEssence} සම්බන්ධව පවතින ගැටළුයි. මෙම කර්ම රටාව අවබෝධ කර ගැනීමෙන්, ජීවිතයේ එකම වැරදි නැවත නැවත සිදු වීම වළක්වා ගැනීමට ඔබට හැකි වේ.`,
      
      purpose: `ඔබේ උත්තරීතර අධ්‍යාත්මික අරමුණ (Node ${chartData.purpose?.spiritual || 1}) පදනම් වී ඇත්තේ ඔබේ පෞද්ගලික හැකියාවන් සමාජයේ යහපත උදෙසා යෙදවීම මතයි. ඔබ ඉපදී ඇත්තේ හුදෙක් සාමාන්‍ය ජීවිතයක් ගත කිරීමට නොව, අන් අයට ආලෝකයක් වීමටයි. ඔබේ අභ්‍යන්තර හඬට සවන් දෙමින්, ඔබේ සැබෑ අරමුණ කරා ගමන් කරන්න.`,
      
      forecast: `2025-2026 කාල සීමාව සඳහා විශ්වීය ග්‍රහ පිහිටීම් ඔබට අතිශයින්ම හිතකර වේ. ඔබ දිගු කලක් තිස්සේ සැලසුම් කළ දේවල් යථාර්ථයක් බවට පත් කර ගැනීමට මෙම කාලය තුළ විශාල හැකියාවක් පවතී. විශ්වයේ මෙම ධනාත්මක ශක්තිය උපරිමයෙන් ප්‍රයෝජනයට ගන්න.`
    };
  }

  return {
    soul: `Your core spiritual energy resonates profoundly with the archetype of ${soul.name} (Node ${soulNode}). In the Matrix of Destiny, this central node dictates that your life's overarching theme involves ${soul.essence}. When you consciously align with this frequency, you unlock an innate ability to manifest your desires with striking ease and overcome nearly any obstacle. However, you must remain deeply mindful of your shadow side—ensuring you use this powerful energy constructively rather than falling into self-doubt or stagnation. Ultimately, your life's grand journey is about embodying this magnificent power completely.`,
    
    wealth: `Your financial and career channel is governed by the vibration of ${wealth.name} (Node ${wealthNode}). Wealth flows to you most effortlessly when you focus on ${wealth.wealthPath}. It is critical to understand that highly restrictive, traditional corporate environments may actually block your natural financial flow. By leaning into your unique skills, embracing your authenticity, and perhaps taking calculated risks, you can build a highly prosperous and sustaining empire.`,
    
    love: `In matters of the heart, you carry the distinct emotional signature of ${love.name} (Node ${loveNode}). Superficial romance does not interest you; for a connection to truly last, it requires ${love.loveNeed}. You are highly sensitive to the energy of your partner and need a relationship that serves as a sanctuary rather than a source of chaos. Finding someone who honors this depth is the absolute key to your long-term romantic fulfillment.`,
    
    karmic: `Your karmic tail highlights the lingering energy of ${karmic.name} (Node ${karmicNode}). This specific node reveals that you are actively working through profound past-life lessons directly related to ${karmic.essence}. Acknowledging these hidden, repetitive patterns is the first step to breaking free from the unseen cycles that have occasionally held you back in your current lifetime.`,
    
    purpose: `Your higher spiritual calling (Node ${chartData.purpose?.spiritual || 1}) demands that you synthesize all of your earthly experiences to serve a greater good. You are not here simply to exist; you are meant to leave a distinct, lasting mark on the world around you. By staying absolutely true to your core essence, you naturally elevate the consciousness of your immediate community.`,
    
    forecast: `The current cosmic alignment for 2025-2026 strongly supports your personal and professional expansion. The universe is actively clearing roadblocks, creating a highly fertile period for manifestation. Expect significant, destiny-shifting developments in the coming months if you remain focused and proactive.`
  };
};

// Safe JSON parser to prevent the app from crashing when Gemini returns HTML errors
const safeJSONParse = (text, chartData, language) => {
  try {
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse Gemini output, using dynamic fallback.", e);
    return null; // Return null so the calling function knows to use the fallback
  }
};

export const generateAllReadings = async (chartData, language = 'en', cosmicData = null) => {
  try {
    const promptText = `
      You are an expert Matrix of Destiny numerologist. 
      Write a deep, beautifully written 5-sentence paragraph for each of the following 6 sections.
      The language MUST be exactly: ${language === 'si' ? 'Sinhalese (සිංහල)' : 'English'}.
      
      Use these calculated destiny nodes:
      - Soul Archetype: ${chartData.center}
      - Wealth Channel: ${chartData.moneyChannel?.heart || 1}
      - Relationship Channel: ${chartData.relationshipChannel?.heart || 1}
      - Karmic Tail: ${chartData.karmicTail?.top || 1}
      - Spiritual Purpose: ${chartData.purpose?.spiritual || 1}
      
      Return ONLY a strict JSON object with exactly these 6 keys. Do not include markdown blocks like \`\`\`json.
      {
        "soul": "text here",
        "wealth": "text here",
        "love": "text here",
        "karmic": "text here",
        "purpose": "text here",
        "forecast": "text here"
      }
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!response.ok) {
        console.warn("⚠️ Google API Error - Using Rich Dynamic Fallback Data");
        return getDynamicFallback(chartData, language);
    }

    const data = await response.json();
    
    // Safety check: if API returns an error message instead of candidates
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return getDynamicFallback(chartData, language);
    }

    const rawText = data.candidates[0].content.parts[0].text;
    const parsedData = safeJSONParse(rawText, chartData, language);
    
    const fallback = getDynamicFallback(chartData, language);

    // If parsing failed (parsedData is null), return the complete fallback
    if (!parsedData) {
        return fallback;
    }

    // Otherwise, return the parsed API data, falling back to dynamic data for any missing keys
    return {
      soul: parsedData.soul || fallback.soul,
      wealth: parsedData.wealth || fallback.wealth,
      love: parsedData.love || fallback.love,
      karmic: parsedData.karmic || fallback.karmic,
      purpose: parsedData.purpose || fallback.purpose,
      forecast: parsedData.forecast || fallback.forecast,
    };

  } catch (error) {
    console.error("⚠️ Complete System Failure - Triggering Safe Catch", error);
    return getDynamicFallback(chartData, language);
  }
};