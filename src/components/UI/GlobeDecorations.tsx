// 地球展示页装饰元素（像素风角落图案 + 漂浮图标 + 边框光带 + 飘落花瓣）
// z-index 2~5，不遮挡地球和功能 UI

import { motion } from 'framer-motion'

// ===== 1. 角落像素装饰 =====

// 左上角：像素樱花
function PixelCherryBlossom() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* 花瓣1（上） */}
      <rect x="38" y="8"  width="14" height="18" rx="7" fill="#FDA4AF" opacity="0.9" />
      {/* 花瓣2（右上） */}
      <rect x="58" y="20" width="14" height="18" rx="7" fill="#F9A8D4" opacity="0.85"
        transform="rotate(72 65 29)" />
      {/* 花瓣3（右下） */}
      <rect x="52" y="48" width="14" height="18" rx="7" fill="#FDA4AF" opacity="0.85"
        transform="rotate(144 59 57)" />
      {/* 花瓣4（左下） */}
      <rect x="24" y="48" width="14" height="18" rx="7" fill="#F9A8D4" opacity="0.85"
        transform="rotate(216 31 57)" />
      {/* 花瓣5（左上） */}
      <rect x="18" y="20" width="14" height="18" rx="7" fill="#FDA4AF" opacity="0.85"
        transform="rotate(288 25 29)" />
      {/* 花心 */}
      <circle cx="45" cy="42" r="8" fill="#FBBF24" opacity="0.95" />
      <circle cx="45" cy="42" r="4" fill="#FDE68A" opacity="1" />
      {/* 花蕊小点 */}
      <circle cx="45" cy="35" r="2" fill="#F59E0B" />
      <circle cx="51" cy="39" r="2" fill="#F59E0B" />
      <circle cx="48" cy="46" r="2" fill="#F59E0B" />
      <circle cx="39" cy="46" r="2" fill="#F59E0B" />
      <circle cx="38" cy="39" r="2" fill="#F59E0B" />
      {/* 叶子 */}
      <ellipse cx="25" cy="68" rx="10" ry="6" fill="#34D399" opacity="0.8"
        transform="rotate(-30 25 68)" />
      <ellipse cx="65" cy="72" rx="8" ry="5" fill="#6EE7B7" opacity="0.7"
        transform="rotate(20 65 72)" />
    </svg>
  )
}

// 右上角：像素星星簇
function PixelStarCluster() {
  return (
    <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
      {/* 大星星（左） */}
      <polygon
        points="28,5 32,18 46,18 35,26 39,40 28,32 17,40 21,26 10,18 24,18"
        fill="#C084FC" opacity="0.95"
        style={{ filter: 'drop-shadow(0 0 4px #C084FC)' }}
      />
      {/* 中星星（右上） */}
      <polygon
        points="72,8 75,17 84,17 77,22 80,31 72,26 64,31 67,22 60,17 69,17"
        fill="#A78BFA" opacity="0.9"
        style={{ filter: 'drop-shadow(0 0 3px #A78BFA)' }}
      />
      {/* 小星星（右下） */}
      <polygon
        points="85,50 87,56 93,56 88,60 90,66 85,62 80,66 82,60 77,56 83,56"
        fill="#E879F9" opacity="0.85"
        style={{ filter: 'drop-shadow(0 0 3px #E879F9)' }}
      />
      {/* 装饰小点 */}
      <circle cx="50" cy="35" r="3" fill="#F0ABFC" opacity="0.7" />
      <circle cx="58" cy="48" r="2" fill="#C084FC" opacity="0.6" />
      <circle cx="40" cy="55" r="2.5" fill="#A78BFA" opacity="0.65" />
      <circle cx="20" cy="65" r="2" fill="#E879F9" opacity="0.5" />
      <circle cx="70" cy="72" r="3" fill="#C084FC" opacity="0.6" />
    </svg>
  )
}

// 左下角：像素草莓
function PixelStrawberry() {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
      {/* 叶子 */}
      <ellipse cx="28" cy="20" rx="14" ry="8" fill="#34D399" opacity="0.9"
        transform="rotate(-35 28 20)" />
      <ellipse cx="52" cy="18" rx="14" ry="8" fill="#6EE7B7" opacity="0.85"
        transform="rotate(35 52 18)" />
      <rect x="36" y="12" width="8" height="16" rx="2" fill="#34D399" opacity="0.9" />
      {/* 草莓主体 */}
      <path d="M15 35 Q10 60 40 78 Q70 60 65 35 Q52 22 40 26 Q28 22 15 35 Z"
        fill="#F87171" opacity="0.95" />
      {/* 高光 */}
      <ellipse cx="30" cy="42" rx="7" ry="10" fill="rgba(255,255,255,0.25)"
        transform="rotate(-15 30 42)" />
      {/* 种子点 */}
      <ellipse cx="32" cy="45" rx="2.5" ry="1.8" fill="#FEF2F2" opacity="0.8" transform="rotate(-10 32 45)" />
      <ellipse cx="46" cy="42" rx="2.5" ry="1.8" fill="#FEF2F2" opacity="0.8" transform="rotate(10 46 42)" />
      <ellipse cx="38" cy="56" rx="2.5" ry="1.8" fill="#FEF2F2" opacity="0.8" />
      <ellipse cx="28" cy="58" rx="2.2" ry="1.6" fill="#FEF2F2" opacity="0.75" transform="rotate(-15 28 58)" />
      <ellipse cx="50" cy="56" rx="2.2" ry="1.6" fill="#FEF2F2" opacity="0.75" transform="rotate(15 50 56)" />
      <ellipse cx="35" cy="68" rx="2" ry="1.5" fill="#FEF2F2" opacity="0.7" />
      <ellipse cx="46" cy="66" rx="2" ry="1.5" fill="#FEF2F2" opacity="0.7" />
    </svg>
  )
}

