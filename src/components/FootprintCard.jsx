import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Award,
  Compass,
  BookOpen,
  Flame,
  TrendingUp,
  Rocket,
  Play,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react';
import InteractiveTiltCard from './InteractiveTiltCard';

const ICONS = {
  sunrise: Compass,
  discovery: BookOpen,
  challenge: Flame,
  achievement: Award,
  growth: TrendingUp,
  future: Rocket,
};

const DEFAULT_PORTRAITS = {
  sean: '/assets/team/member-3-arsenio.jpg',
  danielle: '/assets/team/member-4-macatangay.jpg',
  erroll: '/assets/team/member-1-saflor.jpg',
  jullianna: '/assets/team/member-2-villaluna.jpg',
};

const CARD_FINISHES = [
  'slab-finish-pearlescent',
  'slab-finish-terrazzo',
  'slab-finish-ivory-glitter',
  'slab-finish-smoked-taupe',
];

export default function FootprintCard({
  footprint,
  index,
  isEditMode,
  onUpdateFootprint,
  onOpenSlideAt,
}) {
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);
  const IconComponent = ICONS[footprint.accentType] || Sparkles;
  const entries = footprint.entries || [];
  const layoutStyle = footprint.layoutStyle || 'bento';

  const handleEntryTextChange = (entryIdx, newText) => {
    const updatedEntries = entries.map((entry, idx) =>
      idx === entryIdx ? { ...entry, text: newText } : entry
    );
    onUpdateFootprint(footprint.id, 'entries', updatedEntries);
  };

  const handleEntryNameChange = (entryIdx, newName) => {
    const updatedEntries = entries.map((entry, idx) =>
      idx === entryIdx ? { ...entry, name: newName } : entry
    );
    onUpdateFootprint(footprint.id, 'entries', updatedEntries);
  };

  const handleTagChange = (tagIdx, newValue) => {
    const updated = [...footprint.tags];
    updated[tagIdx] = newValue;
    onUpdateFootprint(footprint.id, 'tags', updated);
  };

  const getPortrait = (entry) =>
    entry.image ||
    DEFAULT_PORTRAITS[entry.studentKey] ||
    '/assets/team/member-1-saflor.jpg';

  return (
    <article
      id={footprint.id}
      className="relative scroll-mt-24 py-8 sm:py-12"
    >
      {/* Ambient 3D Decorative Elements around Each Footprint Section */}
      <div
        aria-hidden="true"
        className="hidden md:flex absolute -top-5 -left-5 z-30 w-16 h-16 rounded-full peach-sphere-3d items-center justify-center border border-[#D9B38C]/90 pointer-events-none shadow-2xl"
      >
        <span className="font-display font-extrabold text-base text-[#FBF2E6] drop-shadow">
          {footprint.number}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="hidden lg:block absolute -bottom-6 -right-6 z-0 w-24 h-24 rounded-full rose-gold-sphere-3d opacity-75 pointer-events-none"
      />

      {/* ====================================================================
          FROSTED GLASS HEADER BANNER (Matches Each Footprint Prompt Title)
         ==================================================================== */}
      <InteractiveTiltCard
        maxTilt={7}
        liftY={-8}
        scale={1.015}
        glareOpacity={0.28}
        className="frosted-glass-panel rounded-[2rem] p-6 sm:p-9 mb-7 sm:mb-9 relative overflow-hidden border border-[#D9B38C]/65 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)]"
      >
        {/* Specular Terrazzo & Gold Trim Accent Pill */}
        <div
          aria-hidden="true"
          className="absolute top-5 right-6 w-8 h-2.5 rounded-full border border-[#FBF2E6]/80 bg-[#D9B38C]/35"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full reference-glowing-cta-pill text-xs font-bold tracking-wider uppercase">
            <IconComponent className="w-3.5 h-3.5 text-[#5C3A22]" />
            <span>
              {footprint.label} • {footprint.number}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8C8A3] bg-[#180D07]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D9B38C]/45">
              <Calendar className="w-3.5 h-3.5 text-[#D9B38C]" />
              {isEditMode ? (
                <input
                  type="text"
                  value={footprint.dateTag}
                  onChange={(e) =>
                    onUpdateFootprint(footprint.id, 'dateTag', e.target.value)
                  }
                  className="bg-transparent border-b border-[#D9B38C] text-[#FBF2E6] focus:outline-none text-xs w-44"
                />
              ) : (
                <span>{footprint.dateTag}</span>
              )}
            </div>

            <button
              onClick={() => onOpenSlideAt(index)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D9B38C]/20 hover:bg-[#D9B38C]/35 text-[#FBF2E6] font-display font-bold text-xs border border-[#D9B38C]/60 transition-transform hover:scale-105"
            >
              <Play className="w-3 h-3 fill-[#D9B38C] text-[#D9B38C]" />
              <span>Present Slide {footprint.number}</span>
            </button>
          </div>
        </div>

        {/* Clean White Sans-Serif Title on Frosted Glass Header */}
        {isEditMode ? (
          <input
            type="text"
            value={footprint.title}
            onChange={(e) =>
              onUpdateFootprint(footprint.id, 'title', e.target.value)
            }
            className="w-full font-display font-extrabold text-2xl sm:text-4xl text-[#FBF2E6] bg-[#160C06]/85 border border-[#D9B38C] rounded-xl px-3 py-1.5 mb-2 focus:outline-none"
          />
        ) : (
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#FFFFFF] tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            {footprint.title}
          </h3>
        )}

        {isEditMode ? (
          <input
            type="text"
            value={footprint.subtitle}
            onChange={(e) =>
              onUpdateFootprint(footprint.id, 'subtitle', e.target.value)
            }
            className="w-full text-sm sm:text-base font-semibold text-[#D9B38C] bg-[#160C06]/85 border border-[#D9B38C] rounded-lg px-3 py-1 mt-1 focus:outline-none"
          />
        ) : (
          <p className="mt-2 text-sm sm:text-base font-semibold text-[#E8C8A3]">
            {footprint.subtitle}
          </p>
        )}

        {/* Tags Bar */}
        <div className="mt-5 pt-4 border-t border-[#D9B38C]/25 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {footprint.tags.map((tag, tIdx) =>
              isEditMode ? (
                <input
                  key={tIdx}
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(tIdx, e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#160C06] border border-[#D9B38C] text-[#FBF2E6] w-32"
                />
              ) : (
                <span
                  key={tIdx}
                  className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-[#180D07]/75 text-[#E5C5A3] border border-[#D9B38C]/40"
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D9B38C]">
            Sean • Danielle • Erroll • Jullianna
          </span>
        </div>
      </InteractiveTiltCard>

      {/* ====================================================================
          LAYOUT 1 (Footprint 1): Modern 2x2 Bento-Grid with Circular Portraits
          Next to Glowing Text Boxes + Floating Peach Spheres & Terrazzo Trim
         ==================================================================== */}
      {layoutStyle === 'bento' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          {entries.map((entry, eIdx) => {
            const finish = CARD_FINISHES[eIdx % CARD_FINISHES.length];
            const colSpan =
              eIdx === 0 || eIdx === 3 ? 'md:col-span-6' : 'md:col-span-6';
            return (
              <InteractiveTiltCard
                key={entry.id}
                maxTilt={10}
                liftY={-10}
                scale={1.025}
                glareOpacity={0.32}
                className={`${colSpan} scurve-slab-container ${finish} p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-5 relative overflow-hidden group`}
              >
                {/* Floating Terrazzo & Gold Corner Accent */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full peach-sphere-3d opacity-35 pointer-events-none group-hover:scale-110 transition-transform"
                />

                {/* Circular Student Portrait with Metallic Gold & Rose-Peach Ring */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-[#C69363] via-[#FBF2E6] to-[#D9B38C] shadow-[0_0_25px_rgba(217,179,140,0.45)]">
                    <img
                      src={getPortrait(entry)}
                      alt={entry.fullName || entry.name}
                      className="w-full h-full rounded-full object-cover object-top bg-[#24140B]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full peach-sphere-3d border border-[#FBF2E6] text-[11px] font-display font-extrabold text-[#FBF2E6] flex items-center justify-center shadow">
                    0{eIdx + 1}
                  </span>
                </div>

                {/* Glowing Text Box Representing Personal Experience */}
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={entry.name}
                        onChange={(e) =>
                          handleEntryNameChange(eIdx, e.target.value)
                        }
                        className="font-display font-extrabold text-lg text-[#FBF2E6] bg-[#160C06] border border-[#D9B38C] rounded px-2 py-0.5"
                      />
                    ) : (
                      <div>
                        <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#FBF2E6] tracking-tight">
                          {entry.name}
                        </h4>
                        <p className="text-[11px] font-semibold text-[#D9B38C]/90">
                          {entry.fullName}
                        </p>
                      </div>
                    )}
                    <span className="px-3 py-0.5 rounded-full reference-glowing-cta-pill text-[10px] font-bold uppercase tracking-wider">
                      {entry.role}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl glass-subcard">
                    {isEditMode ? (
                      <textarea
                        rows={4}
                        value={entry.text}
                        onChange={(e) =>
                          handleEntryTextChange(eIdx, e.target.value)
                        }
                        className="w-full text-xs sm:text-sm text-[#FBF2E6] bg-[#120A05] border border-[#D9B38C] rounded p-2"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-[#FBF2E6]/95 leading-relaxed">
                        “{entry.text}”
                      </p>
                    )}
                  </div>
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          LAYOUT 2 (Footprint 2): Horizontal Carousel of 4 Sleek Frosted Glass
          UI Cards with Top-Aligned Square Picture Fading into Translucent Text
         ==================================================================== */}
      {layoutStyle === 'carousel' && (
        <div className="relative z-10">
          {/* Carousel Highlight Controls for Mobile/Interactive Focus */}
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9B38C] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FBF2E6]" />
              <span>Sleek Horizontal Frosted Glass Carousel • Glowing Gold Borders</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveCarouselIdx(
                    (prev) => (prev - 1 + entries.length) % entries.length
                  )
                }
                className="p-2 rounded-full bg-[#24140B] hover:bg-[#3D2516] text-[#FBF2E6] border border-[#D9B38C]/60 transition-colors"
                title="Highlight Previous Student"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveCarouselIdx((prev) => (prev + 1) % entries.length)
                }
                className="p-2 rounded-full bg-[#24140B] hover:bg-[#3D2516] text-[#FBF2E6] border border-[#D9B38C]/60 transition-colors"
                title="Highlight Next Student"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {entries.map((entry, eIdx) => {
              const isHighlighted = activeCarouselIdx === eIdx;
              return (
                <InteractiveTiltCard
                  key={entry.id}
                  maxTilt={11}
                  liftY={-12}
                  scale={1.03}
                  glareOpacity={0.34}
                  onClick={() => setActiveCarouselIdx(eIdx)}
                  className={`cursor-pointer rounded-[2rem] overflow-hidden flex flex-col justify-between relative scurve-slab-container slab-finish-pearlescent ${
                    isHighlighted
                      ? 'border-2 border-[#FFF6E8] shadow-[0_0_40px_rgba(234,194,146,0.5)]'
                      : ''
                  }`}
                >
                  {/* Top-Aligned Square Picture Placeholder Fading into Translucent Text Area */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#24140B]">
                    <img
                      src={getPortrait(entry)}
                      alt={entry.fullName || entry.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                    {/* Seamless Gradient Fade at Bottom of Square Portrait */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1E1109] via-[#1E1109]/70 to-transparent" />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#120A05]/75 backdrop-blur-md border border-[#FBF2E6]/60 text-[10px] font-bold uppercase tracking-widest text-[#FBF2E6]">
                      0{eIdx + 1} • {entry.name}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full reference-glowing-cta-pill text-[9px] font-bold uppercase tracking-wider mb-1">
                        {entry.role}
                      </span>
                      <h4 className="font-display font-extrabold text-lg text-[#FFFFFF] drop-shadow">
                        {entry.fullName}
                      </h4>
                    </div>
                  </div>

                  {/* Translucent Text Area Detailing New Skills & Classroom Insights */}
                  <div className="p-5 pt-3 flex-1 flex flex-col justify-between border-t border-[#D9B38C]/35">
                    {isEditMode ? (
                      <textarea
                        rows={4}
                        value={entry.text}
                        onChange={(e) =>
                          handleEntryTextChange(eIdx, e.target.value)
                        }
                        className="w-full text-xs text-[#FBF2E6] bg-[#120A05] border border-[#D9B38C] rounded p-2"
                      />
                    ) : (
                      <p className="text-xs sm:text-[13.5px] text-[#F4E6D6] leading-relaxed">
                        “{entry.text}”
                      </p>
                    )}
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================================================
          LAYOUT 3 (Footprint 3): Four Vertical Frosted Glass Panels with
          Minimalist Portrait Placeholder at Top Center & Structured Text Blocks
         ==================================================================== */}
      {layoutStyle === 'vertical-panels' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {entries.map((entry, eIdx) => {
            const finish = CARD_FINISHES[eIdx % CARD_FINISHES.length];
            return (
              <InteractiveTiltCard
                key={entry.id}
                maxTilt={11}
                liftY={-12}
                scale={1.03}
                glareOpacity={0.34}
                className={`scurve-slab-container ${finish} p-6 flex flex-col items-center text-center justify-between relative overflow-hidden group`}
              >
                {/* Glowing Edge Top Bar */}
                <div
                  aria-hidden="true"
                  className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-[#FBF2E6] to-transparent mb-4 opacity-85"
                />

                {/* Top Center Minimalist Portrait Placeholder */}
                <div className="relative mb-4">
                  <div className="w-28 h-32 rounded-2xl p-[2.5px] bg-gradient-to-b from-[#FBF2E6] via-[#D9B38C] to-[#7A5236] shadow-[0_14px_30px_rgba(0,0,0,0.7)]">
                    <img
                      src={getPortrait(entry)}
                      alt={entry.fullName || entry.name}
                      className="w-full h-full rounded-[0.9rem] object-cover object-top bg-[#24140B]"
                    />
                  </div>
                  <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full peach-sphere-3d border border-[#FBF2E6] text-[11px] font-display font-extrabold text-[#FBF2E6] flex items-center justify-center">
                    0{eIdx + 1}
                  </span>
                </div>

                {/* Student Name & Challenge Badge */}
                <span className="px-3 py-0.5 rounded-full reference-glowing-cta-pill text-[9.5px] font-bold uppercase tracking-wider mb-2">
                  {entry.role}
                </span>
                <h4 className="font-display font-extrabold text-xl text-[#FFFFFF] tracking-tight">
                  {entry.name}
                </h4>
                <p className="text-[11px] font-semibold text-[#D9B38C] mb-4">
                  {entry.fullName}
                </p>

                {/* Structured Editorial Text Block for Challenges & Lessons Learned */}
                <div className="w-full p-4 rounded-2xl glass-subcard text-left mt-auto">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#D9B38C] mb-1.5 flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-[#FBF2E6]" />
                    <span>Challenge & Lesson</span>
                  </div>
                  {isEditMode ? (
                    <textarea
                      rows={5}
                      value={entry.text}
                      onChange={(e) =>
                        handleEntryTextChange(eIdx, e.target.value)
                      }
                      className="w-full text-xs text-[#FBF2E6] bg-[#120A05] border border-[#D9B38C] rounded p-2"
                    />
                  ) : (
                    <p className="text-xs sm:text-[13.5px] text-[#F4E6D6] leading-relaxed">
                      “{entry.text}”
                    </p>
                  )}
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          LAYOUT 4 (Footprint 4): Masonry Layout of Four Frosted Glass Cards
          with Integrated Circular Photo, Terrazzo Cards & Metallic Gold Trim
         ==================================================================== */}
      {layoutStyle === 'masonry' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start relative z-10">
          {entries.map((entry, eIdx) => {
            const isOffset = eIdx % 2 === 1;
            return (
              <InteractiveTiltCard
                key={entry.id}
                maxTilt={10}
                liftY={-10}
                scale={1.025}
                glareOpacity={0.32}
                className={`metallic-gold-trim relative overflow-hidden ${
                  isOffset ? 'md:mt-8' : ''
                }`}
              >
                <div className="terrazzo-surface rounded-[1.7rem] p-6 sm:p-7 relative overflow-hidden">
                  {/* Floating 3D Peach Sphere Decoration */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full peach-sphere-3d opacity-40 pointer-events-none"
                  />

                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    {/* Integrated Circular Photo Placeholder */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#FBF2E6] via-[#D9B38C] to-[#9E6B43] shadow-lg shrink-0">
                      <img
                        src={getPortrait(entry)}
                        alt={entry.fullName || entry.name}
                        className="w-full h-full rounded-full object-cover object-top bg-[#24140B]"
                      />
                    </div>

                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full reference-glowing-cta-pill text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        {entry.role}
                      </span>
                      <h4 className="font-display font-extrabold text-xl text-[#FFFFFF]">
                        {entry.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#D9B38C]">
                        {entry.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Elegant Typography for Memorable Moments */}
                  <div className="p-5 rounded-2xl glass-subcard relative z-10">
                    <Quote className="w-4 h-4 text-[#D9B38C] mb-2" />
                    {isEditMode ? (
                      <textarea
                        rows={3}
                        value={entry.text}
                        onChange={(e) =>
                          handleEntryTextChange(eIdx, e.target.value)
                        }
                        className="w-full text-xs sm:text-sm text-[#FBF2E6] bg-[#120A05] border border-[#D9B38C] rounded p-2"
                      />
                    ) : (
                      <p className="font-serif italic text-sm sm:text-base text-[#FBF2E6] leading-relaxed">
                        “{entry.text}”
                      </p>
                    )}
                  </div>
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          LAYOUT 5 (Footprint 5): Four-Column Grid of Translucent Cards with
          Avatar Ringed in Metallic Gold Positioned Above Growth Text Blocks
         ==================================================================== */}
      {layoutStyle === 'growth-columns' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {entries.map((entry, eIdx) => {
            const finish = CARD_FINISHES[eIdx % CARD_FINISHES.length];
            return (
              <InteractiveTiltCard
                key={entry.id}
                maxTilt={11}
                liftY={-12}
                scale={1.03}
                glareOpacity={0.34}
                className={`scurve-slab-container ${finish} p-6 flex flex-col items-center text-center justify-between relative overflow-hidden`}
              >
                {/* Avatar Placeholder Ringed in Metallic Gold */}
                <div className="relative mb-4 mt-1">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#9E6B43] via-[#FBF2E6] to-[#D9B38C] shadow-[0_0_30px_rgba(251,242,230,0.35)]">
                    <div className="w-full h-full rounded-full p-0.5 bg-[#1E1109]">
                      <img
                        src={getPortrait(entry)}
                        alt={entry.fullName || entry.name}
                        className="w-full h-full rounded-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 right-0 w-8 h-8 rounded-full peach-sphere-3d border border-[#FBF2E6] flex items-center justify-center text-xs font-extrabold text-[#FBF2E6]">
                    0{eIdx + 1}
                  </div>
                </div>

                <h4 className="font-display font-extrabold text-xl text-[#FFFFFF]">
                  {entry.name}
                </h4>
                <p className="text-[11px] font-semibold text-[#D9B38C] mb-2">
                  {entry.fullName}
                </p>
                <span className="px-3 py-0.5 rounded-full reference-glowing-cta-pill text-[9.5px] font-bold uppercase tracking-wider mb-4">
                  {entry.role}
                </span>

                {/* Personal Growth Text Block */}
                <div className="w-full p-4 rounded-2xl glass-subcard mt-auto">
                  {isEditMode ? (
                    <textarea
                      rows={4}
                      value={entry.text}
                      onChange={(e) =>
                        handleEntryTextChange(eIdx, e.target.value)
                      }
                      className="w-full text-xs text-[#FBF2E6] bg-[#120A05] border border-[#D9B38C] rounded p-2"
                    />
                  ) : (
                    <p className="text-xs sm:text-[13.5px] text-[#F4E6D6] leading-relaxed">
                      “{entry.text}”
                    </p>
                  )}
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          LAYOUT 6 (Footprint 6): Four Interactive Frosted Glass Cards in an
          Ascending Staircase Arrangement Symbolizing Upward Progress
         ==================================================================== */}
      {layoutStyle === 'staircase' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end pt-4 lg:pt-16 relative z-10">
          {entries.map((entry, eIdx) => {
            const finish = CARD_FINISHES[eIdx % CARD_FINISHES.length];
            // Ascending staircase step offsets on large screens (Step 1 -> Step 4 highest)
            const stepTranslateClasses = [
              'lg:translate-y-0',
              'lg:-translate-y-5',
              'lg:-translate-y-10',
              'lg:-translate-y-16',
            ];
            return (
              <InteractiveTiltCard
                key={entry.id}
                maxTilt={11}
                liftY={-12}
                scale={1.03}
                glareOpacity={0.36}
                className={`scurve-slab-container ${finish} ${
                  stepTranslateClasses[eIdx % 4]
                } p-6 flex flex-col justify-between relative overflow-hidden border-2 border-[#FBF2E6]/65 shadow-[0_28px_60px_rgba(0,0,0,0.8)]`}
              >
                {/* Step Indicator Ribbon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full reference-glowing-cta-pill text-[10px] font-bold uppercase tracking-widest">
                    Step 0{eIdx + 1} ↑
                  </span>
                  <Rocket className="w-4 h-4 text-[#FBF2E6]" />
                </div>

                {/* Portrait + Name Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-[2px] bg-gradient-to-tr from-[#FBF2E6] via-[#D9B38C] to-[#9E6B43] shadow-lg shrink-0">
                    <img
                      src={getPortrait(entry)}
                      alt={entry.fullName || entry.name}
                      className="w-full h-full rounded-[0.9rem] object-cover object-top bg-[#24140B]"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-lg text-[#FFFFFF] leading-snug">
                      {entry.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#D9B38C]">
                      {entry.fullName}
                    </p>
                  </div>
                </div>

                {/* Academic & Personal Goal Box */}
                <div className="p-4 rounded-2xl glass-subcard mt-auto">
                  <span className="block text-[9.5px] font-bold uppercase tracking-widest text-[#D9B38C] mb-1">
                    {entry.role}
                  </span>
                  {isEditMode ? (
                    <textarea
                      rows={4}
                      value={entry.text}
                      onChange={(e) =>
                        handleEntryTextChange(eIdx, e.target.value)
                      }
                      className="w-full text-xs text-[#FBF2E6] bg-[#120A05] border border-[#D9B38C] rounded p-2"
                    />
                  ) : (
                    <p className="text-xs sm:text-[13.5px] text-[#FBF2E6] leading-relaxed">
                      “{entry.text}”
                    </p>
                  )}
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      )}
    </article>
  );
}
