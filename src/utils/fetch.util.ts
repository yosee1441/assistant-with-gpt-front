import { envs } from '@/envs'

export function fetchOpenAi<T>(
  url: string,
  config: RequestInit = {},
): Promise<T> {
  return fetch(`${envs.apiUrl}/api/${url}`, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((data) => data as T)
}

export function fetchStreamOpenAi<T>(
  url: string,
  config: RequestInit = {},
): Promise<T> {
  return fetch(`${envs.apiUrl}/api/${url}`, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response
    })
    .then((response) => response.body?.getReader())
    .then((data) => data as T)
}
