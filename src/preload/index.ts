import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


const api = {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  importCards: (filePath?: string) => ipcRenderer.invoke('cards:import', filePath),
  onImportProgress: (callback: (progress: any) => void) => {
    const listener = (_event: unknown, progress: any) => callback(progress)
    ipcRenderer.on('import:progress', listener)
    return () => ipcRenderer.removeListener('import:progress', listener) // cleanup fn
  },
  getAllCards: (options?: { page?: number; pageSize?: number; search?: string }) =>
    ipcRenderer.invoke('cards:getAll', options),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}