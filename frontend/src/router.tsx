import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { RegisterPage } from './app/pages/register/page'
import { LoginPage } from './app/pages/login/page'
import { MyShortcutsPage } from './app/pages/my-shortcuts/page'
import { PublicShortcutsPage } from './app/pages/index/page'
import { FolderPage } from './app/pages/folder-page/page'
import Auth from './app/components/utils/Auth'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicShortcutsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/folders/:folderId" element={<FolderPage />} />
        <Route element={<Auth />}>
          <Route path="/my-shortcuts" element={<MyShortcutsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
