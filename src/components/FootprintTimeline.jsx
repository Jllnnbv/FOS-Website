import React from 'react';
import FootprintCard from './FootprintCard';
import { Footprints, Sparkles, Play } from 'lucide-react';

export default function FootprintTimeline({
  footprints,
  isEditMode,
  onUpdateFootprint,
  onOpenSlideAt,
  onOpenPresentation,
}) {
  return (
    <section
      id="journey-timeline"
      aria-label="Our Six Freshman Journey Footprints"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-24 z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frosted-glass-panel text-[#E8C8A3] text-xs font-bold tracking-widest uppercase mb-4">
          <Footprints className="w-3.5 h-3.5 text-[#D9B38C]" />
          <span>Sculpted Bronze • Luminous Champagne</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D9B38C]" />
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#FBF2E6] tracking-tight">
          Stepping Stones of Our{' '}
          <span className="bg-gradient-to-r from-[#FBF2E6] via-[#D9B38C] to-[#A8764E] bg-clip-text text-transparent">
            Freshman Journey
          </span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#D9B38C]/85 leading-relaxed">
          Follow our path from our very first day at Jose Rizal University through every discovery,
          challenge, triumph, and personal transformation that shaped us.
        </p>
      </div>

      {/* Unified S-Curve Containers Stack */}
      <div className="relative space-y-8 sm:space-y-12">
        {footprints.map((fp, idx) => (
          <FootprintCard
            key={fp.id}
            footprint={fp}
            index={idx}
            isEditMode={isEditMode}
            onUpdateFootprint={onUpdateFootprint}
            onOpenSlideAt={onOpenSlideAt}
          />
        ))}
      </div>

      {/* Bottom Presentation Deck Trigger (After Footprint 6) */}
      <div className="mt-16 sm:mt-20 flex items-center justify-center">
        <button
          onClick={onOpenPresentation}
          className="reference-glowing-cta-pill px-8 py-3.5 rounded-full font-display font-bold text-sm flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-[#1B0E07] text-[#1B0E07]" />
          <span>View Full Presentation Deck</span>
          <Sparkles className="w-4 h-4 text-[#5C3A22]" />
        </button>
      </div>
    </section>
  );
}
