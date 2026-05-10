// 地球飞行动画 Hook：点击城市后旋转地球使目标城市转到正面

import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { latLngToVector3 } from '@/utils/geoUtils'

interface UseGlobeControlsReturn {
  earthRef: React.RefObject<THREE.Mesh | null>
  flyToCity: (lat: number, lng: number) => void
}

export function useGlobeControls(): UseGlobeControlsReturn {
  const earthRef = useRef<THREE.Mesh>(null)

  // 目标四元数（飞行动画的终点旋转状态）
  const targetQuaternion = useRef<THREE.Quaternion | null>(null)
  // 是否正在执行飞行动画
  const isAnimating = useRef(false)

  /**
   * 飞向指定经纬度：旋转地球使目标城市转到正对相机的位置
   * 注意：相机固定不动，旋转的是地球 mesh 本身
   */
  const flyToCity = useCallback((lat: number, lng: number) => {
    if (!earthRef.current) return

    // 1. 计算城市在地球本地坐标系下的位置向量（球面坐标转笛卡尔坐标）
    const cityLocalPos = latLngToVector3(lat, lng, 1).normalize()

    // 2. 将城市本地位置转换到世界坐标系（考虑地球当前的旋转）
    const cityWorldPos = cityLocalPos.clone().applyQuaternion(earthRef.current.quaternion)

    // 3. 相机在世界坐标系的 +Z 方向，我们希望城市转到这个方向
    const cameraDir = new THREE.Vector3(0, 0, 1)

    // 4. 计算从当前城市世界方向 → 相机方向的旋转
    const deltaRotation = new THREE.Quaternion()
    deltaRotation.setFromUnitVectors(cityWorldPos, cameraDir)

    // 5. 应用这个增量旋转到当前地球旋转上
    targetQuaternion.current = deltaRotation.multiply(earthRef.current.quaternion.clone())
    isAnimating.current = true
  }, [])

  // 每帧插值旋转
  useFrame(() => {
    if (!isAnimating.current || !targetQuaternion.current || !earthRef.current) return

    // 球面线性插值（slerp），0.04 控制飞行速度（越小越慢越丝滑）
    earthRef.current.quaternion.slerp(targetQuaternion.current, 0.04)

    // 当四元数足够接近目标时停止动画
    if (earthRef.current.quaternion.angleTo(targetQuaternion.current) < 0.005) {
      earthRef.current.quaternion.copy(targetQuaternion.current)
      isAnimating.current = false
    }
  })

  return { earthRef, flyToCity }
}
