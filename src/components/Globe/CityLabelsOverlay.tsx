// 城市标签覆盖层（完全在 Canvas 外部渲染，通过 ref 接收坐标数据）

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CityLocation } from '@/types'

interface LabelData {
  city: CityLocation
  cityScreenPos: { x: number; y: number }
  labelPos: { x: number; y: number }
  isVisible: boolean
}

interface CityLabelsOverlayProps {
  labelData: LabelData[]
  onCitySelect: (location: CityLocation) => void
}

// hover 时冒出的爱心粒子配置
const HEART_PARTICLES = [
  { dx: -18, dy: -28, delay: 0 },
  { dx: 0,   dy: -36, delay: 0.08 },
  { dx: 18,  dy: -28, delay: 0.16 },
]

export default function CityLabelsOverlay({ labelData, onCitySelect }: CityLabelsOverlayProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* SVG 引线层 */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          {labelData.map((_, i) => {
            const hovered = hoveredIndex === i
            return (
              <linearGradient key={`gradient-${i}`} id={`line-gradient-${i}`}>
                <stop
                  offset="0%"
                  stopColor={hovered ? '#E879F9' : '#C084FC'}
                  stopOpacity={hovered ? 0.4 : 0.2}
                />
                <stop
                  offset="100%"
                  stopColor={hovered ? '#F0ABFC' : '#E879F9'}
                  stopOpacity={hovered ? 1 : 0.95}
                />
              </linearGradient>
            )
          })}

          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0,0 8,4 0,8" fill="#E879F9" />
          </marker>
        </defs>

        {labelData.map((item, i) => {
          if (!item.isVisible) return null

          const { cityScreenPos, labelPos } = item
          const hovered = hoveredIndex === i

          const midX = (cityScreenPos.x + labelPos.x) / 2
          const midY = (cityScreenPos.y + labelPos.y) / 2
          const dx = labelPos.x - cityScreenPos.x
          const dy = labelPos.y - cityScreenPos.y
          const len = Math.sqrt(dx * dx + dy * dy)
          const ctrlX = midX - (dy / len) * len * 0.15
          const ctrlY = midY + (dx / len) * len * 0.15

          return (
            <motion.path
              key={item.city.id}
              d={`M ${cityScreenPos.x} ${cityScreenPos.y} Q ${ctrlX} ${ctrlY} ${labelPos.x} ${labelPos.y}`}
              stroke={`url(#line-gradient-${i})`}
              strokeWidth={hovered ? 2.5 : 1.8}
              fill="none"
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.8, delay: i * 0.08 },
                opacity: { duration: 0.4, delay: i * 0.08 },
              }}
              style={{ pointerEvents: 'none' }}
            />
          )
        })}
      </svg>

      {/* HTML 标签卡片层 */}
      <AnimatePresence>
        {labelData.map((item, i) => {
          if (!item.isVisible) return null

          const { labelPos } = item

          return (
            <motion.div
              key={item.city.id}
              className="glass-pink"
              style={{
                position: 'absolute',
                left: `${labelPos.x}px`,
                top: `${labelPos.y}px`,
                padding: '8px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                userSelect: 'none',
                boxShadow: '0 2px 12px rgba(192, 132, 252, 0.25)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 18,
                delay: i * 0.08,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCitySelect(item.city)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span style={{ fontSize: '20px', lineHeight: '1' }}>{item.city.emoji}</span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#6B46C1',
                  fontFamily: "'PingFang SC', sans-serif",
                  letterSpacing: '0.02em',
                }}
              >
                {item.city.chineseName}
              </span>

              {/* hover 爱心粒子 */}
              <AnimatePresence>
                {hoveredIndex === i && HEART_PARTICLES.map((p, hi) => (
                  <motion.span
                    key={hi}
                    style={{
                      position: 'absolute',
                      fontSize: '11px',
                      pointerEvents: 'none',
                      left: '50%',
                      top: '50%',
                      zIndex: 20,
                    }}
                    initial={{ x: p.dx * 0.3, y: 0, opacity: 1, scale: 0.5 }}
                    animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: p.delay, ease: 'easeOut' }}
                  >
                    💗
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
