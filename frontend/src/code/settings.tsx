import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const BASE_URL = 'http://localhost:5000/api/'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const client = axios.create({
  baseURL: BASE_URL,
}) // with Authentication

export const simpleClient = axios.create({
  baseURL: BASE_URL,
}) // without Authentication
