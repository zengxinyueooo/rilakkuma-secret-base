// 加载页装饰元素组件（V4：SVG 矢量角色 + 气球/流星/云朵动画）

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PixelDecorationsProps {
  progress: number
}

// ===== SVG 五角星（保留，进度星星 + 背景大星星用）=====
export function PixelStarSvg({
  size = 24,
  color = '#e879f9',
  duration = 2.5,
  delay = 0,
  style,
}: {
  size?: number
  color?: string
  duration?: number
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      style={style}
      animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ filter: `drop-shadow(0 0 ${size / 4}px ${color})`, display: 'block' }}
      >
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={color}
          stroke={color}
          strokeWidth="0.5"
        />
      </svg>
    </motion.div>
  )
}

// ===== SVG 矢量轻松熊 =====
export function RilakkumaSvg({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.05}
      viewBox="0 0 80 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 左耳外 */}
      <circle cx="18" cy="17" r="11" fill="#8B5E3C" />
      {/* 左耳内 */}
      <circle cx="18" cy="17" r="6.5" fill="#F4C8A4" />
      {/* 右耳外 */}
      <circle cx="62" cy="17" r="11" fill="#8B5E3C" />
      {/* 右耳内 */}
      <circle cx="62" cy="17" r="6.5" fill="#F4C8A4" />

      {/* 头部 */}
      <ellipse cx="40" cy="36" rx="27" ry="25" fill="#D4956A" />
      {/* 头部高光（顶部轻微） */}
      <ellipse cx="34" cy="24" rx="10" ry="6" fill="rgba(255,220,185,0.35)" />

      {/* 左眼白 */}
      <circle cx="30" cy="33" r="6.5" fill="white" />
      {/* 右眼白 */}
      <circle cx="50" cy="33" r="6.5" fill="white" />
      {/* 左眼黑（居中，圆溜溜大眼睛） */}
      <circle cx="30" cy="33" r="4.5" fill="#2D1A0E" />
      {/* 右眼黑 */}
      <circle cx="50" cy="33" r="4.5" fill="#2D1A0E" />
      {/* 左眼高光（偏左上，参考图位置） */}
      <circle cx="28" cy="31" r="1.8" fill="white" />
      {/* 右眼高光 */}
      <circle cx="48" cy="31" r="1.8" fill="white" />
      {/* 左眼眯眼遮罩（闭合路径，覆盖眼白上半，模拟笑眼） */}
      <path
        d="M23.5 30 Q30 26.5 36.5 30 L36.5 27 L23.5 27 Z"
        stroke="none"
        fill="#D4956A"
        opacity="0.9"
      />
      {/* 右眼眯眼遮罩 */}
      <path
        d="M43.5 30 Q50 26.5 56.5 30 L56.5 27 L43.5 27 Z"
        stroke="none"
        fill="#D4956A"
        opacity="0.9"
      />

      {/* 鼻子（小椭圆，参考图比较小） */}
      <ellipse cx="40" cy="41" rx="3.5" ry="2.5" fill="#2D1A0E" />
      {/* 鼻子高光 */}
      <ellipse cx="38.8" cy="40.2" rx="1.2" ry="0.8" fill="rgba(255,255,255,0.45)" />

      {/* 嘴（大笑弧线，明显上扬） */}
      <path
        d="M31 45 Q40 56 49 45"
        stroke="#2D1A0E"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* 嘴内填充（让笑容更饱满） */}
      <path
        d="M31 45 Q40 56 49 45"
        stroke="none"
        fill="rgba(180,80,80,0.15)"
      />
      {/* 牙齿高光 */}
      <path
        d="M33 46 Q40 52 47 46"
        stroke="white"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* 左腮红 */}
      <ellipse cx="21" cy="43" rx="6.5" ry="4" fill="rgba(255,182,193,0.5)" />
      {/* 右腮红 */}
      <ellipse cx="59" cy="43" rx="6.5" ry="4" fill="rgba(255,182,193,0.5)" />

      {/* 身体 */}
      <ellipse cx="40" cy="70" rx="22" ry="16" fill="#D4956A" />
      {/* 腹部奶白 */}
      <ellipse cx="40" cy="69" rx="14" ry="11" fill="#F7DFC0" />

      {/* 左手 */}
      <ellipse
        cx="17"
        cy="65"
        rx="7"
        ry="9"
        fill="#D4956A"
        transform="rotate(-15 17 65)"
      />
      {/* 右手 */}
      <ellipse
        cx="63"
        cy="65"
        rx="7"
        ry="9"
        fill="#D4956A"
        transform="rotate(15 63 65)"
      />

      {/* 左脚 */}
      <ellipse cx="29" cy="82" rx="10" ry="6" fill="#C8846A" />
      {/* 右脚 */}
      <ellipse cx="51" cy="82" rx="10" ry="6" fill="#C8846A" />
    </svg>
  )
}

