import { useState } from 'react';
import { Tabs, Space, Card, Button, Typography, Drawer } from 'antd';
import {
  LeftOutlined, RightOutlined, DeleteOutlined
} from '@ant-design/icons';

const { Text } = Typography;

interface KnowledgePanelProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export default function KnowledgePanel({
  collapsed = false,
  onCollapsedChange,
}: KnowledgePanelProps) {
  const [isDrawer, setIsDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState('knowledge');

  const knowledgeItems = {
    notUnderstand: [
      { id: 1, title: 'React.memo()', source: 'GPT-4', time: '14:30' },
      { id: 2, title: '虚拟列表实现', source: 'GPT-4', time: '14:32' },
    ],
    learning: [
      { id: 3, title: 'useMemo', source: 'GPT-4', time: '14:30' },
    ],
    mastered: [
      { id: 4, title: '虚拟列表', source: 'GPT-4', time: '14:31' },
    ],
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'knowledge', label: '📍 知识点' },
          { key: 'chain', label: '🔗 探索链' },
          { key: 'graph', label: '📊 图谱' },
        ]}
        style={{ margin: 0 }}
      />

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8, minHeight: 0 }}>
        <Space direction="vertical" size={16} style={{ width: '100%', padding: '0 16px' }}>
          {/* 不理解 */}
          <div>
            <Text strong type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
              ❓ 不理解 ({knowledgeItems.notUnderstand.length})
            </Text>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              {knowledgeItems.notUnderstand.map((item) => (
                <Card key={item.id} size="small" hoverable>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 8 }}>
                    来自: {item.source} · {item.time}
                  </Text>
                  <Space size={8}>
                    <Button type="link" size="small" style={{ padding: 0, height: 'auto', fontSize: 11 }}>
                      查看详情
                    </Button>
                    <Button type="link" size="small" style={{ padding: 0, height: 'auto', fontSize: 11 }}>
                      深入探索 →
                    </Button>
                  </Space>
                </Card>
              ))}
            </Space>
          </div>

          {/* 学习中 */}
          <div>
            <Text strong type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
              ⚠️ 学习中 ({knowledgeItems.learning.length})
            </Text>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              {knowledgeItems.learning.map((item) => (
                <Card key={item.id} size="small" hoverable>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 8 }}>
                    来自: {item.source} · {item.time}
                  </Text>
                  <Space size={8}>
                    <Button type="link" size="small" style={{ padding: 0, height: 'auto', fontSize: 11 }}>
                      查看详情
                    </Button>
                    <Button type="link" size="small" style={{ padding: 0, height: 'auto', fontSize: 11 }}>
                      深入探索 →
                    </Button>
                  </Space>
                </Card>
              ))}
            </Space>
          </div>

          {/* 已掌握 */}
          <div>
            <Text strong type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
              ✅ 已掌握 ({knowledgeItems.mastered.length})
            </Text>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              {knowledgeItems.mastered.map((item) => (
                <Card key={item.id} size="small" hoverable>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 8 }}>
                    来自: {item.source} · {item.time}
                  </Text>
                  <Button type="link" size="small" style={{ padding: 0, height: 'auto', fontSize: 11 }}>
                    查看详情
                  </Button>
                </Card>
              ))}
            </Space>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 16, marginTop: 16 }}>
            <Button type="text" block size="small" danger icon={<DeleteOutlined />}>
              清空所有
            </Button>
          </div>
        </Space>
      </div>
    </div>
  );

  // 手机/平板上使用 Drawer，桌面上使用 Sider
  if (collapsed && isDrawer) {
    return (
      <>
        <Button
          type="text"
          icon={<RightOutlined />}
          onClick={() => setIsDrawer(true)}
          style={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 10,
          }}
          title="打开知识点面板"
        />
        <Drawer
          title="知识点探索"
          placement="right"
          onClose={() => setIsDrawer(false)}
          open={isDrawer}
          width={320}
        >
          {content}
        </Drawer>
      </>
    );
  }

  return (
    <div
      style={{
        width: collapsed ? 40 : 240,
        minWidth: collapsed ? 40 : 240,
        backgroundColor: collapsed ? 'transparent' : '#f9fafb',
        borderLeft: collapsed ? 'none' : '1px solid #e5e7eb',
        transition: 'width 0.3s ease, min-width 0.3s ease',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        flexShrink: 0,
      }}
    >
      {/* 打开按钮（收起时显示） */}
      {collapsed && (
        <div
          style={{
            width: 40,
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 8px',
            gap: 12,
          }}
        >
          <Button
            type="text"
            size="small"
            icon={<RightOutlined />}
            onClick={() => onCollapsedChange?.(false)}
            style={{
              width: 24,
              height: 24,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="打开知识点面板"
          />
        </div>
      )}

      {/* 面板内容（展开时显示） */}
      {!collapsed && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          {/* 收起按钮 */}
          <Button
            type="text"
            size="small"
            icon={<LeftOutlined />}
            onClick={() => onCollapsedChange?.(true)}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 10,
            }}
            title="收起知识点面板"
          />

          {/* 知识点内容 */}
          <div style={{ flex: 1, paddingTop: 8, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
