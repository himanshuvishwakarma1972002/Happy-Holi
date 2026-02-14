
import React, { useState, useEffect } from 'react';
import { HoliState, Step } from './types';
import { HOLI_COLORS } from './data/colors';
import { DESIGN_STYLES } from './data/designs';
import { Button } from './components/Button';
import { ProgressStepper } from './components/ProgressStepper';
import { HoliPreview } from './components/HoliPreview';
import { ColorCard } from './components/ColorCard';
import { DesignCard } from './components/DesignCard';
import { Confetti } from './components/Confetti';
import { generateShareLink, decodeShareLink } from './utils/sharing';

const SUGGESTED_QUOTES = [
  "May your life be filled with natural colors of happiness.",
  "Play safe, play herbal, play happy.",
  "Let the colors of Holi bring positivity and peace.",
  "Celebrate Holi with love and nature.",
  "May the festive spirit of Holi brighten your soul with joy."
];

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [state, setState] = useState<HoliState>({
    selectedColors: [],
    selectedDesignId: '',
    message: ''
  });
  const [viewOnly, setViewOnly] = useState(false);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wishParam = params.get('wish');
    if (wishParam) {
      const decoded = decodeShareLink(wishParam);
      if (decoded) {
        setState(decoded);
        setStep('preview');
        setViewOnly(true);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const toggleColor = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(id)
        ? prev.selectedColors.filter(c => c !== id)
        : [...prev.selectedColors, id].slice(-6) // Limit to 6 colors
    }));
  };

  const handleCopyLink = async () => {
    const link = generateShareLink(state);
    try {
      await navigator.clipboard.writeText(link);
      setCopying(true);
      setTimeout(() => setCopying(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <div className="flex flex-col items-center text-center px-6 py-12 max-w-2xl mx-auto min-h-[80vh] justify-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-pink-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
              <span className="text-8xl md:text-9xl animate-float block relative">🎨</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              Create Your Herbal Holi Wish
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Craft a personalized digital bouquet of natural colors and traditional designs to share the joy of a safe, herbal Holi.
            </p>
            <Button onClick={() => setStep('colors')} className="text-lg px-10 py-4">
              Get Started
            </Button>
            <div className="mt-12 flex items-center gap-4 text-sm text-pink-500 font-semibold opacity-60">
              <span>Natural</span>
              <div className="w-1 h-1 bg-pink-300 rounded-full"></div>
              <span>Traditional</span>
              <div className="w-1 h-1 bg-pink-300 rounded-full"></div>
              <span>Digital</span>
            </div>
          </div>
        );

      case 'colors':
        return (
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Choose Your Colors</h2>
              <p className="text-gray-500">Pick up to 6 herbal powders derived from nature. ({state.selectedColors.length}/6)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              {HOLI_COLORS.map(color => (
                <ColorCard 
                  key={color.id} 
                  color={color} 
                  isSelected={state.selectedColors.includes(color.id)}
                  onClick={() => toggleColor(color.id)}
                />
              ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-pink-100 p-6 z-50 flex justify-center gap-4">
               <Button variant="secondary" onClick={() => setStep('intro')}>Back</Button>
               <Button 
                disabled={state.selectedColors.length === 0} 
                onClick={() => setStep('designs')}
                className="w-full max-w-xs"
               >
                 Next: Choose Design
               </Button>
            </div>
          </div>
        );

      case 'designs':
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Select Layout</h2>
              <p className="text-gray-500">How should your colors be presented?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
              {DESIGN_STYLES.map(style => (
                <DesignCard 
                  key={style.id}
                  style={style}
                  isSelected={state.selectedDesignId === style.id}
                  onClick={() => setState(prev => ({ ...prev, selectedDesignId: style.id }))}
                />
              ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-pink-100 p-6 z-50 flex justify-center gap-4">
               <Button variant="secondary" onClick={() => setStep('colors')}>Back</Button>
               <Button 
                disabled={!state.selectedDesignId} 
                onClick={() => setStep('message')}
                className="w-full max-w-xs"
               >
                 Next: Add Message
               </Button>
            </div>
          </div>
        );

      case 'message':
        return (
          <div className="max-w-2xl mx-auto px-6 py-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Personal Message</h2>
              <p className="text-gray-500">Write a heartfelt note or pick a suggestion below.</p>
            </div>
            
            <textarea
              className="w-full h-48 p-6 rounded-3xl border-2 border-pink-100 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all text-lg leading-relaxed mb-8 shadow-sm"
              placeholder="Type your message here..."
              value={state.message}
              onChange={(e) => setState(prev => ({ ...prev, message: e.target.value }))}
            />

            <div className="space-y-3 mb-12">
              <p className="text-xs font-bold text-pink-400 uppercase tracking-widest ml-1">Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUOTES.map((quote, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setState(prev => ({ ...prev, message: quote }))}
                    className="text-left px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full text-sm transition-colors border border-pink-100"
                  >
                    {quote}
                  </button>
                ))}
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-pink-100 p-6 z-50 flex justify-center gap-4">
               <Button variant="secondary" onClick={() => setStep('designs')}>Back</Button>
               <Button 
                disabled={!state.message.trim()} 
                onClick={() => setStep('preview')}
                className="w-full max-w-xs"
               >
                 Preview Wish
               </Button>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="max-w-2xl mx-auto px-6 py-12 pb-32">
            {!viewOnly && <ProgressStepper currentStep="preview" />}
            
            <div className="relative mb-12">
              <HoliPreview 
                colorIds={state.selectedColors} 
                designId={state.selectedDesignId} 
                message={state.message}
                className="scale-100 md:scale-110"
              />
              <Confetti />
            </div>

            {viewOnly ? (
              <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Inspired to share?</h3>
                  <p className="text-gray-500 mb-6">Create your own custom herbal Holi wish for friends and family.</p>
                  <Button fullWidth onClick={() => {
                    window.location.href = window.location.origin + window.location.pathname;
                  }}>
                    Create My Own Wish
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Button fullWidth onClick={handleCopyLink} className="h-16 text-lg">
                  {copying ? '✨ Link Copied!' : '🚀 Share Wish Link'}
                </Button>
                <Button fullWidth variant="secondary" onClick={() => setStep('message')}>
                  Edit Wish
                </Button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="py-6 px-6 flex justify-between items-center bg-white/40 backdrop-blur-md border-b border-white sticky top-0 z-[60]">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => !viewOnly && setStep('intro')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:rotate-12 transition-transform">
            🌸
          </div>
          <span className="font-bold text-xl text-gray-800 tracking-tight">Holi Herbal</span>
        </div>
        {!viewOnly && step !== 'intro' && <ProgressStepper currentStep={step} />}
      </header>

      <main>
        {renderStep()}
      </main>
      
      {step === 'intro' && (
        <footer className="text-center py-12 text-gray-400 text-sm">
          <p>© 2025 Holi Herbal Wishes • Play Safe, Stay Natural</p>
        </footer>
      )}
    </div>
  );
};

export default App;
