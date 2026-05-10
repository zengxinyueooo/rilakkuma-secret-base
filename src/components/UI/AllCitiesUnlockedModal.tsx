// 全部城市探索完成后的庆祝弹窗
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  show: boolean
  onClose: () => void
}

// 撒花粒子配置
const CONFETTI = [
  { x: -120, y: -100, color: '#f9a8d4', size: 10, delay: 0 },
  { x: 110,  y: -90,  color: '#c084fc', size: 8,  delay: 0.05 },
  { x: -90,  y: -140, color: '#6ee7f7', size: 7,  delay: 0.1 },
  { x: 130,  y: -130, color: '#fcd34d', size: 9,  delay: 0.08 },
  { x: -60,  y: -160, color: '#86efac', size: 6,  delay: 0.15 },
  { x: 80,   y: -155, color: '#fb923c', size: 8,  delay: 0.12 },
  { x: -140, y: -60,  color: '#e879f9', size: 7,  delay: 0.06 },
  { x: 150,  y: -50,  color: '#a5b4fc', size: 9,  delay: 0.09 },
]

export default function AllCitiesUnlockedModal({ show, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        // 全屏遮罩
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ background: 'rgba(240, 210, 255, 0.55)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* 弹窗主体（相对定位，粒子从这里爆散） */}
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.06, 1], opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* 撒花粒子 */}
            {CONFETTI.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  top: '50%',
                  left: '50%',
                  marginTop: -p.size / 2,
                  marginLeft: -p.size / 2,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [1, 1, 0],
                  scale: [0, 1.4, 1],
                }}
                transition={{ duration: 0.9, delay: p.delay, ease: 'easeOut' }}
              />
            ))}

            {/* 彩虹旋转边框外壳 */}
            <div className="rainbow-border-wrap p-[3px] rounded-3xl">
              {/* 内层卡片 */}
              <div
                className="relative rounded-[22px] px-10 py-8 flex flex-col items-center text-center"
                style={{
                  background: 'linear-gradient(160deg, #fff5ff 0%, #fde8ff 40%, #fff0fb 100%)',
                  minWidth: 300,
                  maxWidth: 360,
                  boxShadow: '0 8px 40px rgba(192, 132, 252, 0.25)',
                }}
              >
                {/* 顶部装饰 emoji */}
                <motion.div
                  className="text-5xl mb-3 select-none"
                  animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                >
                  🌟
                </motion.div>

                {/* 副装饰行 */}
                <motion.div
                  className="text-xl mb-4 select-none tracking-widest"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  🌸 🎀 🌸
                </motion.div>

                {/* 大标题 */}
                <motion.h2
                  className="text-shimmer font-round text-2xl font-bold mb-3 leading-snug"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  恭喜你探索完<br />所有城市啦！
                </motion.h2>

                {/* 正文 */}
                <motion.p
                  className="text-purple-400 font-round text-sm leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  我们以后还会一起去很多地方！
                </motion.p>

                {/* 底部装饰行 */}
                <motion.div
                  className="text-base mb-6 select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                >
                  ✨ 💝 ✨
                </motion.div>

                {/* 好！按钮 */}
                <motion.button
                  onClick={onClose}
                  className="font-round font-bold text-white text-base px-10 py-3 rounded-full cursor-pointer select-none"
                  style={{
                    background: 'linear-gradient(135deg, #e879f9 0%, #a855f7 50%, #ec4899 100%)',
                    boxShadow: '0 4px 16px rgba(168, 85, 247, 0.4)',
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  好！
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
