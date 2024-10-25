import { create } from 'zustand'
import { client } from '../settings'

type State = {
  accessToken: string | null
  email: string | null
}

type Actions = {
  login: (email: string, accessToken: string) => void
  logout: () => void
  getUserData: () => State
}

export const useLoginStore = create<State & Actions>((set) => ({
  accessToken: null,
  email: null,
  login: (email, accessToken) =>
    set(() => {
      localStorage.setItem(
        '@IMDB/user-data',
        JSON.stringify({
          accessToken,
          email,
          timestamp: new Date().getTime(),
        }),
      )
      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return { accessToken, email }
    }),
  getUserData: () => {
    const data = localStorage.getItem('@IMDB/user-data')
    if (data) {
      const { accessToken, email, timestamp } = JSON.parse(data)
      const threeHours = 10800000
      if (new Date().getTime() - timestamp > threeHours) {
        localStorage.removeItem('@IMDB/user-data')
        return { accessToken: null, email: null }
      }
      return { accessToken, email }
    }
    return { accessToken: null, email: null }
  },
  logout: () => set({ accessToken: null, email: null }),
}))
