// 加载页主组件（V4：SVG 矢量轻松熊/蛋黄 + 气球/流星/云朵）

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PixelProgressBar from './PixelProgressBar'
import PixelDecorations, { RilakkumaSvg, GudetamaSvg, PixelStarSvg } from './PixelDecorations'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalDuration = 4000
    const intervalMs = 50
    const increment = (intervalMs / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 600)
          return 100
        }
        if (prev > 60 && prev < 80) return prev + increment * 0.5
        return next
      })
    }, intervalMs)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 dream-bg flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      {/* 背景：粒子 + 云朵 + 流星 + 气球 + 星星 */}
      <PixelDecorations progress={progress} />

      {/* 中心内容区域 */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* 网站标题 */}
        <div className="flex flex-col items-center gap-2">
          <motion.h1
            className="text-center leading-tight"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(22px, 5vw, 32px)',
              color: '#7c3aed',
              letterSpacing: '-0.01em',
              fontWeight: 400,
              textShadow: '0 0 20px rgba(167,139,250,0.3)',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Rilakkuma &amp; Gudetama
          </motion.h1>
          <motion.p
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(14px, 3vw, 18px)',
              color: 'rgba(139,92,246,0.75)',
              letterSpacing: '0.02em',
              fontStyle: 'italic',
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Secret Base
          </motion.p>
          <motion.p
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              color: 'rgba(109,40,217,0.6)',
              fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
              marginTop: '4px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            轻松熊和蛋黄的秘密基地
          </motion.p>
        </div>

        {/* 主角 SVG（蹦跳动画） */}
        <motion.div
          className="flex items-end gap-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          {/* SVG 轻松熊 —— 弹跳 */}
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.33, 0, 0.66, 1],
              repeatType: 'loop',
            }}
            style={{ filter: 'drop-shadow(0 8px 12px rgba(200,149,108,0.3))' }}
          >
            <RilakkumaSvg size={90} />
          </motion.div>

          {/* 旋转星星分隔 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ marginBottom: '20px' }}
          >
            <PixelStarSvg size={24} color="#e879f9" duration={99999} delay={0} style={{}} />
          </motion.div>

          {/* SVG 蛋黄 —— 打盹摇摆 */}
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter: 'drop-shadow(0 8px 12px rgba(251,191,36,0.35))',
              transformOrigin: 'center bottom',
            }}
          >
            <GudetamaSvg size={84} />
          </motion.div>
        </motion.div>

        {/* 像素进度条 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <PixelProgressBar progress={progress} />
        </motion.div>

        {/* 加载提示文字（闪烁） */}
        <motion.p
          className="font-pixel text-center"
          style={{
            fontSize: '7px',
            letterSpacing: '0.12em',
            color: 'rgba(139,92,246,0.7)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ delay: 1.2, duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        >
          Loading memories...
        </motion.p>
      </div>

      {/* 底部装饰文字 */}
      <motion.p
        className="absolute bottom-8 text-center"
        style={{
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: 'rgba(139,92,246,0.55)',
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        为你精心制作的回忆地球仪
      </motion.p>
    </motion.div>
  )
}