// 右下角：像素蝴蝶结
function PixelBow() {
  return (
    <svg width="90" height="80" viewBox="0 0 90 80" fill="none">
      {/* 左叶 */}
      <path d="M8 22 Q20 10 38 28 Q30 42 8 38 Z" fill="#F9A8D4" opacity="0.95" />
      <path d="M12 26 Q22 16 34 30 Q27 38 12 35 Z" fill="#FBCFE8" opacity="0.6" />
      {/* 右叶 */}
      <path d="M82 22 Q70 10 52 28 Q60 42 82 38 Z" fill="#F9A8D4" opacity="0.95" />
      <path d="M78 26 Q68 16 56 30 Q63 38 78 35 Z" fill="#FBCFE8" opacity="0.6" />
      {/* 中结 */}
      <ellipse cx="45" cy="30" rx="9" ry="11" fill="#E879F9" opacity="0.95" />
      <ellipse cx="45" cy="30" rx="5" ry="7" fill="#F0ABFC" opacity="0.8" />
      {/* 丝带尾 */}
      <path d="M38 38 Q30 52 24 62" stroke="#F9A8D4" strokeWidth="3.5" fill="none"
        strokeLinecap="round" opacity="0.8" />
      <path d="M52 38 Q60 52 66 62" stroke="#F9A8D4" strokeWidth="3.5" fill="none"
        strokeLinecap="round" opacity="0.8" />
      {/* 装饰小点 */}
      <circle cx="18" cy="32" r="2.5" fill="#FBCFE8" opacity="0.7" />
      <circle cx="72" cy="32" r="2.5" fill="#FBCFE8" opacity="0.7" />
    </svg>
  )
}

function CornerDecorations() {
  const corners = [
    { component: <PixelCherryBlossom />, style: { top: 60, left: 60 }, delay: 0 },
    { component: <PixelStarCluster />,   style: { top: 55, right: 55 }, delay: 0.8 },
    { component: <PixelStrawberry />,    style: { bottom: 55, left: 55 }, delay: 1.6 },
    { component: <PixelBow />,           style: { bottom: 60, right: 60 }, delay: 2.4 },
  ]

  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            ...c.style,
            zIndex: 3,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: [1, 1.06, 1] }}
          transition={{
            opacity: { delay: c.delay + 0.5, duration: 0.8 },
            scale: { delay: c.delay + 0.5, duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {c.component}
        </motion.div>
      ))}
    </>
  )
}

// ===== 2. 漂浮像素小图标 =====

// 像素小熊头
function MiniRilakkuma() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="7"  cy="7"  r="5" fill="#8B5E3C" />
      <circle cx="7"  cy="7"  r="3" fill="#F4C8A4" />
      <circle cx="21" cy="7"  r="5" fill="#8B5E3C" />
      <circle cx="21" cy="7"  r="3" fill="#F4C8A4" />
      <ellipse cx="14" cy="16" rx="11" ry="10" fill="#D4956A" />
      <circle cx="10" cy="14" r="2.8" fill="white" />
      <circle cx="18" cy="14" r="2.8" fill="white" />
      <circle cx="10" cy="14" r="1.8" fill="#2D1A0E" />
      <circle cx="18" cy="14" r="1.8" fill="#2D1A0E" />
      <circle cx="9.2" cy="13.2" r="0.8" fill="white" />
      <circle cx="17.2" cy="13.2" r="0.8" fill="white" />
      <ellipse cx="14" cy="18" rx="1.5" ry="1.1" fill="#2D1A0E" />
    </svg>
  )
}

// 像素蛋黄小圆
function MiniGudetama() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
      <ellipse cx="13" cy="15" rx="12" ry="5.5" fill="#FFFDE7" stroke="#F5E6A3" strokeWidth="0.8" />
      <circle cx="13" cy="9" r="8" fill="#FBBF24" />
      <ellipse cx="10" cy="6.5" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.45)"
        transform="rotate(-20 10 6.5)" />
      <path d="M9 9 Q10.5 11 12 9" stroke="#5A3A0A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M14 9 Q15.5 11 17 9" stroke="#5A3A0A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// 像素爱心
