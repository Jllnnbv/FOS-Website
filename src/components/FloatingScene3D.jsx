import React, { useEffect, useState } from 'react';

export default function FloatingScene3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 studio-canvas"
    >
      {/* Layer 1: Subtle Minimalist Light Grid */}
      <div className="absolute inset-0 minimalist-light-grid opacity-90" />
      <div className="absolute inset-0 minimalist-subgrid opacity-70" />

      {/* Layer 2: Soft Octane Studio Ambient Key & Rim Lights */}
      <div
        className="absolute -top-32 left-1/4 w-[650px] h-[650px] rounded-full opacity-55 blur-3xl transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(248, 196, 174, 0.65) 0%, rgba(250, 245, 239, 0) 70%)',
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)`,
        }}
      />
      <div
        className="absolute top-1/3 -right-24 w-[550px] h-[550px] rounded-full opacity-50 blur-3xl transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(214, 139, 114, 0.45) 0%, rgba(250, 245, 239, 0) 70%)',
          transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)`,
        }}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-[700px] h-[550px] rounded-full opacity-55 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(226, 184, 135, 0.45) 0%, rgba(250, 245, 239, 0) 75%)',
        }}
      />

      {/* Layer 3: Floating 3D Elements (Smooth Peach Spheres, Frosted Glass Panels, Terrazzo Cards w/ Gold Trim) */}
      {/* Top-Left Smooth Peach Sphere (Midground Sharp) */}
      <div
        className=" hidden sm:block absolute top-[13%] left-[6%] lg:left-[9%] w-24 h-24 lg:w-32 lg:h-32 rounded-full peach-sphere-3d animate-float-slow transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -26}px, ${mousePos.y * -20}px, 0)`,
        }}
      />

      {/* Far Background Blurred Peach Sphere (Depth of Field Bokeh) */}
      <div
        className="absolute top-[22%] left-[21%] w-10 h-10 rounded-full peach-sphere-3d blur-[2px] opacity-85 animate-float-reverse"
        style={{
          transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
        }}
      />

      {/* Left Angled Thin Frosted Glass Panel with Glowing Edge */}
      <div
        className="hidden md:block absolute top-[18%] left-[2%] lg:left-[4%] w-48 lg:w-60 h-64 lg:h-80 rounded-3xl frosted-glass-panel transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(18deg) rotateX(8deg) rotateZ(-8deg) translate3d(${
            mousePos.x * -16
          }px, ${mousePos.y * -14}px, 0)`,
        }}
      >
        <div className="w-full h-full p-5 flex flex-col justify-between opacity-75">
          <div className="w-10 h-1.5 rounded-full bg-white/90 shadow-sm" />
          <div className="space-y-2">
            <div className="w-2/3 h-2 rounded-full bg-white/70" />
            <div className="w-1/2 h-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      </div>

      {/* Bottom-Left Floating Rectangular Terrazzo Card with Metallic Gold Curved Trim */}
      <div
        className="hidden md:block absolute bottom-[8%] left-[4%] lg:left-[7%] w-52 lg:w-64 h-40 lg:h-48 metallic-gold-trim transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(15deg) rotateX(10deg) rotateZ(12deg) translate3d(${
            mousePos.x * -30
          }px, ${mousePos.y * -24}px, 0)`,
        }}
      >
        <div className="w-full h-full rounded-[1.55rem] terrazzo-surface p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="w-8 h-8 rounded-full peach-sphere-3d opacity-90" />
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#8C4934]/80">
              JRU • FOS 2026
            </div>
            <div className="h-1.5 w-24 rounded-full bg-[#D68B72]/40" />
          </div>
        </div>
      </div>

      {/* Bottom-Left Foreground Bokeh Sphere */}
      <div
        className="hidden sm:block absolute bottom-[12%] left-[18%] w-16 h-16 lg:w-20 lg:h-20 rounded-full rose-gold-sphere-3d blur-[1px] animate-float-slow"
        style={{
          transform: `translate3d(${mousePos.x * -35}px, ${mousePos.y * -25}px, 0)`,
        }}
      />

      {/* Top-Right Floating Rectangular Terrazzo Card with Metallic Gold Curved Trim */}
      <div
        className="hidden md:block absolute top-[11%] right-[4%] lg:right-[7%] w-52 lg:w-64 h-44 lg:h-52 metallic-gold-trim transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(-18deg) rotateX(10deg) rotateZ(-14deg) translate3d(${
            mousePos.x * 28
          }px, ${mousePos.y * -22}px, 0)`,
        }}
      >
        <div className="w-full h-full rounded-[1.55rem] terrazzo-surface p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C4934]/80">
              01 — 06
            </span>
            <span className="w-3 h-3 rounded-full bg-[#D68B72]" />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-[#5C3B30]">Freshman Trail</div>
            <div className="h-1.5 w-20 rounded-full bg-[#DFB384]/60" />
          </div>
        </div>
      </div>

      {/* Top-Right Smooth Peach Sphere */}
      <div
        className="hidden sm:block absolute top-[16%] right-[5%] lg:right-[6%] w-16 h-16 lg:w-20 lg:h-20 rounded-full peach-sphere-3d animate-float-reverse"
        style={{
          transform: `translate3d(${mousePos.x * 36}px, ${mousePos.y * -30}px, 0)`,
        }}
      />

      {/* Right Angled Thin Frosted Glass Panel with Glowing Edge */}
      <div
        className="hidden md:block absolute bottom-[12%] right-[3%] lg:right-[5%] w-52 lg:w-64 h-64 lg:h-80 rounded-3xl frosted-glass-panel transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(-16deg) rotateX(8deg) rotateZ(9deg) translate3d(${
            mousePos.x * 22
          }px, ${mousePos.y * 18}px, 0)`,
        }}
      >
        <div className="w-full h-full p-5 flex flex-col justify-between opacity-75">
          <div className="flex justify-end">
            <div className="w-8 h-8 rounded-full bg-white/60 border border-white" />
          </div>
          <div className="space-y-2">
            <div className="w-3/4 h-2 rounded-full bg-white/80" />
            <div className="w-1/2 h-1.5 rounded-full bg-white/55" />
          </div>
        </div>
      </div>

      {/* Bottom-Right Large Smooth Peach Sphere */}
      <div
        className="hidden sm:block absolute bottom-[14%] right-[12%] lg:right-[15%] w-24 h-24 lg:w-28 lg:h-28 rounded-full peach-sphere-3d animate-float-slow"
        style={{
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`,
        }}
      />

      {/* Small Floating Rose-Gold Accent Orbs */}
      <div className="absolute top-[48%] right-[20%] w-6 h-6 rounded-full rose-gold-sphere-3d opacity-80 animate-pulse-glow" />
      <div className="absolute bottom-[28%] left-[25%] w-5 h-5 rounded-full peach-sphere-3d opacity-80 animate-pulse-glow" />
    </div>
  );
}
