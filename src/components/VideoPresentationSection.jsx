import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Maximize2,
  RotateCcw,
  Film,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function VideoPresentationSection({
  footprints,
  isEditMode,
  customVideoUrl,
  onUpdateVideoUrl,
  embeddedInModal = false,
}) {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [videoMeta, setVideoMeta] = useState({
    title: 'PROJECT 3: Footprints Forward — Official Freshman Journey Film',
    durationLabel: '03:45 • 4K UHD Presentation',
    description:
      'Watch our complete Jose Rizal University Freshman Orientation Seminar video presentation—chronicling our first day on campus, our discoveries, challenges, achievements, personal growth, and steps into the future.',
  });

  // Sample chapters mapped to the 6 Footprints for the interactive timeline
  const chapters = footprints.map((fp, idx) => ({
    index: idx,
    number: fp.number,
    label: fp.label,
    title: fp.title,
    subtitle: fp.subtitle,
    quote: fp.quote,
    image: fp.image,
    timestamp: `0${idx}:${idx % 2 === 0 ? '00' : '35'}`,
    percentStart: Math.round((idx / footprints.length) * 100),
  }));

  // Interactive Sample Reel Timer (when no custom MP4 is uploaded yet)
  useEffect(() => {
    if (customVideoUrl || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.65;
        if (next >= 100) {
          setIsPlaying(false);
          return 0;
        }
        const chapterIdx = Math.min(
          footprints.length - 1,
          Math.floor((next / 100) * footprints.length)
        );
        setActiveChapterIdx(chapterIdx);
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, customVideoUrl, footprints.length]);

  const handleTogglePlay = () => {
    if (customVideoUrl && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleToggleMute = () => {
    if (customVideoUrl && videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
    setIsMuted((prev) => !prev);
  };

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    const pct = (current / total) * 100;
    setProgress(pct);
    const chapterIdx = Math.min(
      footprints.length - 1,
      Math.floor((pct / 100) * footprints.length)
    );
    setActiveChapterIdx(chapterIdx);
  };

  const handleSelectChapter = (idx) => {
    setActiveChapterIdx(idx);
    const targetPct = (idx / footprints.length) * 100;
    setProgress(targetPct);

    if (customVideoUrl && videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime =
        (idx / footprints.length) * videoRef.current.duration;
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onUpdateVideoUrl(objectUrl, file.name);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleFullscreen = () => {
    const container = document.getElementById('video-showcase-player');
    if (container && container.requestFullscreen) {
      container.requestFullscreen();
    }
  };

  const activeChapter = chapters[activeChapterIdx] || chapters[0];

  return (
    <section
      id="video-presentation"
      aria-label="Video Presentation Showcase"
      className={
        embeddedInModal
          ? 'relative max-w-5xl mx-auto w-full z-10'
          : 'relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-8 z-10 scroll-mt-20'
      }
    >
      {/* Section Header (Hidden when embedded inside the Presentation Modal) */}
      {!embeddedInModal && (
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frosted-glass-panel text-[#E8C8A3] text-xs font-bold tracking-widest uppercase mb-4">
            <Film className="w-3.5 h-3.5 text-[#D9B38C]" />
            <span>Featured Presentation Reel • JRU FOS</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D9B38C]" />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#FBF2E6] tracking-tight">
            Watch Our{' '}
            <span className="bg-gradient-to-r from-[#FBF2E6] via-[#D9B38C] to-[#A8764E] bg-clip-text text-transparent">
              Freshman Journey
            </span>{' '}
            Presentation
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#D9B38C]/85 leading-relaxed">
            {videoMeta.description}
          </p>
        </div>
      )}

      {/* Main S-Curve Sculpted Dark Bronze Video Theatre Container */}
      <div className="scurve-slab-container slab-finish-pearlescent p-4 sm:p-7 md:p-9 relative overflow-hidden">
        {/* Top Bar Inside Video Container: Status Badge + Upload Your Own Video Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9B38C] animate-pulse" />
            <span className="font-display font-bold text-xs sm:text-sm text-[#FBF2E6] tracking-wide">
              {customVideoUrl
                ? 'Custom Presentation Video Loaded'
                : 'Sample Interactive Presentation Reel (Ready for Your Video)'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {customVideoUrl && (
              <button
                type="button"
                onClick={() => {
                  onUpdateVideoUrl(null);
                  setIsPlaying(false);
                  setProgress(0);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24140B] hover:bg-[#382113] text-[#D9B38C] text-xs font-semibold border border-[#D9B38C]/50 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Sample Reel</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="reference-glowing-cta-pill px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#4A2C18]" />
              <span>{customVideoUrl ? 'Replace Video' : 'Insert Your Video (MP4/WebM)'}</span>
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

        {/* 16:9 Cinema Viewport */}
        <div
          id="video-showcase-player"
          className="relative rounded-[1.6rem] overflow-hidden aspect-video bg-[#120A05] border-2 border-[#D9B38C]/65 shadow-[0_28px_60px_-12px_rgba(0,0,0,0.85)] group"
        >
          {customVideoUrl ? (
            /* REAL HTML5 VIDEO ELEMENT WHEN USER INSERTS THEIR VIDEO */
            <video
              ref={videoRef}
              src={customVideoUrl}
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onClick={handleTogglePlay}
              className="w-full h-full object-contain bg-black cursor-pointer"
              playsInline
            />
          ) : (
            /* SAMPLE INTERACTIVE CINEMATIC REEL (Built-in Preview Before User Inserts Video) */
            <div
              onClick={handleTogglePlay}
              className="relative w-full h-full cursor-pointer select-none overflow-hidden"
            >
              {/* Animated Ken-Burns Chapter Backdrop */}
              <img
                key={activeChapter.image + activeChapterIdx}
                src={activeChapter.image}
                alt={activeChapter.title}
                className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${
                  isPlaying ? 'scale-110' : 'scale-100'
                }`}
              />

              {/* Sculpted Dark Espresso & Bronze Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/45 to-[#120A05]/30" />

              {/* Decorative S-Curve Champagne Gold Wave Overlay Inside Sample Video */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1200 320"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 right-0 w-full h-44 opacity-65 pointer-events-none"
              >
                <defs>
                  <linearGradient id="videoSampleWave" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FBF2E6" />
                    <stop offset="35%" stopColor="#D9B38C" />
                    <stop offset="70%" stopColor="#9E6B43" />
                    <stop offset="100%" stopColor="#FBF2E6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,240 C 380,90 760,310 1200,120 L 1200,320 L 0,320 Z"
                  fill="rgba(22, 12, 6, 0.78)"
                />
                <path
                  d="M 0,240 C 380,90 760,310 1200,120"
                  fill="none"
                  stroke="url(#videoSampleWave)"
                  strokeWidth="4"
                />
              </svg>

              {/* Top-Left Sample Reel Indicator Pill */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120A05]/75 backdrop-blur-md border border-[#D9B38C]/55">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-[#D9B38C]'
                  }`}
                />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#FBF2E6]">
                  {isPlaying ? 'Now Playing Sample Reel' : 'Sample Presentation Preview'}
                </span>
              </div>

              {/* Top-Right Chapter Timestamp Pill */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-[#120A05]/75 backdrop-blur-md border border-[#D9B38C]/55 text-xs font-bold text-[#D9B38C]">
                Chapter {activeChapter.number} / 06 • {activeChapter.timestamp}
              </div>

              {/* Center Play Button Overlay (When Paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#120A05]/30 backdrop-blur-[2px] transition-opacity">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full reference-glowing-cta-pill flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#1B0E07] text-[#1B0E07] ml-1" />
                  </div>
                  <span className="mt-4 px-4 py-1.5 rounded-full bg-[#120A05]/80 border border-[#D9B38C]/60 text-xs sm:text-sm font-bold text-[#FBF2E6] tracking-wide shadow-lg">
                    Click to Play Sample Presentation Reel
                  </span>
                </div>
              )}

              {/* Bottom Lower-Third Glassmorphic Presentation Caption Overlay */}
              <div className="absolute bottom-14 left-4 right-4 sm:bottom-16 sm:left-8 sm:right-8 pointer-events-none">
                <div className="max-w-2xl reference-center-glass-card rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D9B38C] text-[#120A05] text-[10px] font-extrabold uppercase tracking-widest">
                      {activeChapter.label}
                    </span>
                    <span className="text-xs font-semibold text-[#D9B38C]">
                      {activeChapter.subtitle}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-[#FBF2E6] leading-tight">
                    {activeChapter.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#F4E6D6]/90 italic line-clamp-2">
                    {activeChapter.quote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Video Transport Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/90 to-transparent px-4 sm:px-6 py-3 flex flex-col gap-2">
            {/* Scrubber / Progress Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPct = Math.max(
                  0,
                  Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
                );
                setProgress(clickPct);
                const cIdx = Math.min(
                  footprints.length - 1,
                  Math.floor((clickPct / 100) * footprints.length)
                );
                setActiveChapterIdx(cIdx);
                if (customVideoUrl && videoRef.current && videoRef.current.duration) {
                  videoRef.current.currentTime =
                    (clickPct / 100) * videoRef.current.duration;
                }
              }}
              className="w-full h-2 rounded-full bg-[#3D2516] cursor-pointer overflow-hidden border border-[#D9B38C]/35"
            >
              <div
                className="h-full bg-gradient-to-r from-[#C69363] via-[#D9B38C] to-[#FBF2E6] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Transport Buttons */}
            <div className="flex items-center justify-between text-xs text-[#FBF2E6]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="inline-flex items-center gap-1.5 font-bold text-[#FBF2E6] hover:text-[#D9B38C] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="text-[#D9B38C] hover:text-[#FBF2E6] transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <span className="text-[11px] text-[#D9B38C] hidden sm:inline">
                  {activeChapter.label}: {activeChapter.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-[#D9B38C]">
                  {videoMeta.durationLabel}
                </span>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-1 text-[#D9B38C] hover:text-[#FBF2E6] transition-colors"
                  title="Fullscreen Video"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Interactive Video Chapter Markers Below the Player */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9B38C]">
              Interactive Presentation Chapters (Click to Jump)
            </span>
            <span className="text-xs text-[#D9B38C]/80 hidden sm:inline">
              Synced with your 6 JRU Freshman Footprints
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {chapters.map((chap, idx) => {
              const isCurrent = activeChapterIdx === idx;
              return (
                <button
                  key={chap.number}
                  type="button"
                  onClick={() => handleSelectChapter(idx)}
                  className={`text-left p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-br from-[#5C3A22] to-[#2A180D] border-[#FBF2E6] shadow-[0_0_20px_rgba(217,179,140,0.3)] scale-[1.02]'
                      : 'bg-[#180D07]/70 hover:bg-[#28170D] border-[#D9B38C]/35 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D9B38C]">
                      Step {chap.number}
                    </span>
                    <span className="text-[10px] font-mono text-[#FBF2E6]/70">
                      {chap.timestamp}
                    </span>
                  </div>
                  <p className="font-display font-bold text-xs text-[#FBF2E6] truncate">
                    {chap.title.split(' - ')[0]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
