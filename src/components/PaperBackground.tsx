import type React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export type PaperMood =
  | 'ivory-pure'
  | 'night-indigo'
  | 'morning-breeze'
  | 'sunset-coral'
  | 'station-dusk'
  | 'dawn-break';

interface PaperBackgroundProps {
  readonly mood: PaperMood;
  readonly energy?: number;
}

export const PaperBackground: React.FC<PaperBackgroundProps> = ({
  mood,
  energy = 0.25,
}) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin((frame / 90) * Math.PI) * 0.015 + energy * 0.02;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F9F7EC',
        overflow: 'hidden',
      }}
    >
      {/* Ultra-subtle atmospheric tint at the very outer edges only, preserving pure #F9F7EC center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            mood === 'dawn-break'
              ? `radial-gradient(circle at 50% 50%, rgba(249,247,236,0) 68%, rgba(232,131,120,${
                  0.05 + breathe
                }) 100%)`
              : mood === 'sunset-coral'
                ? `radial-gradient(circle at 50% 50%, rgba(249,247,236,0) 68%, rgba(232,131,120,${
                    0.06 + breathe
                  }) 100%)`
                : `radial-gradient(circle at 50% 50%, rgba(249,247,236,0) 72%, rgba(224,220,202,${
                    0.08 + breathe
                  }) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Authentic cold-press watercolor paper grain (very delicate, never muddying #F9F7EC) */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.11,
          mixBlendMode: 'multiply',
        }}
      >
        <defs>
          <filter id="fine-paper-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06"
              numOctaves={3}
              seed={7}
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="#F9F7EC"
              surfaceScale={0.9}
              result="light"
            >
              <feDistantLight azimuth={45} elevation={68} />
            </feDiffuseLighting>
          </filter>
        </defs>
        <rect width="1920" height="1080" filter="url(#fine-paper-grain)" />
      </svg>
    </AbsoluteFill>
  );
};
