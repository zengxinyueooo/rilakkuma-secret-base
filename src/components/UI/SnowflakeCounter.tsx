// 右下角城市探索进度 HUD

import { motion } from 'framer-motion'

interface SnowflakeCounterProps {
  unlockedCount: number
  totalCities: number
}

const PIXEL_FONT: React.CSSProperties = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '8px',
}

export default function SnowflakeCounter({ unlockedCount, totalCities }: SnowflakeCounterProps) {
  const allUnlocked = unlockedCount >= totalCities

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-30 glass-pixel rounded-lg px-4 py-3"
      style={{ minWidth: '130px' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      {allUnlocked ? (
        /* 全部解锁完成 */
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', marginBottom: '6px' }}>🎉</p>
          <p style={{ ...PIXEL_FONT, color: '#a855f7', lineHeight: 1.6 }}>
            ALL CITIES<br />EXPLORED!
          </p>
        </div>
      ) : (
        <>
          <p style={{ fontSize: '16px', marginBottom: '6px' }}>🗺️</p>
          {/* 城市解锁进度 */}
          <div style={{ ...PIXEL_FONT, color: '#a855f7', lineHeight: 1.8 }}>
            {unlockedCount}/{totalCities}<br />CITIES
          </div>
          <div style={{ ...PIXEL_FONT, fontSize: '7px', color: 'rgba(168,85,247,0.6)', marginTop: '4px', lineHeight: 1.6 }}>
            VISIT TO UNLOCK
          </div>
        </>
      )}
    </motion.div>
  )
}