// ===== SVG 矢量蛋黄君 =====
export function GudetamaSvg({ size = 70 }: { size?: number }) {
  const h = size * (50 / 70)
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 70 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 蛋白外形（扁椭圆底座） */}
      <ellipse cx="35" cy="38" rx="33" ry="14" fill="#FFFDE7" stroke="#F5E6A3" strokeWidth="1.2" />
      {/* 蛋白内阴影（让蛋白有层次感） */}
      <ellipse cx="35" cy="42" rx="26" ry="9" fill="rgba(245,230,163,0.3)" />

      {/* 蛋黄主体（正圆） */}
      <circle cx="35" cy="24" r="20" fill="#FBBF24" />
      {/* 蛋黄深色阴影（底部，立体感） */}
      <ellipse cx="35" cy="38" rx="18" ry="8" fill="rgba(180,120,0,0.12)" />
      {/* 蛋黄高光（顶部左侧椭圆） */}
      <ellipse
        cx="28"
        cy="17"
        rx="6"
        ry="3.5"
        fill="rgba(255,255,255,0.5)"
        transform="rotate(-25 28 17)"
      />

      {/* 左眼（向上弧线，开心眯眼——控制点Y小于端点Y） */}
      <path
        d="M26 24 Q28.5 19 31 24"
        stroke="#5A3A0A"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* 右眼（向上弧线，开心眯眼） */}
      <path
        d="M39 24 Q41.5 19 44 24"
        stroke="#5A3A0A"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 嘴（大笑弧线，明显上扬） */}
      <path
        d="M29 29 Q35 36 41 29"
        stroke="#5A3A0A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* 牙齿高光 */}
      <path
        d="M30 30 Q35 34 40 30"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 左腮红 */}
      <ellipse cx="22" cy="27" rx="4.5" ry="3" fill="rgba(255,182,193,0.55)" />
      {/* 右腮红 */}
      <ellipse cx="48" cy="27" rx="4.5" ry="3" fill="rgba(255,182,193,0.55)" />
    </svg>
  )
}

// ===== 气球组件 =====
function BalloonSvg({ color, size = 44 }: { color: string; size?: number }) {
  const h = size * 1.5
  return (
    <svg width={size} height={h} viewBox="0 0 44 66" fill="none">
      {/* 气球主体 */}
      <ellipse cx="22" cy="20" rx="18" ry="20" fill={color} />
      {/* 高光 */}
      <ellipse
        cx="15"
        cy="12"
        rx="5"
        ry="7"
        fill="rgba(255,255,255,0.4)"
        transform="rotate(-20 15 12)"
      />
      {/* 气球底部小结 */}
      <ellipse cx="22" cy="40" rx="3" ry="2.5" fill={color} />
      {/* 绳子 */}
      <path
        d="M22 42 Q18 50 22 55 Q26 60 22 66"
        stroke="rgba(100,80,80,0.4)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

const BALLOON_DATA = [
  // 第一批：页面加载即可见（delay 极小，气球已飘到半屏以上）
  { color: '#FDA4AF', x: '8%',  delay: 0,   duration: 10, initY: -0.55 },
  { color: '#C084FC', x: '22%', delay: 0,   duration: 12, initY: -0.3  },
  { color: '#93C5FD', x: '38%', delay: 0,   duration: 9,  initY: -0.7  },
  { color: '#FBBF24', x: '55%', delay: 0,   duration: 11, initY: -0.45 },
  { color: '#86EFAC', x: '70%', delay: 0,   duration: 13, initY: -0.2  },
  { color: '#F9A8D4', x: '85%', delay: 0,   duration: 10, initY: -0.6  },
  // 第二批：循环补充
  { color: '#A78BFA', x: '14%', delay: 2.5, duration: 11, initY: 0 },
  { color: '#FB923C', x: '46%', delay: 4.0, duration: 9,  initY: 0 },
  { color: '#34D399', x: '63%', delay: 1.5, duration: 12, initY: 0 },
  { color: '#F472B6', x: '90%', delay: 3.2, duration: 10, initY: 0 },
]

function BalloonsLayer() {
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 800
  return (
    <>
      {BALLOON_DATA.map((b, i) => {
        // initY < 0 表示初始偏移量（已经飘到半屏位置），让页面一打开就有气球
        const startY = b.initY < 0 ? Math.floor(b.initY * screenH) : 0
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: b.x,
              bottom: '-80px',
              zIndex: 2,
            }}
            initial={{ y: startY }}
            animate={{
              y: [startY, -(screenH + 120)],
              x: [0, 12, -10, 6, 0],
            }}
            transition={{
              y: {
                duration: b.duration * (1 - Math.abs(b.initY)),
                delay: b.delay,
                repeat: Infinity,
                ease: 'linear',
              },
              x: {
                duration: b.duration * 0.35,
                delay: b.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
              },
            }}
          >
            <BalloonSvg color={b.color} size={36 + (i % 5) * 5} />
          </motion.div>
        )
      })}
    </>
  )
}

