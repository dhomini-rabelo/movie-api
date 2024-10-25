import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { LoginPage } from './app/pages/login/page'
import { MyShortcutsPage } from './app/pages/my-shortcuts/page'
import { MoviesPage } from './app/pages/index/page'
import { FolderPage } from './app/pages/folder-page/page'
import Auth from './app/components/utils/Auth'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/folders/:folderId" element={<FolderPage />} />
        <Route element={<Auth />}>
          <Route path="/my-shortcuts" element={<MyShortcutsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
