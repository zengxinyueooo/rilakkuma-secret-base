// 城市解锁全屏动画（V2：烟花粒子 + 彩带纸屑，2.5s 后自动消失）

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface UnlockAnimationProps {
  cityId: string
  cityName: string
  cityEmoji: string
  onComplete: () => void
}

// 烟花粒子：12 个方向均匀分布，颜色循环
const FIREWORK_PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 360
  const rad = (angle * Math.PI) / 180
  const dist = 90 + (i % 3) * 18
  const COLORS = ['#f9a8d4', '#c084fc', '#fcd34d', '#86efac', '#fb923c']
  const SHAPES = ['✦', '★', '•', '✦', '★']
  return {
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist,
    color: COLORS[i % COLORS.length],
    shape: SHAPES[i % SHAPES.length],
    size: 10 + (i % 3) * 4,
  }
})

// 彩带纸屑：8 根细长彩带
const CONFETTI_STRIPS = Array.from({ length: 8 }, (_, i) => {
  const COLORS = ['#f9a8d4', '#c084fc', '#fcd34d', '#6ee7b7', '#fb923c', '#a5b4fc', '#f0abfc', '#fde68a']
  return {
    left: 10 + i * 10,    // 卡片宽度百分比内分布
    color: COLORS[i],
    initRotate: -30 + i * 10,
    delay: 0.55 + i * 0.06,
    duration: 1.4 + (i % 3) * 0.2,
  }
})

export default function UnlockAnimation({ cityName, cityEmoji, onComplete }: UnlockAnimationProps) {
  // 2.5s 后通知父组件动画结束
  useEffect(() => {
    const t = setTimeout(onComplete, 2500)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 背景光晕：从中心扩散 */}
      <motion.div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,168,208,0.5) 0%, rgba(200,168,233,0.3) 40%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 4, 5], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.2, times: [0, 0.5, 1], ease: 'easeOut' }}
      />

      {/* 烟花粒子（卡片出现后爆散） */}
      {FIREWORK_PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: p.size,
            color: p.color,
            pointerEvents: 'none',
            zIndex: 51,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.3, 1, 0.4],
            rotate: [0, 180 + i * 30],
          }}
          transition={{
            duration: 0.85,
            delay: 0.5 + i * 0.025,
            ease: 'easeOut',
            times: [0, 0.3, 0.6, 1],
          }}
        >
          {p.shape}
        </motion.span>
      ))}

      {/* 城市信息卡片 */}
      <motion.div
        style={{
          position: 'relative',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px 48px',
          border: '1px solid rgba(240,168,208,0.4)',
          boxShadow: '0 8px 40px rgba(200,168,233,0.3)',
          overflow: 'hidden',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.08, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.7, delay: 0.2, times: [0, 0.7, 1], ease: 'easeOut' }}
      >
        {/* 彩带纸屑（从卡片顶部向下飘落） */}
        {CONFETTI_STRIPS.map((s, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: `${s.left}%`,
              width: '4px',
              height: '14px',
              borderRadius: '2px',
              background: s.color,
              transformOrigin: 'top center',
              zIndex: 2,
              pointerEvents: 'none',
            }}
            initial={{ y: -20, opacity: 0, rotate: s.initRotate, scaleY: 0.5 }}
            animate={{
              y: [0, 80, 140],
              opacity: [0, 1, 1, 0],
              rotate: [s.initRotate, s.initRotate + 180, s.initRotate + 360],
              x: [0, (i % 2 === 0 ? 8 : -8), 0],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              ease: 'easeIn',
              times: [0, 0.4, 0.8, 1],
            }}
          />
        ))}

        {/* 城市 emoji */}
        <motion.div
          style={{ fontSize: '52px', marginBottom: '12px', lineHeight: 1, position: 'relative', zIndex: 3 }}
          animate={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {cityEmoji}
        </motion.div>

        {/* 标签 */}
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: '#c8a8e9',
            fontFamily: "'PingFang SC', sans-serif",
            marginBottom: '6px',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 3,
          }}
        >
          新城市解锁
        </p>

        {/* 城市名 */}
        <h2
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: 'clamp(26px, 5vw, 40px)',
            color: '#7c3aed',
            margin: '4px 0 12px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {cityName}
        </h2>

        {/* 提示文字 */}
        <p
          style={{
            fontSize: '12px',
            color: '#a78bfa',
            fontFamily: "'PingFang SC', sans-serif",
            letterSpacing: '0.05em',
            position: 'relative',
            zIndex: 3,
          }}
        >
          继续收集雪花，探索更多回忆 ❄
        </p>

        {/* 装饰小星星 */}
        {['top-2 right-3', 'bottom-3 left-4', 'top-4 left-8'].map((pos, i) => (
          <motion.span
            key={i}
            className={`absolute ${pos}`}
            style={{ fontSize: '12px', color: '#f0a8d0', zIndex: 3 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 1, delay: 0.6 + i * 0.2, repeat: 2 }}
          >
            ✦
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
