import { useEffect, useMemo, useState, type ReactNode, type Key } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  App as AntApp,
  Button,
  Dropdown,
  Empty,
  Layout,
  Menu,
  Space,
  Spin,
  Tabs,
  Typography,
  Tree,
} from 'antd';
import {
  DownOutlined,
  SearchOutlined,
  SettingOutlined,
  FileTextOutlined,
  FileAddOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import MarkdownIt from 'markdown-it';
import MarkdownEditor from '@/components/MarkdownEditor';
import { api } from '@/services/api';
import type { KnowledgeSpace } from '@/services/api';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

interface PageNode {
  title: string;
  key: string;
  icon?: ReactNode;
  children?: PageNode[];
  content?: string;
}

const mockTreeData: PageNode[] = [
  {
    title: '页面 1',
    key: 'page-1',
    icon: <FileTextOutlined />,
    content:
      '## 页面 1\n\n这是一个示例页面，用于展示空间中的文档内容。你可以点击编辑按钮来修改正文。',
  },
  {
    title: '页面 2',
    key: 'page-2',
    icon: <FileTextOutlined />,
    children: [
      {
        title: '子页面 2-1',
        key: 'page-2-1',
        icon: <FileTextOutlined />,
        content:
          '### 子页面 2-1\n\n可以在这里记录与页面 2 相关的子主题内容，例如需求列表、技术方案或会议记录。',
        children: [
          {
            title: '子页面 2-1-1',
            key: 'page-2-1-1',
            icon: <FileTextOutlined />,
            content:
              '#### 子页面 2-1-1\n\n这是层级更深的笔记。你可以继续向下拆分知识结构。',
          },
        ],
      },
    ],
  },
];

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { message } = AntApp.useApp();
  const [spaces, setSpaces] = useState<KnowledgeSpace[]>([]);
  const [loadingSpaces, setLoadingSpaces] = useState(false);
  const [selectedPageKeys, setSelectedPageKeys] = useState<string[]>([]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [pageTree, setPageTree] = useState<PageNode[]>(mockTreeData);
  const [selectedPage, setSelectedPage] = useState<PageNode | null>(null);
  const [editorMode, setEditorMode] = useState<'view' | 'edit'>('view');
  const [editorContent, setEditorContent] = useState('');
  const isDirty = selectedPage ? editorContent !== (selectedPage.content || '') : false;
  const [activeEditTab, setActiveEditTab] = useState<'write' | 'preview'>('write');

  const renderPageTitle = (title: string, pageKey: string, icon?: ReactNode) => {
    return (
      <div
        onMouseEnter={() => setHoveredKey(pageKey)}
        onMouseLeave={() => setHoveredKey((prev) => (prev === pageKey ? null : prev))}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          {icon ? <span style={{ display: 'inline-flex', alignItems: 'center', color: '#475569' }}>{icon}</span> : null}
          <span
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={title}
          >
            {title}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            opacity: hoveredKey === pageKey ? 1 : 0,
            transition: 'opacity 0.15s ease',
            pointerEvents: hoveredKey === pageKey ? 'auto' : 'none',
          }}
        >
          <Dropdown
            menu={{
              items: [
                { key: 'move', label: '移动' },
                { key: 'delete', label: '删除' },
              ],
            }}
            trigger={['click']}
          >
            <Button
              type="text"
              size="small"
              icon={<MoreOutlined />}
              onClick={(event) => event.stopPropagation()}
              style={{ width: 24, height: 24, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Dropdown>
          <Button
            type="text"
            size="small"
            icon={<PlusOutlined />}
            onClick={(event) => {
              event.stopPropagation();
              message.info('待接入：新建子页面');
            }}
            style={{ width: 24, height: 24, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </div>
      </div>
    );
  };

  const buildTreeData = (nodes: PageNode[]): any[] =>
    nodes.map((node) => {
      const { children, icon, ...rest } = node;
      return {
        ...rest,
        title: renderPageTitle(node.title, node.key, icon),
        icon: undefined,
        children: children ? buildTreeData(children) : undefined,
      };
    });

  const findPageByKey = (nodes: PageNode[], key: string): PageNode | null => {
    for (const node of nodes) {
      if (node.key === key) return node;
      if (node.children) {
        const child = findPageByKey(node.children, key);
        if (child) return child;
      }
    }
    return null;
  };

  const handleSelectPage = (keys: Key[]) => {
    const stringKeys = keys.map(String);
    setSelectedPageKeys(stringKeys);
    const key = stringKeys[0];
    if (!key) {
      setSelectedPage(null);
      setEditorContent('');
      return;
    }
    const page = findPageByKey(pageTree, key);
    setSelectedPage(page);
    setEditorMode('view');
    setEditorContent(page?.content || '');
  };

  const updatePageContent = (nodes: PageNode[], key: string, content: string): PageNode[] =>
    nodes.map((node) => {
      if (node.key === key) {
        return { ...node, content };
      }
      if (node.children) {
        return { ...node, children: updatePageContent(node.children, key, content) };
      }
      return node;
    });

  const handleToggleEdit = () => {
    if (!selectedPage) return;
    if (editorMode === 'view') {
      setEditorContent(selectedPage.content || '');
      setEditorMode('edit');
      setActiveEditTab('write');
    } else {
      setEditorMode('view');
      setEditorContent(selectedPage.content || '');
    }
  };

  const handleSavePage = () => {
    if (!selectedPage) {
      message.warning('请先选择一个页面');
      return;
    }
    if (!isDirty) {
      message.info('没有检测到内容变更');
      return;
    }
    setPageTree((prev) => updatePageContent(prev, selectedPage.key, editorContent));
    setSelectedPage((prev) => (prev ? { ...prev, content: editorContent } : prev));
    setEditorMode('view');
    message.success('页面内容已更新');
  };

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

  useEffect(() => {
    if (pageTree.length > 0 && selectedPageKeys.length === 0) {
      handleSelectPage([pageTree[0].key]);
    }
  }, [pageTree]);

  const md = useMemo(
    () =>
      new MarkdownIt({
        html: false,
        linkify: true,
        breaks: true,
      }),
    [],
  );

  const renderMarkdown = (source: string) => md.render(source || '');

  const menuItems = useMemo(
    () =>
      spaces.map((space) => ({
        key: space.id,
        label: space.name,
      })),
    [spaces],
  );

  const handleSelectSpace = (key: string) => {
    if (key === spaceId) {
      return;
    }
    navigate(`/knowledge/${key}`);
  };

  const currentSpace = useMemo(
    () => spaces.find((space) => space.id === spaceId),
    [spaces, spaceId],
  );

  if (loadingSpaces && spaces.length === 0) {
    return (
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f7fa',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!currentSpace) {
    return (
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f7fa',
          padding: 48,
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="未找到该空间或空间已删除"
        >
          <Button type="primary" onClick={() => navigate('/knowledge')}>
            返回空间列表
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <Layout
      style={{
        height: 'calc(100vh - 64px)',
        background: '#ffffff',
      }}
    >
          <Sider
            width={320}
            theme="light"
            style={{
              borderRight: '1px solid #f0f0f0',
              padding: '24px 16px 32px',
              background: '#f9fafb',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <Dropdown
              menu={{ items: menuItems, onClick: ({ key }) => handleSelectSpace(key) }}
              trigger={['click']}
            >
              <Button
                block
                size="large"
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 600,
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                  padding: '8px 4px',
                }}
                icon={<DownOutlined />}
                iconPosition="end"
              >
                {currentSpace?.name ?? '空间列表'}
              </Button>
            </Dropdown>

            <Menu
              mode="inline"
              selectable
              defaultSelectedKeys={['overview']}
              items={[
                {
                  key: 'overview',
                  icon: <FileTextOutlined />, // 可根据设计替换
                  label: '概览',
                },
                {
                  key: 'settings',
                  icon: <SettingOutlined />,
                  label: '设置',
                },
                {
                  key: 'search',
                  icon: <SearchOutlined />,
                  label: '搜索',
                },
              ]}
            />

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  paddingRight: 4,
                }}
              >
                <Tree
                  showLine={false}
                  showIcon={false}
                  treeData={buildTreeData(pageTree)}
                  selectedKeys={selectedPageKeys}
                  onSelect={(keys) => handleSelectPage(keys)}
                  defaultExpandAll
                />
              </div>
            </div>
          </Sider>
          <Content
            style={{
              padding: '32px 40px',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: 24,
                border: '1px solid #e2e8f0',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <Space style={{ justifyContent: 'space-between', display: 'flex', width: '100%' }} align="center">
                <div>
                  <Title level={4} style={{ margin: 0 }}>
                    {selectedPage?.title || '请选择页面'}
                  </Title>
                  <Text type="secondary">
                    {selectedPage ? '支持阅读与编辑两种模式' : '从左侧选择一个页面以开始'}
                  </Text>
                </div>
                <Space>
                  {selectedPage && (
                    <Button onClick={handleToggleEdit}>
                      {editorMode === 'view' ? '编辑' : '取消编辑'}
                    </Button>
                  )}
                  {selectedPage && editorMode === 'edit' && (
                    <Button type="primary" onClick={handleSavePage} disabled={!isDirty}>
                      保存
                    </Button>
                  )}
                </Space>
              </Space>

              {!selectedPage ? (
                <Empty description="请选择左侧的页面" style={{ margin: '48px 0' }} />
              ) : editorMode === 'edit' ? (
                <Tabs
                  activeKey={activeEditTab}
                  onChange={(key) => setActiveEditTab(key as 'write' | 'preview')}
                  items={[
                    {
                      key: 'write',
                      label: '编辑',
                      children: (
                        <div
                          style={{
                            border: '1px solid #cbd5f5',
                            borderRadius: 12,
                            overflow: 'hidden',
                          }}
                        >
                          <MarkdownEditor
                            value={editorContent}
                            onChange={setEditorContent}
                            placeholder="使用 Markdown 语法编辑内容..."
                            height="480px"
                          />
                        </div>
                      ),
                    },
                    {
                      key: 'preview',
                      label: '预览',
                      children: (
                        <div
                          style={{
                            background: '#ffffff',
                            borderRadius: 12,
                            border: '1px solid #e2e8f0',
                            padding: '24px 28px',
                            lineHeight: 1.75,
                            color: '#334155',
                          }}
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(editorContent || '该页面暂时没有内容。') }}
                        />
                      ),
                    },
                  ]}
                />
              ) : (
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    padding: '24px 28px',
                    lineHeight: 1.75,
                    color: '#334155',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(
                      selectedPage.content || '该页面暂时没有内容，点击右上角编辑按钮即可开始撰写。'
                    ),
                  }}
                />
              )}
            </div>
          </Content>
    </Layout>
  );
}