// ===== 流星组件 =====
const SHOOTING_STARS = [
  { startX: '-5%',  startY: '8%',  delay: 0,   duration: 1.1, color: '#ffffff', len: 180, thickness: 5 },
  { startX: '15%',  startY: '3%',  delay: 1.5, duration: 0.9, color: '#e0d4ff', len: 160, thickness: 4 },
  { startX: '-5%',  startY: '25%', delay: 3.0, duration: 1.3, color: '#fce7f3', len: 200, thickness: 6 },
  { startX: '40%',  startY: '5%',  delay: 4.5, duration: 1.0, color: '#ffffff', len: 150, thickness: 4 },
  { startX: '5%',   startY: '18%', delay: 6.0, duration: 1.2, color: '#ddd6fe', len: 170, thickness: 5 },
  { startX: '60%',  startY: '2%',  delay: 2.2, duration: 0.8, color: '#fbcfe8', len: 140, thickness: 4 },
  { startX: '-5%',  startY: '40%', delay: 7.5, duration: 1.4, color: '#ffffff', len: 190, thickness: 5 },
  { startX: '30%',  startY: '1%',  delay: 9.0, duration: 1.0, color: '#e0d4ff', len: 155, thickness: 4 },
  { startX: '70%',  startY: '12%', delay: 1.0, duration: 1.1, color: '#fce7f3', len: 165, thickness: 5 },
  { startX: '20%',  startY: '35%', delay: 5.0, duration: 0.9, color: '#ffffff', len: 145, thickness: 4 },
]

function ShootingStarsLayer() {
  return (
    <>
      {SHOOTING_STARS.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: s.startX,
            top: s.startY,
            zIndex: 3,
          }}
          animate={{
            x: ['0px', '70vw'],
            y: ['0px', '45vh'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 7,
            ease: 'easeIn',
            times: [0, 0.08, 0.75, 1],
          }}
        >
          <svg
            width={s.len}
            height={s.thickness + 4}
            viewBox={`0 0 ${s.len} ${s.thickness + 4}`}
            style={{ transform: 'rotate(30deg)', transformOrigin: 'left center' }}
          >
            <defs>
              <linearGradient id={`sg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor={s.color} stopOpacity="0" />
                <stop offset="30%"  stopColor={s.color} stopOpacity="0.2" />
                <stop offset="70%"  stopColor={s.color} stopOpacity="0.85" />
                <stop offset="100%" stopColor={s.color} stopOpacity="1" />
              </linearGradient>
              <filter id={`glow${i}`}>
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <rect
              x="0" y="2"
              width={s.len} height={s.thickness}
              rx={s.thickness / 2}
              fill={`url(#sg${i})`}
              filter={`url(#glow${i})`}
            />
            {/* 流星头部强光 */}
            <circle cx={s.len - 2} cy={2 + s.thickness / 2} r={s.thickness * 0.9} fill="white" opacity="1" />
            <circle cx={s.len - 2} cy={2 + s.thickness / 2} r={s.thickness * 1.6} fill="white" opacity="0.35" />
          </svg>
        </motion.div>
      ))}
    </>
  )
}

// ===== 烟花组件（V2：更大、更密、簇发多色）=====

// 烟花类型：决定粒子扩散形状
type FWShape = 'circle' | 'daisy' | 'fan' | 'star'

