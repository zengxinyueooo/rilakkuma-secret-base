// 地球球体组件（V5：卡通粉紫风格，去掉夜晚灯光层）

import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import type * as THREE from 'three'

// 白天地球纹理（更亮更柔和的蓝绿色调）
const EARTH_DAY_URL = 'https://unpkg.com/three-globe/example/img/earth-day.jpg'

interface EarthMeshProps {
  earthRef: React.RefObject<THREE.Mesh | null>
  autoRotate: boolean
  children?: React.ReactNode
}

// ===== 地球主体 =====
function DayEarth({ earthRef, autoRotate, children }: EarthMeshProps) {
  const cloudsRef = useRef<THREE.Mesh>(null)
  const earthTexture = useLoader(TextureLoader, EARTH_DAY_URL)

  useFrame((_, delta) => {
    if (autoRotate && earthRef.current) {
      // 微弱自转（速度 0.015）
      earthRef.current.rotation.y += delta * 0.015
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.03
    }
    // 每帧无条件强制刷新子树世界矩阵
    // 确保 Html 城市标记在自转、手动拖拽、flyToCity 动画时都精确跟随地球
    if (earthRef.current) {
      earthRef.current.updateMatrixWorld(true)
    }
  })

  return (
    <>
      <mesh
        ref={earthRef}
        castShadow
        receiveShadow
        rotation={[
          20 * (Math.PI / 180),  // 纬度居中：上移，让亚洲（北纬 20~45°）居中
          2.705,                 // 经度对准：将东经 ~115° 转到朝向相机
          0,
        ]}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          color="#eedcff"
          shininess={80}
          specular={[0.1, 0.08, 0.15]}
        />
        {/* 城市标记和连线作为子节点，自动跟随地球旋转 */}
        {children}
      </mesh>

      {/* 半透明淡粉云层 */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.008, 32, 32]} />
        <meshPhongMaterial
          color="#ffd6f0"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

// ===== 主组件 =====
export default function EarthMesh({ earthRef, autoRotate, children }: EarthMeshProps) {
  return <DayEarth earthRef={earthRef} autoRotate={autoRotate}>{children}</DayEarth>
}

export { EARTH_DAY_URL }
