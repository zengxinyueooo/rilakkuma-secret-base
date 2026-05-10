# 🐻 轻松熊和蛋黄的秘密基地

**Rilakkuma & Gudetama's Secret Base** — 一个基于"记忆地球仪"的交互式相册网站

---

## 快速启动

```bash
# 安装依赖
npm install

# 启动开发服务器（浏览器打开 http://localhost:5173）
npm run dev

# 打包生产版本
npm run build
```

---

## 如何自定义修改回忆和图片

### 第一步：修改城市列表和回忆内容

打开文件：`src/data/locations.ts`

这个文件包含所有 12 个城市的地标信息和回忆内容。每个城市是一个对象，结构如下：

```typescript
{
  id: 'xian',                    // ← 城市唯一ID（英文，对应图片目录名）
  cityName: '西安',               // ← 城市中文名（显示在地标和弹窗中）
  lat: 34.3416,                  // ← 纬度（可在高德/谷歌地图右键"复制坐标"获取）
  lng: 108.9398,                 // ← 经度
  title: '古都的秘密 🏯',         // ← 回忆标题（显示在详情页顶部大字）
  coverImage: '/images/xian/cover.jpg',  // ← 封面图路径
  shortDescription: '城墙下的漫步，羊肉泡馍的香气',  // ← 悬浮地标时的简短描述
  gallery: [                     // ← 照片路径数组（瀑布流展示）
    '/images/xian/photo1.jpg',
    '/images/xian/photo2.jpg',
    '/images/xian/photo3.jpg',
  ],
  messages: [                    // ← 正文文案（每个字符串是一个段落）
    '第一段：大号引言样式，写最重要的话',
    '第二段：带左边框的引言样式',
    '第三段：普通正文样式',
  ],
}
```

**修改经纬度的方法：**
1. 打开 [高德地图](https://www.amap.com) 或 [谷歌地图](https://maps.google.com)
2. 在目标位置右键，选择"复制坐标"
3. 高德地图格式是"纬度,经度"，谷歌地图同理
4. 填入 `lat`（纬度）和 `lng`（经度）字段

---

### 第二步：放置真实照片

照片需要放在 `public/images/` 目录下，按城市 ID 分文件夹：

```
public/
└── images/
    ├── xian/          ← 西安的照片放这里（id 是 'xian'）
    │   ├── cover.jpg  ← 封面图（建议横版，比例 16:9 或更宽）
    │   ├── photo1.jpg ← 瀑布流照片1
    │   ├── photo2.jpg ← 瀑布流照片2
    │   └── photo3.jpg ← 瀑布流照片3
    ├── nanjing/       ← 南京的照片
    │   ├── cover.jpg
    │   └── ...
    └── ...（其他城市）
```

**照片命名规则：**
- 封面图：`cover.jpg`（必须，显示在详情页顶部）
- 瀑布流照片：任意命名，在 `locations.ts` 的 `gallery` 数组中对应填写路径

**照片格式建议：**
- 格式：JPG 或 WebP（体积更小）
- 封面图尺寸：建议 1200×800 像素以上
- 瀑布流照片：任意尺寸，会自动适应

**如果没有照片怎么办？**
- 不放照片时，网站会显示马卡龙色渐变占位图，不会报错
- 可以先用占位图测试，之后再替换真实照片

---

### 第三步：修改文案

在 `src/data/locations.ts` 中，每个城市的 `messages` 数组就是详情页的正文文案：

```typescript
messages: [
  // 第一段：大号引言（最重要的话写这里）
  '西安，一座用时间堆砌的城市。',

  // 第二段：带左边框的引言样式
  '在这里，我们一起走过了古城墙，看日落把整座城市染成金色。🌅',

  // 第三段：普通正文
  '羊肉泡馍、凉皮、肉夹馍……每一口都是记忆里最温暖的味道。',

  // 可以继续添加更多段落...
],
```

**小技巧：**
- 在文案中直接插入 emoji，会显示在文字中，增加趣味感
- 第一段会以更大的字号显示，适合放最有感情的话
- 段落数量不限，可以多写几段

---

## 修改地标 emoji 图标

在 `src/components/Globe/CityMarker.tsx` 文件中，找到 `CITY_EMOJIS` 对象：

```typescript
const CITY_EMOJIS: Record<string, string> = {
  xian: '🏯',
  nanjing: '🌸',
  // ...
}
```

修改对应城市 ID 的 emoji 即可。

---

## 项目文件结构

```
rilakkuma-secret-base/
├── public/
│   └── images/          ← 📸 放你的照片在这里！
│       ├── xian/
│       ├── nanjing/
│       └── ...（12个城市目录）
├── src/
│   ├── data/
│   │   └── locations.ts ← ✏️ 修改回忆内容的核心文件！
│   ├── components/
│   │   ├── LoadingScreen/  ← 像素风加载页
│   │   ├── Globe/          ← 3D 地球场景
│   │   ├── MemoryModal/    ← 回忆详情弹窗
│   │   └── UI/             ← 标题徽章、操作提示
│   ├── types/index.ts      ← TypeScript 类型定义
│   └── utils/geoUtils.ts   ← 经纬度转换工具
└── README.md               ← 你正在看这个文件
```

---

## 技术栈

| 技术 | 用途 |
|------|------|
| Vite + React + TypeScript | 项目框架 |
| @react-three/fiber + drei | 3D 地球渲染 |
| Three.js | 底层 3D 引擎 |
| Framer Motion | 动画效果 |
| Tailwind CSS | 样式系统 |
| Lucide React | 图标库 |

---

## 常见问题

**Q: 地球纹理加载不出来？**
A: 地球纹理从 CDN 加载，需要网络连接。如果网络较慢，稍等片刻即可。

**Q: 照片显示空白？**
A: 检查照片路径是否正确。路径以 `/` 开头，对应 `public/` 目录，例如 `public/images/xian/cover.jpg` 对应路径 `/images/xian/cover.jpg`。

**Q: 如何添加新城市？**
A: 在 `src/data/locations.ts` 中添加新对象，并在 `public/images/` 下创建对应目录放置照片。同时在 `src/components/Globe/CityMarker.tsx` 的 `CITY_EMOJIS` 中添加对应 emoji。

**Q: 手机上能用吗？**
A: 支持移动端！可以用手指拖拽旋转地球，上下滑动关闭弹窗。

---

*用爱制作，献给最特别的你 🐻💜🍳*
