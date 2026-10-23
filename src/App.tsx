import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthPage } from '@/pages/AuthPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={<PlaceholderPage titleKey="dashboard.title" />}
          />
          <Route
            path="upload"
            element={<PlaceholderPage titleKey="upload.title" />}
          />
          <Route
            path="chat"
            element={<PlaceholderPage titleKey="chat.title" />}
          />
          <Route
            path="insights"
            element={<PlaceholderPage titleKey="insights.title" />}
          />
          <Route
            path="actions"
            element={<PlaceholderPage titleKey="actions.title" />}
          />
          <Route
            path="reports"
            element={<PlaceholderPage titleKey="reports.title" />}
          />
          <Route
            path="evaluation"
            element={<PlaceholderPage titleKey="nav.evaluation" />}
          />
          <Route
            path="settings"
            element={<PlaceholderPage titleKey="settings.title" />}
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
