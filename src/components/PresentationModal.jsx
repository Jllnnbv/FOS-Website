import React, { useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Upload,
  Film,
  RotateCcw,
} from 'lucide-react';

export default function PresentationModal({
  isOpen,
  onClose,
  hero,
  customVideoUrl,
  onUpdateVideoUrl,
}) {
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onUpdateVideoUrl(objectUrl, file.name);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video Presentation Mode"
      className="fixed inset-0 z-50 flex flex-col justify-between studio-canvas p-4 sm:p-8 overflow-y-auto"
    >
      {/* Liquid Bronze & Gold Curves Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/assets/liquid-bronze-curves-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080402]/40 via-[#120703]/45 to-[#080402]/65" />
      </div>

      {/* Ambient Floating 3D Bronze & Champagne Spheres */}
      <div className="hidden sm:block absolute top-14 left-12 w-24 h-24 rounded-full peach-sphere-3d opacity-80 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-14 right-12 w-28 h-28 rounded-full rose-gold-sphere-3d opacity-80 pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] w-full mx-auto flex items-center justify-between reference-top-navbar rounded-full px-5 py-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#EAC292]" />
          <span className="font-display font-bold text-xs sm:text-sm text-[#FFF8EE] uppercase tracking-wider">
            JRU FOS • Video Presentation
          </span>
        </div>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EAC292] text-[#140904] text-xs font-bold hover:bg-[#FFF8EE] transition-colors"
        >
          <span>Exit Presentation (Esc)</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Single Video Container */}
      <div className="relative z-10 max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] w-full mx-auto my-auto py-2">
        <div className="scurve-slab-container slab-finish-pearlescent p-4 sm:p-6 lg:p-7 relative overflow-hidden">
          {/* Header Row Inside Container */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9B38C]" />
              <h2 className="font-display font-bold text-xs sm:text-base text-[#FBF2E6] tracking-wide">
                {hero.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {customVideoUrl && (
                <button
                  type="button"
                  onClick={() => onUpdateVideoUrl(null)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24140B] hover:bg-[#382113] text-[#D9B38C] text-xs font-semibold border border-[#D9B38C]/50 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Remove Video</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="reference-glowing-cta-pill px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-[#4A2C18]" />
                <span>{customVideoUrl ? 'Change Video' : 'Upload Video (MP4/WebM)'}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Single 16:9 Video Frame */}
          <div className="relative rounded-[1.5rem] overflow-hidden aspect-video bg-[#120A05] border-2 border-[#D9B38C]/65 shadow-[0_28px_60px_-12px_rgba(0,0,0,0.85)]">
            {customVideoUrl ? (
              <video
                src={customVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain bg-black"
                playsInline
              />
            ) : (
              /* Clean Single Video Upload Slot */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 cursor-pointer group select-none"
              >
                <img
                  src="/assets/liquid-bronze-curves-bg.jpg"
                  alt="Video Presentation Backdrop"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120A05]/80 via-[#120A05]/30 to-[#120A05]/25" />

                <div className="relative z-10 max-w-md reference-center-glass-card rounded-3xl p-7 sm:p-9 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full reference-glowing-cta-pill flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Film className="w-7 h-7 text-[#1B0E07]" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#FBF2E6]">
                    Presentation Video
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#F4E6D6]/90 leading-relaxed">
                    Click anywhere here or use the <strong>Upload Video</strong> button above to insert your single presentation video file.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Bottom Spacer */}
      <div className="h-4" />
    </div>
  );
}
