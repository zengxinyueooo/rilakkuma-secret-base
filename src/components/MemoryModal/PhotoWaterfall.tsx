// 瀑布流照片墙组件

interface PhotoWaterfallProps {
  images: string[]
  cityName: string
}

export default function PhotoWaterfall({ images, cityName }: PhotoWaterfallProps) {
  if (images.length === 0) return null

  return (
    <div className="px-4 py-4">
      {/* 瀑布流容器（CSS columns 实现） */}
      <div
        style={{
          columns: images.length === 1 ? 1 : 2,
          columnGap: '8px',
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="mb-2 rounded-xl overflow-hidden"
            style={{
              breakInside: 'avoid',
              // 交替添加圆角变化，增加趣味感
              borderRadius: i % 3 === 0 ? '16px' : i % 3 === 1 ? '12px 20px 12px 20px' : '20px 12px 20px 12px',
            }}
          >
            <img
              src={src}
              alt={`${cityName} 回忆 ${i + 1}`}
              loading="lazy"
              className="w-full h-auto block"
              style={{
                objectFit: 'cover',
                // 奇数图片稍微高一点，偶数图片宽一点，增加视觉节奏
                aspectRatio: i % 2 === 0 ? '4/5' : '4/3',
              }}
              onError={(e) => {
                // 图片加载失败时显示占位渐变
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  const GRADIENTS = [
                    'linear-gradient(135deg, #FFB7C5 0%, #FFDAC1 100%)',
                    'linear-gradient(135deg, #B5EAD7 0%, #C4E4FF 100%)',
                    'linear-gradient(135deg, #C7CEEA 0%, #FFF3B0 100%)',
                    'linear-gradient(135deg, #FFB7C5 0%, #C7CEEA 100%)',
                  ]
                  parent.style.background = GRADIENTS[i % GRADIENTS.length]
                  parent.style.height = i % 2 === 0 ? '200px' : '150px'

                  // 添加占位 emoji
                  const placeholder = document.createElement('div')
                  placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;'
                  placeholder.textContent = ['🌸', '🏔️', '🌊', '🌙'][i % 4]
                  parent.appendChild(placeholder)
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