interface FWShell {
  // 爆炸中心（相对屏幕百分比）
  cx: string
  cy: string
  // 全局循环的总周期（各子炸弹的 delay 相对于此）
  cycleDelay: number   // 本组烟花从上次结束到下次开始等待的时间
  // 子炸弹列表（同一位置附近连续炸多颗，形成簇发效果）
  bursts: Array<{
    offsetX: number    // px 偏移，让子炸弹稍微错位
    offsetY: number
    delay: number      // 相对于组触发时刻的延迟（0~0.8s，制造连炸感）
    scale: number      // 大小 1.0 = 基础尺寸（粒子飞行距离 ~100px）
    colors: string[]   // 该颗用的颜色列表
    shape: FWShape
    particleCount: number
  }>
}

// 预计算粒子方向（避免渲染时 Math.random）
function buildParticles(count: number, shape: FWShape, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    let angle: number
    const base = (360 / count) * i
    // 不同形状调整角度分布
    if (shape === 'circle') {
      angle = base + (i * seed * 3.7) % 8
    } else if (shape === 'daisy') {
      // 菊花：偶数粒子稍短，奇数稍长
      angle = base + (i % 2) * 5
    } else if (shape === 'fan') {
      // 扇形：集中在 -60°~60° 扇形向上
      angle = -90 + (i / (count - 1)) * 120 + (i * seed) % 6 - 3
    } else {
      // star：5 组星芒，每组间隔
      angle = base + (i % 5 === 0 ? 0 : 12)
    }
    const distMult = shape === 'daisy' && i % 2 === 0 ? 0.7 : 1.0
    const distExtra = ((i * seed * 13.7) % 35)
    return { angle, distMult, distExtra }
  })
}

// 单颗粒子
function FWParticle({
  angle, distBase, distMult, distExtra, color, pSize,
  delay, repeatDelay, duration,
}: {
  angle: number; distBase: number; distMult: number; distExtra: number
  color: string; pSize: number
  delay: number; repeatDelay: number; duration: number
}) {
  const rad = (angle * Math.PI) / 180
  const dist = (distBase + distExtra) * distMult
  const tx = Math.cos(rad) * dist
  const ty = Math.sin(rad) * dist
  const fallY = dist * 0.55   // 重力下坠感

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: pSize, height: pSize,
        borderRadius: '50%',
        backgroundColor: color,
        left: '50%', top: '50%',
        marginLeft: -pSize / 2, marginTop: -pSize / 2,
        filter: `drop-shadow(0 0 ${pSize + 2}px ${color})`,
        willChange: 'transform, opacity',
      }}
      animate={{
        x: [0, tx * 0.5, tx],
        y: [0, ty * 0.5, ty + fallY],
        opacity: [0, 1, 0.9, 0],
        scale: [0, 1.6, 1.0, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: [0.15, 0.85, 0.3, 1],
        times: [0, 0.2, 0.65, 1],
      }}
    />
  )
}

// 单颗子炸弹
function FWBurst({
  offsetX, offsetY, delay, repeatDelay, scale, colors, shape, particleCount,
}: {
  offsetX: number; offsetY: number; delay: number; repeatDelay: number
  scale: number; colors: string[]; shape: FWShape; particleCount: number
}) {
  const distBase = 80 * scale
  const pSize = Math.max(3, 4.5 * scale)
  const duration = 1.4 + scale * 0.2
  const particles = buildParticles(particleCount, shape, colors.length + scale)
  const glowSize = 28 * scale

  return (
    <div style={{ position: 'absolute', left: offsetX, top: offsetY, width: 0, height: 0 }}>
      {/* 中心爆闪 */}
      <motion.div
        style={{
          position: 'absolute',
          width: glowSize, height: glowSize,
          borderRadius: '50%',
          background: `radial-gradient(circle, white 0%, ${colors[0]} 40%, transparent 100%)`,
          left: -glowSize / 2, top: -glowSize / 2,
          filter: `blur(${3 * scale}px)`,
          willChange: 'transform, opacity',
        }}
        animate={{ scale: [0, 2.2, 0.8, 0], opacity: [0, 1, 0.5, 0] }}
        transition={{
          duration: 0.65,
          delay,
          repeat: Infinity,
          repeatDelay: repeatDelay + 0.75,
          ease: 'easeOut',
        }}
      />
      {/* 外环光晕 */}
      <motion.div
        style={{
          position: 'absolute',
          width: glowSize * 2.5, height: glowSize * 2.5,
          borderRadius: '50%',
          background: `radial-gradient(circle, transparent 30%, ${colors[1] ?? colors[0]}55 60%, transparent 100%)`,
          left: -glowSize * 1.25, top: -glowSize * 1.25,
          willChange: 'transform, opacity',
        }}
        animate={{ scale: [0.2, 1.5, 0], opacity: [0, 0.7, 0] }}
        transition={{
          duration: 0.9,
          delay: delay + 0.05,
          repeat: Infinity,
          repeatDelay: repeatDelay + 0.5,
          ease: 'easeOut',
        }}
      />
      {/* 粒子群 */}
      {particles.map((p, i) => (
        <FWParticle
          key={i}
          angle={p.angle}
          distBase={distBase}
          distMult={p.distMult}
          distExtra={p.distExtra}
          color={colors[i % colors.length]}
          pSize={pSize}
          delay={delay + 0.04}
          repeatDelay={repeatDelay}
          duration={duration}
        />
      ))}
    </div>
  )
}

