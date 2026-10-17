import type React from 'react';
import { useCurrentFrame } from 'remotion';

export type FireworkMode = 'none' | 'subtle-sparks' | 'drifting-petals';

interface WatercolorFireworksProps {
  readonly mode: FireworkMode;
  readonly rmsEnergy: number;
}

export const WatercolorFireworks: React.FC<WatercolorFireworksProps> = ({
  mode,
  rmsEnergy,
}) => {
  const frame = useCurrentFrame();
  // Stepped at 10fps (3-frame hold) so drifting petals move with traditional 2D anime cadence
  const stepFrame = Math.floor(frame / 3) * 3;

  if (mode === 'none') {
    return null;
  }

  const count = mode === 'drifting-petals' ? 16 : 10;

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: count }).map((_, idx) => {
        const speed = 1.1 + (idx % 4) * 0.35;
        const x =
          180 + ((stepFrame * speed * 1.8 + idx * 173) % 1560);
        const y =
          920 -
          ((stepFrame * speed * 1.1 + idx * 127) % 780) +
          Math.sin(stepFrame * 0.05 + idx) * 22;
        const rot = (stepFrame * (1.5 + (idx % 3)) + idx * 47) % 360;
        const scale = 0.75 + (idx % 3) * 0.22;

        if (mode === 'drifting-petals') {
          const petalColor =
            idx % 3 === 0
              ? '#E88378'
              : idx % 3 === 1
                ? '#F0A39A'
                : '#6FA89E';
          return (
            <g
              key={idx}
              transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}
              opacity={0.48 + rmsEnergy * 0.22}
            >
              <path
                d="M 0 -8 C 5 -4, 6 4, 0 9 C -6 4, -5 -4, 0 -8 Z"
                fill={petalColor}
              />
            </g>
          );
        }

        // Subtle watercolor pigment flecks (no geometric spoke wheels!)
        const dotColor =
          idx % 2 === 0 ? '#D8E878' : 'rgba(30, 45, 82, 0.45)';
        return (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r={2.2 + (idx % 3) * 1.1}
            fill={dotColor}
            opacity={0.45 + rmsEnergy * 0.25}
          />
        );
      })}
    </svg>
  );
};
