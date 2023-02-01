import React, { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'src/reset.css'
import 'src/index.css'

import App from 'src/App'
import { AppProvider } from 'src/data/contexts/AppProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App tab="home" />
      </AppProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