// 一组烟花（簇发）
function FireworkCluster({ cx, cy, cycleDelay, bursts }: FWShell) {
  // 计算该组总持续时间，用于 repeatDelay 计算
  const maxBurstDelay = Math.max(...bursts.map(b => b.delay))
  const groupDuration = maxBurstDelay + 1.8
  const repeatDelay = cycleDelay

  return (
    <div style={{ position: 'absolute', left: cx, top: cy, width: 0, height: 0, zIndex: 4 }}>
      {bursts.map((b, i) => (
        <FWBurst
          key={i}
          offsetX={b.offsetX}
          offsetY={b.offsetY}
          delay={b.delay}
          repeatDelay={repeatDelay + groupDuration - b.delay}
          scale={b.scale}
          colors={b.colors}
          shape={b.shape}
          particleCount={b.particleCount}
        />
      ))}
    </div>
  )
}

// ===== 烟花簇配置 =====
const FIREWORK_CLUSTERS: FWShell[] = [
  // 左上角：三连炸，粉紫蓝三色
  {
    cx: '12%', cy: '18%', cycleDelay: 4.5,
    bursts: [
      { offsetX: 0,   offsetY: 0,   delay: 0.2, scale: 1.5, colors: ['#FF6B9D','#FF9EC4','#FFD6E8','#F0ABFC'], shape: 'circle',  particleCount: 20 },
      { offsetX: 30,  offsetY: -20, delay: 0.5, scale: 1.2, colors: ['#C084FC','#E879F9','#A78BFA'],           shape: 'daisy',   particleCount: 18 },
      { offsetX: -20, offsetY: 20,  delay: 0.8, scale: 1.0, colors: ['#60A5FA','#38BDF8','#93C5FD'],           shape: 'circle',  particleCount: 16 },
    ],
  },
  // 右上角：金色菊花 + 红色
  {
    cx: '85%', cy: '14%', cycleDelay: 5.0,
    bursts: [
      { offsetX: 0,   offsetY: 0,   delay: 0.3, scale: 1.6, colors: ['#FBBF24','#FDE68A','#FEF3C7','#FB923C'], shape: 'daisy',  particleCount: 22 },
      { offsetX: -25, offsetY: 15,  delay: 0.6, scale: 1.1, colors: ['#F87171','#FCA5A5','#FF6B9D'],            shape: 'circle', particleCount: 16 },
    ],
  },
  // 中上：大型星形爆炸（多色混合）
  {
    cx: '50%', cy: '10%', cycleDelay: 6.0,
    bursts: [
      { offsetX: 0,   offsetY: 0,   delay: 0.4, scale: 2.0, colors: ['#E879F9','#FBBF24','#60A5FA','#34D399','#F87171','#A78BFA'], shape: 'star',   particleCount: 24 },
      { offsetX: 15,  offsetY: 10,  delay: 0.7, scale: 1.3, colors: ['#FF9EC4','#FDE68A','#93C5FD'],                               shape: 'circle', particleCount: 18 },
      { offsetX: -15, offsetY: 5,   delay: 1.0, scale: 1.0, colors: ['#86EFAC','#F0ABFC','#FCA5A5'],                               shape: 'daisy',  particleCount: 14 },
    ],
  },
  // 左侧中部：扇形+圆形双炸
  {
    cx: '8%', cy: '52%', cycleDelay: 4.0,
    bursts: [
      { offsetX: 0,  offsetY: 0,  delay: 0.1, scale: 1.4, colors: ['#34D399','#86EFAC','#67E8F9','#60A5FA'], shape: 'fan',    particleCount: 18 },
      { offsetX: 20, offsetY: -10, delay: 0.5, scale: 1.0, colors: ['#A78BFA','#C084FC','#E879F9'],           shape: 'circle', particleCount: 14 },
    ],
  },
  // 右侧中部：暖色系菊花
  {
    cx: '92%', cy: '45%', cycleDelay: 5.5,
    bursts: [
      { offsetX: 0,   offsetY: 0,  delay: 0.2, scale: 1.5, colors: ['#FB923C','#FBBF24','#F87171','#FDE68A'], shape: 'daisy',  particleCount: 20 },
      { offsetX: -20, offsetY: 20, delay: 0.6, scale: 1.1, colors: ['#FF6B9D','#FF9EC4','#F0ABFC'],            shape: 'circle', particleCount: 16 },
    ],
  },
  // 下左：蓝绿系
  {
    cx: '20%', cy: '75%', cycleDelay: 4.8,
    bursts: [
      { offsetX: 0,  offsetY: 0,   delay: 0.3, scale: 1.4, colors: ['#38BDF8','#60A5FA','#34D399','#67E8F9'], shape: 'circle', particleCount: 20 },
      { offsetX: 25, offsetY: -15, delay: 0.7, scale: 1.0, colors: ['#86EFAC','#A78BFA','#C4B5FD'],           shape: 'star',   particleCount: 16 },
    ],
  },
  // 下右：四连小炸（密集感）
  {
    cx: '78%', cy: '72%', cycleDelay: 3.5,
    bursts: [
      { offsetX: 0,   offsetY: 0,   delay: 0.0, scale: 1.2, colors: ['#E879F9','#C084FC'],                  shape: 'circle', particleCount: 16 },
      { offsetX: 20,  offsetY: -8,  delay: 0.3, scale: 1.0, colors: ['#FBBF24','#FB923C'],                  shape: 'daisy',  particleCount: 14 },
      { offsetX: -15, offsetY: 15,  delay: 0.5, scale: 1.1, colors: ['#60A5FA','#38BDF8'],                  shape: 'circle', particleCount: 16 },
      { offsetX: 10,  offsetY: 20,  delay: 0.7, scale: 0.9, colors: ['#F87171','#FF6B9D'],                  shape: 'star',   particleCount: 12 },
    ],
  },
  // 正中央：超大彩虹爆炸（偶尔一次大的）
  {
    cx: '50%', cy: '50%', cycleDelay: 8.0,
    bursts: [
      { offsetX: 0, offsetY: 0, delay: 0.5, scale: 2.5,
        colors: ['#FF6B9D','#FBBF24','#34D399','#60A5FA','#E879F9','#F87171','#A78BFA','#FB923C','#67E8F9','#FF9EC4'],
        shape: 'circle', particleCount: 28 },
      { offsetX: 0, offsetY: 0, delay: 0.9, scale: 1.8,
        colors: ['#FDE68A','#86EFAC','#93C5FD','#F9A8D4','#C4B5FD'],
        shape: 'daisy',  particleCount: 22 },
    ],
  },
]

