// 所有城市地标组件：遍历 locations 渲染所有标记（V5：纯 3D 光点，不含交互）

import CityMarker from './CityMarker'
import { locations } from '@/data/locations'

interface CityMarkersGroupProps {
  unlockedCityIds: string[]
  newlyUnlockedCityId: string | null
}

export default function CityMarkersGroup({ unlockedCityIds, newlyUnlockedCityId }: CityMarkersGroupProps) {
  return (
    <>
      {locations.map((location) => (
        <CityMarker
          key={location.id}
          location={location}
          isUnlocked={unlockedCityIds.includes(location.id)}
          isNewlyUnlocked={newlyUnlockedCityId === location.id}
        />
      ))}
    </>
  )
}
