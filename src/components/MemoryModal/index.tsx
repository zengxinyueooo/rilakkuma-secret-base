// 回忆详情页（V7：粉紫主题 + 横向滚动相册 + 少女心细节）

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CityLocation } from '@/types'
import { compressImage } from '@/hooks/useLocationData'

// 每个城市专属的底部浮动 emoji
const CITY_EMOJIS: Record<string, string[]> = {
  xian:        ['🏯', '🌙', '🥟'],
  nanjing:     ['🌸', '🦆', '🏛️'],
  suzhou:      ['🪷', '🌿', '🏮'],
  shanghai:    ['✨', '🌃', '🎡'],
  haikou:      ['🥥', '🌊', '🌴'],
  wenchang:    ['🚀', '🌌', '⭐'],
  wanning:     ['🏄', '🐚', '🌞'],
  sanya:       ['🌺', '🏖️', '🐠'],
  shenyang:    ['🏛️', '❄️', '🌨️'],
  changbaishan:['🏔️', '🌨️', '🦌'],
  yanji:       ['🍜', '🎋', '🌿'],
  harbin:      ['❄️', '🎪', '⛄'],
}
const DEFAULT_EMOJIS = ['🐻', '💜', '🍳']

interface MemoryModalProps {
  location: CityLocation
  onClose: () => void
  onUpdate?: (id: string, edit: { photos?: string[]; text?: string }) => void
}