function FireworksLayer() {
  return (
    <>
      {FIREWORK_CLUSTERS.map((cluster, i) => (
        <FireworkCluster key={i} {...cluster} />
      ))}
    </>
  )
}

// ===== 云朵组件 =====
function CloudSvg({ opacity = 0.8 }: { opacity?: number }) {
  return (
    <svg width="110" height="52" viewBox="0 0 110 52" fill="none">
      <circle cx="30" cy="36" r="18" fill={`rgba(255,255,255,${opacity})`} />
      <circle cx="52" cy="28" r="22" fill={`rgba(255,255,255,${opacity})`} />
      <circle cx="76" cy="34" r="16" fill={`rgba(255,255,255,${opacity})`} />
      <circle cx="90" cy="40" r="13" fill={`rgba(255,255,255,${opacity})`} />
      <circle cx="16" cy="42" r="11" fill={`rgba(255,255,255,${opacity})`} />
      {/* 底部填平 */}
      <rect x="8" y="40" width="96" height="12" fill={`rgba(255,255,255,${opacity})`} />
    </svg>
  )
}

function CloudsLayer() {
  return (
    <>
      {/* 云1：从左往右，屏幕下方 1/3 */}
      <motion.div
        style={{ position: 'absolute', top: '62%', left: 0, zIndex: 1 }}
        animate={{ x: ['-120px', '110vw'] }}
        transition={{ duration: 20, delay: 0, repeat: Infinity, ease: 'linear' }}
      >
        <CloudSvg opacity={0.72} />
      </motion.div>

      {/* 云2：从右往左，屏幕上方 1/4 */}
      <motion.div
        style={{ position: 'absolute', top: '18%', right: 0, zIndex: 1 }}
        animate={{ x: ['0px', '-120vw'] }}
        transition={{ duration: 24, delay: 5, repeat: Infinity, ease: 'linear' }}
      >
        <CloudSvg opacity={0.55} />
      </motion.div>

      {/* 云3：从左往右，靠顶部 */}
      <motion.div
        style={{ position: 'absolute', top: '8%', left: 0, zIndex: 1 }}
        animate={{ x: ['-120px', '110vw'] }}
        transition={{ duration: 28, delay: 11, repeat: Infinity, ease: 'linear' }}
      >
        <CloudSvg opacity={0.4} />
      </motion.div>
    </>
  )
}

