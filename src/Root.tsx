import type React from 'react';
import { Composition, Folder } from 'remotion';
import { MousuguNatsuMV, SceneAct } from './MousuguNatsuMV';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master 05:12.29 Music Video Composition (9369 frames @ 30fps, 1920x1080) */}
      <Composition
        id="MousuguNatsuMV"
        component={MousuguNatsuMV}
        durationInFrames={9369}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Individual Scene Compositions for Studio Inspection */}
      <Folder name="Scenes">
        <Composition
          id="S02-Intro4Part"
          component={SceneAct}
          durationInFrames={954}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S02',
            durationInFrames: 954,
            paperMood: 'night-indigo' as const,
            windowMode: 's02-intro-band-4part' as const,
            baselineMode: 'album-cover-signature' as const,
            fireworkMode: 'subtle-sparks' as const,
          }}
        />
        <Composition
          id="S03-MorningNovelKeyframes"
          component={SceneAct}
          durationInFrames={240}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S03',
            durationInFrames: 240,
            paperMood: 'morning-breeze' as const,
            windowMode: 's03-morning-novel-2part' as const,
          }}
        />
        <Composition
          id="S05-Chorus1ThreePart"
          component={SceneAct}
          durationInFrames={478}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S05',
            durationInFrames: 478,
            paperMood: 'night-indigo' as const,
            windowMode: 's05-chorus1-3part' as const,
            fireworkMode: 'drifting-petals' as const,
          }}
        />
        <Composition
          id="S07B-Verse2RadioPianoSinging"
          component={SceneAct}
          durationInFrames={984}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S07',
            durationInFrames: 984,
            paperMood: 'station-dusk' as const,
            windowMode: 's07b-verse2-radio-piano-singing' as const,
          }}
        />
        <Composition
          id="S08A-Chorus2WindAndFlowers"
          component={SceneAct}
          durationInFrames={598}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S08',
            durationInFrames: 598,
            paperMood: 'night-indigo' as const,
            windowMode: 's08a-chorus2-wind-and-flowers' as const,
            montageVariant: 'verdigris-four-2' as const,
            montageStartLocalFrame: 478,
            montageDurationFrames: 120,
          }}
        />
        <Composition
          id="S10-BridgeStationEaselNocturne"
          component={SceneAct}
          durationInFrames={928}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S10',
            durationInFrames: 928,
            paperMood: 'station-dusk' as const,
            windowMode: 's10-bridge-station-easel-nocturne' as const,
          }}
        />
        <Composition
          id="S11-ClimaxBirdsAndDawnOverflow"
          component={SceneAct}
          durationInFrames={879}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S11',
            durationInFrames: 879,
            paperMood: 'dawn-break' as const,
            windowMode: 's11-climax-birds-and-dawn-overflow' as const,
            fireworkMode: 'drifting-petals' as const,
            montageVariant: 'summer-four-1' as const,
            montageStartLocalFrame: 478,
            montageDurationFrames: 116,
          }}
        />
        <Composition
          id="S12A-FinaleWalkAndLookbackSmile"
          component={SceneAct}
          durationInFrames={951}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S12',
            durationInFrames: 951,
            paperMood: 'dawn-break' as const,
            windowMode: 's12a-finale-walk-and-lookback-smile' as const,
            fireworkMode: 'drifting-petals' as const,
          }}
        />
      </Folder>
    </>
  );
};
