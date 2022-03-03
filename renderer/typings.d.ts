declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
  // type GithubJson = GithubJsonDef
  // interface ImportMeta {
  //   env: any
  // }
}

export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
  send(channel: string, ...args: any[]): void
  sendSync(channel: string, ...args: any[]): any
  receive(channel: string, listener: (...args: any[]) => void): () => void
}

// type GithubJsonDef = {
//   "data": {
//       "user": {
//           "name": string
//           "followers": {
//               "totalCount": number
//           }
//           "contributionsCollection": {
//               "contributionCalendar": {
//                   "totalContributions": number
//                   "weeks": {
//                       "contributionDays": {
//                           "color": string
//                           "contributionCount": number
//                           "date": string
//                       }[]
//                   }[]
//               }
//           }
//       }
//   }
// }
