import type React from 'react';
import { Audio } from '@remotion/media';
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import audioEnvelope from './data/audio-envelope.json';
import { SCENE_MARKERS } from './data/lyrics';
import {
  FourStripMontage,
  type MontageVariant,
} from './components/FourStripMontage';
import { LivingBaseline, type BaselineMode } from './components/LivingBaseline';
import { LyricStage } from './components/LyricStage';
import { PaperBackground, type PaperMood } from './components/PaperBackground';
import {
  TriptychWindows,
  type WindowStageMode,
} from './components/TriptychWindows';
import {
  WatercolorFireworks,
  type FireworkMode,
} from './components/WatercolorFireworks';

export type SceneActProps = {
  readonly sceneId: string;
  readonly durationInFrames: number;
  readonly paperMood: PaperMood;
  readonly windowMode: WindowStageMode;
  readonly baselineMode?: BaselineMode;
  readonly fireworkMode?: FireworkMode;
  readonly montageVariant?: MontageVariant;
  readonly montageStartLocalFrame?: number;
  readonly montageDurationFrames?: number;
};

export const SceneAct: React.FC<SceneActProps> = ({
  sceneId,
  durationInFrames,
  paperMood,
  windowMode,
  baselineMode = 'none',
  fireworkMode = 'none',
  montageVariant,
  montageStartLocalFrame = 0,
  montageDurationFrames = 120,
}) => {
  const localFrame = useCurrentFrame();
  const sceneMeta = SCENE_MARKERS.find((s) => s.id === sceneId);
  const globalFrame = Math.min(
    audioEnvelope.totalFrames - 1,
    Math.max(0, (sceneMeta ? sceneMeta.startFrame : 0) + localFrame)
  );

  const rmsEnergy = audioEnvelope.rms[globalFrame] ?? 0.3;
  const highEnergy = audioEnvelope.high[globalFrame] ?? 0.3;

  const isMontageActive =
    montageVariant !== undefined &&
    localFrame >= montageStartLocalFrame &&
    localFrame < montageStartLocalFrame + montageDurationFrames;

  // In S02, only show the album cover signature ("花と水飴、 / 最終電車 / n-buna") when on the 3-window stage (0..270f and 750..954f)
  const showBaseline =
    !isMontageActive &&
    baselineMode === 'album-cover-signature' &&
    (windowMode !== 's02-intro-band-4part' ||
      localFrame < 265 ||
      localFrame >= 755);

  return (
    <AbsoluteFill>
      {/* L0: Pure #F9F7EC Antique Ivory Watercolor Paper */}
      <PaperBackground mood={paperMood} energy={rmsEnergy} />

      {/* L1: Full-Resolution 16:9 Watercolor Stage & Line-by-Line 2D Keyframes */}
      {!isMontageActive && (
        <TriptychWindows
          mode={windowMode}
          localFrame={localFrame}
          durationInFrames={durationInFrames}
          rmsEnergy={rmsEnergy}
          highEnergy={highEnergy}
        />
      )}

      {/* L2: Borderless 2x2 High-Res Watercolor Botanical & Architectural Montage */}
      {isMontageActive && montageVariant && (
        <FourStripMontage
          variant={montageVariant}
          localFrame={localFrame - montageStartLocalFrame}
        />
      )}

      {/* L3A: Authentic Awashima Album Cover Signature Baselines ("花と水飴、 / 最終電車 / n-buna") */}
      {showBaseline && (
        <LivingBaseline
          mode={baselineMode}
          localFrame={localFrame}
          durationInFrames={durationInFrames}
        />
      )}

      {/* L3B: Subtle Drifting Balsam Petals & Watercolor Pigment Flecks */}
      {!isMontageActive && (
        <WatercolorFireworks mode={fireworkMode} rmsEnergy={rmsEnergy} />
      )}
    </AbsoluteFill>
  );
};

