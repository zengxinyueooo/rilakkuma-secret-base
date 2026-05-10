// 底部操作提示组件

import { motion } from 'framer-motion'

export default function GlobeHint() {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <div
        className="glass px-5 py-2.5 rounded-full flex items-center gap-3"
        style={{
          boxShadow: '0 4px 20px rgba(192, 132, 252, 0.12)',
        }}
      >
        {/* 拖拽图标 */}
        <span className="text-sm">🌍</span>

        {/* 提示文字 */}
        <p
          className="font-round whitespace-nowrap"
          style={{ fontSize: '11px', letterSpacing: '0.05em', color: '#a855f7' }}
        >
          拖拽旋转 · 滚轮缩放 · 点击地标探索回忆
        </p>

        {/* 小装饰 */}
        <span className="text-sm animate-float">✨</span>
      </div>
    </motion.div>
  )
}
