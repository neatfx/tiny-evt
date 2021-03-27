declare global {
  interface Window {
    ipcApi: IpcApi
  }
  // type GithubJson = GithubJsonDef
  interface ImportMeta {
    env: any;
  }
}

export interface IpcApi {
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