function MiniHeart({ color = '#FF6B9D' }: { color?: string }) {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M11 17 C11 17 2 11 2 6 C2 3.2 4.2 1 7 1 C8.8 1 10.4 1.9 11 3.2 C11.6 1.9 13.2 1 15 1 C17.8 1 20 3.2 20 6 C20 11 11 17 11 17 Z"
        fill={color} opacity="0.95" />
      <path d="M7 4 C5.8 4 5 5 5 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"
        fill="none" strokeLinecap="round" />
    </svg>
  )
}

// 像素月亮
function MiniMoon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 12 C18 7.58 14.42 4 10 4 C9.2 4 8.5 4.1 7.8 4.3 C10.1 5.4 12 7.5 12 10.3 C12 14.7 8.42 18.3 4 18.3 C3.5 18.3 3 18.25 2.5 18.15 C4.2 20.4 6.9 22 10 22 C14.42 22 18 18.42 18 14 Z"
        fill="#FDE68A" opacity="0.95" />
      <circle cx="6"  cy="8"  r="1.2" fill="rgba(251,191,36,0.4)" />
      <circle cx="9"  cy="15" r="0.9" fill="rgba(251,191,36,0.3)" />
      <circle cx="14" cy="11" r="0.8" fill="rgba(251,191,36,0.25)" />
    </svg>
  )
}

// 像素彩虹弧
function MiniRainbow() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <path d="M4 24 Q22 2 40 24" stroke="#F87171" strokeWidth="3.5" fill="none"
        strokeLinecap="round" opacity="0.75" />
      <path d="M7 24 Q22 6 37 24" stroke="#FBBF24" strokeWidth="3" fill="none"
        strokeLinecap="round" opacity="0.75" />
      <path d="M10 24 Q22 10 34 24" stroke="#34D399" strokeWidth="2.5" fill="none"
        strokeLinecap="round" opacity="0.75" />
      <path d="M13 24 Q22 13 31 24" stroke="#60A5FA" strokeWidth="2" fill="none"
        strokeLinecap="round" opacity="0.75" />
      <path d="M16 24 Q22 16 28 24" stroke="#A78BFA" strokeWidth="1.8" fill="none"
        strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}

// 像素猫爪
function MiniPawPrint() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* 主掌垫 */}
      <ellipse cx="14" cy="20" rx="8" ry="6.5" fill="#F4C8A4" opacity="0.9" />
      {/* 指垫 */}
      <circle cx="7"  cy="12" r="3.5" fill="#F4C8A4" opacity="0.85" />
      <circle cx="14" cy="10" r="3.5" fill="#F4C8A4" opacity="0.85" />
      <circle cx="21" cy="12" r="3.5" fill="#F4C8A4" opacity="0.85" />
      {/* 内部纹理 */}
      <ellipse cx="14" cy="20" rx="4.5" ry="3.5" fill="rgba(212,149,106,0.3)" />
    </svg>
  )
}

// 像素音符
function MiniNote() {
  return (
    <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
      <path d="M8 20 L8 6 L18 3 L18 16" stroke="#C084FC" strokeWidth="2.2"
        fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6"  cy="21" r="4" fill="#C084FC" opacity="0.9" />
      <circle cx="16" cy="17" r="3.5" fill="#A78BFA" opacity="0.9" />
    </svg>
  )
}

// 像素五角星
function MiniStar({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  )
}

// 图标数据
const FLOATING_ICONS = [
  {
    component: <MiniRilakkuma />,
    style: { left: '6%', top: '42%' },
    anim: { y: [0, -10, 0], duration: 3.2, delay: 0 },
  },
  {
    component: <MiniGudetama />,
    style: { right: '6%', top: '40%' },
    anim: { y: [0, -8, 0], duration: 2.8, delay: 0.5 },
  },
  {
    component: <MiniStar color="#FDA4AF" />,
    style: { left: '4%', top: '68%' },
    anim: { rotate: [0, 360], duration: 6, delay: 0.2 },
  },
  {
    component: <MiniStar color="#A78BFA" />,
    style: { right: '4%', top: '62%' },
    anim: { rotate: [360, 0], duration: 7, delay: 1.0 },
  },
  {
    component: <MiniStar color="#FBBF24" />,
    style: { left: '37%', top: '4%' },
    anim: { rotate: [0, 360], scale: [1, 1.3, 1], duration: 5, delay: 0.8 },
  },
  {
    component: <MiniHeart />,
    style: { left: '60%', top: '5%' },
    anim: { scale: [1, 1.35, 1], duration: 1.8, delay: 0.3 },
  },
  {
    component: <MiniMoon />,
    style: { right: '7%', top: '24%' },
    anim: { rotate: [-8, 8, -8], duration: 4, delay: 0.6 },
  },
  {
    component: <MiniRainbow />,
    style: { left: '5%', bottom: '18%' },
    anim: { opacity: [0.6, 1, 0.6], duration: 3.5, delay: 1.2 },
  },
  {
    component: <MiniPawPrint />,
    style: { left: '53%', bottom: '8%' },
    anim: { y: [0, -7, 0], duration: 3.0, delay: 0.9 },
  },
  {
    component: <MiniNote />,
    style: { left: '10%', top: '25%' },
    anim: { y: [0, -9, 0], rotate: [-5, 5, -5], duration: 3.6, delay: 1.5 },
  },
]

