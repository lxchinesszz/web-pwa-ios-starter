import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from './routes.tsx'
import { watchColorScheme } from './theme.ts'

// Runs before the first render so dark mode never flashes the light surface.
watchColorScheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
     * Hash routing keeps deep links working on plain static hosting: a path
     * based router would 404 on refresh unless the host rewrites to index.html.
     * Swap in `BrowserRouter` once such a rewrite exists.
     */}
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </StrictMode>,
)
