# Design System - Knowledge Studio

**版本**: v1.0
**日期**: 2025-10-26
**设计工具**: Figma
**UI 框架**: shadcn/ui + Tailwind CSS

---

## 📋 目录

1. [设计原则](#1-设计原则)
2. [颜色系统](#2-颜色系统)
3. [字体排版](#3-字体排版)
4. [间距系统](#4-间距系统)
5. [组件库](#5-组件库)
6. [图标系统](#6-图标系统)
7. [动效规范](#7-动效规范)
8. [响应式设计](#8-响应式设计)

---

## 1. 设计原则

### 1.1 核心设计哲学

**专注 (Focus)**
> 界面应该突出核心功能，减少干扰。用户的注意力应该在对话内容和知识点上。

**高效 (Efficient)**
> 常用操作应该快速完成。支持键盘快捷键，减少鼠标点击次数。

**清晰 (Clear)**
> 信息层级清晰，状态明确。用户应该随时知道自己在哪里，可以做什么。

**智能 (Intelligent)**
> 利用 AI 能力，自动化繁琐操作。让系统更聪明，而非让用户更努力。

### 1.2 设计目标

1. **降低认知负担**: 直观的界面，无需学习即可使用
2. **提升操作效率**: 键盘优先，快捷操作
3. **专业而友好**: 既满足技术用户，也适合普通用户
4. **美观且实用**: 现代化设计，不牺牲功能性

### 1.3 参考设计

**灵感来源**:
- **Linear**: 简洁高效的界面布局
- **Notion**: 灵活的内容组织
- **Obsidian**: 知识管理的可视化
- **Arc Browser**: 侧边栏设计和快捷操作
- **Raycast**: 命令面板交互

---

## 2. 颜色系统

### 2.1 主色调 (Primary Colors)

基于 **紫蓝色系**，代表知识、智慧和创新。

```css
/* Primary - 主色调 */
--primary-50:  #f0f4ff;   /* 最浅 */
--primary-100: #e0eaff;
--primary-200: #c7d7fe;
--primary-300: #a4bcfd;
--primary-400: #8098f9;
--primary-500: #6366f1;   /* 主色 - Indigo-500 */
--primary-600: #4f46e5;   /* 深一级 */
--primary-700: #4338ca;
--primary-800: #3730a3;
--primary-900: #312e81;
--primary-950: #1e1b4b;   /* 最深 */
```

**使用场景**:
- 主要操作按钮
- 链接
- 选中状态
- 进度指示

### 2.2 中性色 (Neutral Colors)

```css
/* Neutral - 灰色系 */
--neutral-50:  #fafafa;
--neutral-100: #f4f4f5;
--neutral-200: #e4e4e7;
--neutral-300: #d4d4d8;
--neutral-400: #a1a1aa;
--neutral-500: #71717a;   /* 次要文本 */
--neutral-600: #52525b;   /* 主要文本 */
--neutral-700: #3f3f46;
--neutral-800: #27272a;
--neutral-900: #18181b;   /* 深色模式背景 */
--neutral-950: #09090b;
```

**使用场景**:
- 背景色
- 文本颜色
- 边框
- 分隔线

### 2.3 语义色 (Semantic Colors)

```css
/* Success - 成功/已掌握 */
--success-50:  #f0fdf4;
--success-500: #22c55e;   /* Green-500 */
--success-600: #16a34a;
--success-700: #15803d;

/* Warning - 警告/部分理解 */
--warning-50:  #fffbeb;
--warning-500: #f59e0b;   /* Amber-500 */
--warning-600: #d97706;
--warning-700: #b45309;

/* Error - 错误/不理解 */
--error-50:  #fef2f2;
--error-500: #ef4444;     /* Red-500 */
--error-600: #dc2626;
--error-700: #b91c1c;

/* Info - 信息 */
--info-50:  #eff6ff;
--info-500: #3b82f6;      /* Blue-500 */
--info-600: #2563eb;
--info-700: #1d4ed8;
```

**理解状态颜色映射**:
- ✅ 已掌握: `success-500` (绿色)
- ⚠️ 部分理解: `warning-500` (黄色)
- ❓ 不理解: `error-500` (红色)

### 2.4 模型颜色 (Model Colors)

为不同 AI 模型分配专属颜色，便于快速识别。

```css
/* OpenAI - 绿色 */
--model-openai: #10a37f;

/* Anthropic - 橙色 */
--model-anthropic: #d4764a;

/* Google - 蓝色 */
--model-google: #4285f4;

/* Ollama - 紫色 */
--model-ollama: #8b5cf6;
```

### 2.5 暗色模式 (Dark Mode)

**自动适配**：根据系统设置自动切换

**暗色模式色值**:
```css
/* Dark Mode */
--background: #09090b;        /* neutral-950 */
--foreground: #fafafa;        /* neutral-50 */
--card: #18181b;              /* neutral-900 */
--card-foreground: #fafafa;
--border: #27272a;            /* neutral-800 */
--input: #27272a;
--muted: #3f3f46;             /* neutral-700 */
--muted-foreground: #a1a1aa;  /* neutral-400 */
```

**对比度要求**:
- 正常文本: 至少 4.5:1
- 大文本 (18px+): 至少 3:1
- 交互元素: 至少 3:1

---

## 3. 字体排版

### 3.1 字体家族

```css
/* 主字体 - 系统字体栈 */
--font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
             sans-serif, "Apple Color Emoji", "Segoe UI Emoji";

/* 等宽字体 - 代码 */
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco,
             Consolas, "Liberation Mono", "Courier New", monospace;

/* 中文字体优化 */
--font-zh: "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB",
           "Noto Sans CJK SC", sans-serif;
```

**字体选择理由**:
- 使用系统字体，加载快、性能好
- 跨平台一致性
- 对中文的良好支持

### 3.2 字体尺寸

基于 **Tailwind CSS** 的尺寸系统：

| 名称 | 尺寸 | 行高 | 用途 |
|------|------|------|------|
| `text-xs` | 12px | 16px | 辅助信息、标签 |
| `text-sm` | 14px | 20px | 次要文本、按钮 |
| `text-base` | 16px | 24px | 正文 **（默认）** |
| `text-lg` | 18px | 28px | 小标题 |
| `text-xl` | 20px | 28px | 对话标题 |
| `text-2xl` | 24px | 32px | 页面标题 |
| `text-3xl` | 30px | 36px | 主要标题 |
| `text-4xl` | 36px | 40px | 大标题 |

**正文阅读**:
- 对话内容: `text-base` (16px)
- 最小可读尺寸: `text-sm` (14px)

### 3.3 字重 (Font Weight)

```css
--font-light: 300;      /* 用于次要信息 */
--font-normal: 400;     /* 正文 (默认) */
--font-medium: 500;     /* 强调 */
--font-semibold: 600;   /* 标题 */
--font-bold: 700;       /* 重要标题 */
```

**使用规范**:
- 正文: `font-normal` (400)
- 按钮、标签: `font-medium` (500)
- 标题: `font-semibold` (600)
- 重要提示: `font-bold` (700)

### 3.4 行高与段落

```css
/* 行高 */
--leading-tight: 1.25;    /* 紧凑，用于标题 */
--leading-normal: 1.5;    /* 正常，用于正文 */
--leading-relaxed: 1.625; /* 宽松，用于长文本 */

/* 段落间距 */
--paragraph-spacing: 1em; /* 段落之间的间距 */
```

**最佳实践**:
- 标题: `leading-tight` (1.25)
- 正文: `leading-normal` (1.5)
- 对话内容: `leading-relaxed` (1.625)

---

## 4. 间距系统

基于 **8px 网格系统**，所有间距都是 8 的倍数。

### 4.1 间距尺度

| Token | 值 | Tailwind | 用途 |
|-------|-----|----------|------|
| `xs` | 4px | `1` | 最小间距 |
| `sm` | 8px | `2` | 紧凑间距 |
| `md` | 16px | `4` | 标准间距 **（默认）** |
| `lg` | 24px | `6` | 宽松间距 |
| `xl` | 32px | `8` | 大间距 |
| `2xl` | 48px | `12` | 组件间距 |
| `3xl` | 64px | `16` | 区域间距 |

### 4.2 常用间距场景

**组件内部**:
- 按钮内边距: `px-4 py-2` (16px x 8px)
- 输入框内边距: `px-3 py-2` (12px x 8px)
- 卡片内边距: `p-4` 或 `p-6` (16px 或 24px)

**组件之间**:
- 列表项间距: `gap-2` (8px)
- 卡片间距: `gap-4` (16px)
- 区块间距: `gap-6` 或 `gap-8` (24px 或 32px)

**布局**:
- 侧边栏宽度: `w-64` (256px = 16 * 16)
- 内容最大宽度: `max-w-4xl` (896px)
- 容器内边距: `px-6` (24px)

### 4.3 圆角 (Border Radius)

```css
--radius-sm: 4px;     /* 小圆角 */
--radius-md: 8px;     /* 标准圆角 (默认) */
--radius-lg: 12px;    /* 大圆角 */
--radius-xl: 16px;    /* 超大圆角 */
--radius-full: 9999px; /* 完全圆形 */
```

**使用场景**:
- 按钮: `rounded-md` (8px)
- 输入框: `rounded-md` (8px)
- 卡片: `rounded-lg` (12px)
- 对话气泡: `rounded-lg` (12px)
- 标签: `rounded-full` (完全圆形)
- 头像: `rounded-full`

### 4.4 阴影 (Box Shadow)

```css
/* Tailwind Shadow Tokens */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

**使用场景**:
- 卡片: `shadow-sm` (悬浮时 `shadow-md`)
- 模态框: `shadow-xl`
- 下拉菜单: `shadow-lg`
- 浮动按钮: `shadow-md`

---

## 5. 组件库

### 5.1 基础组件

#### Button（按钮）

**变体 (Variants)**:

```tsx
// Primary - 主要操作
<Button variant="primary">发送消息</Button>
// class: bg-primary-600 text-white hover:bg-primary-700

// Secondary - 次要操作
<Button variant="secondary">取消</Button>
// class: bg-neutral-200 text-neutral-900 hover:bg-neutral-300

// Ghost - 幽灵按钮
<Button variant="ghost">更多选项</Button>
// class: hover:bg-neutral-100 text-neutral-700

// Destructive - 危险操作
<Button variant="destructive">删除</Button>
// class: bg-error-600 text-white hover:bg-error-700
```

**尺寸 (Sizes)**:

```tsx
<Button size="sm">小按钮</Button>    // px-3 py-1.5 text-sm
<Button size="md">默认按钮</Button>  // px-4 py-2 text-base
<Button size="lg">大按钮</Button>    // px-6 py-3 text-lg
```

**状态**:
- Default: 默认状态
- Hover: 鼠标悬停（颜色加深 10%）
- Active: 按下（颜色加深 20%）
- Disabled: 禁用（50% 透明度，禁止交互）
- Loading: 加载中（显示 spinner）

#### Input（输入框）

```tsx
<Input
  placeholder="输入消息..."
  type="text"
/>
// class: px-3 py-2 border border-neutral-300 rounded-md
//        focus:ring-2 focus:ring-primary-500 focus:border-transparent
```

**状态**:
- Default: `border-neutral-300`
- Focus: `ring-2 ring-primary-500 border-transparent`
- Error: `border-error-500 ring-error-500`
- Disabled: `bg-neutral-100 cursor-not-allowed`

#### Textarea（文本域）

```tsx
<Textarea
  placeholder="继续对话..."
  rows={4}
  autoResize={true}
/>
```

**特性**:
- 自动高度调整
- 最小高度: 3 行
- 最大高度: 20 行
- 支持 Markdown 预览

### 5.2 导航组件

#### Sidebar（侧边栏）

**结构**:
```
┌─ Sidebar (w-64) ─────────────┐
│ [Logo] Knowledge Studio      │
├──────────────────────────────┤
│ 🔍 搜索 (Cmd+K)              │
├──────────────────────────────┤
│ 📁 项目                      │
│   └─ 技术                    │
│   └─ 产品                    │
│ 🏷️ 标签                      │
│   └─ React                   │
│ ⭐ 收藏                       │
│ 🕐 最近                       │
│ 👥 团队                       │
├──────────────────────────────┤
│ [用户头像] 设置               │
└──────────────────────────────┘
```

**交互**:
- 可折叠（显示图标模式，宽度 64px）
- 拖拽调整宽度（200px - 400px）
- 支持快捷键折叠（Cmd/Ctrl + B）

#### Tab（标签页）

```tsx
<Tabs defaultValue="conversations">
  <TabsList>
    <TabsTrigger value="conversations">对话</TabsTrigger>
    <TabsTrigger value="knowledge">知识点</TabsTrigger>
    <TabsTrigger value="graph">图谱</TabsTrigger>
  </TabsList>
  <TabsContent value="conversations">
    {/* 对话列表 */}
  </TabsContent>
</Tabs>
```

**样式**:
- 未选中: `text-neutral-600`
- 选中: `text-primary-600 border-b-2 border-primary-600`
- Hover: `text-neutral-900 bg-neutral-100`

### 5.3 数据展示组件

#### Card（卡片）

```tsx
<Card>
  <CardHeader>
    <CardTitle>对话标题</CardTitle>
    <CardDescription>GPT-4 • 2天前</CardDescription>
  </CardHeader>
  <CardContent>
    对话内容预览...
  </CardContent>
  <CardFooter>
    <Badge>React</Badge>
    <Badge>性能</Badge>
  </CardFooter>
</Card>
```

**样式**:
```css
.card {
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary-200);
}
```

#### Badge（标签）

```tsx
<Badge variant="default">标签</Badge>
<Badge variant="success">已掌握</Badge>
<Badge variant="warning">学习中</Badge>
<Badge variant="error">不理解</Badge>
```

**尺寸**:
- Small: `text-xs px-2 py-0.5`
- Medium: `text-sm px-2.5 py-0.5`

#### Avatar（头像）

```tsx
<Avatar size="sm">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

**尺寸**:
- `sm`: 24px
- `md`: 32px
- `lg`: 48px
- `xl`: 64px

### 5.4 反馈组件

#### Toast（提示）

```tsx
toast.success("保存成功");
toast.error("操作失败");
toast.info("提示信息");
toast.warning("警告信息");
```

**位置**: 右上角
**持续时间**: 3秒（可配置）
**动画**: 滑入/淡出

#### Dialog（对话框）

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>打开对话框</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>标题</DialogTitle>
      <DialogDescription>描述文本</DialogDescription>
    </DialogHeader>
    {/* 内容 */}
    <DialogFooter>
      <Button variant="secondary">取消</Button>
      <Button>确认</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**样式**:
- 背景遮罩: 50% 透明黑色
- 内容区: 白色背景，圆角 16px
- 最大宽度: 500px
- 动画: 缩放 + 淡入

#### Dropdown Menu（下拉菜单）

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>⋮</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>编辑</DropdownMenuItem>
    <DropdownMenuItem>分享</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      删除
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 5.5 特殊组件

#### Command Palette（命令面板）

快捷键: `Cmd/Ctrl + K`

```
┌─────────────────────────────────────┐
│ 🔍 搜索或输入命令...                │
├─────────────────────────────────────┤
│ 📄 最近对话                         │
│   React 性能优化                    │
│   Python 异步编程                   │
│                                     │
│ ⚡ 快速操作                         │
│   新建对话          Cmd+N           │
│   切换模型          Cmd+M           │
│   知识点标注        Cmd+K           │
│                                     │
│ 🔍 搜索结果                         │
│   ...                               │
└─────────────────────────────────────┘
```

**功能**:
- 模糊搜索对话
- 快捷操作执行
- 全局导航
- 支持键盘导航（↑↓ Enter Esc）

#### Knowledge Point Marker（知识点标注）

```tsx
<KnowledgePointMarker
  text="React.memo()"
  status="not_understood"
  note="memo 和 useMemo 有什么区别?"
/>
```

**样式**:
```css
/* 不理解 */
.kp-not-understood {
  background: rgba(239, 68, 68, 0.1);
  border-bottom: 2px solid #ef4444;
}

/* 部分理解 */
.kp-partially-understood {
  background: rgba(245, 158, 11, 0.1);
  border-bottom: 2px solid #f59e0b;
}

/* 已掌握 */
.kp-mastered {
  background: rgba(34, 197, 94, 0.1);
  border-bottom: 2px solid #22c55e;
}
```

**Hover 效果**:
- 显示笔记预览
- 显示"深入探索"按钮
- 高亮边框

---

## 6. 图标系统

### 6.1 图标库

使用 **Lucide Icons** (shadcn/ui 默认图标库)

**特点**:
- 简洁现代
- 统一风格
- 尺寸一致 (24x24 网格)
- 良好的 SVG 优化

### 6.2 常用图标

| 功能 | 图标名称 | 用途 |
|------|---------|------|
| 搜索 | `Search` | 搜索框、搜索按钮 |
| 设置 | `Settings` | 设置入口 |
| 用户 | `User` | 用户头像、个人资料 |
| 文件夹 | `Folder` | 项目、分类 |
| 标签 | `Tag` | 标签 |
| 星标 | `Star` | 收藏 |
| 时钟 | `Clock` | 最近访问 |
| 团队 | `Users` | 团队空间 |
| 消息 | `MessageSquare` | 对话 |
| 编辑 | `Edit` | 编辑操作 |
| 删除 | `Trash` | 删除操作 |
| 分享 | `Share` | 分享功能 |
| 下载 | `Download` | 导出、下载 |
| 更多 | `MoreVertical` | 更多操作 |
| 发送 | `Send` | 发送消息 |
| 附件 | `Paperclip` | 附件上传 |

### 6.3 模型图标

| 模型 | 图标 | 颜色 |
|------|------|------|
| OpenAI | 自定义 SVG | `#10a37f` |
| Anthropic | 自定义 SVG | `#d4764a` |
| Google | 自定义 SVG | `#4285f4` |
| Ollama | `Server` | `#8b5cf6` |

### 6.4 图标尺寸

```css
--icon-xs: 12px;  /* 小图标，用于标签内 */
--icon-sm: 16px;  /* 标准图标 */
--icon-md: 20px;  /* 中等图标 */
--icon-lg: 24px;  /* 大图标，用于按钮 */
--icon-xl: 32px;  /* 超大图标 */
```

**使用规范**:
- 按钮图标: `icon-sm` (16px)
- 导航图标: `icon-lg` (24px)
- 标签内图标: `icon-xs` (12px)

---

## 7. 动效规范

### 7.1 动画时长

```css
--duration-fast: 150ms;     /* 快速交互 */
--duration-normal: 200ms;   /* 标准动画 */
--duration-slow: 300ms;     /* 慢速动画 */
--duration-page: 400ms;     /* 页面切换 */
```

**使用场景**:
- Hover: `150ms`
- 点击反馈: `150ms`
- 模态框: `200ms`
- 页面切换: `300ms`
- 侧边栏展开: `300ms`

### 7.2 缓动函数 (Easing)

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**使用场景**:
- 进入动画: `ease-out`
- 退出动画: `ease-in`
- 交互动画: `ease-in-out`
- 特殊效果: `ease-bounce`

### 7.3 常用动画

**淡入淡出**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

**滑入滑出**:
```css
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(10px); opacity: 0; }
}
```

**缩放**:
```css
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

**Spinner（加载动画）**:
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### 7.4 交互反馈

**Hover 效果**:
- 按钮: 背景颜色变深
- 卡片: 提升阴影
- 链接: 下划线出现

**点击效果**:
- 按钮: 轻微缩放（scale 0.95）
- 涟漪效果（Material Design Ripple）

**加载状态**:
- 按钮: 显示 spinner
- 列表: 骨架屏（Skeleton）
- 页面: 顶部进度条

---

## 8. 响应式设计

### 8.1 断点 (Breakpoints)

```css
/* Tailwind 默认断点 */
--screen-sm: 640px;   /* 小屏设备 */
--screen-md: 768px;   /* 平板 */
--screen-lg: 1024px;  /* 笔记本 */
--screen-xl: 1280px;  /* 桌面 */
--screen-2xl: 1536px; /* 大屏 */
```

**桌面应用主要支持**:
- 最小宽度: 1024px (lg)
- 推荐宽度: 1280px - 1920px
- 最小高度: 768px

### 8.2 布局适配

**侧边栏**:
- Desktop (≥1024px): 固定 256px
- Tablet (768-1023px): 200px
- Mobile (<768px): 抽屉模式（覆盖内容）

**对话区域**:
- Desktop: 最大宽度 800px（居中）
- Tablet: 100% - 侧边栏
- Mobile: 100%

**字体大小**:
- Desktop: 基础 16px
- Tablet: 基础 16px
- Mobile: 基础 14px

### 8.3 桌面应用窗口

**最小窗口尺寸**:
- 宽度: 1024px
- 高度: 768px

**推荐窗口尺寸**:
- 宽度: 1280px
- 高度: 800px

**全屏模式**:
- 支持原生全屏
- 支持最大化

---

## 9. 可访问性 (Accessibility)

### 9.1 键盘导航

**全局快捷键**:
- `Cmd/Ctrl + K`: 打开命令面板
- `Cmd/Ctrl + N`: 新建对话
- `Cmd/Ctrl + F`: 搜索
- `Cmd/Ctrl + B`: 折叠侧边栏
- `Cmd/Ctrl + ,`: 打开设置
- `Esc`: 关闭模态框/面板

**对话快捷键**:
- `Cmd/Ctrl + Enter`: 发送消息
- `Cmd/Ctrl + M`: 切换模型
- `Cmd/Ctrl + K`: 标注知识点
- `↑/↓`: 导航消息历史

**焦点指示**:
- 清晰的焦点环: `ring-2 ring-primary-500`
- 可见的焦点顺序
- 跳过导航链接

### 9.2 ARIA 标签

```html
<!-- 按钮 -->
<button aria-label="发送消息">
  <SendIcon />
</button>

<!-- 对话框 -->
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">删除确认</h2>
</div>

<!-- 导航 -->
<nav aria-label="主导航">
  <ul role="list">
    <li><a href="#">首页</a></li>
  </ul>
</nav>
```

### 9.3 颜色对比度

- 正常文本: 至少 4.5:1
- 大文本 (18px+): 至少 3:1
- 交互元素: 至少 3:1

**检查工具**:
- WebAIM Contrast Checker
- Chrome DevTools Accessibility

---

## 10. 设计资源

### 10.1 Figma 文件结构

```
Knowledge Studio Design System
├── 🎨 Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Shadows
├── 🧩 Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   └── Navigation
├── 📱 Screens
│   ├── Chat Interface
│   ├── Knowledge Management
│   └── Settings
└── 🔄 Flows
    ├── Onboarding
    ├── Chat Flow
    └── Knowledge Point Flow
```

### 10.2 开发资源

**UI 框架**:
- shadcn/ui: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/

**图标**:
- Lucide Icons: https://lucide.dev/

**字体**:
- 系统字体栈（无需下载）

**设计工具**:
- Figma: https://figma.com/
- Figma to Code 插件

---

## 11. 实现清单

### 11.1 设计系统实现

- [ ] 配置 Tailwind CSS
- [ ] 安装 shadcn/ui
- [ ] 配置颜色系统
- [ ] 配置字体
- [ ] 实现暗色模式切换
- [ ] 创建自定义组件
- [ ] 实现响应式布局
- [ ] 添加键盘快捷键
- [ ] 可访问性测试

### 11.2 组件开发优先级

**P0 (MVP 必需)**:
- [ ] Button
- [ ] Input / Textarea
- [ ] Card
- [ ] Sidebar
- [ ] Dialog
- [ ] Dropdown Menu
- [ ] Toast
- [ ] Badge
- [ ] Avatar

**P1 (增强体验)**:
- [ ] Command Palette
- [ ] Knowledge Point Marker
- [ ] Tabs
- [ ] Progress Bar
- [ ] Skeleton
- [ ] Tooltip

**P2 (后续优化)**:
- [ ] 动画效果增强
- [ ] 主题自定义
- [ ] 组件性能优化

---

## 附录

### A. 颜色变量完整列表

参考 Tailwind CSS 官方文档: https://tailwindcss.com/docs/customizing-colors

### B. 组件 API 文档

参考 shadcn/ui 官方文档: https://ui.shadcn.com/docs/components

### C. 可访问性指南

参考 WCAG 2.1 标准: https://www.w3.org/WAI/WCAG21/quickref/

---

**文档状态**: ✅ 完成
**下一步**: 创建 Figma 设计稿 → 开始组件开发
