import React, { useState } from 'react';
import { RotateCw, ArrowRight, Compass, BookOpen, Flame, Rocket, Sparkles } from 'lucide-react';

const CARD_ICONS = {
  '01': Compass,
  '02': BookOpen,
  '03': Flame,
  '06': Rocket,
};

export default function FloatingHero3DCard({
  imageSrc,
  footprint,
  positionClass = '',
  widthClass = 'w-[260px] lg:w-[320px] xl:w-[360px]',
  parallaxDepth = 1,
  tilt = { moveX: 0, moveY: 0 },
  floatClass = 'animate-hero-float-1',
  onNavigate,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = CARD_ICONS[footprint?.number] || Sparkles;

  // Gentle mouse parallax translation
  const offsetX = tilt.moveX * parallaxDepth * 0.9;
  const offsetY = tilt.moveY * parallaxDepth * 0.8;

  // Gentle interactive tilt on hover & mouse tracking
  const tiltRotateX = (isHovered ? -3 : 0) - (tilt.moveY * 0.25 * parallaxDepth);
  const tiltRotateY = (isHovered ? 4 : 0) + (tilt.moveX * 0.3 * parallaxDepth) + (isFlipped ? 180 : 0);
  const currentTranslateZ = isHovered ? 35 : 0;
  const currentScale = isHovered ? 1.05 : 1;

  const handleCardClick = (e) => {
    if (e.target.closest('button[data-explore]')) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`absolute ${positionClass} ${floatClass} z-10 transition-opacity duration-700 pointer-events-auto select-none`}
      style={{
        perspective: '1400px',
      }}
    >
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`${footprint?.title || 'Floating card'} - Click to ${isFlipped ? 'flip back' : 'flip'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        className={`relative ${widthClass} cursor-pointer group`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `translate3d(${offsetX}px, ${offsetY}px, ${currentTranslateZ}px) scale(${currentScale}) rotateX(${tiltRotateX}deg) rotateY(${tiltRotateY}deg)`,
          transition: isHovered
            ? 'transform 0.4s cubic-bezier(0.2, 0.85, 0.4, 1), filter 0.4s ease'
            : 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s ease',
        }}
      >
        {/* ========================================================
            FRONT FACE: The Authentic 8K Octane Sculpted Render Card
            ======================================================== */}
        <div
          className="relative w-full rounded-3xl overflow-hidden transition-all duration-300 drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)] group-hover:drop-shadow-[0_28px_50px_rgba(217,179,140,0.35)]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Authentic 3D Render Image */}
          <img
            src={imageSrc}
            alt={footprint?.title || 'Floating 3D Card'}
            className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
            draggable={false}
          />

          {/* Glowing Flip Pill Badge on Hover */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B0E07]/90 border border-[#D9B38C] text-[#FBF2E6] text-[11px] font-extrabold shadow-lg backdrop-blur-md">
              <RotateCw className="w-3 h-3 text-[#D9B38C]" />
              <span>Flip Card</span>
            </span>
          </div>

          {/* Footprint Indicator Badge at Bottom */}
          <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120A05]/85 border border-[#D9B38C]/60 text-[10px] font-bold text-[#E8C8A3] uppercase tracking-wider backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9B38C] animate-pulse" />
              <span>{footprint?.number} • {footprint?.title?.split(':')[1]?.trim() || footprint?.title}</span>
            </span>
          </div>
        </div>

        {/* ========================================================
            BACK FACE: Interactive Smoked Glass Reflection Card
            ======================================================== */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden scurve-slab-container slab-finish-pearlescent flex flex-col justify-between p-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top Row on Back */}
          <div className="flex items-center justify-between relative z-20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full peach-sphere-3d flex items-center justify-center text-xs font-bold text-[#FBF2E6]">
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-bold text-xs text-[#FBF2E6] uppercase tracking-wider">
                {footprint?.number} • JRU FOS
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              title="Flip back to front"
              className="p-1 rounded-full glass-subcard text-[#EAC292] hover:text-[#FFF8EE] transition-colors"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>

          {/* Middle Content */}
          <div className="my-auto relative z-20 py-2">
            <span className="text-[10px] font-bold text-[#EAC292] uppercase tracking-widest block mb-1">
              {footprint?.label || 'Milestone Reflection'}
            </span>
            <h4 className="font-display font-extrabold text-sm sm:text-base text-[#FFF8EE] mb-2 leading-tight">
              {footprint?.title?.split(':')[1]?.trim() || footprint?.title}
            </h4>
            <p className="text-[11.5px] sm:text-xs text-[#F4D9B6] italic leading-relaxed line-clamp-4 glass-subcard p-3 rounded-xl">
              {footprint?.quote || footprint?.reflection || 'Our steps continue forward at Jose Rizal University.'}
            </p>
          </div>

          {/* Bottom Action */}
          <div className="relative z-20 mt-auto pt-2">
            <button
              type="button"
              data-explore="true"
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigate && footprint?.id) {
                  onNavigate(footprint.id);
                }
              }}
              className="w-full reference-glowing-cta-pill py-2.5 px-4 rounded-full font-display font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Explore Footprint {footprint?.number}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1B0E07]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
