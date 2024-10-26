import { create } from 'zustand'
import { client } from '../settings'

type State = {
  accessToken: string | null
  email: string | null
  isAdmin: boolean | null
}

type Actions = {
  login: (email: string, isAdmin: boolean, accessToken: string) => void
  logout: () => void
  getUserData: () => State
}

export const useLoginStore = create<State & Actions>((set) => ({
  accessToken: null,
  email: null,
  isAdmin: null,
  login: (email, isAdmin, accessToken) =>
    set(() => {
      localStorage.setItem(
        '@IMDB/user-data',
        JSON.stringify({
          accessToken,
          email,
          isAdmin,
          timestamp: new Date().getTime(),
        }),
      )
      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return { accessToken, email, isAdmin }
    }),
  getUserData: () => {
    const data = localStorage.getItem('@IMDB/user-data')
    if (data) {
      const { accessToken, email, isAdmin, timestamp } = JSON.parse(data)
      const threeHours = 10800000
      if (new Date().getTime() - timestamp > threeHours) {
        localStorage.removeItem('@IMDB/user-data')
        return { accessToken: null, email: null, isAdmin: null }
      }
      return { accessToken, email, isAdmin }
    }
    return { accessToken: null, email: null, isAdmin: null }
  },
  logout: () => set({ accessToken: null, email: null }),
}))
