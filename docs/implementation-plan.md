# 『もうじき夏が終わるから』Remotion 2D 动画 MV 实施计划 (Implementation Plan)

> **档案状态**：原始实施计划，作为过程档案保留。实际执行中 Step 2 的脚本与 Step 3 的 `ProtagonistRig` 分层方案被简化/替换，最终代码结构见根目录 README。

- **关联设计规范**：`docs/design-spec.md`
- **日期**：2026-10-15

## Step 1: 脚手架与依赖安装 (Project Scaffolding)
1. 在项目根目录初始化 Remotion TypeScript 工程（保留 `docs/`、`art-source/` 及专辑封面）。
2. 安装 `@remotion/media`（或使用 `remotion` 内置音频/图像组件）并启动 `npx remotion studio` 预览服务。
3. 将版权音源拷贝至 `public/audio/mousugu-natsu.mp3`（该文件不入库）。

## Step 2: 音频特征提取与水彩资产切割/生成管线 (Data & Watercolor Assets)
1. 解析音源与歌词，产出：
   - `src/data/audio-envelope.json`（30fps 共 9369 帧的归一化 `rms`、`low`、`mid`、`high` 数据；一次性分析脚本未入库）。
   - `src/data/lyrics.ts`（含精确起止秒数、帧数与排版样式分类）。
2. 整理水彩资产：
   - 从 `public/assets/storyboard-12shot.png` 拆出 12 镜构图参考。
   - 从 `public/assets/pitch-board.png` 拆出 8 大夏末道具贴纸（`public/assets/props/motif-01` ... `motif-08`）与角色三视图。
   - 原始封面存为 `public/assets/reference-cover.png`，高潮帧存为 `public/assets/climax-keyframe.png`。
3. 使用 `gpt-image-2.5-sunburst` 补充生成宽幅水彩图层：
   - `public/assets/scenes/03-seaside-parallax.png`：16:9 夏末海岸铁轨与远山无缝卷轴（供三扇车窗视差滚动）。
   - `public/assets/character/highres-girl-and-frames-cutout.png`：草帽少女坐姿背影与三扇车窗框的净空合成层。

## Step 3: 五层舞台组件与 12 幕合成开发 (Remotion Components)
1. `src/components/PaperBackground.tsx`：象牙米白水彩纸底 (`#F9F7EC`) + SVG 纸纹噪点 + 随幕次演进的四角水彩晕染。
2. `src/components/TriptychWindows.tsx`：三扇圆角电车窗 + 双金属横杆 + SVG `<clipPath>` 遮罩视口（支持三窗同步视差、三窗异时分屏、画架缩放揭秘、高潮破框倾泻）。
3. `src/components/ProtagonistRig.tsx`：10fps 抽帧手绘少女演出层（结合发丝/裙摆/草帽微动、呼吸位移与手绘线抖动滤镜）。
4. `src/components/FourStripMontage.tsx`：`01:15.28` 与 `02:34.26` 四拍四栏垂直水彩蒙太奇硬切组件 + 竖排明朝体大字印章。
5. `src/components/LivingBaseline.tsx` & `src/components/WatercolorFireworks.tsx`：贯穿全片的 1.5px 群青横线（铁轨/护栏/五线谱/歌词下划线）与音频包络驱动的黄绿/珊瑚水彩烟花粒子系统（含 `00:56.8` 真空悬停）。
6. `src/components/LyricStage.tsx`：复刻封面排版的明朝体+群青下划线歌词系统。
7. `src/MousuguNatsuMV.tsx` & `src/Root.tsx`：编排 S01–S12 全 12 幕（`9369` 帧，`1920×1080`，`30fps`），并提供单幕预览 Connected Compositions。

## Step 4: Studio 实时预览与关键帧抽帧验证 (Verification)
1. 启动 Remotion Studio 并在浏览器中加载预览。
2. 对 S01–S12 代表性帧渲染静态帧（Still）并做多模态视觉自检，确保水彩纸底融合自然、字号与留白比例优雅、120 BPM 卡点准确无误。
