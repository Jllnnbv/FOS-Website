import React, { useRef } from 'react';
import { Users, Plus, Trash2, Sparkles, Play, Camera } from 'lucide-react';
import InteractiveTiltCard from './InteractiveTiltCard';

const TEAM_FINISHES = [
  'slab-finish-ivory-glitter',
  'slab-finish-pearlescent',
  'slab-finish-terrazzo',
  'slab-finish-smoked-taupe',
];

const DEFAULT_TEAM_PHOTOS = [
  '/assets/team/member-1-saflor.jpg',
  '/assets/team/member-2-villaluna.jpg',
  '/assets/team/member-3-arsenio.jpg',
  '/assets/team/member-4-macatangay.jpg',
];

function TeamMemberCard({
  member,
  index,
  isEditMode,
  canRemove,
  onUpdateMember,
  onRemoveMember,
}) {
  const fileInputRef = useRef(null);
  const finishClass = TEAM_FINISHES[index % TEAM_FINISHES.length];
  const photoSrc =
    member.image || DEFAULT_TEAM_PHOTOS[index % DEFAULT_TEAM_PHOTOS.length];

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateMember(member.id, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative group">
      {/* Floating 3D Metallic Bronze & Champagne Sphere Accent at Top-Left Corner */}
      <div
        aria-hidden="true"
        className="absolute -top-4 -left-4 z-30 w-12 h-12 rounded-full peach-sphere-3d flex items-center justify-center border border-[#D9B38C] font-display font-extrabold text-sm text-[#FBF2E6] shadow-lg group-hover:scale-110 transition-transform"
      >
        0{index + 1}
      </div>

      <InteractiveTiltCard
        maxTilt={11}
        liftY={-12}
        scale={1.03}
        glareOpacity={0.34}
        className={`scurve-slab-container ${finishClass} h-full min-h-[480px] flex flex-col justify-between overflow-hidden relative`}
      >
        {/* Tiny Top-Right Specular Pill Detail */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-5 z-20 w-5 h-2 rounded-full border border-[#D9B38C]/80 bg-[#D9B38C]/30"
        />

        {isEditMode && canRemove && (
          <button
            onClick={() => onRemoveMember(member.id)}
            title="Remove Member"
            className="absolute top-3 right-12 z-30 p-1.5 rounded-full bg-[#24140B] hover:bg-red-950 text-red-300 border border-red-500/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Top Header Zone Above the Diagonal S-Curve Metallic Bronze Wave */}
        <div className="p-6 pt-8 pb-3 relative z-20 flex flex-col items-center text-center justify-center min-h-[80px]">
          {isEditMode ? (
            <input
              type="text"
              value={member.name}
              onChange={(e) =>
                onUpdateMember(member.id, 'name', e.target.value)
              }
              className="w-full font-display font-extrabold text-base text-[#FBF2E6] bg-[#160C06]/90 border border-[#D9B38C] rounded-lg px-2.5 py-1 text-center"
            />
          ) : (
            <h3 className="font-display font-extrabold text-lg sm:text-[19px] text-[#FBF2E6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] tracking-tight leading-snug">
              {member.name}
            </h3>
          )}
        </div>

        {/* Diagonal Sculpted Metallic Bronze & Champagne S-Curve Wave Ribbon Across Middle */}
        <div className="relative w-full h-12 -my-2 z-10 pointer-events-none">
          <svg
            viewBox="0 0 400 90"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                id={`teamGold-${member.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FBF2E6" />
                <stop offset="28%" stopColor="#D9B38C" />
                <stop offset="55%" stopColor="#9E6B43" />
                <stop offset="82%" stopColor="#FBF2E6" />
                <stop offset="100%" stopColor="#5C3A22" />
              </linearGradient>
              <linearGradient
                id={`teamBand-${member.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(122, 82, 54, 0.9)" />
                <stop offset="50%" stopColor="rgba(217, 179, 140, 0.95)" />
                <stop offset="100%" stopColor="rgba(74, 44, 24, 0.9)" />
              </linearGradient>
            </defs>

            {/* Sculpted Bronze-Champagne Ribbon Fill */}
            <path
              d="M 0,68 C 130,10 260,82 400,18 L 400,44 C 260,104 130,34 0,88 Z"
              fill={`url(#teamBand-${member.id})`}
            />

            {/* Upper & Lower Raised Specular Champagne-Gold Rims */}
            <path
              d="M 0,68 C 130,10 260,82 400,18"
              fill="none"
              stroke={`url(#teamGold-${member.id})`}
              strokeWidth="5"
            />
            <path
              d="M 0,88 C 130,34 260,104 400,44"
              fill="none"
              stroke={`url(#teamGold-${member.id})`}
              strokeWidth="3.5"
            />
          </svg>
        </div>

        {/* Center Portrait Zone Between S-Curve Wave & Quote Box */}
        <div className="px-6 py-2 relative z-20 flex flex-col items-center justify-center my-auto">
          <div className="relative">
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl p-[2.5px] bg-gradient-to-br from-[#FBF2E6] via-[#D9B38C] to-[#8C5C38] shadow-[0_18px_36px_-8px_rgba(0,0,0,0.75)]">
              <div className="w-full h-full rounded-[0.9rem] overflow-hidden bg-[#F4EFE7]">
                <img
                  src={photoSrc}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {isEditMode && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Swap Member Photo"
                  className="absolute -bottom-2 -right-2 p-2 rounded-full bg-[#FBF2E6] hover:bg-[#D9B38C] text-[#1B0E07] border border-[#A8764E] shadow-md transition-transform hover:scale-105"
                >
                  <Camera className="w-3.5 h-3.5 text-[#7A5236]" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        {/* Bottom Translucent Frosted Glass Reflection Zone Below the S-Curve */}
        <div className="p-6 pt-3 mt-auto relative z-20">
          <div className="p-4 rounded-2xl glass-subcard">
            {isEditMode ? (
              <textarea
                rows={3}
                value={member.takeaway}
                onChange={(e) =>
                  onUpdateMember(member.id, 'takeaway', e.target.value)
                }
                className="w-full text-xs text-[#FBF2E6] bg-[#120A05] border border-[#D9B38C] rounded p-1.5"
              />
            ) : (
              <p className="text-xs sm:text-[13.5px] text-[#F4E6D6] italic leading-relaxed text-center">
                “{member.takeaway}”
              </p>
            )}
          </div>
        </div>
      </InteractiveTiltCard>
    </div>
  );
}

export default function TeamSection({
  team,
  isEditMode,
  onUpdateMember,
  onAddMember,
  onRemoveMember,
  onOpenPresentation,
}) {
  return (
    <section
      id="team-section"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 z-10 scroll-mt-24"
    >
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl sm:rounded-full frosted-glass-panel text-[#E8C8A3] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-4 text-center">
          <Users className="w-3.5 h-3.5 text-[#D9B38C] flex-shrink-0" />
          <span>Jose Rizal University Bachelor of Science in Information Technology Major in Business Analytics 101BA Group 3</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#FBF2E6] tracking-tight">
          Voices Behind the{' '}
          <span className="bg-gradient-to-r from-[#FBF2E6] via-[#D9B38C] to-[#A8764E] bg-clip-text text-transparent">
            Footprints
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#D9B38C]/85">
          Meet our freshman presentation team and our personal reflections on our first year at JRU.
        </p>
      </div>

      {/* Portrait S-Curve Dark Bronze Slab Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
        {team.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            index={index}
            isEditMode={isEditMode}
            canRemove={team.length > 1}
            onUpdateMember={onUpdateMember}
            onRemoveMember={onRemoveMember}
          />
        ))}
      </div>

      {/* Add Member Button in Edit Mode */}
      {isEditMode && (
        <div className="mt-12 flex items-center justify-center">
          <button
            onClick={onAddMember}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#24140B] hover:bg-[#382113] text-[#FBF2E6] font-semibold text-xs sm:text-sm border-2 border-[#D9B38C] shadow-md transition-all"
          >
            <Plus className="w-4 h-4 text-[#D9B38C]" />
            <span>Add Group Member</span>
          </button>
        </div>
      )}
    </section>
  );
}
