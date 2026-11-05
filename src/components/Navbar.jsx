import React from 'react';
import { Search, SlidersHorizontal, Edit3, RotateCcw, Eye } from 'lucide-react';

export default function Navbar({
  footprints,
  activeSection,
  isEditMode,
  setIsEditMode,
  onOpenPresentation,
  onOpenReferenceModal,
  onResetData,
}) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="w-full max-w-[1160px] mx-auto px-4 sm:px-6 pt-5 sm:pt-8 relative z-40">
      <nav
        aria-label="Primary Navigation"
        className="reference-top-navbar px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4"
      >
        {/* Left: Crisp Dark Brand Text (Matching Reference 'Premium Saas/i2B' placement) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left focus:outline-none group flex items-center gap-2"
        >
          <span className="font-display font-bold text-sm sm:text-base tracking-tight text-[#1E1916] group-hover:opacity-80 transition-opacity">
            FOS • JRU / P03
          </span>
        </button>

        {/* Center: Subtle Muted Grey-Taupe Navigation Links (Matching Reference Center Links) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => scrollToSection('footprint-1')}
            className={`text-xs sm:text-[13px] font-medium transition-colors ${
              activeSection === 'footprint-1' || activeSection === 'footprint-2'
                ? 'text-[#1E1916] font-semibold'
                : 'text-[#6E655E] hover:text-[#1E1916]'
            }`}
          >
            01–02 First Steps
          </button>
          <button
            onClick={() => scrollToSection('footprint-3')}
            className={`text-xs sm:text-[13px] font-medium transition-colors ${
              activeSection === 'footprint-3' || activeSection === 'footprint-4'
                ? 'text-[#1E1916] font-semibold'
                : 'text-[#6E655E] hover:text-[#1E1916]'
            }`}
          >
            03–04 Milestones
          </button>
          <button
            onClick={() => scrollToSection('footprint-5')}
            className={`text-xs sm:text-[13px] font-medium transition-colors ${
              activeSection === 'footprint-5' || activeSection === 'footprint-6'
                ? 'text-[#1E1916] font-semibold'
                : 'text-[#6E655E] hover:text-[#1E1916]'
            }`}
          >
            05–06 Moving Forward
          </button>
          <button
            onClick={() => scrollToSection('team-section')}
            className={`text-xs sm:text-[13px] font-medium transition-colors ${
              activeSection === 'team-section'
                ? 'text-[#1E1916] font-semibold'
                : 'text-[#6E655E] hover:text-[#1E1916]'
            }`}
          >
            Our Team
          </button>
        </div>

        {/* Right: Minimalist Icons + Solid White Pill Button with Dark Text (Matching Reference 'max 5 Ins') */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollToSection('journey-timeline')}
            title="Explore 6 Footprints"
            className="p-1.5 text-[#6E655E] hover:text-[#1E1916] transition-colors"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            onClick={onOpenReferenceModal}
            title="View Reference & 3D Renders"
            className="p-1.5 text-[#6E655E] hover:text-[#1E1916] transition-colors"
          >
            <Eye className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            onClick={() => setIsEditMode(!isEditMode)}
            title={isEditMode ? 'Finish Editing' : 'Customize Text & Photos'}
            className={`p-1.5 rounded-full transition-colors ${
              isEditMode
                ? 'bg-[#1E1916] text-white'
                : 'text-[#6E655E] hover:text-[#1E1916]'
            }`}
          >
            <Edit3 className="w-4 h-4 stroke-[1.75]" />
          </button>

          {isEditMode && (
            <button
              onClick={onResetData}
              title="Reset to default content"
              className="p-1.5 text-[#8C4934] hover:text-[#1E1916] transition-colors"
            >
              <RotateCcw className="w-4 h-4 stroke-[1.75]" />
            </button>
          )}

          {/* Crisp Pure White Pill Button with Dark Text (Exact Match to Reference Right Pill) */}
          <button
            onClick={onOpenPresentation}
            className="bg-white hover:bg-[#FAF6F2] text-[#1E1916] font-display font-bold text-xs sm:text-[13px] px-5 sm:px-6 py-2 rounded-full shadow-[0_4px_14px_rgba(60,45,35,0.12)] border border-white transition-all hover:scale-[1.03] active:scale-95"
          >
            6 Footprints
          </button>
        </div>
      </nav>
    </header>
  );
}
