import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Input, Select, Button, Alert, Space } from 'antd';
import { api } from '@/services/api';

interface NewConversationDialogProps {
  onClose: () => void;
}

const PROVIDERS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'google', label: 'Google' },
  { value: 'ollama', label: 'Ollama' },
];

export default function NewConversationDialog({ onClose }: NewConversationDialogProps) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError('');

    try {
      const conversation = await api.createConversation(values);
      navigate(`/chat/${conversation.id}`);
    } catch (err) {
      setError('创建对话失败');
      console.error('创建失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="新建对话"
      open={true}
      onCancel={onClose}
      width={480}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          model_provider: 'openai',
          model_name: 'gpt-4',
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
          label="对话标题"
          name="title"
          rules={[{ required: true, message: '请输入对话标题' }]}
        >
          <Input placeholder="输入对话标题" />
        </Form.Item>

        <Form.Item
          label="模型提供商"
          name="model_provider"
          rules={[{ required: true, message: '请选择模型提供商' }]}
        >
          <Select
            options={PROVIDERS.map(p => ({ label: p.label, value: p.value }))}
          />
        </Form.Item>

        <Form.Item
          label="模型名称"
          name="model_name"
          rules={[{ required: true, message: '请输入模型名称' }]}
        >
          <Input placeholder="例如：gpt-4" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
          <Space style={{ float: 'right' }}>
            <Button onClick={onClose}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              创建对话
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
