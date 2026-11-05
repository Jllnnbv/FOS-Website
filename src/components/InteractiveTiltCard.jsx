import React, { useRef, useState } from 'react';

/**
 * InteractiveTiltCard
 * Premium dark-themed glassmorphic 3D interactive container with:
 * - Smooth 3D levitation (translateY lift + scale up) on mouse hover
 * - Real-time mouse-tracking 3D tilt (rotateX / rotateY) & magnetic parallax
 * - Dynamic radial surface glare ("shine") + glowing copper/gold border spotlight following the cursor
 */
export default function InteractiveTiltCard({
  children,
  className = '',
  maxTilt = 11,
  liftY = -12,
  scale = 1.03,
  glareOpacity = 0.34,
  perspective = 1100,
  as: Component = 'div',
  style = {},
  ...rest
}) {
  const cardRef = useRef(null);
  const [hoverState, setHoverState] = useState({
    isHovered: false,
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    glareX: 50,
    glareY: 50,
    px: 0,
    py: 0,
  });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalized coordinates (-0.5 to +0.5)
    const normX = clientX / rect.width - 0.5;
    const normY = clientY / rect.height - 0.5;

    setHoverState({
      isHovered: true,
      rotateX: -normY * maxTilt * 2,
      rotateY: normX * maxTilt * 2,
      translateX: normX * 10,
      translateY: liftY + normY * 6,
      glareX: (clientX / rect.width) * 100,
      glareY: (clientY / rect.height) * 100,
      px: clientX,
      py: clientY,
    });
  };

  const handleMouseLeave = () => {
    setHoverState((prev) => ({
      ...prev,
      isHovered: false,
      rotateX: 0,
      rotateY: 0,
      translateX: 0,
      translateY: 0,
    }));
  };

  const {
    isHovered,
    rotateX,
    rotateY,
    translateX,
    translateY,
    glareX,
    glareY,
  } = hoverState;

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(${perspective}px) translate3d(${translateX.toFixed(
              2
            )}px, ${translateY.toFixed(2)}px, 0) scale3d(${scale}, ${scale}, 1) rotateX(${rotateX.toFixed(
              2
            )}deg) rotateY(${rotateY.toFixed(2)}deg)`
          : `perspective(${perspective}px) translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.2, 0.85, 0.4, 1), box-shadow 0.35s ease, border-color 0.35s ease'
          : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.65s ease, border-color 0.65s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
      className={`${className} ${
        isHovered ? 'interactive-card-hovered' : ''
      }`}
      {...rest}
    >
      {/* Dynamic Cursor-Following Radial Glare / Curved Glass Shine Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 overflow-hidden transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `
            radial-gradient(
              460px circle at ${glareX}% ${glareY}%,
              rgba(251, 242, 230, ${glareOpacity}),
              rgba(217, 179, 140, ${(glareOpacity * 0.55).toFixed(2)}) 32%,
              rgba(168, 118, 78, ${(glareOpacity * 0.2).toFixed(2)}) 58%,
              transparent 80%
            )
          `,
          mixBlendMode: 'screen',
        }}
      />

      {/* Dynamic Glowing Copper/Champagne Metallic Border Spotlight Following the Cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          padding: '2px',
          background: `radial-gradient(340px circle at ${glareX}% ${glareY}%, rgba(255, 248, 238, 0.98), rgba(217, 179, 140, 0.65) 40%, transparent 75%)`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {children}
    </Component>
  );
}
