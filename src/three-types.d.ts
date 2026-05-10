// 扩展 React JSX 以支持 @react-three/fiber 的 Three.js 元素
import type { ThreeElements } from '@react-three/fiber'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
