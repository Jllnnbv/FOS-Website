import React, { useState } from 'react';
import {
  Search,
  Equal,
  Clock,
  Edit3,
  RotateCcw,
} from 'lucide-react';
import InteractiveTiltCard from './InteractiveTiltCard';

export default function HeroSection({
  hero,
  footprints,
  activeSection,
  isEditMode,
  setIsEditMode,
  onUpdateHero,
  onStartJourney,
  onOpenPresentation,
  onOpenReferenceModal,
  onResetData,
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, moveX: 0, moveY: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 5,
      rotateY: x * 6,
      moveX: x * 12,
      moveY: y * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, moveX: 0, moveY: 0 });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden select-none"
    >
      {/* Full-Viewport 3D Dark Bronze & Luminous Champagne Studio Stage */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#120A05]">
        <img
          src="/assets/hero-stage-bronze-exact.jpg?v=final"
          alt="3D Dark Bronze & Champagne Gold Studio Scene with Floating S-Curve Cards"
          className="w-full h-full object-cover object-[center_62%] transition-transform duration-500 ease-out"
          style={{
            transform: `scale(1.03) translate3d(${tilt.moveX * -0.6}px, ${tilt.moveY * -0.6}px, 0)`,
          }}
        />
        {/* Bottom Ground Fade to Obsidian Espresso */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#120A05] to-transparent pointer-events-none"
        />
      </div>

      {/* Top Spanning Smoked Bronze Frosted Glass Navigation Bar */}
      <header className="relative z-30 w-full max-w-[1140px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <nav
          aria-label="Primary Navigation"
          className="reference-top-navbar px-5 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4"
        >
          {/* Left: Luminous Champagne Ivory (#FBF2E6) Brand Label */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-xs sm:text-[15px] tracking-tight text-[#FBF2E6] hover:text-[#D9B38C] transition-colors text-left"
          >
            FOS • JRU / Project 03
          </button>

          {/* Center: Warm Champagne (#D9B38C) Minimalist UI Text Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-[13px] font-medium text-[#D9B38C]">
            <button
              onClick={() => scrollToSection('footprint-1')}
              className="hover:text-[#FBF2E6] transition-colors"
            >
              First Step
            </button>
            <button
              onClick={() => scrollToSection('footprint-3')}
              className="hover:text-[#FBF2E6] transition-colors"
            >
              Milestones
            </button>
            <button
              onClick={() => scrollToSection('footprint-6')}
              className="hover:text-[#FBF2E6] transition-colors"
            >
              Moving Forward
            </button>
            <button
              onClick={() => scrollToSection('team-section')}
              className="hover:text-[#FBF2E6] transition-colors"
            >
              Our Team
            </button>
          </div>

          {/* Right: 3 Minimalist Icons + Glowing Champagne-Ivory Pill Button with Deep Espresso Text */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={() => scrollToSection('journey-timeline')}
              title="Jump to 6 Footprints Timeline"
              className="p-1 text-[#D9B38C] hover:text-[#FBF2E6] transition-colors"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
            </button>

            <button
              onClick={() => setIsEditMode(!isEditMode)}
              title={isEditMode ? 'Done Customizing' : 'Customize Text & Photos'}
              className={`p-1 rounded-full transition-colors ${
                isEditMode
                  ? 'bg-[#D9B38C] text-[#120A05]'
                  : 'text-[#D9B38C] hover:text-[#FBF2E6]'
              }`}
            >
              {isEditMode ? (
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Equal className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
              )}
            </button>

            <button
              onClick={onOpenReferenceModal}
              title="View 8K Render Showcase"
              className="p-1 text-[#D9B38C] hover:text-[#FBF2E6] transition-colors"
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
            </button>

            {isEditMode && (
              <button
                onClick={onResetData}
                title="Reset to default content"
                className="p-1 text-[#D9B38C] hover:text-[#FBF2E6] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* Luminous Champagne-Ivory Pill Button on Right of Navbar */}
            <button
              onClick={onOpenPresentation}
              className="reference-glowing-cta-pill font-display font-bold text-[11px] sm:text-[13px] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full"
            >
              Present Deck
            </button>
          </div>
        </nav>
      </header>

      {/* Center Foreground: Square-Proportioned Smoked Bronze & Champagne Frosted Glass Card */}
      <div className="relative z-20 my-auto px-4 py-4 flex flex-col items-center justify-center w-full">
        <InteractiveTiltCard
          maxTilt={13}
          liftY={-14}
          scale={1.035}
          glareOpacity={0.38}
          className="reference-center-glass-card relative w-full max-w-[515px] min-h-[385px] sm:min-h-[420px] rounded-[2.2rem] px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center justify-center text-center cursor-pointer"
        >
          {/* Tiny Pill Specular Detail in Top-Right Corner */}
          <div
            aria-hidden="true"
            className="absolute top-5 right-6 w-5 h-2.5 rounded-full border border-[#FBF2E6]/75 bg-[#D9B38C]/30"
          />

          {/* Overline / Project Label: P R O J E C T   3 */}
          <p className="font-serif tracking-[0.32em] text-[11px] sm:text-[13px] uppercase text-[#FBF2E6]/90 font-normal mb-2.5">
            P R O J E C T &nbsp; 3
          </p>

          {/* Elegant High-Contrast Editorial Serif Headline Matching the User's Image */}
          {isEditMode ? (
            <textarea
              rows={4}
              value={hero.title}
              onChange={(e) => onUpdateHero('title', e.target.value)}
              className="w-full font-serif text-2xl sm:text-3xl text-[#FBF2E6] bg-[#120A05]/50 border border-[#D9B38C] rounded-xl p-2.5 text-center focus:outline-none"
            />
          ) : (
            <h1 className="font-serif leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)] select-none">
              <span className="block font-serif italic font-normal text-[2rem] sm:text-[2.65rem] text-[#FFFDF9]">
                Footprints Forward:
              </span>
              <span className="block font-serif not-italic font-normal text-[2rem] sm:text-[2.65rem] text-[#FFFDF9] mt-0.5">
                Our Freshman
              </span>
              <span className="block font-serif not-italic font-normal text-[2rem] sm:text-[2.65rem] text-[#FFFDF9] mt-0.5">
                Journey Presentation
              </span>
            </h1>
          )}

          {/* Subtle Clean Sans-Serif Subtitle Underneath Headline */}
          {isEditMode ? (
            <textarea
              rows={3}
              value={hero.subtitle}
              onChange={(e) => onUpdateHero('subtitle', e.target.value)}
              className="w-full mt-3.5 text-xs text-[#FBF2E6] bg-[#120A05]/50 border border-[#D9B38C] rounded-lg p-2 text-center focus:outline-none"
            />
          ) : (
            <p className="mt-4 text-[11px] sm:text-[12.5px] leading-relaxed text-[#FBF2E6]/85 font-sans max-w-[370px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
              {hero.subtitle}
            </p>
          )}

          {/* Small, Glowing Luminous Champagne-Bronze Pill CTA Button Placed Underneath Text */}
          <div className="mt-7">
            <button
              onClick={onStartJourney}
              className="reference-glowing-cta-pill px-7 py-2.5 rounded-full font-sans font-semibold text-xs sm:text-[13px] tracking-tight text-[#1A0C06]"
            >
              {hero.ctaText}
            </button>
          </div>
        </InteractiveTiltCard>
      </div>

      {/* Bottom Area: Positioned lower down on the reflective floor, completely clearing the 3D cards */}
      <div className="relative z-20 w-full px-4 pb-2 sm:pb-3 mt-auto flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#180C06]/90 backdrop-blur-md border border-[#D9B38C]/55 shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
          {footprints.map((fp) => {
            const shortName = fp.title.replace(/^Footprint \d+:\s*/i, '').split(' - ')[0];
            return (
              <button
                key={fp.id}
                onClick={() => scrollToSection(fp.id)}
                className="px-2 sm:px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-semibold text-[#FBF2E6] hover:bg-[#D9B38C]/25 transition-all whitespace-nowrap"
              >
                <span className="font-bold text-[#D9B38C] mr-1">{fp.number}</span>
                <span className="hidden sm:inline">{shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
