import type React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { LYRIC_LINES } from '../data/lyrics';

const JP_FONT =
  "'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', 'Songti SC', 'STSong', Georgia, serif";
const ZH_FONT =
  "'Songti SC', 'STSong', 'Noto Serif SC', 'Shippori Mincho', 'Hiragino Mincho ProN', Georgia, serif";
const PAPER_HALO =
  '0 0 22px #F9F7EC, 0 0 14px #F9F7EC, 0 0 8px #F9F7EC';

export const LyricStage: React.FC = () => {
  const frame = useCurrentFrame();

  const activeLine = LYRIC_LINES.find(
    (line) => frame >= line.startFrame - 8 && frame <= line.endFrame + 14
  );

  if (!activeLine) {
    return null;
  }

  const localFrame = frame - activeLine.startFrame;
  const totalDuration = activeLine.endFrame - activeLine.startFrame;

  const fadeIn = interpolate(localFrame, [-8, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(
    localFrame,
    [totalDuration - 12, totalDuration + 14],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);
  const lineDraw = interpolate(localFrame, [-4, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const slideY = interpolate(localFrame, [-8, 16], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const isMontage = activeLine.style === 'montage';
  const isClimax = activeLine.style === 'climax';

  // Split Japanese and Chinese phrases on full-width space "　" for Awashima's staggered two-baseline style
  const jpParts = activeLine.text.split('　');
  const jpHasTwoParts = jpParts.length === 2;

  // For montage lines (昼顔 鳥居 鳳仙花 バス停), reveal the 4 Chinese nouns progressively on beats 1-2-3-4 in the top-right corner
  const visibleZhMontageCount = isMontage
    ? localFrame >= 84
      ? 4
      : localFrame >= 56
        ? 3
        : localFrame >= 28
          ? 2
          : 1
    : 0;
  const zhDisplayString =
    isMontage && activeLine.zhMontageItems
      ? activeLine.zhMontageItems.slice(0, visibleZhMontageCount).join(' · ')
      : activeLine.zhText;

  const zhParts = isMontage ? [zhDisplayString] : zhDisplayString.split('　');
  const zhHasTwoParts = zhParts.length === 2;

  return (
    <>
      {/* TOP-RIGHT: Chinese Subtitle in identical Awashima Mincho/Songti + Indigo Baseline style (slightly smaller than Japanese) */}
      {zhDisplayString.length > 0 && (
        <div
        style={{
          position: 'absolute',
          right: 128,
          top: 64,
          opacity,
          translate: `0px ${-slideY * 0.8}px`,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {zhHasTwoParts ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 11,
            }}
          >
            {/* Upper-left staggered Chinese phrase */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 135,
              }}
            >
              <span
                style={{
                  fontFamily: ZH_FONT,
                  fontSize: 28,
                  fontWeight: 500,
                  color: '#1E2D52',
                  letterSpacing: '0.14em',
                  lineHeight: 1.18,
                  padding: '0 12px 2px 6px',
                  textShadow: PAPER_HALO,
                }}
              >
                {zhParts[0]}
              </span>
              <div
                style={{
                  width: `${Math.round(114 * lineDraw)}%`,
                  minWidth: Math.round(185 * lineDraw),
                  height: 1.4,
                  backgroundColor: '#1E2D52',
                }}
              />
            </div>

            {/* Lower-right staggered Chinese phrase */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <span
                style={{
                  fontFamily: ZH_FONT,
                  fontSize: 31,
                  fontWeight: 500,
                  color: '#1E2D52',
                  letterSpacing: '0.14em',
                  lineHeight: 1.18,
                  padding: '0 6px 2px 14px',
                  textShadow: PAPER_HALO,
                }}
              >
                {zhParts[1]}
              </span>
              <div
                style={{
                  width: `${Math.round(116 * lineDraw)}%`,
                  minWidth: Math.round(215 * lineDraw),
                  height: 1.5,
                  backgroundColor: '#1E2D52',
                }}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                fontFamily: ZH_FONT,
                fontSize: isClimax ? 34 : 30,
                fontWeight: 500,
                color: '#1E2D52',
                letterSpacing: '0.15em',
                lineHeight: 1.18,
                padding: '0 8px 2px 20px',
                textShadow: PAPER_HALO,
              }}
            >
              {zhDisplayString}
            </span>
            <div
              style={{
                width: `${Math.round(115 * lineDraw)}%`,
                minWidth: Math.round(240 * lineDraw),
                height: 1.5,
                backgroundColor: '#1E2D52',
              }}
            />
          </div>
        )}
        </div>
      )}

      {/* BOTTOM-RIGHT: Japanese Subtitle in Awashima Mincho + Indigo Baseline style (hidden during montage since the 4 window stamps show the 4 kanji) */}
      {!isMontage && (
        <div
          style={{
            position: 'absolute',
            right: 128,
            bottom: 76,
            opacity,
            translate: `0px ${slideY}px`,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {jpHasTwoParts ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 14,
              }}
            >
              {/* Upper-left staggered phrase */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginRight: 180,
                }}
              >
                <span
                  style={{
                    fontFamily: JP_FONT,
                    fontSize: 38,
                    fontWeight: 500,
                    color: '#1E2D52',
                    letterSpacing: '0.14em',
                    lineHeight: 1.15,
                    padding: '0 14px 1px 6px',
                    textShadow: PAPER_HALO,
                  }}
                >
                  {jpParts[0]}
                </span>
                <div
                  style={{
                    width: `${Math.round(114 * lineDraw)}%`,
                    minWidth: Math.round(240 * lineDraw),
                    height: 1.6,
                    backgroundColor: '#1E2D52',
                  }}
                />
              </div>

              {/* Lower-right staggered phrase */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontFamily: JP_FONT,
                    fontSize: 42,
                    fontWeight: 500,
                    color: '#1E2D52',
                    letterSpacing: '0.14em',
                    lineHeight: 1.15,
                    padding: '0 6px 1px 18px',
                    textShadow: PAPER_HALO,
                  }}
                >
                  {jpParts[1]}
                </span>
                <div
                  style={{
                    width: `${Math.round(116 * lineDraw)}%`,
                    minWidth: Math.round(280 * lineDraw),
                    height: 1.7,
                    backgroundColor: '#1E2D52',
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <span
                style={{
                  fontFamily: JP_FONT,
                  fontSize: isClimax ? 46 : 40,
                  fontWeight: 500,
                  color: '#1E2D52',
                  letterSpacing: '0.15em',
                  lineHeight: 1.15,
                  padding: '0 10px 1px 24px',
                  textShadow: PAPER_HALO,
                }}
              >
                {activeLine.text}
              </span>
              <div
                style={{
                  width: `${Math.round(115 * lineDraw)}%`,
                  minWidth: Math.round(320 * lineDraw),
                  height: 1.7,
                  backgroundColor: '#1E2D52',
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