function FloatingIcons() {
  return (
    <>
      {FLOATING_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            ...icon.style,
            zIndex: 2,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: icon.anim.y ?? 0,
            rotate: icon.anim.rotate ?? 0,
            scale: icon.anim.scale ?? 1,
          }}
          transition={{
            opacity: { delay: (icon.anim.delay ?? 0) + 0.8, duration: 0.6 },
            y: { duration: icon.anim.duration, delay: icon.anim.delay ?? 0, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: icon.anim.duration, delay: icon.anim.delay ?? 0, repeat: Infinity, ease: 'linear' },
            scale: { duration: icon.anim.duration, delay: icon.anim.delay ?? 0, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {icon.component}
        </motion.div>
      ))}
    </>
  )
}

// ===== 3. 上下像素边框光带（双层，8px 总高）=====

function EdgeBands() {
  return (
    <>
      {/* 顶部第一层：粉紫流光 */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '4px', zIndex: 4,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #FDA4AF 0px, #FDA4AF 4px, #C084FC 4px, #C084FC 8px, #A78BFA 8px, #A78BFA 12px, transparent 12px, transparent 16px)',
        opacity: 0.65,
        animation: 'globeEdgeFlow 8s linear infinite',
      }} />
      {/* 顶部第二层：彩虹色格子 */}
      <div style={{
        position: 'fixed', top: '4px', left: 0, right: 0, height: '4px', zIndex: 4,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #F87171 0px, #F87171 4px, #FB923C 4px, #FB923C 8px, #FBBF24 8px, #FBBF24 12px, #34D399 12px, #34D399 16px, #60A5FA 16px, #60A5FA 20px, #A78BFA 20px, #A78BFA 24px, transparent 24px, transparent 28px)',
        opacity: 0.55,
        animation: 'globeEdgeFlow 6s linear infinite',
      }} />
      {/* 底部第一层：紫粉流光 */}
      <div style={{
        position: 'fixed', bottom: '4px', left: 0, right: 0, height: '4px', zIndex: 4,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #C084FC 0px, #C084FC 4px, #E879F9 4px, #E879F9 8px, #FDA4AF 8px, #FDA4AF 12px, transparent 12px, transparent 16px)',
        opacity: 0.55,
        animation: 'globeEdgeFlow 10s linear infinite reverse',
      }} />
      {/* 底部第二层：彩虹色格子 */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '4px', zIndex: 4,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #A78BFA 0px, #A78BFA 4px, #60A5FA 4px, #60A5FA 8px, #34D399 8px, #34D399 12px, #FBBF24 12px, #FBBF24 16px, #FB923C 16px, #FB923C 20px, #F87171 20px, #F87171 24px, transparent 24px, transparent 28px)',
        opacity: 0.5,
        animation: 'globeEdgeFlow 7s linear infinite reverse',
      }} />
    </>
  )
}

// ===== 4. 四角径向光晕（纯 CSS，静态）=====

function CornerGlows() {
  return (
    <>
      {/* 左上 */}
      <div style={{
        position: 'fixed', top: -60, left: -60, width: 240, height: 240, zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(253,164,175,0.22) 0%, transparent 65%)',
      }} />
      {/* 右上 */}
      <div style={{
        position: 'fixed', top: -60, right: -60, width: 240, height: 240, zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 65%)',
      }} />
      {/* 左下 */}
      <div style={{
        position: 'fixed', bottom: -60, left: -60, width: 220, height: 220, zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)',
      }} />
      {/* 右下 */}
      <div style={{
        position: 'fixed', bottom: -60, right: -60, width: 220, height: 220, zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(249,168,212,0.2) 0%, transparent 65%)',
      }} />
    </>
  )
}

// ===== 5. 飘落樱花花瓣 =====

function PetalSvg({ color, angle }: { color: string; angle: number }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none"
      style={{ transform: `rotate(${angle}deg)` }}>
      <ellipse cx="9" cy="7" rx="8" ry="5.5" fill={color} opacity="0.85" />
      <ellipse cx="7" cy="5" rx="3.5" ry="2.5" fill="rgba(255,255,255,0.3)"
        transform="rotate(-20 7 5)" />
    </svg>
  )
}

const PETALS = [
  { x: '8%',  color: '#FFBDD0', angle: 15,  duration: 14, delay: 0,   swayX: 18 },
  { x: '22%', color: 'rgba(255,255,255,0.6)', angle: -10, duration: 16, delay: 2.5, swayX: -14 },
  { x: '38%', color: '#FDA4AF', angle: 25,  duration: 12, delay: 5.0, swayX: 20 },
  { x: '55%', color: '#FFBDD0', angle: -20, duration: 18, delay: 1.2, swayX: -16 },
  { x: '72%', color: 'rgba(255,255,255,0.55)', angle: 10, duration: 13, delay: 3.8, swayX: 12 },
  { x: '88%', color: '#FDA4AF', angle: -15, duration: 15, delay: 6.5, swayX: -18 },
]

