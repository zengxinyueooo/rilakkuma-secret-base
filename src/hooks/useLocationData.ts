// 城市数据管理 Hook
// 照片上传到腾讯云 COS，IndexedDB 存储图片 URL

import { useState, useCallback, useEffect, useRef } from 'react'
import COS from 'cos-js-sdk-v5'
import { locations as staticLocations } from '@/data/locations'
import type { CityLocation } from '@/types'

// ===== 腾讯云 COS 配置 =====
const COS_BUCKET = 'tt-1431235163'
const COS_REGION = 'ap-shanghai'

const cos = new COS({
  SecretId: 'AKIDGh9cBaq4IXfjdMq67vVqwKYXHyb1FUgj',
  SecretKey: 'sf6h6WlneMtKXXLwIPK7pQp0582ta2GV',
})

// ===== IndexedDB 配置 =====
const DB_NAME = 'rilakkuma-db'
const DB_VERSION = 1
const STORE_NAME = 'memories'

// localStorage 旧数据的 key（用于自动迁移）
const LEGACY_STORAGE_KEY = 'rilakkuma-memories'

interface CityEdit {
  photos: string[]  // base64 dataURL 字符串
  text: string
}

type StorageData = Record<string, CityEdit>

// ===== IndexedDB 工具函数 =====

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror = () => reject(req.error)
  })
}


function dbGetAll(db: IDBDatabase): Promise<StorageData> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const result: StorageData = {}
    const keysReq = store.getAllKeys()
    keysReq.onsuccess = () => {
      const keys = keysReq.result as string[]
      if (keys.length === 0) { resolve(result); return }
      let remaining = keys.length
      keys.forEach(key => {
        const valReq = store.get(key)
        valReq.onsuccess = () => {
          result[key] = valReq.result as CityEdit
          remaining--
          if (remaining === 0) resolve(result)
        }
        valReq.onerror = () => reject(valReq.error)
      })
    }
    keysReq.onerror = () => reject(keysReq.error)
  })
}

function dbSet(db: IDBDatabase, id: string, data: CityEdit): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const req = tx.objectStore(STORE_NAME).put(data, id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

// ===== 从 localStorage 迁移旧数据 =====
async function migrateFromLocalStorage(db: IDBDatabase): Promise<void> {
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return
    const legacy = JSON.parse(raw) as StorageData
    const entries = Object.entries(legacy)
    if (entries.length === 0) return
    // 逐条写入 IndexedDB
    for (const [id, edit] of entries) {
      await dbSet(db, id, edit)
    }
    // 迁移成功后清除 localStorage 旧数据
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    console.log(`已从 localStorage 迁移 ${entries.length} 个城市数据到 IndexedDB`)
  } catch (e) {
    console.warn('迁移旧数据失败', e)
  }
}

// ===== 数据合并 =====
function mergeLocations(storage: StorageData): CityLocation[] {
  return staticLocations.map(loc => {
    const edit = storage[loc.id]
    if (!edit) return loc
    return {
      ...loc,
      photos: edit.photos.length > 0 ? edit.photos : loc.photos,
      text: edit.text || loc.text,
    }
  })
}

// ===== 图片压缩：Canvas resize 到最大 800px，quality 0.8 =====
export async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const MAX = 800
      let { width, height } = img

      if (width > MAX || height > MAX) {
        if (width > height) {
          height = Math.round((height * MAX) / width)
          width = MAX
        } else {
          width = Math.round((width * MAX) / height)
          height = MAX
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Canvas not supported')); return }

      ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('图片加载失败')) }
    img.src = url
  })
}

// ===== 上传图片到腾讯云 COS，返回公开 URL =====
export async function uploadImageToCOS(file: File): Promise<string> {
  // 先压缩图片
  const dataURL = await compressImage(file)

  // base64 转 Blob
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  const u8arr = new Uint8Array(bstr.length)
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i)
  const blob = new Blob([u8arr], { type: mime })

  // 生成唯一文件名
  const ext = mime === 'image/jpeg' ? 'jpg' : 'png'
  const key = `memories/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: COS_BUCKET,
        Region: COS_REGION,
        Key: key,
        Body: blob,
        ContentType: mime,
      },
      (err) => {
        if (err) { reject(err); return }
        resolve(`https://${COS_BUCKET}.cos.${COS_REGION}.myqcloud.com/${key}`)
      }
    )
  })
}

// ===== Hook =====
export function useLocationData() {
  const [storageData, setStorageData] = useState<StorageData>({})
  const [ready, setReady] = useState(false)
  const dbRef = useRef<IDBDatabase | null>(null)

  // 初始化：打开 DB → 迁移旧数据 → 读取全部数据
  useEffect(() => {
    let cancelled = false
    openDB().then(async (db) => {
      dbRef.current = db
      await migrateFromLocalStorage(db)
      const all = await dbGetAll(db)
      if (!cancelled) {
        setStorageData(all)
        setReady(true)
      }
    }).catch(e => {
      console.error('IndexedDB 初始化失败', e)
      if (!cancelled) setReady(true)
    })
    return () => { cancelled = true }
  }, [])

  // 合并后的 locations（静态数据 + IndexedDB 覆盖）
  const locations = mergeLocations(storageData)

  // 更新某个城市的数据（同时写入 IndexedDB 和 React state）
  const updateCity = useCallback(async (id: string, edit: Partial<CityEdit>) => {
    const db = dbRef.current
    if (!db) return
    setStorageData(prev => {
      const current = prev[id] ?? { photos: [], text: '' }
      const updated = { ...current, ...edit }
      // 异步写入 IndexedDB
      dbSet(db, id, updated).catch(e => console.error('写入 IndexedDB 失败', e))
      return { ...prev, [id]: updated }
    })
  }, [])

  // 导出所有编辑数据为 JSON 文件
  const exportData = useCallback(async () => {
    const db = dbRef.current
    const data = db ? await dbGetAll(db) : storageData
    const exportObj = {
      exportedAt: new Date().toISOString(),
      data,
    }
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'memories-export.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [storageData])

  // 检查某个城市是否有本地编辑数据
  const hasLocalData = useCallback((id: string) => {
    return !!storageData[id]
  }, [storageData])

  return { locations, updateCity, exportData, hasLocalData, ready }
}
