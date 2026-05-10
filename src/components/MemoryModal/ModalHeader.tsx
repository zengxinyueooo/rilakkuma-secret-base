// 回忆详情页顶部大图 Header 组件（V2：已由 MemoryModal/index.tsx 内联替代，保留作备用）

import type { CityLocation } from '@/types'

interface ModalHeaderProps {
  location: CityLocation
}

export default function ModalHeader({ location }: ModalHeaderProps) {
  const coverPhoto = location.photos[0]

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: '300px' }}>
      {/* 封面图 */}
      {coverPhoto && (
        <img
          src={coverPhoto}
          alt={location.chineseName}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, #C7CEEA 0%, #B5EAD7 50%, #FFB7C5 100%)'
            }
          }}
        />
      )}

      {/* 渐变遮罩 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* 底部文字区域 */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
        <p
          className="font-round text-white/80 text-sm font-medium tracking-widest mb-2"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
        >
          📍 {location.chineseName}
        </p>
        <h1
          className="font-round text-white font-bold leading-tight"
          style={{
            fontSize: 'clamp(24px, 5vw, 40px)',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            letterSpacing: '-0.02em',
          }}
        >
          {location.name}
        </h1>
      </div>
    </div>
  )
}