// ===== 发光粒子系统（保留）=====
const GLOW_PARTICLES = [
  { x: '7%',  y: '18%', size: 5, color: '#f9a8d4', dur: 3.2, delay: 0 },
  { x: '13%', y: '42%', size: 4, color: '#e879f9', dur: 4.1, delay: 0.7 },
  { x: '18%', y: '72%', size: 6, color: '#c084fc', dur: 2.8, delay: 1.4 },
  { x: '25%', y: '28%', size: 3, color: '#a78bfa', dur: 3.7, delay: 0.3 },
  { x: '32%', y: '85%', size: 5, color: '#fbcfe8', dur: 4.5, delay: 2.1 },
  { x: '40%', y: '14%', size: 4, color: '#e879f9', dur: 3.0, delay: 0.9 },
  { x: '48%', y: '90%', size: 6, color: '#f9a8d4', dur: 2.5, delay: 1.8 },
  { x: '55%', y: '22%', size: 3, color: '#c084fc', dur: 4.0, delay: 0.5 },
  { x: '62%', y: '65%', size: 5, color: '#a78bfa', dur: 3.5, delay: 2.6 },
  { x: '70%', y: '38%', size: 4, color: '#fbcfe8', dur: 2.9, delay: 1.1 },
  { x: '77%', y: '78%', size: 6, color: '#e879f9', dur: 4.2, delay: 0.4 },
  { x: '83%', y: '12%', size: 3, color: '#f9a8d4', dur: 3.3, delay: 2.0 },
  { x: '89%', y: '52%', size: 5, color: '#c084fc', dur: 2.7, delay: 0.8 },
  { x: '94%', y: '82%', size: 4, color: '#a78bfa', dur: 4.4, delay: 1.6 },
  { x: '10%', y: '60%', size: 3, color: '#fbcfe8', dur: 3.1, delay: 3.0 },
  { x: '30%', y: '50%', size: 5, color: '#e879f9', dur: 2.6, delay: 1.3 },
  { x: '50%', y: '45%', size: 4, color: '#f9a8d4', dur: 3.8, delay: 0.6 },
  { x: '68%', y: '10%', size: 6, color: '#c084fc', dur: 4.3, delay: 2.4 },
  { x: '85%', y: '32%', size: 3, color: '#a78bfa', dur: 3.0, delay: 1.9 },
  { x: '20%', y: '92%', size: 5, color: '#fbcfe8', dur: 2.4, delay: 3.5 },
  { x: '45%', y: '68%', size: 4, color: '#e879f9', dur: 4.6, delay: 0.2 },
  { x: '72%', y: '55%', size: 6, color: '#f9a8d4', dur: 3.4, delay: 2.8 },
  { x: '91%', y: '20%', size: 3, color: '#c084fc', dur: 2.3, delay: 1.5 },
  { x: '38%', y: '38%', size: 5, color: '#a78bfa', dur: 3.9, delay: 4.0 },
  { x: '60%', y: '88%', size: 4, color: '#fbcfe8', dur: 4.8, delay: 0.1 },
]

