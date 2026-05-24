import React, { useState, useEffect } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { generateAIReading } from '../services/aiReadingService';
import ReactMarkdown from 'react-markdown'; // Optional: npm install react-markdown

export default function DestinyChart({ chart, profile }) {
  const [lang, setLang] = useState('en');
  const [aiReadingText, setAiReadingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Trigger the AI generation whenever the chart or language changes
  useEffect(() => {
    const fetchReading = async () => {
      setIsLoading(true);
      setAiReadingText(""); // Clear previous text
      const generatedText = await generateAIReading(chart, lang);
      setAiReadingText(generatedText);
      setIsLoading(false);
    };

    if (chart && chart.center) {
      fetchReading();
    }
  }, [chart, lang]);

  const moneyHeart = chart.moneyChannel?.heart || 1;
  const loveHeart = chart.relationshipChannel?.heart || 1;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* HEADER SECTION */}
      <div className="rounded-[32px] border border-white/10 bg-[#0b1a30]/90 p-6 text-center shadow-xl backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.3em] text-[#c99700]/90 font-semibold">Daiwaya.lk Matrix</p>
        <h3 className="mt-2 text-3xl font-bold text-white">Your Destiny Blueprint</h3>
        <p className="mt-3 text-sm leading-6 text-[#f8f8fb]/70 max-w-xl mx-auto">
          Generated for {profile?.fullName || "User"} ({profile?.dateOfBirth || "Unknown"})
        </p>
      </div>

      {/* SVG CHART SECTION (Same as previous version) */}
      <div className="mx-auto rounded-[36px] border border-white/10 bg-[#030712]/80 p-8 shadow-2xl backdrop-blur-2xl overflow-hidden">
        <div className="relative mx-auto h-[400px] w-[400px] sm:h-[450px] sm:w-[450px]">
          <svg viewBox="0 0 380 380" className="h-full w-full drop-shadow-2xl">
            {/* ... Paste the entire SVG content from the previous DestinyChart.jsx here ... */}
            {/* I am omitting the SVG code here for brevity, keep the complex SVG with the age ring! */}
             <circle cx="190" cy="190" r="170" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
             <text x="190" y="190" textAnchor="middle" fill="#fff">Chart Rendered Successfully</text>
          </svg>
        </div>
      </div>

      {/* AI READING SECTION */}
      <div className="mt-8 p-8 rounded-[32px] border border-[#c99700]/30 bg-gradient-to-br from-[#0b1a30] to-[#030712] shadow-2xl relative">
        
        {/* Language Toggles */}
        <div className="flex justify-end space-x-3 mb-6 relative z-10">
          <button 
            onClick={() => setLang('en')} 
            className={`px-6 py-2 rounded-full font-semibold transition-all ${lang === 'en' ? 'bg-[#c99700] text-slate-900 shadow-lg' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang('si')} 
            className={`px-6 py-2 rounded-full font-semibold transition-all ${lang === 'si' ? 'bg-[#c99700] text-slate-900 shadow-lg' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            සිංහල
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-6 border-b border-white/10 pb-4">
            <Sparkles className="text-[#c99700]" size={24} />
            <h3 className="text-2xl font-bold text-white">Live Destiny Decode</h3>
        </div>

        {/* Loading State or Rendered Text */}
        {isLoading ? (
            <div className="animate-pulse space-y-6 py-4">
                <div className="h-4 bg-[#c99700]/20 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-3 bg-[#c99700]/10 rounded w-full"></div>
                    <div className="h-3 bg-[#c99700]/10 rounded w-5/6"></div>
                    <div className="h-3 bg-[#c99700]/10 rounded w-4/5"></div>
                </div>
                <div className="h-4 bg-[#c99700]/20 rounded w-1/4 mt-8 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-3 bg-[#c99700]/10 rounded w-full"></div>
                    <div className="h-3 bg-[#c99700]/10 rounded w-11/12"></div>
                </div>
                <p className="text-[#c99700]/60 italic mt-8 text-center">Consulting the universal matrix...</p>
            </div>
        ) : (
            <div className="prose prose-invert prose-gold max-w-none">
                {/* If you installed react-markdown: 
                   <ReactMarkdown>{aiReadingText}</ReactMarkdown>
                   Otherwise, use a simple pre tag or basic mapping.
                */}
                <div className="whitespace-pre-wrap leading-relaxed text-[#f8f8fb]/90 font-medium text-lg">
                    {aiReadingText}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}