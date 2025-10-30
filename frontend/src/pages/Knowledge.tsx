import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Typography,
  List,
  Modal,
  Form,
  Input,
  message,
  Spin,
} from 'antd';
import { PlusOutlined, StarFilled, EditOutlined } from '@ant-design/icons';
import { api } from '@/services/api';
import type { KnowledgeSpace } from '@/services/api';

const { Title, Text } = Typography;

const formatDate = (value?: string) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const formatDateTime = (value?: string) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export default function Knowledge() {
  const [spaces, setSpaces] = useState<KnowledgeSpace[]>([]);
  const [loadingSpaces, setLoadingSpaces] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingSpace, setEditingSpace] = useState<KnowledgeSpace | null>(null);
  const [savingSpace, setSavingSpace] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      setLoadingSpaces(true);
      try {
        const data = await api.listSpaces();
        setSpaces(data);
      } catch (error) {
        console.error(error);
        message.error('加载空间列表失败，请稍后再试');
      } finally {
        setLoadingSpaces(false);
      }
    };

    fetchSpaces();
  }, []);

  const recentUpdates = spaces.map((space) => ({
    id: space.id,
    title: space.name,
    space: space.name,
    updatedAt: formatDateTime(space.updated_at),
    starred: false,
  }));

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingSpace(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOpenSpaceDetail = (id: string) => {
    navigate(`/knowledge/${id}`);
  };

  const handleOpenEditModal = (space: KnowledgeSpace) => {
    setModalMode('edit');
    setEditingSpace(space);
    form.setFieldsValue({
      name: space.name,
      description: space.description,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSpace(null);
  };

  const handleCreateSpace = async () => {
    try {
      const values = await form.validateFields();
      setSavingSpace(true);

      const payload = {
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
      };

      if (!payload.name) {
        form.setFields([{ name: 'name', errors: ['请输入空间名称'] }]);
        return;
      }

      if (modalMode === 'create') {
        const newSpace = await api.createSpace(payload);
        setSpaces((prev) => [newSpace, ...prev]);
      } else if (editingSpace) {
        const updatedSpace = await api.updateSpace(editingSpace.id, payload);
        setSpaces((prev) =>
          prev.map((spaceItem) => (spaceItem.id === updatedSpace.id ? updatedSpace : spaceItem)),
        );
      }
      message.success(modalMode === 'create' ? '空间创建成功' : '空间更新成功');
      setIsModalOpen(false);
      form.resetFields();
      setEditingSpace(null);
    } catch (error) {
      if ((error as any)?.errorFields) {
        return;
      }
      if (error instanceof Error) {
        if (error.message.includes('409')) {
          message.error('该空间名称已存在，请使用其他名称');
        } else {
          const actionLabel = modalMode === 'create' ? '创建' : '更新';
          message.error(error.message || `${actionLabel}空间失败，请稍后再试`);
        }
      } else {
        const actionLabel = modalMode === 'create' ? '创建' : '更新';
        message.error(`${actionLabel}空间失败，请稍后再试`);
      }
    } finally {
      setSavingSpace(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: '#f5f7fa',
        padding: '24px 32px 48px',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              所有空间
            </Title>
            <Text type="secondary">管理和组织你的知识主题</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleOpenCreateModal}>
            新建空间
          </Button>
        </div>

        <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
          {loadingSpaces && spaces.length === 0 ? (
            <Col span={24} style={{ textAlign: 'center', padding: '48px 0' }}>
              <Spin />
            </Col>
          ) : spaces.length === 0 ? (
            <Col span={24} style={{ textAlign: 'center', padding: '48px 0' }}>
              <Text type="secondary">还没有空间，点击右上角按钮开始创建吧</Text>
            </Col>
          ) : (
            spaces.map((spaceItem) => (
              <Col xs={24} sm={12} lg={6} key={spaceItem.id}>
                <Card
                  className="space-card"
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: 16,
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 6px 16px -12px rgba(15,23,42,0.25)',
                    backgroundColor: '#ffffff',
                  }}
                  styles={{
                    body: {
                      padding: 24,
                    },
                  }}
                  onClick={() => handleOpenSpaceDetail(spaceItem.id)}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }} className="space-card-body">
                    <div className="space-card-header">
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          flex: 1,
                          fontSize: 20,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={spaceItem.name}
                      >
                        {spaceItem.name}
                      </Title>
                      <Button
                        className="space-card-edit"
                        type="text"
                        icon={<EditOutlined />}
                        aria-label="编辑空间"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenEditModal(spaceItem);
                        }}
                      />
                    </div>
                    {spaceItem.created_at && (
                      <Text type="secondary">
                        创建于 <span style={{ fontWeight: 600 }}>{formatDate(spaceItem.created_at)}</span>
                      </Text>
                    )}
                  </Space>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <Card
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            boxShadow: '0 6px 20px -15px rgba(15,23,42,0.3)',
          }}
          styles={{
            header: {
              borderBottom: '1px solid #f0f0f0',
            },
            body: {
              padding: '24px 24px 8px',
            },
          }}
          title={<Title level={3} style={{ margin: 0 }}>最近更新</Title>}
        >
          <List
            dataSource={recentUpdates}
            split={false}
            loading={loadingSpaces}
            renderItem={(item) => (
              <List.Item
                style={{
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div style={{ width: 24, textAlign: 'center' }}>
                  {item.starred ? (
                    <StarFilled style={{ color: '#f59e0b', fontSize: 18 }} />
                  ) : null}
                </div>
                <div style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16 }}>{item.title}</Text>
                </div>
                <div style={{ width: 160, textAlign: 'center' }}>
                  <Text
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: 999,
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1',
                      fontSize: 13,
                    }}
                  >
                    {item.space}
                  </Text>
                </div>
                <div style={{ width: 160, textAlign: 'right' }}>
                  <Text type="secondary">{item.updatedAt}</Text>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>

      <Modal
        title={modalMode === 'create' ? '新建空间' : '编辑空间'}
        open={isModalOpen}
        onOk={handleCreateSpace}
        okText="保存"
        cancelText="取消"
        onCancel={handleCloseModal}
        confirmLoading={savingSpace}
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="空间名称"
            name="name"
            rules={[
              { required: true, message: '请输入空间名称' },
              { max: 255, message: '空间名称长度不能超过 255 个字符' },
            ]}
          >
            <Input placeholder="例如：机器学习基础" autoFocus />
          </Form.Item>
          <Form.Item label="备注" name="description" rules={[{ max: 500, message: '备注长度不能超过 500 个字符' }]}>
            <Input.TextArea rows={3} placeholder="可选：补充空间用途或范围说明" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
