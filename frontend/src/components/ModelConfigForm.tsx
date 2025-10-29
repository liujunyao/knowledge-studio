import { useState } from 'react';
import { Modal, Form, Input, Select, Slider, Checkbox, Button, Alert, Space } from 'antd';
import { api } from '@/services/api';

interface ModelConfigFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PROVIDERS = [
  { value: 'openai', label: 'OpenAI', models: ['gpt-4', 'gpt-4-turbo', 'gpt-4o', 'gpt-3.5-turbo'] },
  { value: 'anthropic', label: 'Anthropic', models: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'] },
  { value: 'google', label: 'Google', models: ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'] },
  { value: 'ollama', label: 'Ollama', models: ['llama3.2', 'llama3.1', 'qwen2.5', 'mistral'] },
];

export default function ModelConfigForm({ onClose, onSuccess }: ModelConfigFormProps) {
  const [form] = Form.useForm();
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    form.setFieldValue('model_id', undefined);
    const providerData = PROVIDERS.find(p => p.value === provider);
    setAvailableModels(providerData?.models || []);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError('');

    try {
      await api.createModelConfig({
        name: values.name,
        provider: values.provider,
        model_id: values.model_id,
        api_key: values.api_key || undefined,
        base_url: values.base_url || undefined,
        default_temperature: values.default_temperature,
        is_default: values.is_default || false,
        is_active: values.is_active !== false,
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError('创建模型配置失败，请检查输入');
      console.error('创建失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="添加模型配置"
      open={true}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          default_temperature: 0.7,
          is_active: true,
          is_default: false,
        }}
      >
        {error && (
          <Alert
            message={error}
            type="error"
            closable
            onClose={() => setError('')}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item
          label="配置名称"
          name="name"
          rules={[{ required: true, message: '请输入配置名称' }]}
        >
          <Input placeholder="例如：GPT-4 主力模型" />
        </Form.Item>

        <Form.Item
          label="提供商"
          name="provider"
          rules={[{ required: true, message: '请选择提供商' }]}
        >
          <Select
            placeholder="选择提供商"
            onChange={handleProviderChange}
            options={PROVIDERS.map(p => ({ label: p.label, value: p.value }))}
          />
        </Form.Item>

        <Form.Item
          label="模型"
          name="model_id"
          rules={[{ required: true, message: '请选择模型' }]}
        >
          <Select
            placeholder="选择模型"
            disabled={!selectedProvider}
            options={availableModels.map(m => ({ label: m, value: m }))}
          />
        </Form.Item>

        <Form.Item
          label={
            <span>
              API Key {selectedProvider !== 'ollama' && <span style={{ color: '#9ca3af' }}>(推荐填写)</span>}
            </span>
          }
          name="api_key"
        >
          <Input.Password
            placeholder={selectedProvider === 'ollama' ? 'Ollama 本地运行无需 API Key' : '输入 API Key'}
          />
        </Form.Item>

        <Form.Item
          label={<span>Base URL <span style={{ color: '#9ca3af' }}>(可选)</span></span>}
          name="base_url"
        >
          <Input
            placeholder={selectedProvider === 'ollama' ? 'http://localhost:11434' : '自定义 API 端点'}
          />
        </Form.Item>

        <Form.Item
          label="默认温度"
          name="default_temperature"
        >
          <Slider
            min={0}
            max={2}
            step={0.1}
            marks={{
              0: '更精确',
              1: '平衡',
              2: '更随机'
            }}
          />
        </Form.Item>

        <Form.Item name="is_default" valuePropName="checked">
          <Checkbox>设为默认模型</Checkbox>
        </Form.Item>

        <Form.Item name="is_active" valuePropName="checked">
          <Checkbox>启用此配置</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
          <Space style={{ float: 'right' }}>
            <Button onClick={onClose}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              创建配置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
