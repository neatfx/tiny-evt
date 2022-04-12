/// <reference types="vite/client" />

declare global {
  interface Window {
    electronDarkMode: ElectronDarkMode
    electronDatabase: ElectronDatabase
    electronDouban: ElectronDouban
  }
  type GithubJson = GithubJsonDef
}

export interface ElectronDarkMode {
  toggle: () => Promise<boolean>
  system: () => Promise<string>
}

export interface ElectronDatabase {
  saveExportedDatabaseFile: (file: Blob) => Promise<void>
}

export interface ElectronDouban {
  suggestBook: (keyword: string) => Promise<any>
}
