// 左上角标题徽章组件（V2：Apple 风格字体升级）

import { motion } from 'framer-motion'

export default function TitleBadge() {
  return (
    <motion.div
      className="fixed top-5 left-5 z-20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
    >
      <div
        className="glass px-5 py-4 rounded-2xl"
        style={{
          boxShadow: '0 4px 24px rgba(192, 132, 252, 0.12)',
        }}
      >
        {/* 英文主标题（DM Serif Display，Apple 风格衬线） */}
        <h1
          className="font-display leading-tight"
          style={{
            fontSize: '18px',
            letterSpacing: '-0.01em',
            fontWeight: 400,
            color: '#7c3aed',
          }}
        >
          Rilakkuma &amp; Gudetama
        </h1>
        <p
          className="font-display italic"
          style={{
            fontSize: '13px',
            letterSpacing: '0.01em',
            fontWeight: 400,
            marginTop: '1px',
            color: '#a855f7',
          }}
        >
          Secret Base
        </p>

        {/* 分隔线 */}
        <div
          className="my-2"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, rgba(240,168,208,0.5), transparent)',
          }}
        />

        {/* 中文副标题（苹方/PingFang SC） */}
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: '#c084fc',
            fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif",
            fontWeight: 400,
          }}
        >
          轻松熊和蛋黄的秘密基地
        </p>
      </div>
    </motion.div>
  )
}
