// 3D 地球场景主组件（V6：标签层 + 引线系统）

import { Suspense, Component, type ReactNode, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import EarthMesh from './EarthMesh'
import AtmosphereGlow from './AtmosphereGlow'
import CityMarkersGroup from './CityMarkersGroup'
import CityLabelsLayer, { type LabelData } from './CityLabelsLayer'
import CityLabelsOverlay from './CityLabelsOverlay'
import TravelLines from './TravelLines'
import { useGlobeControls } from '@/hooks/useGlobeControls'
import type { CityLocation } from '@/types'

interface GlobeProps {
  autoRotate: boolean
  onCitySelect: (location: CityLocation) => void
  unlockedCityIds: string[]
  newlyUnlockedCityId: string | null
}

// ===== Canvas 错误边界：防止纹理加载失败导致整页崩溃 =====
interface ErrorBoundaryState { hasError: boolean }
class GlobeErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass px-8 py-6 rounded-2xl text-center">
            <p className="text-4xl mb-3">🌍</p>
            <p className="font-round text-indigo-500 text-sm">地球加载中，请稍候…</p>
            <p className="font-round text-indigo-300 text-xs mt-1">（需要网络连接加载地球纹理）</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ===== 场景内部组件（需要在 Canvas 内使用 hooks） =====
interface GlobeSceneProps {
  autoRotate: boolean
  unlockedCityIds: string[]
  newlyUnlockedCityId: string | null
  onLabelDataUpdate: (data: LabelData[]) => void
}

function GlobeScene({
  autoRotate,
  unlockedCityIds,
  newlyUnlockedCityId,
  onLabelDataUpdate,
}: GlobeSceneProps) {
  const { earthRef } = useGlobeControls()

  return (
    <>
      {/* 环境光：提升整体亮度 */}
      <ambientLight intensity={1.2} />
      {/* 主光源：暖粉光 */}
      <directionalLight position={[3, 2, 2]} intensity={1.8} color="#fff0f8" />
      {/* 补光：柔和紫色冷光 */}
      <directionalLight position={[-2, -1, -2]} intensity={0.3} color="#e8d0ff" />

      {/* 地球球体（城市标记和连线作为子节点，精确跟随旋转） */}
      <EarthMesh earthRef={earthRef} autoRotate={autoRotate}>
        {/* 旅行轨迹连线（按解锁进度显示） */}
        <TravelLines unlockedCount={unlockedCityIds.length} />

        {/* 城市地标（纯 3D 光点，不含交互） */}
        <CityMarkersGroup
          unlockedCityIds={unlockedCityIds}
          newlyUnlockedCityId={newlyUnlockedCityId}
        />
      </EarthMesh>

      {/* 大气光晕 */}
      <AtmosphereGlow />

      {/* 轨道控制器 */}
      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={5.0}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        enableDamping
        dampingFactor={0.08}
        makeDefault
      />

      {/* 标签数据计算层（不渲染，只计算坐标） */}
      <CityLabelsLayer
        unlockedCityIds={unlockedCityIds}
        earthRef={earthRef}
        onDataUpdate={onLabelDataUpdate}
      />
    </>
  )
}

// ===== 主组件 =====
export default function Globe({ autoRotate, onCitySelect, unlockedCityIds, newlyUnlockedCityId }: GlobeProps) {
  const [labelData, setLabelData] = useState<LabelData[]>([])

  const handleCitySelect = (location: CityLocation) => {
    onCitySelect(location)
  }

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <GlobeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 3.6], fov: 45, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <GlobeScene
              autoRotate={autoRotate}
              unlockedCityIds={unlockedCityIds}
              newlyUnlockedCityId={newlyUnlockedCityId}
              onLabelDataUpdate={setLabelData}
            />
          </Suspense>
        </Canvas>
      </GlobeErrorBoundary>

      {/* 标签覆盖层（Canvas 外部，接收计算好的坐标数据） */}
      <CityLabelsOverlay labelData={labelData} onCitySelect={handleCitySelect} />
    </motion.div>
  )
}
