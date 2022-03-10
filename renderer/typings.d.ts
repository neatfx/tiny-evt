declare global {
  interface Window {
    electronDarkMode: ElectronDarkMode
    electronDatabase: ElectronDatabase
  }
  type GithubJson = GithubJsonDef
}

export interface ElectronDarkMode {
  toggle: () => Promise<boolean>
  system: () => Promise<string>
}

export interface ElectronDatabase {
  resetTesting: () => Promise<Contact[]>
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
