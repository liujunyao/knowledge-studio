import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Tag, Space, Empty, Spin, Typography } from 'antd';
import { PlusOutlined, MessageOutlined, BookOutlined } from '@ant-design/icons';
import { api } from '@/services/api';
import type { Conversation } from '@/services/api';
import NewConversationDialog from '@/components/NewConversationDialog';

const { Title, Text } = Typography;

export default function Conversations() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await api.listConversations();
      setConversations(data);
    } catch (error) {
      console.error('加载对话列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return '今天';
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days} 天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  const getProviderEmoji = (provider: string) => {
    const emojiMap: Record<string, string> = {
      openai: '🤖',
      anthropic: '🧠',
      google: '🔷',
      ollama: '🦙',
    };
    return emojiMap[provider] || '💬';
  };

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      {/* 对话列表 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <Spin size="large" />
          </div>
        ) : conversations.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <Empty
              image={<MessageOutlined style={{ fontSize: 64, color: '#d1d5db' }} />}
              description="还没有对话"
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowNewDialog(true)}
              >
                开始第一个对话
              </Button>
            </Empty>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
            maxWidth: 1400,
            margin: '0 auto'
          }}>
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                hoverable
                onClick={() => navigate(`/chat/${conversation.id}`)}
                style={{ height: '100%' }}
              >
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  {/* Header with model and time */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space size={8}>
                      <span style={{ fontSize: 18 }}>{getProviderEmoji(conversation.model_provider)}</span>
                      <Text strong style={{ fontSize: 13 }}>{conversation.model_name}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {formatDate(conversation.updated_at)}
                    </Text>
                  </div>

                  {/* Title */}
                  <Title level={5} ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
                    {conversation.title}
                  </Title>

                  {/* Preview */}
                  <Text type="secondary" style={{ fontSize: 13, minHeight: 40, display: 'block' }}>
                    {conversation.has_knowledge
                      ? '已收集到知识库，可在知识库页面继续探索'
                      : '尚未收集到知识库，标记后可同步到知识库'}
                  </Text>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag color="processing">{conversation.model_provider}</Tag>
                    <Space size={4}>
                      <BookOutlined style={{ fontSize: 12, color: conversation.has_knowledge ? '#4c6ef5' : '#9ca3af' }} />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {conversation.has_knowledge ? '已收集' : '未收集'}
                      </Text>
                    </Space>
                  </div>
                </Space>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 新建对话对话框 */}
      {showNewDialog && (
        <NewConversationDialog onClose={() => setShowNewDialog(false)} />
      )}
    </div>
  );
}
