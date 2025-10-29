import { useState, useEffect } from 'react';
import { Button, Card, Tag, Space, Empty, Spin, Modal, Typography, Descriptions } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { api } from '@/services/api';
import type { ModelConfig } from '@/services/api';
import ModelConfigForm from '@/components/ModelConfigForm';

const { Title, Paragraph } = Typography;

export default function Settings() {
  const [modelConfigs, setModelConfigs] = useState<ModelConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const providerNames: Record<string, string> = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    google: 'Google',
    ollama: 'Ollama',
  };

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      {/* 内容区 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* 模型配置部分 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ marginBottom: 16 }}>
              <Space direction="vertical" size={0}>
                <Title level={4} style={{ margin: 0 }}>模型配置</Title>
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  配置你的 LLM 模型和 API 密钥
                </Paragraph>
              </Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowAddForm(true)}
                style={{ float: 'right', marginTop: -40 }}
              >
                添加模型
              </Button>
            </div>

            {/* 模型列表 */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <Spin size="large" />
              </div>
            ) : modelConfigs.length === 0 ? (
              <Card>
                <Empty
                  description="还没有配置任何模型"
                  style={{ padding: '32px 0' }}
                >
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowAddForm(true)}>
                    添加第一个模型
                  </Button>
                </Empty>
              </Card>
            ) : (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {modelConfigs.map((config) => (
                  <Card
                    key={config.id}
                    hoverable
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
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      <div>
                        <Space size={8}>
                          <Title level={5} style={{ margin: 0 }}>
                            {config.name}
                          </Title>
                          {config.is_default && <Tag color="processing">默认</Tag>}
                          {!config.is_active && <Tag>已禁用</Tag>}
                          {config.has_api_key && (
                            <Tag icon={<CheckCircleOutlined />} color="success">
                              已配置 API Key
                            </Tag>
                          )}
                        </Space>
                      </div>

                      <Descriptions column={2} size="small">
                        <Descriptions.Item label="提供商">
                          {providerNames[config.provider] || config.provider}
                        </Descriptions.Item>
                        <Descriptions.Item label="模型">
                          {config.model_id}
                        </Descriptions.Item>
                        <Descriptions.Item label="默认温度">
                          {config.default_temperature}
                        </Descriptions.Item>
                        {config.base_url && (
                          <Descriptions.Item label="Base URL" span={2}>
                            <Typography.Text ellipsis style={{ maxWidth: 400 }}>
                              {config.base_url}
                            </Typography.Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Space>
                  </Card>
                ))}
              </Space>
            )}
          </div>

          {/* 其他设置部分 - 占位 */}
          <div>
            <Title level={4} style={{ marginBottom: 16 }}>通用设置</Title>
            <Card>
              <Empty description="即将推出..." />
            </Card>
          </div>
        </div>
      </div>

      {/* 模型配置表单 */}
      {showAddForm && (
        <ModelConfigForm
          onClose={() => setShowAddForm(false)}
          onSuccess={loadModelConfigs}
        />
      )}
    </div>
  );
}
