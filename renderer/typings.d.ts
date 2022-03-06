declare global {
  interface Window {
    electronAPI: IElectronAPI
    darkMode: darkMode
  }
  type GithubJson = GithubJsonDef
}

export interface IElectronAPI {
  loadPreferences: () => Promise<void>
  send(channel: string, ...args: any[]): void
  sendSync(channel: string, ...args: any[]): any
  receive(channel: string, listener: (...args: any[]) => void): () => void
}

export interface darkMode {
  toggle:  () => Promise<boolean>
  system: () => Promise<void>
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
