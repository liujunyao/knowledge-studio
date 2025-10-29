import { Card, Empty, Typography } from 'antd';

const { Title } = Typography;

export default function SettingsNotifications() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={4}>通知设置</Title>
      <Card>
        <Empty description="此功能即将推出" />
      </Card>
    </div>
  );
}
