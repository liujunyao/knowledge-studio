import { Card, Empty, Typography } from 'antd';

const { Title } = Typography;

export default function SettingsAppearance() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={4}>外观设置</Title>
      <Card>
        <Empty description="此功能即将推出" />
      </Card>
    </div>
  );
}
