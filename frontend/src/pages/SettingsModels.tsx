import { useState, useEffect } from 'react';
import { Layout, Button, Card, Tag, Space, Empty, Spin, Modal, Typography, Descriptions, List, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { api } from '@/services/api';
import type { ModelConfig } from '@/services/api';
import ModelConfigForm from '@/components/ModelConfigForm';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const PROVIDERS = [
  { key: 'openai', label: 'OpenAI', icon: '🤖' },
  { key: 'anthropic', label: 'Anthropic', icon: '🧠' },
  { key: 'google', label: 'Google', icon: '🔷' },
  { key: 'ollama', label: 'Ollama', icon: '🦙' },
];

export default function SettingsModels() {
  const [modelConfigs, setModelConfigs] = useState<ModelConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('openai');

  useEffect(() => {
    loadModelConfigs();
  }, []);

  const loadModelConfigs = async () => {
    try {
      setLoading(true);
      const data = await api.listModelConfigs();
      setModelConfigs(data);
    } catch (error) {
      console.error('加载模型配置失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个模型配置吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await api.deleteModelConfig(id);
          await loadModelConfigs();
        } catch (error) {
          console.error('删除失败:', error);
          Modal.error({
            title: '删除失败',
            content: '删除模型配置时出现错误',
          });
        }
      },
    });
  };

  // 按提供商分组模型
  const modelsByProvider = PROVIDERS.reduce(
    (acc, provider) => {
      acc[provider.key] = modelConfigs.filter(
        (config) => config.provider === provider.key
      );
      return acc;
    },
    {} as Record<string, ModelConfig[]>
  );

  const currentModels = modelsByProvider[selectedProvider] || [];

  return (
    <Layout style={{ minHeight: '100%' }}>
      {/* 左侧 - 提供商列表 */}
      <Sider
        width={200}
        style={{
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
        }}
      >
        <div style={{ padding: '24px 16px' }}>
          <Title level={5} style={{ margin: 0 }}>
            模型供应商
          </Title>
        </div>

        <Space direction="vertical" size={8} style={{ padding: '0 12px', width: '100%' }}>
          {PROVIDERS.map((provider) => (
            <Card
              key={provider.key}
              hoverable
              onClick={() => setSelectedProvider(provider.key)}
              style={{
                backgroundColor:
                  selectedProvider === provider.key ? '#eef2ff' : '#ffffff',
                borderLeft:
                  selectedProvider === provider.key
                    ? '4px solid #6366f1'
                    : 'none',
                cursor: 'pointer',
                border: '1px solid #e5e7eb',
              }}
              styles={{ body: { padding: '12px' } }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <div style={{ fontSize: 20 }}>{provider.icon}</div>
                <Text strong>{provider.label}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {modelsByProvider[provider.key]?.length || 0} 个模型
                </Text>
              </Space>
            </Card>
          ))}
        </Space>
      </Sider>

      {/* 右侧 - 模型列表 */}
      <Content style={{ backgroundColor: '#ffffff', padding: '24px', overflow: 'auto' }}>
        <div>
          <div style={{ marginBottom: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Title level={4} style={{ margin: 0 }}>
                    {PROVIDERS.find((p) => p.key === selectedProvider)?.label ||
                      'OpenAI'}{' '}
                    模型
                  </Title>
                  <Text type="secondary">
                    配置 {selectedProvider} 的模型和 API 密钥
                  </Text>
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddForm(true)}
                >
                  添加模型
                </Button>
              </div>
            </Space>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          {/* 模型列表 */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <Spin size="large" />
            </div>
          ) : currentModels.length === 0 ? (
            <Empty
              description={`还没有配置 ${selectedProvider} 的模型`}
              style={{ padding: '64px 0' }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowAddForm(true)}
              >
                添加第一个模型
              </Button>
            </Empty>
          ) : (
            <List
              dataSource={currentModels}
              renderItem={(config) => (
                <List.Item
                  key={config.id}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <Card
                    style={{
                      width: '100%',
                      border: '1px solid #e5e7eb',
                    }}
                    styles={{ body: { padding: 16 } }}
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(config.id)}
                      >
                        删除
                      </Button>
                    }
                  >
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                      <div>
                        <Space size={8}>
                          <Title level={5} style={{ margin: 0 }}>
                            {config.name}
                          </Title>
                          {config.is_default && (
                            <Tag color="processing">默认</Tag>
                          )}
                          {!config.is_active && <Tag>已禁用</Tag>}
                          {config.has_api_key && (
                            <Tag
                              icon={<CheckCircleOutlined />}
                              color="success"
                            >
                              已配置 API Key
                            </Tag>
                          )}
                        </Space>
                      </div>

                      <Descriptions column={2} size="small">
                        <Descriptions.Item label="模型 ID">
                          {config.model_id}
                        </Descriptions.Item>
                        <Descriptions.Item label="默认温度">
                          {config.default_temperature}
                        </Descriptions.Item>
                        {config.base_url && (
                          <Descriptions.Item label="Base URL" span={2}>
                            <Text
                              ellipsis
                              style={{ maxWidth: 400 }}
                            >
                              {config.base_url}
                            </Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </div>

        {/* 模型配置表单 */}
        {showAddForm && (
          <ModelConfigForm
            onClose={() => setShowAddForm(false)}
            onSuccess={loadModelConfigs}
          />
        )}
      </Content>
    </Layout>
  );
}
