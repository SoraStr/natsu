{
  "type": "同底动作差分 · 第一朝关键帧B：合书静候的无脸背影 (Same-Base Pose Differential, Strictly Faceless)",
  "goal": "严格以参考图1（02-morning-novel-windows.png 晨读图）为底图进行原位动作微调差分：保持背景三扇清晨蓝天白云车窗、米白纸底、帆布包以及少女的坐姿背影、草帽角度、衣褶水彩笔触 95% 完全一致，仅将她原本双手捧在胸前阅读的小说合拢放在珊瑚粉裙膝上，草帽帽檐微微向右侧倾斜，全程保持纯背影/帽檐完全遮蔽面部（绝对不露出眼睛、鼻子或嘴唇）",
  "editing_instruction": "Modify ONLY the girl's hands and subtle head tilt from Image 1 while keeping the three morning-sky train windows, canvas bag, paper background, and watercolor brushwork 100% identical: she lowers the paperback novel onto her lap with both hands resting on the book, and tilts her straw-hatted head slightly toward the right window as if waiting for someone. Her wide straw hat brim and silver-lavender hair MUST completely hide her face from behind (strictly faceless back view, NO eyes or facial features visible).",
  "constraints": {
    "must_keep": [
      "100% identical window position, morning clouds, and watercolor texture as Image 1 so the two frames animate as a seamless 2D keyframe pair",
      "Strictly FACELESS back view — hat brim and hair completely conceal the face",
      "Strictly ZERO text"
    ],
    "avoid": [
      "NEVER show eyes, nose, mouth, or side facial profile"
    ]
  }
}
