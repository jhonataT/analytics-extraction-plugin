import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeContextProvider } from './core/providers/theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
)
