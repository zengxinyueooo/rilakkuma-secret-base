/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 珠光色系背景
        pearl: {
          white: '#F8F9FF',
          blue: '#EEF2FF',
          soft: '#F0F4FF',
        },
        // 马卡龙点缀色（低饱和度）
        macaron: {
          pink: '#FFB7C5',
          mint: '#B5EAD7',
          lavender: '#C7CEEA',
          peach: '#FFDAC1',
          yellow: '#FFF3B0',
          sky: '#C4E4FF',
        },
        // 天空蓝色系（V2 新增）
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        // 梦幻蓝紫色系（V2 新增）
        dream: {
          light: '#EEF2FF',
          soft: '#E0E7FF',
          mid: '#C7D2FE',
          deep: '#818CF8',
        },
      },
      fontFamily: {
        // 圆润可爱字体
        round: ['Nunito', 'DM Sans', 'system-ui', 'sans-serif'],
        // 像素风字体
        pixel: ['"Press Start 2P"', 'monospace'],
        // Apple 风格字体（V2 标题用）
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      animation: {
        // 浮动动画
        'float': 'float 3s ease-in-out infinite',
        // 像素元素跳动
        'pixel-bounce': 'pixelBounce 0.6s steps(2) infinite',
        // 星星闪烁
        'twinkle': 'twinkle 2s ease-in-out infinite',
        // 进度条呼吸
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        // 轻松熊跑动（V2 新增）
        'bear-run': 'bearRun 8s linear infinite',
        // 星星逐个点亮（V2 新增）
        'star-appear': 'starAppear 0.3s ease-out forwards',
        // 慢速闪烁（背景星星用）
        'twinkle-slow': 'twinkle 3s ease-in-out infinite',
        'twinkle-fast': 'twinkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pixelBounce: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
          '100%': { transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.7)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        // 轻松熊从左跑到右
        bearRun: {
          '0%': { transform: 'translateX(-80px)' },
          '100%': { transform: 'translateX(calc(100vw + 80px))' },
        },
        // 星星出现
        starAppear: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '60%': { opacity: '1', transform: 'scale(1.3)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
