declare global {
  interface Window {
    electronDarkMode: ElectronDarkMode
    electronDatabase: ElectronDatabase
  }
  type GithubJson = GithubJsonDef
}

export interface ElectronDarkMode {
  toggle: () => Promise<boolean>
  system: () => Promise<void>
}

export interface ElectronDatabase {
  resetTesting: () => Promise<boolean>
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
