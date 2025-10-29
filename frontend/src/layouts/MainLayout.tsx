import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MessageOutlined, DatabaseOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/chat',
      icon: <MessageOutlined />,
      label: '对话',
    },
    {
      key: '/knowledge',
      icon: <DatabaseOutlined />,
      label: '知识库',
    },
  ];

  // 获取当前选中的菜单项
  const getSelectedKey = () => {
    if (location.pathname.startsWith('/chat')) {
      return '/chat';
    }
    return location.pathname;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          lineHeight: '64px',
        }}
      >
        {/* 左侧 Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            height: '100%',
          }}
        >
          <img src="/logo-simple.svg" alt="Logo" style={{ width: 32, height: 32 }} />
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#6366f1',
              whiteSpace: 'nowrap',
            }}
          >
            Knowledge Studio
          </span>
        </Link>

        {/* 中间菜单 */}
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
            marginLeft: 48,
            minWidth: 0,
          }}
        />

        {/* 右侧设置 */}
        <Link
          to="/settings/models"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            textDecoration: 'none',
            color: location.pathname.startsWith('/settings') ? '#6366f1' : '#4b5563',
            backgroundColor: location.pathname.startsWith('/settings') ? '#eef2ff' : 'transparent',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (!location.pathname.startsWith('/settings')) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (!location.pathname.startsWith('/settings')) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <SettingOutlined style={{ fontSize: 16 }} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>设置</span>
        </Link>
      </Header>

      {/* 主内容区 */}
      <Content style={{ backgroundColor: '#f9fafb' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