function FallingPetals() {
  return (
    <>
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            left: p.x,
            top: '-20px',
            zIndex: 2,
            pointerEvents: 'none',
          }}
          animate={{
            y: ['0px', '110vh'],
            x: [0, p.swayX, -p.swayX * 0.6, p.swayX * 0.4, 0],
            rotate: [0, p.angle * 4, p.angle * 8, p.angle * 12],
            opacity: [0, 0.8, 0.9, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.25, 0.6, 0.85, 1],
          }}
        >
          <PetalSvg color={p.color} angle={p.angle} />
        </motion.div>
      ))}
    </>
  )
}

// ===== 6. 像素小动物 =====

function MiniCat() {
  return (
    <svg width="32" height="30" viewBox="0 0 32 30" fill="none">
      {/* 左耳 */}
      <polygon points="5,14 9,4 13,14" fill="#FFCBA4" />
      <polygon points="7,13 9,7 11,13" fill="#FDA4AF" />
      {/* 右耳 */}
      <polygon points="19,14 23,4 27,14" fill="#FFCBA4" />
      <polygon points="21,13 23,7 25,13" fill="#FDA4AF" />
      {/* 头部 */}
      <ellipse cx="16" cy="19" rx="13" ry="11" fill="#FFCBA4" />
      {/* 眼睛（眯眯弧线） */}
      <path d="M10 17 Q12 15 14 17" stroke="#2D1A0E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M18 17 Q20 15 22 17" stroke="#2D1A0E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 鼻子 */}
      <polygon points="16,20 14.5,22 17.5,22" fill="#F87171" opacity="0.9" />
      {/* 嘴 */}
      <path d="M14.5 22 Q16 24 17.5 22" stroke="#2D1A0E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 胡须 */}
      <line x1="3" y1="20" x2="11" y2="21" stroke="#2D1A0E" strokeWidth="0.8" opacity="0.4" />
      <line x1="3" y1="22" x2="11" y2="22" stroke="#2D1A0E" strokeWidth="0.8" opacity="0.4" />
      <line x1="21" y1="21" x2="29" y2="20" stroke="#2D1A0E" strokeWidth="0.8" opacity="0.4" />
      <line x1="21" y1="22" x2="29" y2="22" stroke="#2D1A0E" strokeWidth="0.8" opacity="0.4" />
      {/* 腮红 */}
      <ellipse cx="9" cy="22" rx="3.5" ry="2" fill="rgba(255,182,193,0.5)" />
      <ellipse cx="23" cy="22" rx="3.5" ry="2" fill="rgba(255,182,193,0.5)" />
    </svg>
  )
}

function MiniRabbit() {
  return (
    <svg width="28" height="38" viewBox="0 0 28 38" fill="none">
      {/* 左耳 */}
      <ellipse cx="9" cy="9" rx="5" ry="10" fill="rgba(255,255,255,0.95)" />
      <ellipse cx="9" cy="9" rx="2.5" ry="7" fill="#FDA4AF" opacity="0.7" />
      {/* 右耳 */}
      <ellipse cx="19" cy="9" rx="5" ry="10" fill="rgba(255,255,255,0.95)" />
      <ellipse cx="19" cy="9" rx="2.5" ry="7" fill="#FDA4AF" opacity="0.7" />
      {/* 脸 */}
      <ellipse cx="14" cy="27" rx="12" ry="11" fill="rgba(255,255,255,0.95)" />
      {/* 眼睛 */}
      <circle cx="10" cy="25" r="2.2" fill="#2D1A0E" />
      <circle cx="18" cy="25" r="2.2" fill="#2D1A0E" />
      <circle cx="9.4" cy="24.4" r="0.8" fill="white" />
      <circle cx="17.4" cy="24.4" r="0.8" fill="white" />
      {/* 鼻子 */}
      <ellipse cx="14" cy="29" rx="2" ry="1.3" fill="#FDA4AF" />
      {/* 嘴 */}
      <path d="M12 30.5 Q14 32 16 30.5" stroke="#C084FC" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 腮红 */}
      <ellipse cx="8" cy="28" rx="3" ry="2" fill="rgba(255,182,193,0.45)" />
      <ellipse cx="20" cy="28" rx="3" ry="2" fill="rgba(255,182,193,0.45)" />
    </svg>
  )
}

