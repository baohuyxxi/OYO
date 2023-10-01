import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import CssBaseline from '@mui/material/CssBaseline'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />
        <App />
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
