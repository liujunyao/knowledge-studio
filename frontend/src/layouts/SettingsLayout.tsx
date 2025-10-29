import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  BgColorsOutlined,
  KeyOutlined,
  SettingOutlined,
  BellOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const settingsMenuItems = [
    {
      key: '/settings/models',
      icon: <BgColorsOutlined />,
      label: '模型配置',
    },
    {
      key: '/settings/account',
      icon: <KeyOutlined />,
      label: '账户设置',
    },
    {
      key: '/settings/appearance',
      icon: <SettingOutlined />,
      label: '外观设置',
    },
    {
      key: '/settings/notifications',
      icon: <BellOutlined />,
      label: '通知设置',
    },
    {
      key: '/settings/privacy',
      icon: <SafetyOutlined />,
      label: '隐私安全',
    },
  ];

  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* 左侧 Sidebar */}
      <Sider
        width={240}
        style={{
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
        }}
      >
        <div style={{ padding: '24px 16px' }}>
          <Title level={4} style={{ margin: 0, color: '#111827' }}>
            设置
          </Title>
        </div>

        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={settingsMenuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            backgroundColor: 'transparent',
            borderRight: 'none',
          }}
        />
      </Sider>

      {/* 右侧主内容区 */}
      <Content
        style={{
          backgroundColor: '#ffffff',
          overflow: 'auto',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
