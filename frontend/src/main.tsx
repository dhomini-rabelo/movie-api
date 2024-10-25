import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router'
import './app/assets/css/global.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './code/settings'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>,
)
