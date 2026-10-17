import type React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

export type WindowStageMode =
  | 's01-intro-empty-windows'
  | 's02-intro-band-4part'
  | 's03-morning-novel-2part'
  | 's04-twilight-to-night-freeze'
  | 's05-chorus1-3part'
  | 's06-sunset-town-walk'
  | 's07a-interlude-seaside-windows'
  | 's07b-verse2-radio-piano-singing'
  | 's08a-chorus2-wind-and-flowers'
  | 's08b-cicada-shrine-walk'
  | 's09-breakdown-aerial-train'
  | 's10-bridge-station-easel-nocturne'
  | 's11-climax-birds-and-dawn-overflow'
  | 's12a-finale-walk-and-lookback-smile'
  | 's12b-outro-empty-windows';

interface TriptychWindowsProps {
  readonly mode: WindowStageMode;
  readonly localFrame: number;
  readonly durationInFrames: number;
  readonly rmsEnergy: number;
  readonly highEnergy: number;
}

// Canonical container style for all 3-window plates (94% of 1920x1080 = 1806x1016 centered at left: 57, top: 32)
// Every single registered 3-window plate has its 3 windows at the exact same pixel box inside this container!
const CANONICAL_STAGE_BOX: React.CSSProperties = {
  position: 'absolute',
  left: 57,
  top: 32,
  width: 1806,
  height: 1016,
};

