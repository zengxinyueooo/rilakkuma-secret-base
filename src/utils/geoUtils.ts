import * as THREE from 'three'

/**
 * 将经纬度坐标转换为 Three.js 3D 空间坐标
 * @param lat 纬度（-90 ~ 90）
 * @param lng 经度（-180 ~ 180）
 * @param radius 球体半径
 * @returns Three.js Vector3 坐标
 */
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  // 将纬度转换为极角（从北极点算起）
  const phi = (90 - lat) * (Math.PI / 180)
  // 将经度转换为方位角
  const theta = (lng + 180) * (Math.PI / 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

/**
 * 计算两个经纬度点之间的球面角距离（弧度）
 * 用于判断地标是否在相机可见面
 */
export function angularDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const toRad = (deg: number) => deg * (Math.PI / 180)
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
