import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App' // Adjust this path if your App is in the root src folder instead
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)