function MiniPenguin() {
  return (
    <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
      {/* 身体 */}
      <ellipse cx="15" cy="24" rx="11" ry="13" fill="#2D1A0E" />
      {/* 肚子白 */}
      <ellipse cx="15" cy="25" rx="7" ry="9" fill="white" opacity="0.95" />
      {/* 翅膀左 */}
      <ellipse cx="5" cy="24" rx="4" ry="7" fill="#2D1A0E" transform="rotate(-15 5 24)" />
      {/* 翅膀右 */}
      <ellipse cx="25" cy="24" rx="4" ry="7" fill="#2D1A0E" transform="rotate(15 25 24)" />
      {/* 头 */}
      <circle cx="15" cy="12" r="9" fill="#2D1A0E" />
      {/* 眼睛 */}
      <circle cx="12" cy="11" r="2.5" fill="white" />
      <circle cx="18" cy="11" r="2.5" fill="white" />
      <circle cx="12.5" cy="11" r="1.4" fill="#2D1A0E" />
      <circle cx="18.5" cy="11" r="1.4" fill="#2D1A0E" />
      <circle cx="12.2" cy="10.5" r="0.6" fill="white" />
      <circle cx="18.2" cy="10.5" r="0.6" fill="white" />
      {/* 嘴（橙色三角） */}
      <polygon points="15,14 13,17 17,17" fill="#FB923C" />
      {/* 彩色围巾 */}
      <rect x="5" y="18" width="20" height="3" rx="1.5" fill="#F87171" opacity="0.9" />
      <rect x="5" y="19.5" width="20" height="1.8" rx="0.9" fill="#FBBF24" opacity="0.9" />
      {/* 脚 */}
      <ellipse cx="11" cy="36" rx="4" ry="2" fill="#FB923C" />
      <ellipse cx="19" cy="36" rx="4" ry="2" fill="#FB923C" />
    </svg>
  )
}

const ANIMAL_ICONS = [
  {
    component: <MiniCat />,
    style: { left: '2%', top: '55%' },
    anim: { y: [0, -8, 0], duration: 3.5, delay: 0.4 },
  },
  {
    component: <MiniRabbit />,
    style: { right: '2%', top: '52%' },
    anim: { y: [0, -10, 0], duration: 4.0, delay: 1.1 },
  },
  {
    component: <MiniPenguin />,
    style: { left: '48%', bottom: '4%' },
    anim: { rotate: [-6, 6, -6], duration: 2.5, delay: 0.7 },
  },
]

function FloatingAnimals() {
  return (
    <>
      {ANIMAL_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          style={{ position: 'fixed', ...icon.style, zIndex: 2, pointerEvents: 'none' }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: icon.anim.y ?? 0,
            rotate: icon.anim.rotate ?? 0,
          }}
          transition={{
            opacity: { delay: icon.anim.delay + 1.0, duration: 0.6 },
            y: { duration: icon.anim.duration, delay: icon.anim.delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: icon.anim.duration, delay: icon.anim.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {icon.component}
        </motion.div>
      ))}
    </>
  )
}

// ===== 7. 像素食物/道具 =====

function MiniCake() {
  return (
    <svg width="34" height="38" viewBox="0 0 34 38" fill="none">
      {/* 蜡烛 */}
      <rect x="16" y="4" width="4" height="8" rx="1" fill="#FBBF24" opacity="0.9" />
      {/* 火焰 */}
      <ellipse cx="18" cy="3" rx="2.5" ry="3.5" fill="#FB923C" opacity="0.9" />
      <ellipse cx="18" cy="3.5" rx="1.2" ry="2" fill="#FBBF24" opacity="0.95" />
      {/* 奶油顶（波浪） */}
      <path d="M4 14 Q7 10 10 14 Q13 10 16 14 Q19 10 22 14 Q25 10 28 14 Q31 10 34 14 L34 18 L4 18 Z"
        fill="white" opacity="0.95" />
      {/* 上层蛋糕（粉色） */}
      <rect x="6" y="18" width="22" height="8" rx="2" fill="#F9A8D4" opacity="0.95" />
      {/* 草莓点缀 */}
      <circle cx="12" cy="22" r="2.5" fill="#F87171" opacity="0.9" />
      <circle cx="22" cy="22" r="2.5" fill="#F87171" opacity="0.9" />
      {/* 下层蛋糕（紫色） */}
      <rect x="3" y="26" width="28" height="9" rx="2" fill="#C084FC" opacity="0.95" />
      {/* 下层奶油波浪 */}
      <path d="M3 26 Q6 23 9 26 Q12 23 15 26 Q18 23 21 26 Q24 23 27 26 Q30 23 31 26"
        stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

function MiniCandy() {
  return (
    <svg width="26" height="32" viewBox="0 0 26 32" fill="none">
      {/* 棒 */}
      <line x1="18" y1="16" x2="25" y2="30" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* 糖果主体 */}
      <circle cx="12" cy="12" r="11" fill="#FDA4AF" opacity="0.95" />
      {/* 螺旋条纹（白色扇形） */}
      <path d="M12 12 L12 1 A11 11 0 0 1 21.5 17 Z" fill="white" opacity="0.6" />
      <path d="M12 12 L21.5 17 A11 11 0 0 1 5 20 Z" fill="#E879F9" opacity="0.5" />
      <path d="M12 12 L5 20 A11 11 0 0 1 3 5 Z" fill="white" opacity="0.5" />
      {/* 高光 */}
      <ellipse cx="8" cy="7" rx="3.5" ry="2.5" fill="rgba(255,255,255,0.55)" transform="rotate(-30 8 7)" />
    </svg>
  )
}

function MiniGem() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
      {/* 宝石顶部平台 */}
      <polygon points="8,6 14,2 20,6" fill="#93C5FD" opacity="0.95" />
      {/* 宝石主体 */}
      <polygon points="2,8 8,6 20,6 26,8 14,22" fill="#60A5FA" opacity="0.9" />
      {/* 左侧面（深色） */}
      <polygon points="2,8 8,6 14,22" fill="#3B82F6" opacity="0.7" />
      {/* 右侧面 */}
      <polygon points="26,8 20,6 14,22" fill="#A78BFA" opacity="0.8" />
      {/* 高光线 */}
      <line x1="8" y1="6" x2="14" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="14" y1="2" x2="14" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      {/* 顶部高光点 */}
      <circle cx="14" cy="4" r="1.5" fill="white" opacity="0.8" />
    </svg>
  )
}

