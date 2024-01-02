import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalGameProvider, GlobalUserProvider } from './contexts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalUserProvider>
        <GlobalGameProvider>
          <App />
        </GlobalGameProvider>
      </GlobalUserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