export const MousuguNatsuMV: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F9F7EC'
      }}
    >
      {/* Master Soundtrack */}
      <Audio src={staticFile('audio/mousugu-natsu.mp3')} premountFor={fps} />

      {/* S01 (00:00.0 - 00:08.5 | Frames 0 - 255): 序幕：白纸上的三扇空车窗与微光 */}
      <Sequence
        name="S01 · 序幕：白纸空窗"
        from={0}
        durationInFrames={255}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S01"
          durationInFrames={255}
          paperMood="ivory-pure"
          windowMode="s01-intro-empty-windows"
        />
      </Sequence>

      {/* S02 (00:08.5 - 00:40.3 | Frames 255 - 1209): 前奏四幕：花火车窗 -> 少女侧颜 -> 跨海铁桥 -> 车窗 */}
      <Sequence
        name="S02 · 前奏：花と水飴、最終電車（四幕演出）"
        from={255}
        durationInFrames={954}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S02"
          durationInFrames={954}
          paperMood="night-indigo"
          windowMode="s02-intro-band-4part"
          baselineMode="album-cover-signature"
          fireworkMode="subtle-sparks"
        />
      </Sequence>

      {/* S03 (00:40.3 - 00:48.3 | Frames 1209 - 1449): 第一朝：朝、小説を読んだ -> 君を待っていた */}
      <Sequence
        name="S03 · 第一朝：朝、小説を読んだ / 君を待っていた"
        from={1209}
        durationInFrames={240}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S03"
          durationInFrames={240}
          paperMood="morning-breeze"
          windowMode="s03-morning-novel-2part"
        />
      </Sequence>

      {/* S04 (00:48.3 - 00:59.3 | Frames 1449 - 1780): 第一夜：暮色入夜与花火の音 + 00:56.8 真空悬停 */}
      <Sequence
        name="S04 · 第一夜：夜になって気がついた 花火の音"
        from={1449}
        durationInFrames={331}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S04"
          durationInFrames={331}
          paperMood="night-indigo"
          windowMode="s04-twilight-to-night-freeze"
        />
      </Sequence>

      {/* S05 (00:59.3 - 01:15.2 | Frames 1780 - 2258): 副歌1三幕：藍を飛ばせ -> 消えて -> 言えないよ */}
      <Sequence
        name="S05 · 副歌1：今日藍を飛ばせ / 消えて / 言えないよ"
        from={1780}
        durationInFrames={478}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S05"
          durationInFrames={478}
          paperMood="night-indigo"
          windowMode="s05-chorus1-3part"
          fireworkMode="drifting-petals"
        />
      </Sequence>

      {/* S06 (01:15.2 - 01:29.0 | Frames 2258 - 2672): 昼顔・鳥居・鳳仙花・バス停 -> 日の落ちる街を歩いていた */}
      <Sequence
        name="S06 · 夏色四景 & 日の落ちる街"
        from={2258}
        durationInFrames={414}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S06"
          durationInFrames={414}
          paperMood="sunset-coral"
          windowMode="s06-sunset-town-walk"
          fireworkMode="drifting-petals"
          montageVariant="summer-four-1"
          montageStartLocalFrame={0}
          montageDurationFrames={122}
        />
      </Sequence>

      {/* S07A (01:29.0 - 01:45.5 | Frames 2672 - 3165): 间奏：三扇车窗外的海岸视差疾驰 */}
      <Sequence
        name="S07A · 间奏：海岸車窓"
        from={2672}
        durationInFrames={493}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S07"
          durationInFrames={493}
          paperMood="morning-breeze"
          windowMode="s07a-interlude-seaside-windows"
        />
      </Sequence>

      {/* S07B (01:45.5 - 02:18.3 | Frames 3165 - 4149): 第二循环三幕：清晨收音机 -> 夜半弹钢琴 -> 仰首歌唱 */}
      <Sequence
        name="S07B · 第二循环：ラジオ -> ピアノ -> 唄を歌っている"
        from={3165}
        durationInFrames={984}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S07"
          durationInFrames={984}
          paperMood="station-dusk"
          windowMode="s07b-verse2-radio-piano-singing"
        />
      </Sequence>

      {/* S08A (02:18.3 - 02:38.2 | Frames 4149 - 4747): 副歌2：疾风呐喊 -> 夏花盛放凝固时间 -> アベリア四景 */}
      <Sequence
        name="S08A · 副歌2：叫べ -> 僕に花咲いた -> アベリア四景"
        from={4149}
        durationInFrames={598}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S08"
          durationInFrames={598}
          paperMood="night-indigo"
          windowMode="s08a-chorus2-wind-and-flowers"
          fireworkMode="subtle-sparks"
          montageVariant="verdigris-four-2"
          montageStartLocalFrame={478}
          montageDurationFrames={120}
        />
      </Sequence>

      {/* S08B (02:38.2 - 02:48.0 | Frames 4747 - 5040): 蝉の鳴く街を歩いていた / 今日もまた */}
      <Sequence
        name="S08B · 副歌2尾声：蝉の鳴く街を歩いていた"
        from={4747}
        durationInFrames={293}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S08"
          durationInFrames={293}
          paperMood="morning-breeze"
          windowMode="s08b-cicada-shrine-walk"
        />
      </Sequence>

      {/* S09 (02:48.0 - 03:22.5 | Frames 5040 - 6077): 间奏：白纸上的孤轨与终电 */}
      <Sequence
        name="S09 · 间奏：白紙の鉄路"
        from={5040}
        durationInFrames={1037}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S09"
          durationInFrames={1037}
          paperMood="ivory-pure"
          windowMode="s09-breakdown-aerial-train"
          fireworkMode="drifting-petals"
        />
      </Sequence>

      {/* S10 (03:22.5 - 03:53.5 | Frames 6077 - 7005): 独白三幕：駅の裏(远景) -> 夜の藍を描く(画架特写) -> 夜半钢琴 */}
      <Sequence
        name="S10 · 独白：駅の裏 -> 夜の藍に花が咲く絵 -> ピアノ"
        from={6077}
        durationInFrames={928}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S10"
          durationInFrames={928}
          paperMood="station-dusk"
          windowMode="s10-bridge-station-easel-nocturne"
        />
      </Sequence>

      {/* S11 (03:53.5 - 04:22.8 | Frames 7005 - 7884): 最终副歌：明日藍を飛ばせ(飞鸟破窗) -> 浅い夏よ終わってくれよ(破晓) -> 四景 -> 夜が明けた街 */}
      <Sequence
        name="S11 · 最终副歌：明日藍を飛ばせ -> 浅い夏よ終わってくれよ -> 夜が明けた街"
        from={7005}
        durationInFrames={879}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S11"
          durationInFrames={879}
          paperMood="dawn-break"
          windowMode="s11-climax-birds-and-dawn-overflow"
          fireworkMode="drifting-petals"
          montageVariant="summer-four-1"
          montageStartLocalFrame={478}
          montageDurationFrames={116}
        />
      </Sequence>

      {/* S12A (04:22.8 - 04:54.5 | Frames 7884 - 8835): 终章器乐狂飙：破晓漫步 -> 海堤回眸浅笑 */}
      <Sequence
        name="S12A · 终章：破晓漫步 -> 海堤回眸微笑"
        from={7884}
        durationInFrames={951}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S12"
          durationInFrames={951}
          paperMood="dawn-break"
          windowMode="s12a-finale-walk-and-lookback-smile"
          fireworkMode="drifting-petals"
        />
      </Sequence>

      {/* S12B (04:54.5 - 05:12.3 | Frames 8835 - 9369): 尾奏余白：映出晴空的空车窗、草帽与合上的小说 */}
      <Sequence
        name="S12B · 余白：今日もまた"
        from={8835}
        durationInFrames={534}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S12"
          durationInFrames={534}
          paperMood="ivory-pure"
          windowMode="s12b-outro-empty-windows"
        />
      </Sequence>

      {/* L4: Authentic Awashima Cover-Style Japanese Mincho Lyric Stage */}
      <LyricStage />
    </AbsoluteFill>
  );
};
