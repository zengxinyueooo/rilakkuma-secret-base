// 世界坐标转屏幕坐标 Hook（每帧同步，用于引线连接）

import { useThree, useFrame } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'

/**
 * 将 3D 世界坐标转换为 2D 屏幕坐标
 * @param worldPos - 世界坐标系中的位置向量
 * @returns 屏幕坐标 { x, y }（像素）
 */
export function useWorldToScreen(worldPos: THREE.Vector3) {
  const { camera, size } = useThree()
  const [screenPos, setScreenPos] = useState({ x: 0, y: 0 })

  useFrame(() => {
    // 投影到归一化设备坐标（NDC）：x,y ∈ [-1, 1]
    const projected = worldPos.clone().project(camera)

    // 转换为屏幕像素坐标
    setScreenPos({
      x: (projected.x * 0.5 + 0.5) * size.width,
      y: (-projected.y * 0.5 + 0.5) * size.height,
    })
  })

  return screenPos
}
