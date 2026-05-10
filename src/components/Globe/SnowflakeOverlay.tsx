// 雪花粒子覆盖层（HTML 层，在 Canvas 外）
// pointer-events 分层：容器 none，雪花元素 auto

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SnowflakeOverlayProps {
  onCollect: () => void
}

interface Snowflake {
  id: number
  generation: number  // 点击后+1，触发 Framer Motion 重建并在新位置重生
  x: number           // 0~92 百分比（left）
  size: number        // 14~24px
  char: string
  color: string
  duration: number    // 7~14s 飘落时长
  delay: number       // 0~6s 延迟
  driftX: number      // -60~60px 水平漂移
}

interface BurstParticle {
  id: number
  x: number
  y: number
}

const FLAKE_CHARS = ['❄', '❅', '✦', '✧', '⋆']
const FLAKE_COLORS = [
  'rgba(255,255,255,0.9)',
  'rgba(240,168,208,0.85)',
  'rgba(200,168,233,0.85)',
  'rgba(255,240,250,0.9)',
]

function randomFlake(id: number, generation = 0): Snowflake {
  return {
    id,
    generation,
    x: Math.random() * 90 + 2,
    size: 14 + Math.random() * 10,
    char: FLAKE_CHARS[Math.floor(Math.random() * FLAKE_CHARS.length)],
    color: FLAKE_COLORS[Math.floor(Math.random() * FLAKE_COLORS.length)],
    duration: 7 + Math.random() * 7,
    delay: Math.random() * 1.5,
    driftX: (Math.random() - 0.5) * 120,
  }
}

// 初始生成 10 个雪花
const INITIAL_FLAKES: Snowflake[] = Array.from({ length: 10 }, (_, i) => randomFlake(i))

export default function SnowflakeOverlay({ onCollect }: SnowflakeOverlayProps) {
  const [flakes, setFlakes] = useState<Snowflake[]>(INITIAL_FLAKES)
  const [bursts, setBursts] = useState<BurstParticle[]>([])

  const handleCollect = useCallback((id: number, clientX: number, clientY: number) => {
    // 在点击位置触发粒子爆炸
    const burstId = Date.now()
    setBursts(prev => [...prev, { id: burstId, x: clientX, y: clientY }])
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== burstId))
    }, 600)

    // 更新 generation 触发重建，同时设置新位置
    setFlakes(prev => prev.map(f => f.id !== id ? f : {
      ...f,
      generation: f.generation + 1,
      x: Math.random() * 90 + 2,
      duration: 7 + Math.random() * 7,
      delay: Math.random() * 1.5,
      driftX: (Math.random() - 0.5) * 120,
    }))

    onCollect()
  }, [onCollect])

  // 爆炸粒子的方向（6个方向均匀分布）
  const burstDirections = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2
    return { dx: Math.cos(angle) * 40, dy: Math.sin(angle) * 40 }
  })

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 45,
      }}
    >
      {/* 雪花粒子 */}
      {flakes.map(flake => (
        <motion.div
          key={`${flake.id}-${flake.generation}`}
          style={{
            position: 'absolute',
            left: `${flake.x}%`,
            top: 0,
            fontSize: `${flake.size}px`,
            color: flake.color,
            pointerEvents: 'auto',
            cursor: 'pointer',
            userSelect: 'none',
            lineHeight: 1,
          }}
          initial={{ y: '-30px', opacity: 0, rotate: 0, x: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 0.85, 0.85, 0],
            rotate: 360,
            x: [0, flake.driftX, -flake.driftX * 0.5, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: { times: [0, 0.05, 0.9, 1] },
            x: { times: [0, 0.4, 0.7, 1] },
            rotate: { duration: flake.duration, delay: flake.delay, repeat: Infinity, ease: 'linear' },
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleCollect(flake.id, e.clientX, e.clientY)
          }}
          whileTap={{ scale: 2.2, transition: { duration: 0.08 } }}
        >
          {flake.char}
        </motion.div>
      ))}

      {/* 点击爆炸粒子效果 */}
      <AnimatePresence>
        {bursts.map(burst => (
          <div key={burst.id} style={{ position: 'fixed', left: burst.x, top: burst.y, pointerEvents: 'none' }}>
            {burstDirections.map((dir, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#f0a8d0' : '#c8a8e9',
                  transform: 'translate(-3px, -3px)',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: dir.dx, y: dir.dy, opacity: 0, scale: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
