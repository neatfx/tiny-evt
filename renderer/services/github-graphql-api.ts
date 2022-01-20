import mockData from './mock-data'

export class GithubGraphqlApi {
  private config: {
    headers: Record<string, string>
  } = { headers: {} }
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

    // console.log('import.meta.env.VITE_GITHUB_TOKEN: ', import.meta.env.VITE_GITHUB_TOKEN)

    if (import.meta.env.VITE_APP_ENV !== 'development') {
      // TODO: retrieve configs from local file via main-process
    }
  }

  public getContribution = async (user_name: String): Promise<GithubJson> => {
    if (import.meta.env.VITE_APP_ENV !== 'development') {
      return Promise.resolve(mockData)
    }

    if (!import.meta.env.VITE_GITHUB_TOKEN) {
      throw new Error('Add GITHUB_TOKEN to .env-cmdrc.json first')
    }

    this.config.headers['Authorization'] = String(
      import.meta.env.VITE_GITHUB_TOKEN
    )

    const postBody = {
      query:
        `{
        user(login: \"` +
        user_name +
        `\"){
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
  data: {
    user: {
      name: string
      followers: {
        totalCount: number
      }
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: {
            contributionDays: {
              color: string
              contributionCount: number
              date: string
            }[]
          }[]
        }
      }
    }
  }
}
