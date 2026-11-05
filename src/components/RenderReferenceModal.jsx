import React from 'react';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function RenderReferenceModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = React.useState('rizal-render');

  if (!isOpen) return null;

  const getActiveImage = () => {
    if (activeTab === 'rizal-render') return '/assets/rizal-3d-web-presentation.jpg';
    if (activeTab === 'exact-match') return '/assets/ui-presentation-exact-match.jpg';
    if (activeTab === 'backdrop') return '/assets/hero-stage-backdrop-exact.jpg';
    return '/assets/reference-inspiration.png';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="8K Octane Render Showcase"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A1E1A]/65 backdrop-blur-lg p-4 sm:p-6"
    >
      <div className="metallic-gold-trim max-w-5xl w-full">
        <div className="terrazzo-surface rounded-[1.55rem] p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full peach-sphere-3d flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#2A1E1A]">
                  3D UI/UX Octane Render Showcase
                </h3>
                <p className="text-xs text-[#5E524A]">
                  Exact Reference-Matched 3D Glassmorphism Presentation & Studio Scene
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('rizal-render')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'rizal-render'
                    ? 'bg-[#2A1E1A] text-white'
                    : 'bg-white/80 text-[#3B2A22] hover:bg-white'
                }`}
              >
                Rizal 3D Render
              </button>
              <button
                onClick={() => setActiveTab('exact-match')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'exact-match'
                    ? 'bg-[#2A1E1A] text-white'
                    : 'bg-white/80 text-[#3B2A22] hover:bg-white'
                }`}
              >
                Full Project 3 Render
              </button>
              <button
                onClick={() => setActiveTab('backdrop')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'backdrop'
                    ? 'bg-[#2A1E1A] text-white'
                    : 'bg-white/80 text-[#3B2A22] hover:bg-white'
                }`}
              >
                3D Studio Stage Layer
              </button>
              <button
                onClick={() => setActiveTab('reference')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'reference'
                    ? 'bg-[#2A1E1A] text-white'
                    : 'bg-white/80 text-[#3B2A22] hover:bg-white'
                }`}
              >
                Original Inspiration
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white hover:bg-[#F5E6D8] text-[#2A1E1A] border border-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-white shadow-2xl bg-[#D8CFC6] aspect-[4/3] sm:aspect-video relative">
            <img
              src={getActiveImage()}
              alt="8K Octane 3D UI Design Render"
              className="w-full h-full object-contain bg-[#D6CDC3]"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A3B32]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ImageIcon className="w-3.5 h-3.5 text-[#9C6347]" />
              Warm Greige • Cream • Pastel Peach • S-Curve Metallic Gold Ribbons • Terrazzo
            </span>
            <a
              href={getActiveImage()}
              download
              className="font-bold text-[#7C4D36] hover:text-[#2A1E1A] underline"
            >
              Download High-Res Render ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