function GlowParticles() {
  return (
    <>
      {GLOW_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="glow-particle"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            filter: `blur(0.8px) drop-shadow(0 0 ${p.size + 2}px ${p.color})`,
          }}
          animate={{
            y: [0, -14, -6, 0],
            opacity: [0.45, 0.9, 0.65, 0.45],
            scale: [1, 1.15, 0.88, 1],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

// ===== 进度星星（保留）=====
const PROGRESS_STARS = [
  { x: '15%', y: '20%' },
  { x: '25%', y: '12%' },
  { x: '35%', y: '8%' },
  { x: '45%', y: '6%' },
  { x: '55%', y: '6%' },
  { x: '65%', y: '8%' },
  { x: '75%', y: '12%' },
  { x: '85%', y: '20%' },
  { x: '10%', y: '30%' },
  { x: '90%', y: '30%' },
  { x: '7%',  y: '42%' },
  { x: '93%', y: '42%' },
]

function ProgressStar({ x, y, lit }: { x: string; y: string; lit: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transition: 'all 0.35s ease',
        opacity: lit ? 1 : 0.15,
        transform: lit ? 'scale(1.2)' : 'scale(0.8)',
        pointerEvents: 'none',
      }}
    >
      <svg
        width={lit ? 18 : 14}
        height={lit ? 18 : 14}
        viewBox="0 0 24 24"
        style={{
          filter: lit ? 'drop-shadow(0 0 6px rgba(251,191,36,0.9))' : 'none',
          display: 'block',
        }}
      >
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={lit ? '#fbbf24' : '#d8b4fe'}
        />
      </svg>
    </div>
  )
}

// ===== 主组件 =====
export default function PixelDecorations({ progress }: PixelDecorationsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const litCount = Math.floor((progress / 100) * PROGRESS_STARS.length)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* 发光粒子（最底层） */}
      <GlowParticles />

      {/* 云朵（低层，漂浮） */}
      <CloudsLayer />

      {/* 流星（高层，划过） */}
      <ShootingStarsLayer />

      {/* 烟花绽放 */}
      <FireworksLayer />

      {/* 气球（往上飘） */}
      <BalloonsLayer />

      {/* 大背景星星（5颗 + 2颗超大） */}
      <PixelStarSvg size={56} color="#f9a8d4" duration={2.6} delay={1.8}
        style={{ position: 'absolute', left: '4%',  top: '5%' }} />
      <PixelStarSvg size={52} color="#a78bfa" duration={3.1} delay={0.4}
        style={{ position: 'absolute', right: '5%', top: '7%' }} />
      <PixelStarSvg size={44} color="#e879f9" duration={2.8} delay={0}
        style={{ position: 'absolute', left: '8%', top: '14%' }} />
      <PixelStarSvg size={36} color="#c084fc" duration={3.4} delay={0.6}
        style={{ position: 'absolute', right: '10%', top: '12%' }} />
      <PixelStarSvg size={40} color="#f0abfc" duration={2.4} delay={1.2}
        style={{ position: 'absolute', left: '6%', bottom: '28%' }} />
      <PixelStarSvg size={32} color="#c084fc" duration={3.6} delay={0.4}
        style={{ position: 'absolute', right: '8%', bottom: '26%' }} />
      <PixelStarSvg size={48} color="#f9a8d4" duration={2.6} delay={1.8}
        style={{ position: 'absolute', left: '50%', top: '3%', transform: 'translateX(-50%)' }} />

      {/* 中等星星（散布） */}
      <PixelStarSvg size={22} color="#e879f9" duration={2.0} delay={0.9}
        style={{ position: 'absolute', left: '20%', top: '55%' }} />
      <PixelStarSvg size={20} color="#a78bfa" duration={3.0} delay={1.5}
        style={{ position: 'absolute', right: '22%', top: '50%' }} />
      <PixelStarSvg size={18} color="#f0abfc" duration={2.7} delay={2.3}
        style={{ position: 'absolute', left: '40%', bottom: '10%' }} />
      <PixelStarSvg size={24} color="#c084fc" duration={3.4} delay={0.2}
        style={{ position: 'absolute', right: '35%', bottom: '8%' }} />
      <PixelStarSvg size={20} color="#e879f9" duration={3.8} delay={0.7}
        style={{ position: 'absolute', left: '14%', top: '78%' }} />

      {/* 进度星星 */}
      {PROGRESS_STARS.map((star, i) => (
        <ProgressStar key={i} x={star.x} y={star.y} lit={i < litCount} />
      ))}
    </div>
  )
}
