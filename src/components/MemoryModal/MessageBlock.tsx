// 文案块组件：支持三种排版样式

interface MessageBlockProps {
  text: string
  index: number // 用于决定排版样式
}

// 趣味插图 emoji（穿插在文字间）
const DECORATIVE_EMOJIS = ['🌟', '💫', '🌸', '✨', '🎋', '🌙', '🍀', '🦋', '🌈', '💝']

export default function MessageBlock({ text, index }: MessageBlockProps) {
  const emoji = DECORATIVE_EMOJIS[index % DECORATIVE_EMOJIS.length]

  // 第一段：大号引言样式
  if (index === 0) {
    return (
      <div className="px-6 py-4">
        <p
          className="font-round text-indigo-700 leading-relaxed font-medium"
          style={{ fontSize: '18px', lineHeight: '1.8' }}
        >
          {text}
        </p>
      </div>
    )
  }

  // 偶数段：带左边框的引言样式
  if (index % 3 === 1) {
    return (
      <div className="px-6 py-3">
        <div
          className="pl-4"
          style={{
            borderLeft: '3px solid',
            borderImage: 'linear-gradient(to bottom, #C7CEEA, #FFB7C5) 1',
          }}
        >
          <p className="font-round text-indigo-600/80 text-sm leading-loose">
            {emoji} {text}
          </p>
        </div>
      </div>
    )
  }

  // 奇数段：普通正文样式
  return (
    <div className="px-6 py-3">
      <p className="font-round text-indigo-800/70 text-sm leading-loose">
        {text}
      </p>
    </div>
  )
}
