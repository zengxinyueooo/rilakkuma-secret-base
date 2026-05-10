// ===== 城市地标数据类型 =====

export interface CityLocation {
  /** 唯一标识符，同时对应 public/images/<id>/ 目录 */
  id: string
  /** 城市英文名（主标题） */
  name: string
  /** 城市中文名（副标题） */
  chineseName: string
  /** 坐标 [纬度, 经度] */
  coordinates: [number, number]
  /** 地标 emoji */
  emoji: string
  /** 照片路径数组（第一张自动作为封面） */
  photos: string[]
  /** 回忆文案（单段） */
  text: string
  /** 是否是最后一个城市（用于触发彩蛋） */
  isLast?: boolean
}

// ===== 应用状态类型 =====

/** 应用阶段：加载中 | 地球主页 */
export type AppPhase = 'loading' | 'globe'
