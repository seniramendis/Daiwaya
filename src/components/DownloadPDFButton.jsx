import { useState } from 'react';
import { Download, Loader2, FileText, CheckCircle } from 'lucide-react';
import { generateDestinyPDF } from '../services/pdfService';

export default function DownloadPDFButton({ chart, profile, readings, cosmicData }) {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMessage('');
    try {
      await generateDestinyPDF(chart, profile, readings, cosmicData);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      console.error('[PDF] Error:', e);
      setErrorMessage(e?.message || 'Unknown error while generating PDF');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const STATE = {
    idle: {
      icon: <Download className="h-4 w-4"/>,
      label: 'Download PDF Report',
      sublabel: '5-page destiny blueprint',
      cls: 'border-gold/30 bg-gold/8 hover:bg-gold/15 hover:border-gold/50 text-gold',
    },
    loading: {
      icon: <Loader2 className="h-4 w-4 animate-spin"/>,
      label: 'Generating PDF…',
      sublabel: 'Building your report',
      cls: 'border-gold/20 bg-gold/5 text-gold/60 cursor-wait',
    },
    done: {
      icon: <CheckCircle className="h-4 w-4"/>,
      label: 'PDF Downloaded!',
      sublabel: 'Check your downloads folder',
      cls: 'border-green-500/30 bg-green-500/8 text-green-400',
    },
    error: {
      icon: <FileText className="h-4 w-4"/>,
      label: 'Try Again',
      sublabel: 'Something went wrong',
      cls: 'border-red-500/30 bg-red-500/8 text-red-400',
    },
  };

  const s = STATE[status];

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={status === 'loading'}
        className={`w-full flex items-center gap-4 rounded-[20px] border px-5 py-4
          transition-all duration-300 group ${s.cls}`}
      >
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-2xl border border-current/20
          bg-current/8 flex items-center justify-center">
          {s.icon}
        </div>

        {/* Text */}
        <div className="flex-1 text-left">
          <p className="text-sm font-bold">{s.label}</p>
          <p className="text-xs opacity-50 mt-0.5">{s.sublabel}</p>
        </div>

        {/* Arrow */}
        {status === 'idle' && (
          <div className="flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity">
            <Download className="h-4 w-4"/>
          </div>
        )}
      </button>
      {status === 'error' && errorMessage && (
        <p className="mt-2 text-xs text-red-300 px-1">{errorMessage}</p>
      )}
    </>
  );
}