import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Button, Space, Spin } from 'antd';
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
import SpaceDetail from '@/pages/SpaceDetail';
import { useBackendStatus } from '@/hooks/useBackendStatus';

function App() {
  const { ready, error, attempts, elapsed, retry } = useBackendStatus();

  const overlayVisible = !ready;
  const seconds = Math.floor(elapsed / 1000);

  const handleRetry = () => {
    retry();
  };

  const handleExit = () => {
    window.close();
  };

  return (
    <>
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
            <Route path="knowledge/:spaceId" element={<SpaceDetail />} />

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
      {overlayVisible ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(249, 250, 251, 0.92)',
            backdropFilter: 'blur(3px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', minWidth: 320 }}>
            {!error ? (
              <Space direction="vertical" size={16} style={{ alignItems: 'center', width: '100%' }}>
                <Spin size="large" />
                <div style={{ fontSize: 16, color: '#475569' }}>正在启动服务，请稍候…</div>
                </Space>
            ) : (
              <Space direction="vertical" size={18} style={{ alignItems: 'center', width: '100%' }}>
                <div style={{ fontSize: 32 }}>⚠️</div>
                <div style={{ fontSize: 16, color: '#b91c1c' }}>无法连接后端服务</div>
                <div style={{ fontSize: 13, color: '#94a3b8', maxWidth: 320 }}>
                  {error}
                </div>
                <Space>
                  <Button onClick={handleRetry} type="primary">
                    重试
                  </Button>
                  <Button onClick={handleExit}>退出应用</Button>
                </Space>
              </Space>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
