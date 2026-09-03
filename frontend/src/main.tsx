import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'


// Mount the React application to the root element in index.html.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter enables client-side navigation between application pages. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)