function MiniIceCream() {
  return (
    <svg width="26" height="36" viewBox="0 0 26 36" fill="none">
      {/* 甜筒 */}
      <polygon points="5,18 21,18 13,36" fill="#D97706" opacity="0.9" />
      {/* 甜筒网格纹 */}
      <line x1="7" y1="20" x2="13" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="11" y1="19" x2="15" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="15" y1="19" x2="13" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="6" y1="22" x2="20" y2="22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <line x1="7.5" y1="26" x2="18.5" y2="26" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      {/* 冰淇淋球（粉色） */}
      <circle cx="13" cy="11" r="10" fill="#FDA4AF" opacity="0.95" />
      {/* 草莓酱 */}
      <path d="M8 16 Q11 19 13 18 Q15 17 18 16" stroke="#F87171" strokeWidth="2"
        fill="none" strokeLinecap="round" opacity="0.8" />
      {/* 高光 */}
      <ellipse cx="10" cy="8" rx="3" ry="2" fill="rgba(255,255,255,0.5)" transform="rotate(-20 10 8)" />
    </svg>
  )
}

function MiniStar4({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <polygon
        points="10,1 12.5,7.5 19,10 12.5,12.5 10,19 7.5,12.5 1,10 7.5,7.5"
        fill={color}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  )
}

const FOOD_ICONS = [
  {
    component: <MiniCake />,
    style: { right: '2%', top: '68%' },
    anim: { scale: [1, 1.1, 1], duration: 2.2, delay: 0.3 },
  },
  {
    component: <MiniCandy />,
    style: { left: '2%', top: '30%' },
    anim: { rotate: [0, 360], duration: 8, delay: 0.6 },
  },
  {
    component: <MiniGem />,
    style: { left: '25%', top: '3%' },
    anim: { y: [0, -8, 0], opacity: [0.8, 1, 0.8], duration: 3.2, delay: 1.4 },
  },
  {
    component: <MiniIceCream />,
    style: { right: '2%', bottom: '22%' },
    anim: { y: [0, -7, 0], duration: 3.8, delay: 0.9 },
  },
  {
    component: <MiniStar4 color="#FBBF24" />,
    style: { left: '18%', bottom: '8%' },
    anim: { rotate: [0, 360], duration: 4, delay: 0 },
  },
  {
    component: <MiniStar4 color="#F87171" />,
    style: { left: '72%', bottom: '10%' },
    anim: { rotate: [360, 0], duration: 5, delay: 0.5 },
  },
  {
    component: <MiniStar4 color="#34D399" />,
    style: { right: '18%', bottom: '7%' },
    anim: { rotate: [0, 360], scale: [1, 1.2, 1], duration: 3.5, delay: 1.2 },
  },
]

function FloatingFoods() {
  return (
    <>
      {FOOD_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          style={{ position: 'fixed', ...icon.style, zIndex: 2, pointerEvents: 'none' }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: icon.anim.opacity ?? 1,
            y: icon.anim.y ?? 0,
            rotate: icon.anim.rotate ?? 0,
            scale: icon.anim.scale ?? 1,
          }}
          transition={{
            opacity: { delay: (icon.anim.delay ?? 0) + 0.8, duration: 0.7 },
            y: { duration: icon.anim.duration, delay: icon.anim.delay ?? 0, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: icon.anim.duration, delay: icon.anim.delay ?? 0, repeat: Infinity, ease: 'linear' },
            scale: { duration: icon.anim.duration, delay: icon.anim.delay ?? 0, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {icon.component}
        </motion.div>
      ))}
    </>
  )
}

// ===== 8. 彩色粒子效果 =====

