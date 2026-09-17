import { Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import DataPage from './pages/DataPage.tsx'
import FeedbackPage from './pages/FeedbackPage.tsx'
import FormPage from './pages/FormPage.tsx'
import ListPage from './pages/ListPage.tsx'
import MessagesPage from './pages/MessagesPage.tsx'
import MorePage from './pages/MorePage.tsx'
import NavigationPage from './pages/NavigationPage.tsx'
import OverviewPage from './pages/OverviewPage.tsx'

/**
 * Route table. Every page lives under the shared `App` layout so the tab bar
 * and scroll container stay mounted while pages swap.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<OverviewPage />} />
        <Route path="form" element={<FormPage />} />
        <Route path="list" element={<ListPage />} />
        <Route path="nav" element={<NavigationPage />} />
        <Route path="more" element={<MorePage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="data" element={<DataPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="*" element={<OverviewPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
