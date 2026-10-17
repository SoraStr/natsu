import type React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

export type MontageVariant = 'summer-four-1' | 'verdigris-four-2';

interface FourStripMontageProps {
  readonly variant: MontageVariant;
  readonly localFrame: number;
}

interface ShutterSequenceSpec {
  readonly leftKanji: string;
  readonly leftAsset: string;
  readonly midKanji: string;
  readonly midAsset: string;
  readonly rightKanji: string;
  readonly rightAsset: string;
  readonly popKanji: string;
  readonly popAsset: string;
}

const SUMMER_SHUTTER: ShutterSequenceSpec = {
  leftKanji: '昼顔',
  leftAsset: 'assets/props/motif-01-hirugao.png',
  midKanji: '鳥居',
  midAsset: 'assets/props/motif-02-torii.png',
  rightKanji: '鳳仙花',
  rightAsset: 'assets/props/motif-03-housenka.png',
  popKanji: 'バス停',
  popAsset: 'assets/props/motif-04-busstop.png',
};

const VERDIGRIS_SHUTTER: ShutterSequenceSpec = {
  leftKanji: 'アベリア',
  leftAsset: 'assets/props/motif-05-abelia.png',
  midKanji: '始発',
  midAsset: 'assets/props/motif-06-shihatsu.png',
  rightKanji: '終電車',
  rightAsset: 'assets/props/motif-07-shuudensha.png',
  popKanji: '緑青',
  popAsset: 'assets/props/motif-08-rokusho.png',
};

