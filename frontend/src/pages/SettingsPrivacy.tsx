import { Card, Empty, Typography } from 'antd';

const { Title } = Typography;

export default function SettingsPrivacy() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={4}>隐私安全</Title>
      <Card>
        <Empty description="此功能即将推出" />
      </Card>
    </div>
  );
}