export default function MemoryModal({ location, onClose, onUpdate }: MemoryModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activePhoto, setActivePhoto] = useState(0)

  // 滚动状态：控制导航栏毛玻璃
  const [isScrolled, setIsScrolled] = useState(false)

  // 照片涟漪状态
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null)

  // 封面图加载状态
  const [coverLoaded, setCoverLoaded] = useState(false)

  // 监听滚动
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => setIsScrolled(el.scrollTop > 30)
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // 切换照片时重置加载状态
  useEffect(() => {
    setCoverLoaded(false)
  }, [activePhoto])

  // 点击缩略图触发涟漪
  const handleThumbnailClick = (index: number, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setActivePhoto(index)
    setRipple({ x, y, key: Date.now() })
    setTimeout(() => setRipple(null), 500)
  }

  // 编辑状态
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(location.text)
  const [editPhotos, setEditPhotos] = useState<string[]>(location.photos)
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const galleryPhotos = isEditing ? editPhotos : location.photos
  // 封面图跟随 activePhoto 联动，始终显示当前选中的那张
  const coverPhoto = galleryPhotos[activePhoto] ?? galleryPhotos[0] ?? null

  // 进入编辑模式时，同步当前数据
  const handleEditStart = () => {
    setEditText(location.text)
    setEditPhotos(location.photos)
    setIsEditing(true)
  }

  // 取消编辑
  const handleEditCancel = () => {
    setEditText(location.text)
    setEditPhotos(location.photos)
    setActivePhoto(0)
    setIsEditing(false)
  }

  // 保存编辑
  const handleEditSave = () => {
    if (onUpdate) {
      onUpdate(location.id, { photos: editPhotos, text: editText })
    }
    setIsEditing(false)
  }

  // 上传图片
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    try {
      const compressed = await Promise.all(files.map(f => compressImage(f)))
      setEditPhotos(prev => [...prev, ...compressed])
    } catch {
      alert('图片处理失败，请重试')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // 删除某张图片
  const handleDeletePhoto = (index: number) => {
    setEditPhotos(prev => {
      const next = prev.filter((_, i) => i !== index)
      return next
    })
    setActivePhoto(prev => Math.min(prev, Math.max(0, editPhotos.length - 2)))
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fdf0ff 0%, #f5e0ff 40%, #ffe0f5 100%)',
      }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 35,
        mass: 0.9,
      }}
    >
      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* ===== 顶部导航栏（滚动后变为毛玻璃） ===== */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-5 pb-4"
        style={{
          background: isScrolled
            ? 'rgba(255,245,255,0.88)'
            : 'linear-gradient(to bottom, rgba(253,240,255,0.95) 0%, rgba(253,240,255,0) 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled ? '0 1px 16px rgba(192,132,252,0.12)' : 'none',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* 返回按钮 */}
        <motion.button
          onClick={onClose}
          className="flex items-center gap-2 glass rounded-full px-4 py-2"
          style={{ border: '1px solid rgba(255,255,255,0.8)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span style={{ fontSize: '14px', color: '#c084fc' }}>←</span>
          <span
            style={{
              fontSize: '12px',
              color: '#a855f7',
              fontFamily: "'PingFang SC', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            返回地球
          </span>
        </motion.button>

        {/* 右上角：城市 emoji + 编辑按钮 */}
        <div className="flex items-center gap-2">
          {/* 编辑 / 完成 按钮 */}
          {onUpdate && !isEditing && (
            <motion.button
              onClick={handleEditStart}
              className="glass rounded-full px-3 py-1 flex items-center gap-1"
              style={{
                border: '1px solid rgba(192,132,252,0.3)',
                fontSize: '12px',
                color: '#a855f7',
                fontFamily: "'PingFang SC', sans-serif",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span>✏️</span>
              <span>编辑</span>
            </motion.button>
          )}

          {/* 城市 emoji 标记 */}
          <motion.div
            className="glass rounded-full px-3 py-1"
            style={{ border: '1px solid rgba(255,255,255,0.8)' }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <span style={{ fontSize: '14px' }}>{location.emoji}</span>
          </motion.div>
        </div>
      </div>

      {/* ===== 可滚动内容区域 ===== */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{ paddingTop: '0' }}
      >
        {/* ===== 封面大图 ===== */}
        <motion.div
          className="relative w-full"
          style={{ background: 'linear-gradient(135deg, #f0d8ff 0%, #ffe0f5 50%, #fce7f3 100%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {coverPhoto ? (
            <div style={{ position: 'relative', width: '100%' }}>
              {/* 骨架屏占位（图片未加载时显示） */}
              {!coverLoaded && (
                <div
                  className="skeleton-shimmer"
                  style={{
                    width: '100%',
                    height: '55vw',
                    maxHeight: '70vh',
                    minHeight: '220px',
                    borderRadius: 0,
                  }}
                />
              )}
              <motion.img
                key={coverPhoto}
                src={coverPhoto}
                alt={location.chineseName}
                style={{
                  width: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  display: coverLoaded ? 'block' : 'none',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: coverLoaded ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                onLoad={() => setCoverLoaded(true)}
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  setCoverLoaded(true)
                }}
              />
            </div>
          ) : (
            <div
              className="w-full flex flex-col items-center justify-center gap-4"
              style={{ minHeight: '280px' }}
            >
              <span style={{ fontSize: '60px', lineHeight: 1 }}>{location.emoji}</span>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="glass rounded-2xl px-6 py-3 flex flex-col items-center gap-2"
                  style={{ border: '1px dashed rgba(192,132,252,0.4)' }}
                >
                  <span style={{ fontSize: '24px' }}>📷</span>
                  <span style={{ fontSize: '12px', color: '#a855f7', fontFamily: "'PingFang SC', sans-serif" }}>
                    点击上传照片
                  </span>
                </button>
              )}
            </div>
          )}

          {/* 城市名称覆盖在图片底部（半透明渐变底托） */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-10"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(245,224,255,0.9))',
            }}
          >
            <motion.h1
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 'clamp(28px, 7vw, 52px)',
                color: '#3b0764',
                letterSpacing: '-0.02em',
                fontWeight: 400,
                lineHeight: 1,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {location.name}
            </motion.h1>
            <motion.p
              style={{
                fontSize: '14px',
                letterSpacing: '0.2em',
                color: 'rgba(168,85,247,0.85)',
                fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
                marginTop: '4px',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {location.chineseName}
            </motion.p>
          </div>
        </motion.div>

        {/* ===== 内容区域 ===== */}
        <div className="pb-16 pt-6">

          {/* ===== 编辑模式提示条 ===== */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                className="mx-6 mb-5 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: 'rgba(240,168,208,0.12)',
                  border: '1px solid rgba(240,168,208,0.35)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span style={{ fontSize: '16px' }}>✏️</span>
                <span style={{ fontSize: '12px', color: '#a855f7', fontFamily: "'PingFang SC', sans-serif", flex: 1 }}>
                  编辑模式 · 修改内容后点击保存
                </span>
                {uploading && (
                  <span style={{ fontSize: '12px', color: '#c084fc', fontFamily: "'PingFang SC', sans-serif" }}>
                    上传中…
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== 横向滚动照片相册 ===== */}
          {(galleryPhotos.length > 0 || isEditing) && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 pb-2">
                {galleryPhotos.map((photo, i) => (
                  <div key={`${i}-${photo.slice(0, 20)}`} style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: '16px' }}>
                    <motion.img
                      src={photo}
                      alt={`${location.chineseName} ${i + 1}`}
                      style={{
                        width: '130px',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '16px',
                        border: i === activePhoto
                          ? '3px solid #c084fc'
                          : '3px solid rgba(255,255,255,0.6)',
                        boxShadow: i === activePhoto
                          ? '0 8px 24px rgba(192,132,252,0.4)'
                          : '0 4px 12px rgba(0,0,0,0.08)',
                        transform: i === activePhoto ? 'scale(1.04)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        display: 'block',
                      }}
                      onClick={(e) => handleThumbnailClick(i, e)}
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, #f0d8ff, #ffe0f5)'
                          parent.style.width = '130px'
                          parent.style.height = '180px'
                          parent.style.borderRadius = '16px'
                        }
                      }}
                    />
                    {/* 点击涟漪效果 */}
                    <AnimatePresence>
                      {ripple && i === activePhoto && (
                        <motion.div
                          key={ripple.key}
                          style={{
                            position: 'absolute',
                            left: ripple.x,
                            top: ripple.y,
                            width: 8,
                            height: 8,
                            marginLeft: -4,
                            marginTop: -4,
                            borderRadius: '50%',
                            background: 'rgba(240,168,208,0.7)',
                            pointerEvents: 'none',
                          }}
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 12, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                        />
                      )}
                    </AnimatePresence>

                    {/* 编辑时删除按钮 */}
                    {isEditing && (
                      <button
                        onClick={() => handleDeletePhoto(i)}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.85)',
                          border: '1px solid rgba(240,168,208,0.5)',
                          color: '#a855f7',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {/* 上传按钮（编辑时） */}
                {isEditing && (
                  <div
                    style={{
                      width: '130px',
                      height: '180px',
                      flexShrink: 0,
                      border: '3px dashed rgba(192,132,252,0.4)',
                      borderRadius: '16px',
                      background: 'rgba(240,168,208,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#c084fc',
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span style={{ fontSize: '28px', lineHeight: 1, marginBottom: '8px' }}>+</span>
                    <span style={{ fontSize: '10px', fontFamily: "'PingFang SC', sans-serif" }}>上传照片</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ===== 分隔线 ===== */}
          <motion.div
            className="flex items-center gap-3 mb-6 mx-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(240,168,208,0.5))' }} />
            <span style={{ fontSize: '16px' }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(240,168,208,0.5))' }} />
          </motion.div>

          {/* ===== 回忆文字 / 编辑文本框（包裹在毛玻璃卡片内） ===== */}
          <motion.div
            className="glass-pink rounded-3xl px-6 py-5 mx-6 mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            {isEditing ? (
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                rows={6}
                placeholder="写下这段旅行的回忆…"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(192,132,252,0.3)',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '15px',
                  lineHeight: '1.9',
                  color: '#4c1d95',
                  fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
                  letterSpacing: '0.03em',
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
            ) : (
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.9',
                  color: '#4c1d95',
                  fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif",
                  letterSpacing: '0.03em',
                }}
              >
                {location.text}
              </p>
            )}
          </motion.div>

          {/* ===== 编辑模式：保存 / 取消 按钮 ===== */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                className="flex gap-3 mx-6 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <button
                  onClick={handleEditSave}
                  className="flex-1 rounded-2xl py-3 font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #f0a8d0, #c084fc)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontFamily: "'PingFang SC', sans-serif",
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                  }}
                >
                  💾 保存
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex-1 glass rounded-2xl py-3"
                  style={{
                    fontSize: '14px',
                    fontFamily: "'PingFang SC', sans-serif",
                    letterSpacing: '0.05em',
                    color: 'rgba(168,85,247,0.7)',
                    cursor: 'pointer',
                  }}
                >
                  取消
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== 底部装饰（非编辑模式显示，城市专属 emoji） ===== */}
          {!isEditing && (
            <motion.div
              className="flex flex-col items-center gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex gap-3 text-2xl">
                {(CITY_EMOJIS[location.id] ?? DEFAULT_EMOJIS).map((emoji, i) => (
                  <span
                    key={i}
                    className="animate-float"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'rgba(168,85,247,0.5)',
                  fontFamily: "'PingFang SC', sans-serif",
                }}
              >
                这是我们的秘密回忆
              </p>
            </motion.div>
          )}

          {/* ===== 彩蛋（仅最后一个城市显示，非编辑模式） ===== */}
          {location.isLast && !isEditing && (
            <motion.div
              className="mt-10 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div
                className="glass-pink rounded-2xl px-6 py-6 mx-6"
                style={{
                  border: '1px solid rgba(240,168,208,0.3)',
                  boxShadow: '0 0 40px rgba(192,132,252,0.1)',
                }}
              >
                <p className="text-2xl mb-3">🌏</p>
                <p
                  className="text-shimmer font-round font-semibold mb-2"
                  style={{ fontSize: '14px', letterSpacing: '0.02em' }}
                >
                  Thanks for exploring these memories.
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(168,85,247,0.6)',
                    fontFamily: "'PingFang SC', sans-serif",
                    letterSpacing: '0.05em',
                    lineHeight: 1.8,
                  }}
                >
                  每一段旅程都是礼物<br />
                  More places loading…  ✨
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
