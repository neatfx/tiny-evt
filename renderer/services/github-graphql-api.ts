import mockData from './mock-data'

export class GithubGraphqlApi {
  private config: {
    headers: Record<string, string>
  } = { headers: {}}
  private baseUrl: string = ''

  public constructor() {
    this._initializeRequest()
  }

  private _initializeRequest = () => {
      this._handleRequest()
  }

  private _handleRequest = () => {
    this.baseUrl = 'https://api.github.com/graphql'
    this.config.headers['content-type'] = 'application/json'
    if(process.env.APP_ENV === 'development') {
      // console.log('env: ', process.env)
      this.config.headers['Authorization'] = process.env.GITHUB_TOKEN || ''
      if (!process.env.GITHUB_TOKEN) {
        throw new Error('Add GITHUB_TOKEN to .env-cmdrc.json first')
      }
    } else {
      // TODO: retrieve configs from local file via main-process
    }
  }

  public getContribution = async(): Promise<GithubJson> => {
    if(process.env.APP_ENV !== 'development') {
      return Promise.resolve(mockData)
    }

    const postBody = {
      query: `{
        user(login: \"neatfx\"){
          name,
          followers { totalCount },
          contributionsCollection {
            contributionCalendar {
              totalContributions,
              weeks {
                contributionDays {
                  color,
                  contributionCount,
                  date
                }
              }
            }
          }
        }
      }`
    }

    let response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify(postBody)
    })

    return response.json()
  }
}

type GithubJson = {
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