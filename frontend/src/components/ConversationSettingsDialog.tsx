import { useState } from 'react';
import { Modal, Form, Input, Select, Slider, Button, Space, Tabs, message } from 'antd';
import type { Conversation } from '@/services/api';

interface ConversationSettingsDialogProps {
  conversation: Conversation;
  open: boolean;
  onClose: () => void;
  onUpdate?: (updatedConversation: Conversation) => void;
}

const PROVIDERS = [
  { value: 'openai', label: 'OpenAI', emoji: '🤖' },
  { value: 'anthropic', label: 'Anthropic', emoji: '🧠' },
  { value: 'google', label: 'Google', emoji: '🔷' },
  { value: 'ollama', label: 'Ollama', emoji: '🦙' },
];

const MODEL_SUGGESTIONS: Record<string, string[]> = {
  openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
  google: ['gemini-pro', 'gemini-1.5-pro'],
  ollama: ['llama2', 'mistral', 'neural-chat'],
};

export default function ConversationSettingsDialog({
  conversation,
  open,
  onClose,
  onUpdate,
}: ConversationSettingsDialogProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(conversation.model_provider);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // TODO: 实现对话更新 API
      // const updated = await api.updateConversation(conversation.id, values);
      const updated = {
        ...conversation,
        ...values,
      };

      message.success('设置已保存');
      onUpdate?.(updated);
      onClose();
    } catch (error) {
      console.error('保存设置失败:', error);
      message.error('保存设置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
    // 重置模型名称
    form.setFieldValue('model_name', MODEL_SUGGESTIONS[value]?.[0] || '');
  };

  return (
    <Modal
      title="对话设置"
      open={open}
      onCancel={onClose}
      width={500}
      footer={null}
      bodyStyle={{ paddingBottom: 24 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: conversation.title,
          model_provider: conversation.model_provider,
          model_name: conversation.model_name,
          temperature: conversation.temperature ?? 0.7,
          system_prompt: conversation.system_prompt || '',
        }}
      >
        <Tabs
          items={[
            {
              key: 'basic',
              label: '基本设置',
              children: (
                <>
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
                      onChange={handleProviderChange}
                      options={PROVIDERS.map(p => ({
                        label: `${p.emoji} ${p.label}`,
                        value: p.value,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    label="模型名称"
                    name="model_name"
                    rules={[{ required: true, message: '请选择模型' }]}
                  >
                    <Select
                      placeholder="选择或输入模型名称"
                      options={(MODEL_SUGGESTIONS[selectedProvider] || []).map(model => ({
                        label: model,
                        value: model,
                      }))}
                      allowClear={false}
                    />
                  </Form.Item>
                </>
              ),
            },
            {
              key: 'advanced',
              label: '高级设置',
              children: (
                <>
                  <Form.Item
                    label="温度 (Temperature)"
                    name="temperature"
                  >
                    <Slider
                      min={0}
                      max={2}
                      step={0.1}
                      marks={{
                        0: '确定性',
                        1: '平衡',
                        2: '创意',
                      }}
                      tooltip={{
                        formatter: (value) => value?.toFixed(1),
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="系统提示词"
                    name="system_prompt"
                  >
                    <Input.TextArea
                      placeholder="输入系统提示词，用于指导 AI 的行为..."
                      rows={4}
                      maxLength={500}
                      showCount
                      allowClear
                    />
                  </Form.Item>
                </>
              ),
            },
          ]}
        />

        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
          <Space style={{ float: 'right' }}>
            <Button onClick={onClose}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存设置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
