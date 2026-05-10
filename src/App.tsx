// 应用根组件：全局状态机，协调加载页、地球、弹窗三个阶段

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import Globe from '@/components/Globe'
import MemoryModal from '@/components/MemoryModal'
import TitleBadge from '@/components/UI/TitleBadge'
import GlobeHint from '@/components/UI/GlobeHint'
import StarField from '@/components/UI/StarField'
import { useLocationData } from '@/hooks/useLocationData'
import { locations as staticLocations } from '@/data/locations'
import UnlockAnimation from '@/components/UI/UnlockAnimation'
import SnowflakeCounter from '@/components/UI/SnowflakeCounter'
import GlobeDecorations from '@/components/UI/GlobeDecorations'
import AllCitiesUnlockedModal from '@/components/UI/AllCitiesUnlockedModal'
import type { AppPhase, CityLocation } from '@/types'

// 解锁进度持久化 key（与城市编辑数据分开）
const UNLOCK_KEY = 'rilakkuma-unlock'

function loadUnlockState(): { ids: string[] } {
  // 每次进入页面都从西安重新开始，不读取历史解锁记录
  return { ids: ['xian'] }
}

export default function App() {
  // 应用阶段：loading（加载页）→ globe（地球主页）
  const [phase, setPhase] = useState<AppPhase>('loading')

  // 当前选中的城市（null 表示弹窗关闭）
  const [selectedCity, setSelectedCity] = useState<CityLocation | null>(null)

  // 数据层：localStorage 存储 + 合并静态数据
  const { locations, updateCity, exportData } = useLocationData()

  // 解锁状态（从 localStorage 恢复）
  const savedUnlock = useMemo(() => loadUnlockState(), [])
  const [unlockedCityIds, setUnlockedCityIds] = useState<string[]>(savedUnlock.ids)
  // ref 用于在 setState 回调内访问最新 ids
  const unlockedIdsRef = useRef<string[]>(savedUnlock.ids)

  // 刚解锁的城市 ID（驱动解锁动画，动画结束后清空）
  const [newlyUnlockedCityId, setNewlyUnlockedCityId] = useState<string | null>(null)

  // 地球是否自动旋转（微弱自转，城市坐标随地球同步）
  const [globeAutoRotate, setGlobeAutoRotate] = useState(true)

  // 全部城市探索完成的庆祝弹窗
  const [showAllUnlockedModal, setShowAllUnlockedModal] = useState(false)

  // 加载页完成回调
  const handleLoadingComplete = useCallback(() => {
    setPhase('globe')
  }, [])

  // 同步 unlockedIdsRef
  useEffect(() => {
    unlockedIdsRef.current = unlockedCityIds
  }, [unlockedCityIds])

  // 动态页面标题
  useEffect(() => {
    if (phase === 'loading') {
      document.title = '🐻 加载中...'
    } else if (selectedCity) {
      document.title = `${selectedCity.emoji} ${selectedCity.chineseName} · 秘密基地`
    } else {
      document.title = '🌏 轻松熊和蛋黄的秘密基地'
    }
  }, [phase, selectedCity])

  // 解锁动画结束后清空
  const handleUnlockAnimationEnd = useCallback(() => {
    setNewlyUnlockedCityId(null)
  }, [])

  // 点击地标后：停止旋转，打开弹窗（用合并后的 locations 数据，包含用户编辑内容）
  const handleCitySelect = useCallback((city: CityLocation) => {
    if (!unlockedCityIds.includes(city.id)) return  // 未解锁不响应
    setGlobeAutoRotate(false)
    // 从合并后的 locations 中找到对应城市（含 localStorage 覆盖数据）
    const merged = locations.find(l => l.id === city.id) ?? city
    setSelectedCity(merged)
  }, [locations, unlockedCityIds])

  // 关闭弹窗后：自动解锁下一个城市，恢复自动旋转
  const handleModalClose = useCallback(() => {
    if (selectedCity) {
      const idx = staticLocations.findIndex(l => l.id === selectedCity.id)
      const nextIdx = idx + 1
      if (nextIdx < staticLocations.length) {
        const nextCity = staticLocations[nextIdx]
        setUnlockedCityIds(ids => {
          if (ids.includes(nextCity.id)) return ids  // 已解锁则跳过
          const newIds = [...ids, nextCity.id]
          unlockedIdsRef.current = newIds
          localStorage.setItem(UNLOCK_KEY, JSON.stringify({ ids: newIds }))
          return newIds
        })
        setNewlyUnlockedCityId(nextCity.id)
      } else {
        // 关闭的是最后一个城市，显示庆祝弹窗
        setShowAllUnlockedModal(true)
      }
    }
    setSelectedCity(null)
    // 恢复地球自动旋转
    setGlobeAutoRotate(true)
  }, [selectedCity])

  return (
    <div className="w-screen h-screen overflow-hidden pearl-bg relative">
      {/* ===== 全局星星背景（始终显示） ===== */}
      <StarField />

      {/* ===== 加载页（AnimatePresence 控制淡出） ===== */}
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* ===== 地球主页（加载完成后渐变淡入） ===== */}
      {phase === 'globe' && (
        <motion.div
          key="globe-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* 3D 地球场景 */}
          <Globe
            autoRotate={globeAutoRotate}
            onCitySelect={handleCitySelect}
            unlockedCityIds={unlockedCityIds}
            newlyUnlockedCityId={newlyUnlockedCityId}
          />

          {/* 像素风装饰层（z-index 2~5，不遮挡地球和 UI） */}
          <GlobeDecorations />

          {/* 左上角标题徽章 */}
          <TitleBadge />

          {/* 右上角导出按钮 */}
          <button
            onClick={exportData}
            title="导出回忆数据"
            style={{
              position: 'fixed',
              top: '16px',
              right: '20px',
              zIndex: 30,
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50px',
              padding: '8px 14px',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'rgba(199,210,254,0.8)',
              fontFamily: "'PingFang SC', sans-serif",
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>📤</span>
            <span>导出</span>
          </button>

          {/* 底部操作提示（弹窗打开时隐藏） */}
          <AnimatePresence>
            {!selectedCity && <GlobeHint key="hint" />}
          </AnimatePresence>

          {/* 解锁动画（全屏覆盖，动画结束后消失） */}
          {newlyUnlockedCityId && (
            <UnlockAnimation
              cityId={newlyUnlockedCityId}
              cityName={staticLocations.find(l => l.id === newlyUnlockedCityId)?.chineseName ?? ''}
              cityEmoji={staticLocations.find(l => l.id === newlyUnlockedCityId)?.emoji ?? ''}
              onComplete={handleUnlockAnimationEnd}
            />
          )}

          {/* 右下角雪花收集进度 HUD */}
          <SnowflakeCounter
            unlockedCount={unlockedCityIds.length}
            totalCities={staticLocations.length}
          />
        </motion.div>
      )}

      {/* ===== 回忆详情页（全屏，从右侧滑入） ===== */}
      <AnimatePresence>
        {selectedCity && (
          <MemoryModal
            key={selectedCity.id}
            location={selectedCity}
            onClose={handleModalClose}
            onUpdate={(id, edit) => {
              updateCity(id, edit)
              // 同步更新当前展示的城市数据
              setSelectedCity(prev => prev ? { ...prev, ...edit } : prev)
            }}
          />
        )}
      </AnimatePresence>

      {/* ===== 全部城市探索完成庆祝弹窗 ===== */}
      <AllCitiesUnlockedModal
        show={showAllUnlockedModal}
        onClose={() => setShowAllUnlockedModal(false)}
      />
    </div>
  )
}
