import type { CityLocation } from '@/types'

/**
 * =====================================================
 * 🐻 回忆地标数据文件
 * =====================================================
 *
 * 如何修改：
 * - name: 城市英文名
 * - chineseName: 城市中文名
 * - coordinates: [纬度, 经度]（可在高德地图/谷歌地图右键获取）
 * - emoji: 地标图标
 * - photos: 照片数组（放在 public/images/<id>/ 目录下），第一张为封面
 * - text: 回忆文案
 * - isLast: 最后一个城市设为 true（触发彩蛋）
 * =====================================================
 */
export const locations: CityLocation[] = [
  {
    id: 'xian',
    name: "Xi'an",
    chineseName: '西安',
    coordinates: [34.3416, 108.9398],
    emoji: '🏯',
    photos: [
      '/images/xian/photo1.jpg',
      '/images/xian/photo2.jpg',
      '/images/xian/photo3.jpg',
    ],
    text: '西安，一座用时间堆砌的城市。每一块城砖都藏着故事，每一条街道都飘着历史的余温。在这里，我们一起走过了古城墙，看日落把整座城市染成金色。羊肉泡馍、凉皮、肉夹馍……每一口都是记忆里最温暖的味道。',
  },
  {
    id: 'nanjing',
    name: 'Nanjing',
    chineseName: '南京',
    coordinates: [32.0603, 118.7969],
    emoji: '🌸',
    photos: [
      '/images/nanjing/photo1.jpg',
      '/images/nanjing/photo2.jpg',
      '/images/nanjing/photo3.jpg',
    ],
    text: '南京的梧桐树是会说话的，它们见证了这座城市所有的悲欢离合。秦淮河的灯光倒映在水面，像是把整个夜晚都点亮了。鸭血粉丝汤、盐水鸭、糖葫芦……南京的美食是治愈一切的良药。',
  },
  {
    id: 'suzhou',
    name: 'Suzhou',
    chineseName: '苏州',
    coordinates: [31.2989, 120.5853],
    emoji: '🪷',
    photos: [
      '/images/suzhou/photo1.jpg',
      '/images/suzhou/photo2.jpg',
      '/images/suzhou/photo3.jpg',
    ],
    text: '苏州像一首轻声哼唱的江南小调，不急不躁，温婉动人。走进拙政园，感觉时间都慢下来了。每一处回廊，每一方水池，都是一幅画。苏式汤面的浇头，是这座城市对旅人最温柔的款待。',
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    chineseName: '上海',
    coordinates: [31.2304, 121.4737],
    emoji: '✨',
    photos: [
      '/images/shanghai/photo1.jpg',
      '/images/shanghai/photo2.jpg',
      '/images/shanghai/photo3.jpg',
    ],
    text: '上海是一座永远不会睡着的城市。白天是摩登都市，夜晚是璀璨星河。站在外滩，对岸的陆家嘴像是一场未来感十足的梦。弄堂里的生煎包，和外滩的夜景一样，都是上海独有的浪漫。',
  },
  {
    id: 'haikou',
    name: 'Haikou',
    chineseName: '海口',
    coordinates: [20.0440, 110.1990],
    emoji: '🥥',
    photos: [
      '/images/haikou/photo1.jpg',
      '/images/haikou/photo2.jpg',
      '/images/haikou/photo3.jpg',
    ],
    text: '海口是海南岛的大门，热带的阳光在这里格外慷慨。骑楼老街的建筑，融合了东西方的审美，每一栋都有自己的故事。清补凉、椰子鸡……海南的味道，是阳光和海浪的味道。',
  },
  {
    id: 'wenchang',
    name: 'Wenchang',
    chineseName: '文昌',
    coordinates: [19.5430, 110.7980],
    emoji: '🚀',
    photos: [
      '/images/wenchang/photo1.jpg',
      '/images/wenchang/photo2.jpg',
      '/images/wenchang/photo3.jpg',
    ],
    text: '文昌是一个让人仰望星空的地方。火箭从这里出发，飞向无垠的宇宙。在航天发射场附近，感受到了人类探索未知的勇气和浪漫。文昌鸡，皮薄肉嫩，是这座城市最朴实的骄傲。',
  },
  {
    id: 'wanning',
    name: 'Wanning',
    chineseName: '万宁',
    coordinates: [18.7960, 110.3880],
    emoji: '🏄',
    photos: [
      '/images/wanning/photo1.jpg',
      '/images/wanning/photo2.jpg',
      '/images/wanning/photo3.jpg',
    ],
    text: '万宁的日月湾是中国冲浪运动的发源地，海浪在这里永远充满活力。看着冲浪者在浪尖起舞，感觉整个世界都自由了。海边的烤生蚝，就着海风，是最简单也最幸福的人间美味。',
  },
  {
    id: 'sanya',
    name: 'Sanya',
    chineseName: '三亚',
    coordinates: [18.2528, 109.5119],
    emoji: '🌺',
    photos: [
      '/images/sanya/photo1.jpg',
      '/images/sanya/photo2.jpg',
      '/images/sanya/photo3.jpg',
    ],
    text: '三亚是中国最南端的浪漫。碧蓝的海水，洁白的沙滩，还有永远温暖的阳光。天涯海角，不是终点，是我们一起看过的最美的风景。在这里，时间变得特别慢，每一秒都值得珍藏。',
  },
  {
    id: 'shenyang',
    name: 'Shenyang',
    chineseName: '沈阳',
    coordinates: [41.8057, 123.4315],
    emoji: '🏛️',
    photos: [
      '/images/shenyang/photo1.jpg',
      '/images/shenyang/photo2.jpg',
      '/images/shenyang/photo3.jpg',
    ],
    text: '沈阳故宫，是北京故宫的"兄弟"，却有着东北特有的豪迈与厚重。走在中街，感受到了这座城市最真实的生活气息。锅包肉、小鸡炖蘑菇……东北菜的份量，和东北人的热情一样大。',
  },
  {
    id: 'changbaishan',
    name: 'Changbaishan',
    chineseName: '长白山',
    coordinates: [42.0667, 128.0667],
    emoji: '🏔️',
    photos: [
      '/images/changbaishan/photo1.jpg',
      '/images/changbaishan/photo2.jpg',
      '/images/changbaishan/photo3.jpg',
    ],
    text: '长白山天池是大自然最神秘的礼物。那片碧蓝的水面，倒映着天空，美得让人屏息。站在山顶，云雾在脚下翻涌，感觉自己站在了世界的边缘。长白山的冬天，是童话里才有的雪白世界。',
  },
  {
    id: 'yanji',
    name: 'Yanji',
    chineseName: '延吉',
    coordinates: [42.9100, 129.5100],
    emoji: '🍜',
    photos: [
      '/images/yanji/photo1.jpg',
      '/images/yanji/photo2.jpg',
      '/images/yanji/photo3.jpg',
    ],
    text: '延吉是一座双语城市，街道上的招牌用两种文字诉说着这里独特的文化。朝鲜族的传统服饰色彩鲜艳，在阳光下像彩虹一样美丽。延吉冷面、打糕、辣白菜……每一口都是异域风情的惊喜。',
  },
  {
    id: 'harbin',
    name: 'Harbin',
    chineseName: '哈尔滨',
    coordinates: [45.8038, 126.5350],
    emoji: '❄️',
    photos: [
      '/images/harbin/photo1.jpg',
      '/images/harbin/photo2.jpg',
      '/images/harbin/photo3.jpg',
    ],
    text: '哈尔滨的冬天是一场盛大的童话。冰雕城堡在灯光下闪耀，整个城市都变成了水晶宫。中央大街的欧式建筑，让这座城市有了"东方小巴黎"的美誉。红肠、大列巴、马迭尔冰棍……哈尔滨的美食，是这座城市最温暖的记忆。',
    isLast: true,
  },
]
