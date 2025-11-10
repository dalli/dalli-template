import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import App from './App'
import theme from './theme/theme'
import { AuthProvider } from './contexts/AuthContext'
import './i18n/config'

// Get saved theme from localStorage or default to 'system'
const getInitialMode = (): 'light' | 'dark' | 'system' => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
    return savedTheme
  }
  return 'system'
}

// Get actual mode based on theme preference
const getActualMode = (): 'light' | 'dark' => {
  const savedTheme = getInitialMode()
  if (savedTheme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }
  return savedTheme
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode={getActualMode()}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </React.StrictMode>,
)
