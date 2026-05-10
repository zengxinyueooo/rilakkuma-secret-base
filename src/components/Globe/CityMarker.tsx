// 单个城市地标标记组件（V6：纯 3D 光点，不含 Html 标签）

import { useState, useEffect } from 'react'
import { latLngToVector3 } from '@/utils/geoUtils'
import type { CityLocation } from '@/types'

interface CityMarkerProps {
  location: CityLocation
  isUnlocked: boolean
  isNewlyUnlocked: boolean
}

export default function CityMarker({ location, isUnlocked, isNewlyUnlocked }: CityMarkerProps) {
  // 解锁一次性动画状态
  const [playUnlockAnim, setPlayUnlockAnim] = useState(false)

  useEffect(() => {
    if (!isNewlyUnlocked) return
    setPlayUnlockAnim(true)
    const t = setTimeout(() => setPlayUnlockAnim(false), 1500)
    return () => clearTimeout(t)
  }, [isNewlyUnlocked])

  // 将经纬度转换为 3D 坐标（在地球表面稍微外侧）
  const [lat, lng] = location.coordinates
  const position = latLngToVector3(lat, lng, 1.02)

  return (
    <group position={position}>
      {/* 发光球体（已解锁：橙色光点，未解锁：灰色，尺寸加大） */}
      <mesh>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial
          color={isUnlocked ? '#FF6B3D' : '#888888'}
          transparent
          opacity={isUnlocked ? 1 : 0.5}
        />
      </mesh>

      {/* 外层光晕（已解锁：强烈发光） */}
      {isUnlocked && (
        <mesh>
          <sphereGeometry args={[playUnlockAnim ? 0.055 : 0.04, 16, 16]} />
          <meshBasicMaterial
            color="#FFAA66"
            transparent
            opacity={playUnlockAnim ? 0.8 : 0.45}
          />
        </mesh>
      )}

      {/* 最外层大光晕（扩大可见范围） */}
      {isUnlocked && (
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial
            color="#FF9EC4"
            transparent
            opacity={0.2}
          />
        </mesh>
      )}
    </group>
  )
}
