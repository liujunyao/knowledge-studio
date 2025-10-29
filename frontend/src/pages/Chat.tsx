import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout, Input, Button, Avatar, Typography, Space, Spin, Empty, Dropdown
} from 'antd';
import {
  SearchOutlined, PlusOutlined, MoreOutlined,
  SettingOutlined, UserOutlined, RobotOutlined
} from '@ant-design/icons';
import { api } from '@/services/api';
import type { Conversation, Message } from '@/services/api';
import NewConversationDialog from '@/components/NewConversationDialog';
import ConversationSettingsDialog from '@/components/ConversationSettingsDialog';
import ChatInputArea from '@/components/ChatInputArea';
import KnowledgePanel from '@/components/KnowledgePanel';

const { Sider, Content } = Layout;
const { Text, Paragraph } = Typography;

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [knowledgePanelCollapsed, setKnowledgePanelCollapsed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
    if (id) {
      loadConversation();
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    try {
      const data = await api.listConversations();
      setConversations(data);
    } catch (error) {
      console.error('加载对话列表失败:', error);
    }
  };

  const loadConversation = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await api.getConversation(id);
      setConversation(data);
      setMessages(data.messages || []);
    } catch (error) {
      console.error('加载对话失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || !conversation || sending) return;

    const userMessage = input.trim();
    setInput('');
    setSending(true);

    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      conversation_id: conversation.id,
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempUserMessage]);

    try {
      const response = await api.sendMessage(conversation.id, {
        content: userMessage,
        role: 'user',
      });

      setMessages(prev =>
        prev.map(msg => msg.id === tempUserMessage.id ? response.user_message : msg)
      );
      setMessages(prev => [...prev, response.assistant_message]);
    } catch (error) {
      console.error('发送消息失败:', error);
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id));
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
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

  const formatConversationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60 * 60 * 1000) {
      const minutes = Math.max(1, Math.floor(diff / (60 * 1000)));
      return `${minutes} 分钟前`;
    }
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} 小时前`;
    }
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} 天前`;
    }
    return date.toLocaleDateString('zh-CN');
  };

  const filteredConversations = useMemo(() => {
    if (!searchTerm) return conversations;
    const keyword = searchTerm.trim().toLowerCase();
    return conversations.filter((conv) => {
      const title = conv.title?.toLowerCase() || '';
      const model = conv.model_name?.toLowerCase() || '';
      return title.includes(keyword) || model.includes(keyword);
    });
  }, [conversations, searchTerm]);

  return (
    <Layout style={{ height: 'calc(100vh - 64px)', backgroundColor: '#ffffff' }}>
      {/* 左侧边栏 - 对话列表 */}
      <Sider
        width={264}
        style={{
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        {/* 新对话按钮 */}
        <div style={{ padding: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowNewDialog(true)}
            block
            style={{ marginBottom: 12 }}
          >
            新对话
          </Button>

          {/* 搜索框 */}
          <Input
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            placeholder="搜索对话..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            suffix={
              <Text type="secondary" style={{ fontSize: 11, backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
                ⌘K
              </Text>
            }
            style={{ height: 40, borderRadius: 8 }}
          />
        </div>

        {/* 对话列表 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredConversations.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={searchTerm ? '没有匹配的对话' : '暂无对话'}
              style={{ marginTop: 48 }}
            />
          ) : (
            filteredConversations.map((conv) => {
              const knowledgeCollected = Boolean(conv.has_knowledge);
              const knowledgeLabelStyle = knowledgeCollected
                ? {
                    backgroundColor: 'rgba(76, 110, 245, 0.15)',
                    color: '#2b45a0'
                  }
                : {
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280'
                  };
              return (
                <div
                  key={conv.id}
                  style={{
                    backgroundColor: conv.id === id ? 'rgba(76, 110, 245, 0.08)' : '#ffffff',
                    border: conv.id === id ? '1px solid rgba(76, 110, 245, 0.4)' : '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: '8px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr auto',
                    alignItems: 'center',
                    columnGap: 10,
                    minHeight: 54
                  }}
                onClick={() => navigate(`/chat/${conv.id}`)}
                onMouseEnter={(e) => {
                  const menu = (e.currentTarget as any).querySelector('[data-menu-button]');
                  if (menu) menu.style.opacity = '1';
                  if (conv.id !== id) {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  const menu = (e.currentTarget as any).querySelector('[data-menu-button]');
                  if (menu) menu.style.opacity = '0';
                  if (conv.id !== id) {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#ffffff';
                  }
                }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: conv.id === id ? '#4c6ef5' : '#edeff5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16
                  }}>
                    {getProviderEmoji(conv.model_provider)}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                      <Text strong style={{ fontSize: 13, color: '#1f2937', flex: 1, minWidth: 0 }} ellipsis>
                        {conv.title || conv.model_name}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minWidth: 0 }}>
                      <Text type="secondary" style={{ fontSize: 12, color: '#6b7280', flex: 1, minWidth: 0 }} ellipsis>
                        模型 {conv.model_name}
                      </Text>
                      <span
                        style={{
                          fontSize: 11,
                          padding: '2px 6px',
                          borderRadius: 999,
                          lineHeight: 1.2,
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          ...knowledgeLabelStyle
                        }}
                      >
                        {knowledgeCollected ? '已收集到知识库' : '未收集到知识库'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12, color: '#9ca3af' }}>
                      {formatConversationTime(conv.updated_at)}
                    </Text>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'settings',
                            label: '设置',
                            icon: <SettingOutlined />,
                            onClick: (e) => {
                              e.domEvent.stopPropagation();
                              setConversation(conv);
                              setShowSettingsDialog(true);
                            }
                          },
                          {
                            key: 'delete',
                            label: '删除',
                            danger: true,
                            onClick: (e) => {
                              e.domEvent.stopPropagation();
                              // TODO: 实现删除对话
                              console.log('删除对话:', conv.id);
                            }
                          }
                        ]
                      }}
                      trigger={['click']}
                    >
                      <Button
                        data-menu-button
                        type="text"
                        size="small"
                        icon={<MoreOutlined />}
                        style={{
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          fontSize: 12,
                          padding: '2px 6px',
                          minWidth: 'auto'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    </Dropdown>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Sider>

      {/* 中间聊天区域 */}
      <Layout style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Content style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', flex: 1, minHeight: 0 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spin size="large" />
            </div>
          ) : !conversation ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Empty description="请选择一个对话" />
            </div>
          ) : (
            <>
              {/* 消息区域 */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: 24,
                backgroundColor: '#f9fafb',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {messages.length === 0 ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Empty description="开始对话吧..." />
                  </div>
                ) : (
                  <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        style={{
                          display: 'flex',
                          gap: 12,
                          padding: 16,
                          borderRadius: 8,
                          backgroundColor: message.role === 'user' ? '#eef2ff' : '#ffffff',
                          border: message.role === 'user' ? '1px solid #c7d2fe' : '1px solid #e5e7eb'
                        }}
                      >
                        <Avatar
                          icon={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                          style={{
                            backgroundColor: message.role === 'user' ? '#e5e7eb' : '#22c55e',
                            color: message.role === 'user' ? '#4b5563' : '#ffffff'
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Space size={8} style={{ marginBottom: 8 }}>
                            <Text strong>
                              {message.role === 'user' ? '你' : conversation.model_name}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatTime(message.created_at)}
                            </Text>
                          </Space>
                          <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {message.content}
                          </Paragraph>
                        </div>
                      </div>
                    ))}
                    {sending && (
                      <div style={{
                        display: 'flex',
                        gap: 12,
                        padding: 16,
                        borderRadius: 8,
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb'
                      }}>
                        <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#22c55e', color: '#ffffff' }} />
                        <div style={{ flex: 1 }}>
                          <Space size={8} style={{ marginBottom: 8 }}>
                            <Text strong>{conversation.model_name}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatTime(new Date().toISOString())}
                            </Text>
                          </Space>
                          <Text type="secondary" italic>⋮ 正在生成...</Text>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </Space>
                )}
              </div>

              {/* 输入区域 */}
              <ChatInputArea
                value={input}
                onChange={setInput}
                onSend={handleSend}
                onStop={() => setSending(false)}
                disabled={!conversation}
                loading={sending}
                currentModel={conversation?.model_name || 'gpt-4'}
                onModelChange={(model) => {
                  // TODO: 实现切换模型
                  console.log('切换模型:', model);
                }}
              />
            </>
          )}
        </Content>

        {/* 右侧知识面板 */}
        <KnowledgePanel
          collapsed={knowledgePanelCollapsed}
          onCollapsedChange={setKnowledgePanelCollapsed}
        />
      </Layout>

      {/* 新建对话对话框 */}
      {showNewDialog && (
        <NewConversationDialog onClose={() => setShowNewDialog(false)} />
      )}

      {/* 对话设置对话框 */}
      {conversation && showSettingsDialog && (
        <ConversationSettingsDialog
          conversation={conversation}
          open={showSettingsDialog}
          onClose={() => setShowSettingsDialog(false)}
          onUpdate={(updated) => {
            setConversation(updated);
            setConversations(prev =>
              prev.map(c => c.id === updated.id ? updated : c)
            );
          }}
        />
      )}
    </Layout>
  );
}
