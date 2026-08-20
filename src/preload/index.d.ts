import { ElectronAPI } from '@electron-toolkit/preload'
import { Card } from '@shared/index'

export interface Api {
  minimize: () => void
  maximize: () => void
  close: () => void
  importCards: (filePath?: string) => Promise<any>
  onImportProgress: (callback: (progress: any) => void) => () => void,
  getAllCards: (options?: { page?: number; pageSize?: number; search?: string }) => Promise<{
    cards: Card[]
    total: number
    page: number
    pageSize: number
  }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

export { }