const BUBBLES = [
  { x: '5%',  size: 12, color: '#FDA4AF', duration: 9,  delay: 0   },
  { x: '15%', size: 16, color: '#FBBF24', duration: 11, delay: 1.5 },
  { x: '28%', size: 9,  color: '#34D399', duration: 7,  delay: 3.0 },
  { x: '42%', size: 14, color: '#60A5FA', duration: 10, delay: 0.8 },
  { x: '57%', size: 11, color: '#E879F9', duration: 8,  delay: 2.2 },
  { x: '68%', size: 18, color: '#FB923C', duration: 12, delay: 4.0 },
  { x: '78%', size: 10, color: '#FDA4AF', duration: 9,  delay: 1.0 },
  { x: '86%', size: 13, color: '#FBBF24', duration: 10, delay: 2.8 },
  { x: '92%', size: 8,  color: '#A78BFA', duration: 7,  delay: 0.4 },
  { x: '35%', size: 15, color: '#F9A8D4', duration: 11, delay: 5.5 },
]

function ColorBubbles() {
  return (
    <>
      {BUBBLES.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            left: b.x,
            bottom: '-24px',
            width: `${b.size}px`,
            height: `${b.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), ${b.color} 60%)`,
            border: `1.5px solid rgba(255,255,255,0.4)`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 60 : 860)],
            x: [0, 20, -16, 10, 0],
            opacity: [0, 0.75, 0.7, 0.6, 0],
          }}
          transition={{
            y: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: b.duration * 0.4, delay: b.delay, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
            opacity: { duration: b.duration, delay: b.delay, repeat: Infinity, times: [0, 0.08, 0.5, 0.9, 1] },
          }}
        />
      ))}
    </>
  )
}

const HEARTS = [
  { x: '10%', color: '#FF6B9D', duration: 13, delay: 0   },
  { x: '30%', color: '#F87171', duration: 15, delay: 2.8 },
  { x: '50%', color: '#FB923C', duration: 11, delay: 5.5 },
  { x: '68%', color: '#E879F9', duration: 14, delay: 1.5 },
  { x: '85%', color: '#FDA4AF', duration: 12, delay: 3.8 },
]

function HeartShower() {
  return (
    <>
      {HEARTS.map((h, i) => (
        <motion.div
          key={i}
          style={{ position: 'fixed', left: h.x, top: '-24px', zIndex: 2, pointerEvents: 'none' }}
          animate={{
            y: ['0px', '110vh'],
            rotate: [-15, 15, -15],
            opacity: [0, 0.85, 0.8, 0.6, 0],
          }}
          transition={{
            y: { duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' },
            rotate: { duration: 3, delay: h.delay, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: h.duration, delay: h.delay, repeat: Infinity, times: [0, 0.06, 0.5, 0.9, 1] },
          }}
        >
          <MiniHeart color={h.color} />
        </motion.div>
      ))}
    </>
  )
}

const SPARKLES = [
  { x: '8%',  y: '15%', size: 4, color: '#FBBF24', delay: 0,   repeatDelay: 2.0 },
  { x: '20%', y: '35%', size: 3, color: '#FDA4AF', delay: 0.6, repeatDelay: 3.2 },
  { x: '33%', y: '20%', size: 5, color: '#34D399', delay: 1.2, repeatDelay: 1.8 },
  { x: '47%', y: '8%',  size: 3, color: '#60A5FA', delay: 0.3, repeatDelay: 2.5 },
  { x: '62%', y: '25%', size: 4, color: '#E879F9', delay: 1.8, repeatDelay: 2.8 },
  { x: '75%', y: '40%', size: 3, color: '#FB923C', delay: 0.9, repeatDelay: 3.5 },
  { x: '88%', y: '18%', size: 5, color: '#FBBF24', delay: 2.2, repeatDelay: 1.5 },
  { x: '12%', y: '70%', size: 3, color: '#A78BFA', delay: 0.5, repeatDelay: 4.0 },
  { x: '55%', y: '75%', size: 4, color: '#FDA4AF', delay: 1.5, repeatDelay: 2.2 },
  { x: '80%', y: '65%', size: 3, color: '#34D399', delay: 2.8, repeatDelay: 3.0 },
  { x: '40%', y: '88%', size: 5, color: '#60A5FA', delay: 0.8, repeatDelay: 2.6 },
  { x: '92%', y: '80%', size: 4, color: '#F9A8D4', delay: 1.3, repeatDelay: 1.9 },
]

function SparkleParticles() {
  return (
    <>
      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            left: s.x,
            top: s.y,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            backgroundColor: s.color,
            filter: `blur(0.5px) drop-shadow(0 0 ${s.size + 2}px ${s.color})`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
          animate={{
            scale: [0, 1.8, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.7,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  )
}

// ===== 主组件 =====
export default function GlobeDecorations() {
  return (
    <>
      <CornerGlows />
      <EdgeBands />
      <CornerDecorations />
      <FloatingIcons />
      <FallingPetals />
      <FloatingAnimals />
      <FloatingFoods />
      <ColorBubbles />
      <HeartShower />
      <SparkleParticles />
    </>
  )
}
