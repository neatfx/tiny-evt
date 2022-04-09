/// <reference types="vite/client" />

declare global {
  interface Window {
    electronDarkMode: ElectronDarkMode
    electronDatabase: ElectronDatabase
    electronDouban: ElectronDouban
  }
  type GithubJson = GithubJsonDef
}

declare module 'segmentit';

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

type GithubJsonDef = {
  "data": {
    "user": {
      "name": string
      "followers": {
        "totalCount": number
      }
      "contributionsCollection": {
        "contributionCalendar": {
          "totalContributions": number
          "weeks": {
            "contributionDays": {
              "color": string
              "contributionCount": number
              "date": string
            }[]
          }[]
        }
      }
    }
  }
}
