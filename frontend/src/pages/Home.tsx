import { useNavigate } from 'react-router-dom';
import { Button, Typography, Space, Card, Row, Col } from 'antd';
import {
  MessageOutlined,
  DatabaseOutlined,
  RocketOutlined,
  BulbOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageOutlined style={{ fontSize: 32, color: '#6366f1' }} />,
      title: 'AI 对话',
      description: '与多个 AI 模型进行智能对话,支持 OpenAI、Anthropic、Google 等主流服务',
    },
    {
      icon: <DatabaseOutlined style={{ fontSize: 32, color: '#22c55e' }} />,
      title: '知识管理',
      description: '自动提取和组织对话中的知识点,构建个人知识图谱',
    },
    {
      icon: <BulbOutlined style={{ fontSize: 32, color: '#f59e0b' }} />,
      title: '知识探索',
      description: '深入探索不理解的概念,跟踪学习进度,掌握每一个知识点',
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 32, color: '#ef4444' }} />,
      title: '高效学习',
      description: '通过对话式学习和知识追踪,提升学习效率',
    },
    {
      icon: <TeamOutlined style={{ fontSize: 32, color: '#8b5cf6' }} />,
      title: '多模型支持',
      description: '灵活切换不同的 AI 模型,找到最适合你的学习伙伴',
    },
    {
      icon: <RocketOutlined style={{ fontSize: 32, color: '#3b82f6' }} />,
      title: '持续优化',
      description: '不断改进的知识管理系统,让学习变得更简单高效',
    },
  ];

  return (
    <div
      style={{
        height: 'calc(100vh - 64px)',
        backgroundColor: '#f9fafb',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <Space direction="vertical" size={32} style={{ width: '100%' }}>
            {/* Logo and Title */}
            <Space size={24} align="center" style={{ justifyContent: 'center', width: '100%' }}>
              <img
                src="/logo.svg"
                alt="Knowledge Studio"
                style={{ width: 100, height: 100 }}
              />
              <div style={{ textAlign: 'left' }}>
                <Title level={1} style={{ fontSize: 48, margin: 0, color: '#111827' }}>
                  Knowledge Studio
                </Title>
                <Title
                  level={5}
                  style={{
                    fontSize: 16,
                    margin: '8px 0 0 0',
                    fontWeight: 400,
                    color: '#6b7280',
                  }}
                >
                  AI 驱动的对话知识管理工具
                </Title>
              </div>
            </Space>

            {/* Subtitle */}
            <Paragraph
              style={{
                fontSize: 18,
                color: '#4b5563',
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              通过智能对话,构建你的个人知识体系。
              让每一次对话都成为学习和成长的机会。
            </Paragraph>

            {/* CTA Buttons */}
            <Space size={16}>
              <Button
                type="primary"
                size="large"
                icon={<MessageOutlined />}
                onClick={() => navigate('/chat')}
                style={{ height: 48, padding: '0 32px', fontSize: 16 }}
              >
                开始对话
              </Button>
              <Button
                size="large"
                icon={<DatabaseOutlined />}
                onClick={() => navigate('/knowledge')}
                style={{ height: 48, padding: '0 32px', fontSize: 16 }}
              >
                浏览知识库
              </Button>
            </Space>
          </Space>
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: 60 }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
            核心功能
          </Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: 12,
                    border: '1px solid #e5e7eb',
                  }}
                  styles={{ body: { padding: 24 } }}
                >
                  <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    <div>{feature.icon}</div>
                    <Title level={4} style={{ margin: 0 }}>
                      {feature.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      {feature.description}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA Section */}
        <Card
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none',
            borderRadius: 16,
            textAlign: 'center',
          }}
          styles={{ body: { padding: '48px 24px' } }}
        >
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Title level={2} style={{ color: '#ffffff', margin: 0 }}>
              准备好开始你的学习之旅了吗？
            </Title>
            <Paragraph style={{ color: '#e0e7ff', fontSize: 16, margin: 0 }}>
              立即开始对话,让 AI 助手帮助你构建知识体系
            </Paragraph>
            <Button
              type="default"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => navigate('/chat')}
              style={{
                height: 48,
                padding: '0 32px',
                fontSize: 16,
                backgroundColor: '#ffffff',
                color: '#6366f1',
                border: 'none',
              }}
            >
              立即开始
            </Button>
          </Space>
        </Card>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 60, paddingTop: 40, borderTop: '1px solid #e5e7eb' }}>
          <Text type="secondary" style={{ fontSize: 14 }}>
            © 2024 Knowledge Studio. 用 ❤️ 和 AI 构建
          </Text>
        </div>
      </div>
    </div>
  );
}
