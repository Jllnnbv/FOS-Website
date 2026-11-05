import React, { useEffect, useState } from 'react';
import { DEFAULT_PROJECT_DATA, STORAGE_KEY } from './data/footprintsData';
import HeroSection from './components/HeroSection';
import FootprintTimeline from './components/FootprintTimeline';
import TeamSection from './components/TeamSection';
import PresentationModal from './components/PresentationModal';
import RenderReferenceModal from './components/RenderReferenceModal';
import { Compass, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [projectData, setProjectData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to read saved project data:', err);
    }
    return DEFAULT_PROJECT_DATA;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [customVideoUrl, setCustomVideoUrl] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
    } catch (err) {
      console.error('Failed to save project data:', err);
    }
  }, [projectData]);

  // Scroll Spy for active section
  useEffect(() => {
    const sectionIds = [
      'hero',
      'team-section',
      ...projectData.footprints.map((fp) => fp.id),
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 260;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projectData.footprints]);

  const handleUpdateHero = (field, value) => {
    setProjectData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const handleUpdateFootprint = (id, field, value) => {
    setProjectData((prev) => ({
      ...prev,
      footprints: prev.footprints.map((fp) =>
        fp.id === id ? { ...fp, [field]: value } : fp
      ),
    }));
  };

  const handleUpdateMember = (id, field, value) => {
    setProjectData((prev) => ({
      ...prev,
      team: prev.team.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }));
  };

  const handleAddMember = () => {
    const newId = `member-${Date.now()}`;
    setProjectData((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        {
          id: newId,
          name: `Group Member 0${prev.team.length + 1}`,
          role: 'Rizalian Freshman Presenter',
          takeaway: 'Sharing our footsteps and growing together at JRU.',
        },
      ],
    }));
  };

  const handleRemoveMember = (id) => {
    setProjectData((prev) => ({
      ...prev,
      team: prev.team.filter((m) => m.id !== id),
    }));
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Reset all customized text and photos back to the default JRU Freshman Journey content?'
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      setProjectData(DEFAULT_PROJECT_DATA);
      setCustomVideoUrl(null);
    }
  };

  // Clicking 'Begin Our Journey' in the Hero smoothly scrolls down to Voices Behind the Footprints (Team Section) first!
  const handleStartJourney = () => {
    const teamEl = document.getElementById('team-section');
    if (teamEl) {
      teamEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenSlideAt = (footprintIndex) => {
    setCurrentSlide(footprintIndex + 2);
    setIsPresentationOpen(true);
  };

  return (
    <div className="relative min-h-screen reference-studio-room selection:bg-[#C69363] selection:text-[#FBF2E6]">
      {/* Edit Mode Floating Banner */}
      {isEditMode && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#24140B] text-[#FBF2E6] text-xs sm:text-sm font-semibold shadow-2xl border border-[#D9B38C] flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#D9B38C]" />
          <span>
            Customize Mode Active: Click any text field or "Swap Photo" to personalize!
          </span>
        </div>
      )}

      {/* Main Content (Scrollable Page: Hero -> 6 Footprints -> Team Section ONLY) */}
      <main className="relative z-10">
        {/* Full-Viewport Dark Bronze & Champagne 3D Hero Stage */}
        <HeroSection
          hero={projectData.hero}
          footprints={projectData.footprints}
          activeSection={activeSection}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          onUpdateHero={handleUpdateHero}
          onStartJourney={handleStartJourney}
          onOpenPresentation={() => {
            setCurrentSlide(1);
            setIsPresentationOpen(true);
          }}
          onOpenReferenceModal={() => setIsRenderModalOpen(true)}
          onResetData={handleResetData}
        />

        {/* Visual Separator & Transition Zone before the Journey Begins */}
        <div className="relative z-20 bg-[#120A05] py-8 border-y border-[#D9B38C]/30 shadow-2xl">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-4 text-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D9B38C]/40 to-[#D9B38C]/80" />
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1F1108] border border-[#D9B38C]/50 text-xs font-bold text-[#FBF2E6] tracking-wider uppercase shadow-inner">
              <Compass className="w-3.5 h-3.5 text-[#D9B38C] animate-spin-slow" />
              <span>Begin Our Journey • Voices Behind the Footprints</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#D9B38C]/40 to-[#D9B38C]/80" />
          </div>
        </div>

        {/* Scrollable Team Section + 6 Footprints Timeline */}
        <div className="relative overflow-hidden">
          {/* Second Background: Molten Liquid Bronze & Champagne Fluid Waves */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/assets/scrollable-liquid-gold-bg.jpg')",
            }}
          />
          {/* Translucent Glassmorphic Vignette (Preserves the luminous fluid curves while giving cards high contrast) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-gradient-to-b from-[#120A05]/85 via-[#180C05]/30 to-[#0F0703]/85 pointer-events-none"
          />

          <TeamSection
            team={projectData.team}
            isEditMode={isEditMode}
            onUpdateMember={handleUpdateMember}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
            onOpenPresentation={() => {
              setCurrentSlide(1);
              setIsPresentationOpen(true);
            }}
          />

          <FootprintTimeline
            footprints={projectData.footprints}
            isEditMode={isEditMode}
            onUpdateFootprint={handleUpdateFootprint}
            onOpenSlideAt={handleOpenSlideAt}
            onOpenPresentation={() => {
              setCurrentSlide(1);
              setIsPresentationOpen(true);
            }}
          />
        </div>
      </main>

      {/* Glassmorphic Footer */}
      <footer className="relative z-10 mt-12 border-t border-[#D9B38C]/40 glass-navbar py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#D9B38C]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full peach-sphere-3d flex items-center justify-center">
              <Compass className="w-3.5 h-3.5 text-[#FBF2E6]" />
            </div>
            <span className="font-display font-bold text-[#FBF2E6]">
              PROJECT 3: Footprints Forward: Our Freshman Journey Presentation
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>Jose Rizal University</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-full bg-[#24140B] hover:bg-[#3D2516] text-[#FBF2E6] border border-[#D9B38C]/60 shadow-sm transition-transform hover:-translate-y-0.5"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Full-Screen Presentation Mode (Includes the Interactive Video Presentation Reel) */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        hero={projectData.hero}
        footprints={projectData.footprints}
        team={projectData.team}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        customVideoUrl={customVideoUrl}
        onUpdateVideoUrl={(url) => setCustomVideoUrl(url)}
        isEditMode={isEditMode}
      />

      {/* 8K 3D Render Showcase Modal */}
      <RenderReferenceModal
        isOpen={isRenderModalOpen}
        onClose={() => setIsRenderModalOpen(false)}
      />
    </div>
  );
}
