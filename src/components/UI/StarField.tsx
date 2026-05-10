// 全局闪烁星星背景组件
// 使用 useMemo 生成随机星星粒子，fixed 定位铺满全屏

import { useMemo } from 'react'

interface StarDot {
  id: number
  x: number    // 百分比位置
  y: number
  size: number // px
  duration: number // 动画时长（秒）
  delay: number    // 动画延迟（秒）
  opacity: number  // 基础透明度
  color: string
}

// 星星颜色池（珠光白+粉紫调）
const STAR_COLORS = [
  'rgba(255, 255, 255, 0.9)',
  'rgba(255, 200, 240, 0.8)',  // 淡粉
  'rgba(216, 180, 254, 0.75)', // 薰衣草紫
  'rgba(249, 168, 212, 0.7)',  // 粉-300
  'rgba(240, 171, 252, 0.7)',  // 紫粉
  'rgba(255, 240, 250, 0.85)', // 奶白粉
]

function generateStars(count: number): StarDot[] {
  // 使用固定种子保证每次渲染结果一致（伪随机）
  const stars: StarDot[] = []
  for (let i = 0; i < count; i++) {
    // 简单伪随机（不用 Math.random 避免每次 re-render 位置变化）
    const seed = (i * 1664525 + 1013904223) & 0xffffffff
    const seed2 = (seed * 1664525 + 1013904223) & 0xffffffff
    const seed3 = (seed2 * 1664525 + 1013904223) & 0xffffffff
    const seed4 = (seed3 * 1664525 + 1013904223) & 0xffffffff
    const seed5 = (seed4 * 1664525 + 1013904223) & 0xffffffff
    const seed6 = (seed5 * 1664525 + 1013904223) & 0xffffffff

    const x = Math.abs(seed % 10000) / 100         // 0-100%
    const y = Math.abs(seed2 % 10000) / 100        // 0-100%
    const size = 1 + Math.abs(seed3 % 3)           // 1-3px
    const duration = 1.5 + Math.abs(seed4 % 30) / 10  // 1.5-4.5s
    const delay = Math.abs(seed5 % 40) / 10         // 0-4s
    const colorIdx = Math.abs(seed6 % STAR_COLORS.length)

    stars.push({
      id: i,
      x,
      y,
      size,
      duration,
      delay,
      opacity: 0.4 + Math.abs(seed % 6) / 10,  // 0.4-1.0
      color: STAR_COLORS[colorIdx],
    })
  }
  return stars
}

export default function StarField() {
  const stars = useMemo(() => generateStars(120), [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-particle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
