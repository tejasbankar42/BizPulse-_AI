import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore, useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'
import { BottomTabBar } from './BottomTabBar'
import { TopBar } from './TopBar'
import { CommandPalette } from './CommandPalette'
import { ToastContainer } from './ToastContainer'

export function AppLayout() {
  const { isAuthenticated } = useAuthStore()
  const { sidebarOpen } = useAppStore()

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <CommandPalette />

      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-200',
          'md:ml-sidebar',
          !sidebarOpen && 'md:ml-sidebar-collapsed'
        )}
      >
        <TopBar />

        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>

      <BottomTabBar />
      <ToastContainer />
    </div>
  )
}
