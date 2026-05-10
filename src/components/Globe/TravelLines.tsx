// 城市间旅行轨迹连线组件（V4：按解锁进度显示，新连线有描绘动画）
// 沿球面绘制发光连线，按 locations 数组顺序依次连接

import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { AdditiveBlending } from 'three'
import { locations } from '@/data/locations'
import { latLngToVector3 } from '@/utils/geoUtils'
import type * as THREETypes from 'three'

interface TravelLinesProps {
  unlockedCount: number  // 已解锁城市数量，控制显示连线数
}

// 在两点之间沿球面插值生成弧线点
function createArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  segments: number
): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    // 球面线性插值（slerp）
    const point = new THREE.Vector3().lerpVectors(start, end, t).normalize().multiplyScalar(radius)
    points.push(point)
  }
  return points
}

// 单条连线组件
function TravelLine({
  start,
  end,
  color,
  opacity,
  lineIndex,
  isNew,
}: {
  start: THREE.Vector3
  end: THREE.Vector3
  color: string
  opacity: number
  lineIndex: number
  isNew?: boolean
}) {
  const lineRef = useRef<THREETypes.Line>(null)
  const drawProgress = useRef(isNew ? 0 : Infinity)

  const geometry = useMemo(() => {
    const arcPoints = createArcPoints(start, end, 1.015, 40)
    const geo = new THREE.BufferGeometry().setFromPoints(arcPoints)
    return geo
  }, [start, end])

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      blending: AdditiveBlending,
      depthWrite: false,
    })
  }, [color, opacity])

  // 新连线出现时重置 drawRange
  useEffect(() => {
    if (isNew && lineRef.current) {
      drawProgress.current = 0
      lineRef.current.geometry.setDrawRange(0, 0)
    }
  }, [isNew])

  // 脉冲动画 + 新连线描绘动画
  useFrame((state, delta) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial
      const pulse = Math.sin(state.clock.elapsedTime * 1.5 + lineIndex * 0.8) * 0.15
      mat.opacity = opacity + pulse

      // 新连线：逐帧增加 drawRange 实现描线效果
      if (isNew && drawProgress.current !== Infinity) {
        const geo = lineRef.current.geometry
        const total = geo.attributes.position.count
        drawProgress.current = Math.min(drawProgress.current + delta * 80, total)
        geo.setDrawRange(0, Math.floor(drawProgress.current))
        if (drawProgress.current >= total) {
          drawProgress.current = Infinity
        }
      }
    }
  })

  return <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />
}

// 主组件
export default function TravelLines({ unlockedCount }: TravelLinesProps) {
  // 生成所有城市对之间的连线数据
  const lineData = useMemo(() => {
    const lines: Array<{
      start: THREE.Vector3
      end: THREE.Vector3
      color: string
      opacity: number
      key: string
    }> = []

    for (let i = 0; i < locations.length - 1; i++) {
      const from = locations[i]
      const to = locations[i + 1]
      const startVec = latLngToVector3(from.coordinates[0], from.coordinates[1], 1.015)
      const endVec = latLngToVector3(to.coordinates[0], to.coordinates[1], 1.015)

      // 交替使用樱花粉和薰衣草紫（可爱化配色）
      const color = i % 2 === 0 ? '#f0a8d0' : '#c8a8e9'
      const opacity = 0.25 + (i % 3) * 0.05

      lines.push({
        start: startVec,
        end: endVec,
        color,
        opacity,
        key: `${from.id}-${to.id}`,
      })
    }

    return lines
  }, [])

  // 只显示前 unlockedCount-1 条连线（已解锁城市之间的连线）
  const visibleLines = lineData.slice(0, Math.max(0, unlockedCount - 1))

  return (
    <>
      {visibleLines.map((line, i) => (
        <TravelLine
          key={line.key}
          start={line.start}
          end={line.end}
          color={line.color}
          opacity={line.opacity}
          lineIndex={i}
          isNew={i === visibleLines.length - 1 && unlockedCount > 1}
        />
      ))}
    </>
  )
}
