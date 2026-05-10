// 大气光晕组件：用两层半透明球体模拟地球大气

import { AdditiveBlending, BackSide } from 'three'

export default function AtmosphereGlow() {
  return (
    <>
      {/* 内层：粉色大气 */}
      <mesh scale={1.018}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#ff88cc"
          transparent
          opacity={0.05}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 中层：薰衣草光晕 */}
      <mesh scale={1.045}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#cc88ff"
          transparent
          opacity={0.03}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 外层：浅粉极光 */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffaadd"
          transparent
          opacity={0.02}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}
