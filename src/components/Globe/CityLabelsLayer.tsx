// 城市标签数据计算层（Canvas 内，只计算坐标，不渲染 UI）

import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { latLngToVector3 } from '@/utils/geoUtils'
import { locations as staticLocations } from '@/data/locations'
import type { CityLocation } from '@/types'
import * as THREE from 'three'

interface CityLabelsLayerProps {
  unlockedCityIds: string[]
  earthRef: React.RefObject<THREE.Mesh | null>
  onDataUpdate: (data: LabelData[]) => void
}

export interface LabelData {
  city: CityLocation
  cityScreenPos: { x: number; y: number }
  labelPos: { x: number; y: number }
  isVisible: boolean
}

interface LabelLayout {
  city: CityLocation
  worldPos: THREE.Vector3
  labelWorldPos: THREE.Vector3
}

// 布局算法：标签向外延伸 + 侧向偏移避免重叠
function distributeLabels(cities: CityLocation[]): LabelLayout[] {
  if (cities.length === 0) return []

  // 预定义的侧向偏移角度（每个城市不同，形成螺旋分布）
  const offsetAngles = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315, 90, 270]

  return cities.map((city, i) => {
    const [lat, lng] = city.coordinates

    // 城市在地球表面的位置（半径 1.02）
    const worldPos = latLngToVector3(lat, lng, 1.02)

    // 计算标签位置：径向外延 + 切向偏移
    const radialDir = worldPos.clone().normalize()

    // 找一个垂直于径向的切向量（用于侧向偏移）
    const up = new THREE.Vector3(0, 1, 0)
    let tangent = new THREE.Vector3().crossVectors(radialDir, up)

    // 如果径向接近竖直方向，换个参考向量
    if (tangent.length() < 0.1) {
      tangent = new THREE.Vector3().crossVectors(radialDir, new THREE.Vector3(1, 0, 0))
    }
    tangent.normalize()

    // 根据索引旋转切向量（形成螺旋分布）
    const offsetAngle = offsetAngles[i % offsetAngles.length]
    const rotationAxis = radialDir.clone()
    tangent.applyAxisAngle(rotationAxis, (offsetAngle * Math.PI) / 180)

    // 标签位置 = 径向延伸(1.6倍半径) + 切向偏移(0.3)
    const labelWorldPos = radialDir.clone().multiplyScalar(1.6)
      .add(tangent.multiplyScalar(0.3))

    return { city, worldPos, labelWorldPos }
  })
}

export default function CityLabelsLayer({ unlockedCityIds, earthRef, onDataUpdate }: CityLabelsLayerProps) {
  const { camera, size } = useThree()

  // **只渲染已解锁的城市**
  const unlockedCities = useMemo(
    () => {
      console.log('🔍 CityLabelsLayer - unlockedCityIds:', unlockedCityIds)
      const filtered = staticLocations.filter(loc => unlockedCityIds.includes(loc.id))
      console.log('🔍 CityLabelsLayer - filtered unlockedCities:', filtered.map(c => c.id))
      return filtered
    },
    [unlockedCityIds]
  )

  const labelLayout = useMemo(() => distributeLabels(unlockedCities), [unlockedCities])

  useFrame(() => {
    if (!earthRef.current) return

    // 获取地球当前的旋转状态（四元数）
    const earthQuaternion = earthRef.current.quaternion

    const data: LabelData[] = labelLayout.map(({ city, worldPos, labelWorldPos }) => {
      // 将城市和标签的本地坐标转换为世界坐标（应用地球旋转）
      const cityWorld = worldPos.clone().applyQuaternion(earthQuaternion)
      const labelWorld = labelWorldPos.clone().applyQuaternion(earthQuaternion)

      // 投影到屏幕坐标
      const cityProjected = cityWorld.project(camera)
      const labelProjected = labelWorld.project(camera)

      const cityScreenPos = {
        x: (cityProjected.x * 0.5 + 0.5) * size.width,
        y: (-cityProjected.y * 0.5 + 0.5) * size.height,
      }

      const labelPos = {
        x: (labelProjected.x * 0.5 + 0.5) * size.width,
        y: (-labelProjected.y * 0.5 + 0.5) * size.height,
      }

      // 只有在相机前方（z < 1）才可见
      const isVisible = cityProjected.z < 1 && labelProjected.z < 1

      return { city, cityScreenPos, labelPos, isVisible }
    })

    onDataUpdate(data)
  })

  return null // 不渲染任何 Three.js 对象
}