export const FourStripMontage: React.FC<FourStripMontageProps> = ({
  variant,
  localFrame,
}) => {
  const globalFrame = useCurrentFrame();
  // 10fps stepped frame for authentic hand-drawn 2D cadence
  const stepFrame = Math.floor(globalFrame / 3) * 3;
  const carriageBounceY = Math.sin((stepFrame / 60) * Math.PI * 2) * 2.2;

  const spec = variant === 'summer-four-1' ? SUMMER_SHUTTER : VERDIGRIS_SHUTTER;

  const b1 = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const b2 = interpolate(localFrame, [28, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const b3 = interpolate(localFrame, [56, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const b4 = interpolate(localFrame, [84, 98], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // On Beat 4 (frame 84+), the 3-window train stage shifts smoothly left (-220px) to make room for the pop-out standee
  const stageShiftX = interpolate(localFrame, [82, 102], [0, -220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  return (
    <AbsoluteFill>
      {/* LOCKED CANONICAL 1672x941 STAGE CONTAINER (94% of 1920x1080 = 1806x1016 at left:57, top:32) */}
      <div
        style={{
          position: 'absolute',
          left: 57,
          top: 32,
          width: 1806,
          height: 1016,
          translate: `${stageShiftX}px ${carriageBounceY}px`,
        }}
      >
        <svg
          width="1806"
          height="1016"
          viewBox="0 0 1672 941"
          style={{ position: 'absolute', inset: 0 }}
        >
          <defs>
            <clipPath id="canon-all-three-panes">
              <rect x="306" y="132" width="295" height="392" rx="28" />
              <rect x="690" y="132" width="298" height="392" rx="28" />
              <rect x="1074" y="132" width="296" height="392" rx="28" />
            </clipPath>
            <clipPath id="canon-left-pane">
              <rect x="306" y="132" width="295" height="392" rx="28" />
            </clipPath>
            <clipPath id="canon-mid-pane">
              <rect x="690" y="132" width="298" height="392" rx="28" />
            </clipPath>
            <clipPath id="canon-right-pane">
              <rect x="1074" y="132" width="296" height="392" rx="28" />
            </clipPath>
          </defs>

          {/* Base Night Firework Sky inside all 3 windows before each shutter clicks open */}
          <g clipPath="url(#canon-all-three-panes)">
            <image
              href={staticFile('assets/scenes/01-night-fireworks-sky.png')}
              x={260}
              y={110}
              width="1160"
              height="440"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          {/* Beat 1: Left Window Shutter ("昼顔" / "アベリア") */}
          <g clipPath="url(#canon-left-pane)" opacity={b1}>
            <rect x="306" y="132" width="295" height="392" fill="#F9F7EC" />
            <image
              href={staticFile(spec.leftAsset)}
              x={260}
              y={interpolate(b1, [0, 1], [65, 125], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}
              width="390"
              height="410"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          {/* Beat 2: Middle Window Shutter ("鳥居" / "始発") */}
          <g clipPath="url(#canon-mid-pane)" opacity={b2}>
            <rect x="690" y="132" width="298" height="392" fill="#F9F7EC" />
            <image
              href={staticFile(spec.midAsset)}
              x={645}
              y={interpolate(b2, [0, 1], [65, 125], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}
              width="390"
              height="410"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          {/* Beat 3: Right Window Shutter ("鳳仙花" / "終電車") */}
          <g clipPath="url(#canon-right-pane)" opacity={b3}>
            <rect x="1074" y="132" width="296" height="392" fill="#F9F7EC" />
            <image
              href={staticFile(spec.rightAsset)}
              x={1025}
              y={interpolate(b3, [0, 1], [65, 125], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}
              width="390"
              height="410"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>

        {/* Subtle botanical overflow at left & right window outer edges */}
        <Img
          src={staticFile(spec.leftAsset)}
          style={{
            position: 'absolute',
            left: 195,
            top: 165,
            width: 245,
            height: 245,
            objectFit: 'contain',
            opacity: b1 * 0.85,
            translate: `${interpolate(b1, [0, 1], [16, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px 0px`,
          }}
        />
        <Img
          src={staticFile(spec.rightAsset)}
          style={{
            position: 'absolute',
            right: 195,
            top: 185,
            width: 245,
            height: 245,
            objectFit: 'contain',
            opacity: b3 * 0.85,
            translate: `${interpolate(b3, [0, 1], [-16, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px 0px`,
          }}
        />

        {/* Single Razor-Sharp Canonical 1672x941 Cutout of Window Frames + Metal Bars + Seated Faceless Girl */}
        <Img
          src={staticFile(
            'assets/character/highres-girl-and-frames-cutout.png'
          )}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />

        {/* Typography Stamps 1, 2, 3 anchored around the 3 windows */}
        <div
          style={{
            position: 'absolute',
            left: 280,
            top: 590,
            opacity: b1,
            translate: `0px ${interpolate(b1, [0, 1], [10, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              fontFamily:
                "'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', serif",
              fontSize: 38,
              fontWeight: 500,
              color: '#1E2D52',
              letterSpacing: '0.14em',
              padding: '0 8px',
            }}
          >
            {spec.leftKanji}
          </span>
          <div
            style={{
              width: Math.round(215 * b1),
              height: 1.6,
              backgroundColor: '#1E2D52',
              marginTop: 2,
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 800,
            top: 68,
            opacity: b2,
            translate: `0px ${interpolate(b2, [0, 1], [10, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily:
                "'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', serif",
              fontSize: 38,
              fontWeight: 500,
              color: '#1E2D52',
              letterSpacing: '0.14em',
              padding: '0 12px',
            }}
          >
            {spec.midKanji}
          </span>
          <div
            style={{
              width: Math.round(210 * b2),
              height: 1.6,
              backgroundColor: '#1E2D52',
              marginTop: 2,
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 1120,
            top: 590,
            opacity: b3,
            translate: `0px ${interpolate(b3, [0, 1], [10, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <span
            style={{
              fontFamily:
                "'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', serif",
              fontSize: 38,
              fontWeight: 500,
              color: '#1E2D52',
              letterSpacing: '0.14em',
              padding: '0 8px',
            }}
          >
            {spec.rightKanji}
          </span>
          <div
            style={{
              width: Math.round(230 * b3),
              height: 1.6,
              backgroundColor: '#1E2D52',
              marginTop: 2,
            }}
          />
        </div>
      </div>

      {/* BEAT 4 POP-OUT STANDEE ON RIGHT NEGATIVE SPACE ("バス停" / "緑青") */}
      <div
        style={{
          position: 'absolute',
          right: 68,
          top: 195,
          width: 590,
          height: 640,
          opacity: b4,
          translate: `${interpolate(b4, [0, 1], [48, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}px 0px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Img
          src={staticFile(spec.popAsset)}
          style={{
            width: '100%',
            height: 500,
            objectFit: 'contain',
          }}
        />

        <div
          style={{
            marginTop: 12,
            marginRight: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <span
            style={{
              fontFamily:
                "'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', serif",
              fontSize: 42,
              fontWeight: 500,
              color: '#1E2D52',
              letterSpacing: '0.15em',
              padding: '0 10px',
            }}
          >
            {spec.popKanji}
          </span>
          <div
            style={{
              width: Math.round(250 * b4),
              height: 1.7,
              backgroundColor: '#1E2D52',
              marginTop: 2,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
