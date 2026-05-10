// 像素风进度条组件

interface PixelProgressBarProps {
  progress: number // 0 ~ 100
}

// 单个像素块的颜色配置（配合粉紫白背景）
const BLOCK_COLORS = {
  filled: '#c084fc',                // 已填充：饱和紫
  empty: 'rgba(192,132,252,0.18)', // 未填充：透明紫
  glow: '#e879f9',                  // 高亮：粉紫发光
}

export default function PixelProgressBar({ progress }: PixelProgressBarProps) {
  const totalBlocks = 20
  const filledBlocks = Math.floor((progress / 100) * totalBlocks)

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 进度条主体 */}
      <div
        className="flex gap-1 p-2 rounded"
        style={{
          background: 'rgba(255,255,255,0.65)',
          border: '2px solid rgba(192,132,252,0.5)',
          // 像素风外框阴影
          boxShadow: '3px 3px 0 rgba(192,132,252,0.3)',
        }}
      >
        {Array.from({ length: totalBlocks }).map((_, i) => {
          const isFilled = i < filledBlocks
          // 最后一个已填充块高亮闪烁
          const isActive = i === filledBlocks - 1

          return (
            <div
              key={i}
              className={`pixel-render ${isActive ? 'animate-pulse-soft' : ''}`}
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: isFilled
                  ? (isActive ? BLOCK_COLORS.glow : BLOCK_COLORS.filled)
                  : BLOCK_COLORS.empty,
                // 像素块立体感：内嵌高光和阴影
                boxShadow: isFilled
                  ? 'inset -2px -2px 0 rgba(0,0,0,0.1), inset 2px 2px 0 rgba(255,255,255,0.6)'
                  : 'inset 1px 1px 0 rgba(255,255,255,0.5)',
                transition: 'background-color 0.15s steps(1)',
              }}
            />
          )
        })}
      </div>

      {/* 进度百分比（像素字体） */}
      <p
        className="font-pixel"
        style={{ fontSize: '8px', letterSpacing: '0.1em', color: 'rgba(126,34,206,0.8)' }}
      >
        {Math.floor(progress)}%
      </p>
    </div>
  )
}
