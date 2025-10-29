import { useState, useRef } from 'react';
import {
  Button, Input, Tooltip, Dropdown, message, Badge
} from 'antd';
import {
  SendOutlined, PaperClipOutlined, PictureOutlined,
  BgColorsOutlined, SwapOutlined, StopOutlined,
  ToolOutlined
} from '@ant-design/icons';

interface ChatInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStop?: () => void;
  disabled?: boolean;
  loading?: boolean;
  currentModel?: string;
  onModelChange?: (model: string) => void;
}

export default function ChatInputArea({
  value,
  onChange,
  onSend,
  onStop,
  disabled = false,
  loading = false,
  currentModel = 'gpt-4',
  onModelChange,
}: ChatInputAreaProps) {
  const [tools, setTools] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      message.success(`文件已上传: ${file.name}`);
      // TODO: 实现文件上传逻辑
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      message.success(`图片已上传: ${file.name}`);
      // TODO: 实现图片上传逻辑
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        message.info('检测到图片，已粘贴');
        // TODO: 处理粘贴的图片
        break;
      }
    }
  };

  const toolsMenu = [
    {
      key: 'web',
      label: '🌐 联网搜索',
      onClick: () => {
        setTools(prev => prev.includes('web') ? prev.filter(t => t !== 'web') : [...prev, 'web']);
      }
    },
    {
      key: 'code',
      label: '💻 代码执行',
      onClick: () => {
        setTools(prev => prev.includes('code') ? prev.filter(t => t !== 'code') : [...prev, 'code']);
      }
    },
    {
      key: 'file',
      label: '📁 文件访问',
      onClick: () => {
        setTools(prev => prev.includes('file') ? prev.filter(t => t !== 'file') : [...prev, 'file']);
      }
    },
    {
      key: 'mcp',
      label: '🔌 MCP 工具',
      onClick: () => {
        setTools(prev => prev.includes('mcp') ? prev.filter(t => t !== 'mcp') : [...prev, 'mcp']);
      }
    },
  ];

  const modelMenu = [
    { key: 'gpt-4', label: '🤖 GPT-4' },
    { key: 'gpt-3.5', label: '🤖 GPT-3.5-turbo' },
    { key: 'claude-3', label: '🧠 Claude 3 Opus' },
    { key: 'gemini', label: '🔷 Gemini Pro' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        margin: '0 16px 16px 16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        flexShrink: 0,
      }}
    >
      {/* 输入框 - 第一行 */}
      <Input.TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={handlePaste}
        placeholder="✨ 请输入你的问题... (Shift + Enter 换行)"
        autoSize={{ minRows: 2, maxRows: 8 }}
        disabled={disabled}
        style={{
          resize: 'none',
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          marginBottom: 12,
        }}
      />

      {/* 工具栏 - 第二行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {/* 上传文件 */}
        <Tooltip title="上传文件">
          <Button
            type="text"
            size="small"
            icon={<PaperClipOutlined />}
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
          />
        </Tooltip>

        {/* 上传图片 */}
        <Tooltip title="上传图片">
          <Button
            type="text"
            size="small"
            icon={<PictureOutlined />}
            onClick={() => imageInputRef.current?.click()}
            disabled={disabled}
          />
        </Tooltip>

        {/* 联网搜索 */}
        <Tooltip title="启用工具">
          <Dropdown menu={{ items: toolsMenu }} trigger={['click']}>
            <Badge
              count={tools.length}
              style={{
                backgroundColor: tools.length > 0 ? '#1890ff' : '#d9d9d9',
              }}
            >
              <Button
                type="text"
                size="small"
                icon={<ToolOutlined />}
                disabled={disabled}
              />
            </Badge>
          </Dropdown>
        </Tooltip>

        {/* 分隔线 */}
        <div style={{ width: 1, height: 24, backgroundColor: '#e5e7eb' }} />

        {/* 切换模型 */}
        <Tooltip title="切换模型">
          <Dropdown
            menu={{
              items: modelMenu,
              onClick: (e) => onModelChange?.(e.key),
            }}
            trigger={['click']}>
            <Button
              type="text"
              size="small"
              icon={<SwapOutlined />}
              disabled={disabled}
            >
              {currentModel}
            </Button>
          </Dropdown>
        </Tooltip>

        {/* 上下文压缩 */}
        <Tooltip title="上下文压缩">
          <Button
            type="text"
            size="small"
            icon={<BgColorsOutlined />}
            disabled={disabled}
          />
        </Tooltip>

        {/* 分隔线 */}
        <div style={{ width: 1, height: 24, backgroundColor: '#e5e7eb' }} />

        {/* 发送/停止 */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {loading ? (
            <Button
              type="primary"
              danger
              icon={<StopOutlined />}
              onClick={onStop}
              size="small"
            >
              结束
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={onSend}
              disabled={!value.trim() || disabled}
              size="small"
            >
              发送
            </Button>
          )}
        </div>
      </div>

      {/* 隐藏的文件输入框 */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      {/* 工具标签 */}
      {tools.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {tools.map(tool => {
            const toolLabel = toolsMenu.find(m => m.key === tool)?.label;
            return (
              <Badge
                key={tool}
                count="x"
                style={{
                  backgroundColor: '#1890ff',
                  cursor: 'pointer',
                }}
                onClick={() => setTools(prev => prev.filter(t => t !== tool))}
              >
                <div style={{
                  padding: '2px 8px',
                  backgroundColor: '#e6f7ff',
                  borderRadius: 4,
                  fontSize: 12,
                  color: '#1890ff',
                }}>
                  {toolLabel}
                </div>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
