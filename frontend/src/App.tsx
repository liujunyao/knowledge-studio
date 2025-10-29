import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import SettingsLayout from '@/layouts/SettingsLayout';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';
import Knowledge from '@/pages/Knowledge';
import SettingsModels from '@/pages/SettingsModels';
import SettingsAccount from '@/pages/SettingsAccount';
import SettingsAppearance from '@/pages/SettingsAppearance';
import SettingsNotifications from '@/pages/SettingsNotifications';
import SettingsPrivacy from '@/pages/SettingsPrivacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 首页 */}
          <Route index element={<Home />} />

          {/* 聊天页面 - 支持带 ID 和不带 ID 两种形式 */}
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:id" element={<Chat />} />

          {/* 知识库 */}
          <Route path="knowledge" element={<Knowledge />} />

          {/* 设置 - 使用左右布局 */}
          <Route path="settings" element={<SettingsLayout><Outlet /></SettingsLayout>}>
            <Route index element={<SettingsModels />} />
            <Route path="models" element={<SettingsModels />} />
            <Route path="account" element={<SettingsAccount />} />
            <Route path="appearance" element={<SettingsAppearance />} />
            <Route path="notifications" element={<SettingsNotifications />} />
            <Route path="privacy" element={<SettingsPrivacy />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