export const TriptychWindows: React.FC<TriptychWindowsProps> = ({
  mode,
  localFrame,
  durationInFrames,
}) => {
  const globalFrame = useCurrentFrame();
  // 10fps stepped frame (3-frame hold at 30fps) for authentic hand-drawn 2D anime cadence
  const stepFrame = Math.floor(globalFrame / 3) * 3;
  // Subtle train carriage vertical sway (60f = 1 bar at 120 BPM)
  const carriageBounceY = Math.sin((stepFrame / 60) * Math.PI * 2) * 2.2;

  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(
    localFrame,
    [Math.max(0, durationInFrames - 18), durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {/* 1. S01 (00:00.0 - 00:08.5 | 255f): Solo Piano Intro — Empty Sketch Windows & Pale Indigo Ink */}
      {mode === 's01-intro-empty-windows' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            translate: `0px ${carriageBounceY}px`,
          }}
        >
          <Img
            src={staticFile('assets/scenes/18-intro-empty-windows.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}

      {/* 2. S02 (00:08.5 - 00:40.3 | 954f): 4-Part Full Band Intro Choreography
          - 0..270f: Canonical 3-Window Cutout + Live Scrolling Firework Sky
          - 270..510f: Canonical 3-Window Night Novel & Ticket (39)
          - 510..750f: Wide Exterior Train Crossing Night Bay Bridge Under Twin Fireworks (20)
          - 750..954f: Return to Canonical 3-Window Stage */}
      {mode === 's02-intro-band-4part' && (
        <AbsoluteFill>
          {/* Part A (0..290f) & Part D (730..954f): Live 3-Window Stage in exact canonical coordinates */}
          {(localFrame < 290 || localFrame >= 730) && (
            <div
              style={{
                ...CANONICAL_STAGE_BOX,
                translate: `0px ${carriageBounceY}px`,
                opacity:
                  localFrame < 290
                    ? interpolate(localFrame, [255, 288], [1, 0], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      })
                    : interpolate(localFrame, [730, 765], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      }),
              }}
            >
              <svg
                width="1806"
                height="1016"
                viewBox="0 0 1672 941"
                style={{ position: 'absolute', inset: 0 }}
              >
                <defs>
                  <clipPath id="s02-live-three-panes">
                    <rect x="306" y="132" width="295" height="392" rx="28" />
                    <rect x="690" y="132" width="298" height="392" rx="28" />
                    <rect x="1074" y="132" width="296" height="392" rx="28" />
                  </clipPath>
                </defs>
                <g clipPath="url(#s02-live-three-panes)">
                  <image
                    href={staticFile('assets/scenes/01-night-fireworks-sky.png')}
                    x={interpolate(
                      localFrame,
                      [0, durationInFrames],
                      [180, -40],
                      {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      }
                    )}
                    y={110}
                    width="1380"
                    height="440"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
              </svg>

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
            </div>
          )}

          {/* Part B (255..530f): Canonical 39-s02-night-windows-novel-ticket.png (zero window/girl size jump!) */}
          {localFrame >= 255 && localFrame < 530 && (
            <div
              style={{
                ...CANONICAL_STAGE_BOX,
                translate: `0px ${carriageBounceY}px`,
                opacity: Math.min(
                  interpolate(localFrame, [255, 288], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  interpolate(localFrame, [495, 528], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })
                ),
              }}
            >
              <Img
                src={staticFile(
                  'assets/scenes/39-s02-night-windows-novel-ticket.png'
                )}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}

          {/* Part C (495..765f): Night Train Crossing Bay Bridge Under Twin Fireworks (20) */}
          {localFrame >= 495 && localFrame < 765 && (
            <div
              style={{
                ...CANONICAL_STAGE_BOX,
                opacity: Math.min(
                  interpolate(localFrame, [495, 528], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  interpolate(localFrame, [730, 764], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })
                ),
              }}
            >
              <Img
                src={staticFile(
                  'assets/scenes/20-intro-train-crossing-night.png'
                )}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* 3. S03 (00:40.3 - 00:48.3 | 240f): 2-Keyframe Morning Sequence (02 -> 31, locked to canonical box) */}
      {mode === 's03-morning-novel-2part' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            translate: `0px ${carriageBounceY}px`,
          }}
        >
          <Img
            src={staticFile('assets/scenes/02-morning-novel-windows.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [106, 130], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
          <Img
            src={staticFile(
              'assets/scenes/31-diff-morning-novel-waiting-faceless.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [106, 130], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </div>
      )}

      {/* 4. S04 (00:48.3 - 00:59.3 | 331f): Twilight-to-Night Transition (13 -> 36, locked to canonical box) */}
      {mode === 's04-twilight-to-night-freeze' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            translate: `0px ${localFrame < 255 ? carriageBounceY : 0}px`,
          }}
        >
          <Img
            src={staticFile('assets/scenes/13-twilight-sunset-windows.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [130, 168], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
          <Img
            src={staticFile(
              'assets/scenes/36-highres-night-cover-remaster.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [130, 168], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </div>
      )}

      {/* 5. S05 (00:59.3 - 01:15.2 | 478f): Chorus 1 (11 -> 33 -> 22, 11 & 33 locked to canonical box) */}
      {mode === 's05-chorus1-3part' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            translate: `0px ${carriageBounceY}px`,
          }}
        >
          <Img
            src={staticFile('assets/scenes/11-chorus1-indigo-splash.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [108, 134], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />

          <Img
            src={staticFile(
              'assets/scenes/33-chorus1-back-dissolve-faceless.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: Math.min(
                interpolate(localFrame, [108, 134], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                interpolate(localFrame, [225, 252], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              ),
            }}
          />

          <Img
            src={staticFile('assets/scenes/22-chorus1-unspoken-letter.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [225, 252], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </div>
      )}

      {/* 6. S06B (01:19.3 - 01:29.0): Walking Through the Sunset Town ("日の落ちる街を歩いていた") */}
      {mode === 's06-sunset-town-walk' && (
        <div style={CANONICAL_STAGE_BOX}>
          <Img
            src={staticFile('assets/scenes/15-sunset-town-walk.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}

      {/* 7. S07A (01:29.0 - 01:45.5 | 493f): Instrumental Interlude — Coastal Parallax in Canonical 3-Window Cutout */}
      {mode === 's07a-interlude-seaside-windows' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            translate: `0px ${carriageBounceY}px`,
          }}
        >
          <svg
            width="1806"
            height="1016"
            viewBox="0 0 1672 941"
            style={{ position: 'absolute', inset: 0 }}
          >
            <defs>
              <clipPath id="s07-live-three-panes">
                <rect x="306" y="132" width="295" height="392" rx="28" />
                <rect x="690" y="132" width="298" height="392" rx="28" />
                <rect x="1074" y="132" width="296" height="392" rx="28" />
              </clipPath>
            </defs>
            <g clipPath="url(#s07-live-three-panes)">
              <image
                href={staticFile('assets/scenes/03-seaside-parallax.png')}
                x={interpolate(
                  localFrame,
                  [0, durationInFrames],
                  [220, -180],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }
                )}
                y={115}
                width="1480"
                height="430"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </svg>
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
        </div>
      )}

      {/* 8. S07B (01:45.5 - 02:18.3 | 984f): Verse 2 3-Part Narrative Sequence (23 -> 05 -> 34) */}
      {mode === 's07b-verse2-radio-piano-singing' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            translate: `0px ${carriageBounceY * 0.5}px`,
          }}
        >
          <Img
            src={staticFile(
              'assets/scenes/23-verse2-morning-radio-window.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [450, 485], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />

          <Img
            src={staticFile('assets/scenes/05-piano-radio-vignette.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: Math.min(
                interpolate(localFrame, [450, 485], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                interpolate(localFrame, [815, 848], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              ),
            }}
          />

          <Img
            src={staticFile('assets/scenes/34-diff-piano-singing-faceless.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [815, 848], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </div>
      )}

      {/* 9. S08A (02:18.3 - 02:34.2 | 479f): Chorus 2 — Locked Canonical 3-Window Stage (11/33 -> 25 -> Montage)
          Using canonical 11-chorus1-indigo-splash -> 25-chorus2-flowers-bloom-stop-time so the 3 windows & girl NEVER jump! */}
      {mode === 's08a-chorus2-wind-and-flowers' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            translate: `0px ${carriageBounceY}px`,
          }}
        >
          <Img
            src={staticFile('assets/scenes/11-chorus1-indigo-splash.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [220, 250], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
          <Img
            src={staticFile(
              'assets/scenes/25-chorus2-flowers-bloom-stop-time.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [220, 250], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </div>
      )}

      {/* 10. S08B (02:38.2 - 02:48.0): Walking Under Cicada-Filled Shrine Trees */}
      {mode === 's08b-cicada-shrine-walk' && (
        <div style={CANONICAL_STAGE_BOX}>
          <Img
            src={staticFile('assets/scenes/26-chorus2-cicada-shrine-walk.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}

      {/* 11. S09 (02:48.0 - 03:22.5 | 1037f): Instrumental Breakdown — Solitary Two-Car Local Train */}
      {mode === 's09-breakdown-aerial-train' && (
        <div style={CANONICAL_STAGE_BOX}>
          <Img
            src={staticFile('assets/scenes/06-aerial-train-ivory-paper.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}

      {/* 12. S10 (03:22.5 - 03:53.5 | 928f): Bridge 3-Part (27 -> 38 -> 16) */}
      {mode === 's10-bridge-station-easel-nocturne' && (
        <div style={CANONICAL_STAGE_BOX}>
          <Img
            src={staticFile(
              'assets/scenes/27-bridge-standing-behind-station.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [225, 255], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />

          <Img
            src={staticFile(
              'assets/scenes/38-s10-station-easel-fireworks-zoom.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: Math.min(
                interpolate(localFrame, [225, 255], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                interpolate(localFrame, [468, 502], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              ),
            }}
          />

          <Img
            src={staticFile('assets/scenes/16-night-piano-solitude.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [468, 502], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </div>
      )}

      {/* 13. S11 (03:53.5 - 04:22.8 | 879f): Final Chorus (28 -> 09 aligned to identical window/girl position -> 40) */}
      {mode === 's11-climax-birds-and-dawn-overflow' && (
        <div style={CANONICAL_STAGE_BOX}>
          {localFrame < 255 && (
            <Img
              src={staticFile(
                'assets/scenes/28-climax-window-shatter-start.png'
              )}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: interpolate(localFrame, [218, 248], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            />
          )}

          {localFrame >= 218 && localFrame < 490 && (
            <Img
              src={staticFile('assets/scenes/09-climax-dawn-notext.png')}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: interpolate(localFrame, [218, 248], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            />
          )}

          {localFrame >= 590 && (
            <Img
              src={staticFile(
                'assets/scenes/40-s12a-dawn-embankment-flat-walk.png'
              )}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: interpolate(localFrame, [590, 616], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            />
          )}
        </div>
      )}

      {/* 14. S12A (04:22.8 - 04:54.5 | 951f): Cathartic Instrumental Finale (40 -> 41) */}
      {mode === 's12a-finale-walk-and-lookback-smile' && (
        <div style={CANONICAL_STAGE_BOX}>
          <Img
            src={staticFile(
              'assets/scenes/40-s12a-dawn-embankment-flat-walk.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [350, 395], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
          <Img
            src={staticFile(
              'assets/scenes/41-s12a-dawn-torii-shore-stillness.png'
            )}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interpolate(localFrame, [350, 395], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </div>
      )}

      {/* 15. S12B (04:54.5 - 05:12.3 | 534f): Solo Piano Coda — Canonical Empty Morning Windows (08) */}
      {mode === 's12b-outro-empty-windows' && (
        <div
          style={{
            ...CANONICAL_STAGE_BOX,
            opacity: interpolate(
              localFrame,
              [0, 45, durationInFrames - 75, durationInFrames],
              [0, 1, 1, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }
            ),
          }}
        >
          <Img
            src={staticFile('assets/scenes/08-outro-empty-windows.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
