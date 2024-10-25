import { create } from 'zustand'
import { client } from '../settings'

type State = {
  accessToken: string | null
  username: string | null
}

type Actions = {
  login: (username: string, accessToken: string) => void
  logout: () => void
  getUserData: () => State
}

export const useLoginStore = create<State & Actions>((set) => ({
  accessToken: null,
  username: null,
  login: (username, accessToken) =>
    set(() => {
      localStorage.setItem(
        '@GPT-CUTS/user-data',
        JSON.stringify({
          accessToken,
          username,
          timestamp: new Date().getTime(),
        }),
      )
      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return { accessToken, username }
    }),
  getUserData: () => {
    const data = localStorage.getItem('@GPT-CUTS/user-data')
    if (data) {
      const { accessToken, username, timestamp } = JSON.parse(data)
      const threeHours = 10800000
      if (new Date().getTime() - timestamp > threeHours) {
        localStorage.removeItem('@GPT-CUTS/user-data')
        return { accessToken: null, username: null }
      }
      return { accessToken, username }
    }
    return { accessToken: null, username: null }
  },
  logout: () => set({ accessToken: null, username: null }),
}))
