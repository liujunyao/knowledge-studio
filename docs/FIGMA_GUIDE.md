# Figma 设计指南 - Knowledge Studio

**版本**: v1.0
**日期**: 2025-10-26
**Figma 最低版本**: Figma Desktop App (推荐)

本文档提供在 Figma 中创建 Knowledge Studio 设计稿的详细步骤和最佳实践。

---

## 📋 目录

1. [准备工作](#1-准备工作)
2. [文件结构设置](#2-文件结构设置)
3. [设计系统搭建](#3-设计系统搭建)
4. [组件创建](#4-组件创建)
5. [页面设计](#5-页面设计)
6. [原型交互](#6-原型交互)
7. [导出和交付](#7-导出和交付)

---

## 1. 准备工作

### 1.1 安装 Figma 插件

推荐安装以下插件以提升效率：

| 插件名称 | 用途 | 必需性 |
|---------|------|--------|
| **Iconify** | 快速插入 Lucide Icons | 必需 |
| **Unsplash** | 快速插入占位图 | 可选 |
| **Content Reel** | 填充示例文本 | 推荐 |
| **Auto Layout** | 智能布局辅助 | 推荐 |
| **Stark** | 可访问性检查 | 推荐 |
| **Design Lint** | 设计一致性检查 | 可选 |

**安装方式**:
1. 打开 Figma
2. 点击顶部菜单 Resources → Plugins
3. 搜索插件名称并安装

### 1.2 准备资源

下载或准备：
- Lucide Icons SVG 包（可选，插件已包含）
- 示例对话文本
- 用户头像占位图

### 1.3 创建新文件

1. 在 Figma 中创建新设计文件
2. 命名: "Knowledge Studio - Design System & Screens"
3. 设置文件尺寸: 1280 x 800 (标准桌面尺寸)

---

## 2. 文件结构设置

### 2.1 推荐的 Page 结构

在 Figma 左侧面板创建以下 Pages:

```
📄 Knowledge Studio
├── 🎨 Design System (设计系统)
│   ├── Colors (颜色)
│   ├── Typography (字体)
│   ├── Spacing (间距)
│   ├── Icons (图标)
│   └── Effects (效果)
├── 🧩 Components (组件库)
│   ├── Atoms (原子组件)
│   ├── Molecules (分子组件)
│   └── Organisms (有机组件)
├── 📱 Screens (页面)
│   ├── Onboarding (引导页)
│   ├── Chat Interface (对话界面)
│   ├── Knowledge Management (知识管理)
│   ├── Settings (设置)
│   └── Special States (特殊状态)
└── 🔄 Prototypes (原型)
```

### 2.2 创建 Frame 模板

在 Screens Page 中创建标准 Frame:

1. 按 `F` 键创建 Frame
2. 选择 Desktop 预设或自定义尺寸
3. 命名规范: `Screen Name - State`
   - 例如: `Chat - Default`
   - 例如: `Chat - With Knowledge Panel`

**推荐 Frame 尺寸**:
- 主要设计: 1280 x 800
- 大屏优化: 1920 x 1080
- 小屏测试: 1024 x 768

---

## 3. 设计系统搭建

### 3.1 创建颜色样式 (Color Styles)

在 `Design System → Colors` Page 中：

#### 步骤：

1. **创建颜色样本矩形**:
   ```
   按 R 键 → 创建矩形 → 填充颜色
   ```

2. **定义颜色变量**:
   - 选中矩形
   - 点击右侧 Fill 颜色
   - 点击四格图标（Create Style）
   - 命名规范: `Category/Name/Shade`

#### 主色调 (Primary):

创建以下颜色样式：

| 名称 | HEX | 用途 |
|------|-----|------|
| `Primary/50` | `#f0f4ff` | 最浅背景 |
| `Primary/100` | `#e0eaff` | 浅背景 |
| `Primary/200` | `#c7d7fe` | 边框 |
| `Primary/500` | `#6366f1` | 主色 ⭐ |
| `Primary/600` | `#4f46e5` | Hover |
| `Primary/700` | `#4338ca` | Active |
| `Primary/900` | `#312e81` | 深色 |

#### 中性色 (Neutral):

| 名称 | HEX | 用途 |
|------|-----|------|
| `Neutral/50` | `#fafafa` | 背景 |
| `Neutral/100` | `#f4f4f5` | 浅背景 |
| `Neutral/200` | `#e4e4e7` | 边框 |
| `Neutral/300` | `#d4d4d8` | 分隔线 |
| `Neutral/500` | `#71717a` | 次要文本 |
| `Neutral/600` | `#52525b` | 主要文本 ⭐ |
| `Neutral/900` | `#18181b` | 深色背景 |

#### 语义色:

**Success (成功/已掌握)**:
- `Success/50`: `#f0fdf4`
- `Success/500`: `#22c55e` ⭐
- `Success/700`: `#15803d`

**Warning (警告/部分理解)**:
- `Warning/50`: `#fffbeb`
- `Warning/500`: `#f59e0b` ⭐
- `Warning/700`: `#b45309`

**Error (错误/不理解)**:
- `Error/50`: `#fef2f2`
- `Error/500`: `#ef4444` ⭐
- `Error/700`: `#b91c1c`

#### 模型颜色:

- `Model/OpenAI`: `#10a37f`
- `Model/Anthropic`: `#d4764a`
- `Model/Google`: `#4285f4`
- `Model/Ollama`: `#8b5cf6`

**提示**: 创建完颜色样式后，可以在整个文件中复用。

### 3.2 创建文本样式 (Text Styles)

在 `Design System → Typography` Page 中：

#### 步骤：

1. 按 `T` 键创建文本
2. 设置字体、大小、行高、字重
3. 选中文本 → 右侧 Type settings → 点击四格图标 → Create Style
4. 命名规范: `Category/Size/Weight`

#### 推荐的文本样式：

| 样式名称 | 字体 | 大小 | 行高 | 字重 | 用途 |
|---------|------|------|------|------|------|
| `Heading/3xl/Semibold` | System | 30px | 36px | 600 | 大标题 |
| `Heading/2xl/Semibold` | System | 24px | 32px | 600 | 页面标题 |
| `Heading/xl/Semibold` | System | 20px | 28px | 600 | 对话标题 |
| `Heading/lg/Semibold` | System | 18px | 28px | 600 | 小标题 |
| `Body/base/Normal` | System | 16px | 24px | 400 | 正文 ⭐ |
| `Body/base/Medium` | System | 16px | 24px | 500 | 强调文本 |
| `Body/sm/Normal` | System | 14px | 20px | 400 | 次要文本 |
| `Body/sm/Medium` | System | 14px | 20px | 500 | 按钮文字 |
| `Caption/xs/Normal` | System | 12px | 16px | 400 | 辅助信息 |
| `Code/base/Normal` | Monospace | 16px | 24px | 400 | 代码 |

**字体选择**:
- macOS: 使用 `SF Pro Text`
- Windows: 使用 `Segoe UI`
- 或直接使用 `Inter` (需下载)

### 3.3 创建效果样式 (Effects)

在 `Design System → Effects` Page 中：

#### 阴影 (Shadows):

1. 创建矩形
2. 右侧 Effects → 添加 Drop Shadow
3. 设置参数后 → Create Style

| 样式名称 | X | Y | Blur | Spread | Color | 不透明度 |
|---------|---|---|------|--------|-------|----------|
| `Shadow/sm` | 0 | 1 | 2 | 0 | #000 | 5% |
| `Shadow/md` | 0 | 4 | 6 | -1 | #000 | 10% |
| `Shadow/lg` | 0 | 10 | 15 | -3 | #000 | 10% |
| `Shadow/xl` | 0 | 20 | 25 | -5 | #000 | 10% |

#### 圆角 (Corner Radius):

在组件中设置，常用值：
- `4px`: 小圆角
- `8px`: 标准圆角 (默认)
- `12px`: 大圆角 (卡片)
- `16px`: 超大圆角
- `9999px`: 完全圆形 (标签、头像)

### 3.4 创建网格系统 (Grid)

为 Frame 添加网格：

1. 选中 Frame
2. 右侧 Layout Grid → 点击 `+`
3. 选择 `Columns`

**推荐设置**:
```
Type: Columns
Count: 12
Margin: 24px
Gutter: 24px
Color: #6366f1 (10% opacity)
```

添加 8px 基准网格：
1. 再添加一个 Grid
2. 类型: `Grid`
3. Size: `8px`
4. Color: `#6366f1` (5% opacity)

---

## 4. 组件创建

### 4.1 组件命名规范

```
Category / Component Name / Variant / State

示例:
Atoms / Button / Primary / Default
Atoms / Button / Primary / Hover
Atoms / Input / Default / Focus
```

### 4.2 创建原子组件 (Atoms)

#### 4.2.1 Button 组件

**步骤**:

1. **创建基础按钮**:
   ```
   按 R 键 → 创建矩形
   尺寸: Auto Layout (后面设置)
   圆角: 8px
   填充: Primary/600
   ```

2. **添加文本**:
   ```
   按 T 键 → 输入 "按钮"
   应用文本样式: Body/sm/Medium
   颜色: White
   ```

3. **设置 Auto Layout**:
   ```
   选中矩形和文本 → Shift + A (Auto Layout)
   Padding: 左右 16px，上下 8px
   Spacing: 8px (如果有图标)
   ```

4. **创建组件**:
   ```
   Ctrl/Cmd + Alt + K (Create Component)
   命名: Atoms/Button/Primary/Default
   ```

5. **创建变体**:
   ```
   复制组件 → 修改颜色/状态
   选中所有变体 → 右键 → Combine as Variants

   添加属性:
   - Variant: Primary, Secondary, Ghost, Destructive
   - State: Default, Hover, Active, Disabled
   - Size: sm, md, lg
   ```

**变体颜色**:
- **Primary**: bg `Primary/600`, hover `Primary/700`
- **Secondary**: bg `Neutral/200`, text `Neutral/900`
- **Ghost**: bg `transparent`, hover `Neutral/100`
- **Destructive**: bg `Error/600`, hover `Error/700`

#### 4.2.2 Input 组件

1. 创建矩形: 宽度 `280px`，高度 `40px`
2. 圆角: `8px`
3. 边框: `1px` `Neutral/300`
4. 填充: `White`
5. 添加占位文本: `Body/base/Normal`, `Neutral/500`
6. Auto Layout: padding `12px 16px`
7. 创建组件和变体（Default, Focus, Error, Disabled）

**Focus 状态**:
- 边框: `2px` `Primary/500`
- 阴影: `0 0 0 3px` `Primary/100`

#### 4.2.3 Badge 组件

1. 创建矩形: Auto Layout
2. 圆角: `9999px` (完全圆形)
3. 添加文本: `Caption/xs/Medium`
4. Padding: `2px 8px`
5. 创建变体 (Default, Success, Warning, Error)

### 4.3 创建分子组件 (Molecules)

#### 4.3.1 对话卡片 (Conversation Card)

**结构**:
```
┌─ Card (Auto Layout, Vertical) ────────┐
│ ┌─ Header (Auto Layout, Horizontal) ─┐│
│ │ [Icon] [Title]           [Time]    ││
│ └────────────────────────────────────┘│
│ ┌─ Tags (Auto Layout, Horizontal) ───┐│
│ │ [Badge] [Badge]                    ││
│ └────────────────────────────────────┘│
│ ┌─ Preview (Text) ───────────────────┐│
│ │ 对话内容预览...                    ││
│ └────────────────────────────────────┘│
│ ┌─ Footer (Auto Layout, Horizontal) ─┐│
│ │ [💡 3 知识点] [🔍 2 探索]          ││
│ └────────────────────────────────────┘│
└───────────────────────────────────────┘
```

**步骤**:
1. 创建外层 Frame → Auto Layout (Vertical)
2. Padding: `16px`
3. Spacing: `12px`
4. 背景: `White`
5. 边框: `1px` `Neutral/200`
6. 圆角: `12px`
7. 阴影: `Shadow/sm`
8. 添加子元素（图标、文本、Badge）

#### 4.3.2 消息气泡 (Message Bubble)

**用户消息**:
- 背景: `Primary/600`
- 文本: `White`
- 对齐: 右
- 圆角: `12px 12px 4px 12px`

**AI 消息**:
- 背景: `Neutral/100`
- 文本: `Neutral/900`
- 对齐: 左
- 圆角: `12px 12px 12px 4px`

#### 4.3.3 知识点标注 (Knowledge Point Marker)

1. 创建文本: "React.memo()"
2. 背景: `Error/50` (不理解) / `Warning/50` (学习中) / `Success/50` (已掌握)
3. 底部边框: `2px` solid，对应颜色的 500
4. Padding: `2px 4px`
5. 圆角: `4px`

### 4.4 创建有机组件 (Organisms)

#### 4.4.1 侧边栏 (Sidebar)

**尺寸**: `256px` 宽 x `100%` 高

**结构**:
```
┌─ Sidebar (Auto Layout, Vertical) ──┐
│ ┌─ Logo ──────────────────────────┐│
│ │ [Icon] Knowledge Studio         ││
│ └─────────────────────────────────┘│
│ ┌─ Search ────────────────────────┐│
│ │ [🔍 搜索 Cmd+K]                 ││
│ └─────────────────────────────────┘│
│ ┌─ Nav Items ─────────────────────┐│
│ │ [📁 项目]                       ││
│ │   [└─ 技术]                     ││
│ │ [🏷️ 标签]                       ││
│ │ [⭐ 收藏]                       ││
│ └─────────────────────────────────┘│
│ ┌─ User ──────────────────────────┐│
│ │ [Avatar] 张三                   ││
│ └─────────────────────────────────┘│
└────────────────────────────────────┘
```

#### 4.4.2 知识点面板 (Knowledge Panel)

**尺寸**: `300px` 宽

包含：
- 标题: "📍 知识点 (8)"
- 筛选标签
- 知识点列表（使用前面创建的组件）
- 进度条

---

## 5. 页面设计

### 5.1 设计流程

1. **创建 Frame**: `F` 键，选择 Desktop (1280 x 800)
2. **命名 Frame**: 例如 "Chat - Default"
3. **添加网格**: 应用前面创建的网格系统
4. **插入组件**: 从组件库拖拽
5. **调整布局**: 使用 Auto Layout 和约束
6. **添加内容**: 使用真实或示例文本

### 5.2 核心页面清单

#### 必需页面 (MVP):

- [ ] **Onboarding**:
  - [ ] 欢迎页
  - [ ] API Key 配置页
  - [ ] 首次引导

- [ ] **对话界面**:
  - [ ] 对话列表（空状态）
  - [ ] 对话列表（有内容）
  - [ ] 对话详情（默认）
  - [ ] 对话详情（带知识点面板）
  - [ ] 模型选择面板

- [ ] **知识管理**:
  - [ ] 项目视图
  - [ ] 标签视图
  - [ ] 搜索结果

- [ ] **知识点探索**:
  - [ ] 知识点标注状态
  - [ ] 知识点详情面板
  - [ ] 探索链视图

- [ ] **设置**:
  - [ ] 常规设置
  - [ ] 模型配置

- [ ] **特殊状态**:
  - [ ] 加载中（骨架屏）
  - [ ] 错误状态
  - [ ] 空状态

### 5.3 页面设计技巧

#### 使用占位内容

**Iconify 插件**:
1. Plugins → Iconify
2. 搜索 "lucide" + 图标名称
3. 插入图标

**Content Reel 插件**:
1. Plugins → Content Reel
2. 选择文本层
3. 选择内容类型（Names, Emails, 等）
4. 应用

#### 快速复制布局

1. 复制整个 Frame: `Cmd/Ctrl + D`
2. 修改状态（例如：从 Default 改为 Hover）
3. 重命名 Frame

#### 使用组件实例

- 从 Components Page 拖拽组件到 Screen
- 修改组件实例的属性（颜色、文本等）
- 不会影响主组件

---

## 6. 原型交互

### 6.1 创建交互流程

1. **切换到 Prototype 模式**:
   - 右侧面板点击 "Prototype"

2. **连接 Frame**:
   - 点击 Frame 或元素
   - 拖拽蓝色连接点到目标 Frame
   - 设置交互:
     - Trigger: On Click / On Hover
     - Action: Navigate to
     - Animation: Instant / Dissolve / Smart Animate

3. **设置交互细节**:
   - Duration: 200ms (标准动画)
   - Easing: Ease Out

### 6.2 推荐的交互流程

**核心流程**:
```
欢迎页
  ↓ (点击"开始")
API Key 配置
  ↓ (点击"完成")
对话列表
  ↓ (点击对话卡片)
对话详情
  ↓ (点击知识点)
知识点详情面板 (Overlay)
  ↓ (点击"深入探索")
新对话（探索）
```

**Overlay 示例**:
- 知识点面板: 从右侧滑入
- 模态框: 从中心缩放进入
- Toast: 从顶部滑入

### 6.3 Smart Animate

对于需要平滑过渡的元素：

1. 确保两个 Frame 中的元素有**相同的名称**
2. 连接时选择 "Smart Animate"
3. Figma 会自动创建过渡动画

**适用场景**:
- 侧边栏展开/折叠
- 知识点面板显示/隐藏
- 列表项扩展

---

## 7. 导出和交付

### 7.1 导出设置

#### 导出单个资源:

1. 选中元素
2. 右侧 Export → 点击 `+`
3. 设置:
   - Format: PNG (图片) / SVG (图标)
   - Size: 1x, 2x, 3x (根据需要)
4. 点击 "Export"

#### 批量导出:

1. 为多个元素添加导出设置
2. 文件 → Export
3. 选择导出的元素
4. 导出到文件夹

#### 导出切图命名:

```
icon-{name}-{size}.svg
例如: icon-search-24.svg

screen-{name}-{state}.png
例如: screen-chat-default.png
```

### 7.2 开发者交付

#### 使用 Figma Dev Mode:

1. 右上角切换到 "Dev Mode"
2. 选中元素 → 右侧显示 CSS/Swift/Android 代码
3. 开发者可以直接复制样式代码

#### 生成规范文档:

1. 使用 Figma 的 "Inspect" 面板
2. 查看间距、颜色、字体等属性
3. 截图或导出为 PDF

#### 分享链接:

1. 点击右上角 "Share"
2. 设置权限: "Anyone with the link can view"
3. 复制链接分享给开发团队

### 7.3 组件库发布

如果要让开发者使用组件库：

1. 选中 Components Page
2. 右键 → Publish Library
3. 添加版本说明
4. 发布

开发者在其他文件中可以：
1. Assets 面板 → Team Library
2. 启用你的组件库
3. 拖拽使用组件

---

## 8. 最佳实践

### 8.1 命名规范

**Frame 命名**:
- 使用描述性名称
- 包含状态信息
- 例如: `Chat - Default`, `Chat - Loading`

**Layer 命名**:
- 清晰描述用途
- 避免 "Rectangle 1", "Text 2"
- 例如: `Button/Primary`, `Title Text`, `Avatar Image`

**组件命名**:
- 遵循 Atomic Design 分类
- 例如: `Atoms/Button/Primary/Default`

### 8.2 组织技巧

**使用 Frame 分组**:
- 将相关元素放在 Frame 中
- 使用 Auto Layout 管理布局

**使用颜色标记**:
- 右键 Frame → Color Label
- 用于标记状态（红色=错误，黄色=进行中）

**创建封面页**:
- 每个 Page 的第一个 Frame 作为封面
- 包含 Page 的说明和索引

### 8.3 协作技巧

**添加注释**:
- 按 `C` 键 → 在任意位置添加评论
- @提及团队成员

**使用 FigJam**:
- 头脑风暴和流程图
- 用户旅程地图

**版本管理**:
- 定期保存版本: 文件 → Save to Version History
- 添加版本说明

---

## 9. 检查清单

### 设计系统检查

- [ ] 所有颜色已创建为 Color Styles
- [ ] 所有文本已创建为 Text Styles
- [ ] 阴影效果已创建为 Effect Styles
- [ ] 网格系统已应用到所有 Frame
- [ ] 间距符合 8px 网格系统

### 组件库检查

- [ ] Button 组件（所有变体和状态）
- [ ] Input 组件
- [ ] Card 组件
- [ ] Badge 组件
- [ ] Avatar 组件
- [ ] 消息气泡
- [ ] 知识点标注
- [ ] 侧边栏
- [ ] 知识点面板

### 页面设计检查

- [ ] 对话界面（列表、详情）
- [ ] 知识管理界面
- [ ] 知识点探索界面
- [ ] 设置界面
- [ ] 特殊状态（空、加载、错误）

### 原型交互检查

- [ ] 核心用户流程已连接
- [ ] 交互动画设置合理
- [ ] Overlay 正确显示
- [ ] 返回导航正常

### 可访问性检查

- [ ] 颜色对比度符合 WCAG 2.1 AA 标准（使用 Stark 插件检查）
- [ ] 文本大小不小于 14px
- [ ] 交互元素不小于 44x44px
- [ ] 焦点状态清晰可见

### 交付检查

- [ ] 所有页面已命名
- [ ] 所有组件已整理
- [ ] 导出设置已配置
- [ ] 开发者可访问文件
- [ ] 规范文档已创建

---

## 10. 资源链接

### Figma 官方资源

- **Figma 教程**: https://help.figma.com/hc/en-us/categories/360002051613
- **Best Practices**: https://www.figma.com/best-practices/
- **Community 文件**: https://www.figma.com/community

### 设计灵感

- **Dribbble**: https://dribbble.com/tags/desktop_app
- **Mobbin**: https://mobbin.com/ (移动端)
- **Behance**: https://www.behance.net/

### UI Kit 参考

- **Untitled UI**: Figma Community 搜索
- **shadcn/ui Figma Kit**: Figma Community 搜索
- **Radix UI Kit**: https://www.figma.com/@radix

### 图标资源

- **Lucide Icons**: https://lucide.dev/
- **Iconify**: https://icon-sets.iconify.design/
- **Heroicons**: https://heroicons.com/

---

## 附录

### A. 快捷键速查

| 操作 | Mac | Windows |
|------|-----|---------|
| 创建 Frame | F | F |
| 创建矩形 | R | R |
| 创建文本 | T | T |
| 创建组件 | Cmd + Opt + K | Ctrl + Alt + K |
| Auto Layout | Shift + A | Shift + A |
| 复制 | Cmd + D | Ctrl + D |
| 组合 | Cmd + G | Ctrl + G |
| 取消组合 | Cmd + Shift + G | Ctrl + Shift + G |
| 切换到 Prototype | Shift + E | Shift + E |
| 播放原型 | Cmd + Enter | Ctrl + Enter |
| 添加评论 | C | C |
| 导出 | Cmd + Shift + E | Ctrl + Shift + E |

### B. Figma 插件推荐

| 插件 | 用途 | 链接 |
|------|------|------|
| Iconify | 图标库 | Community |
| Content Reel | 填充示例数据 | Community |
| Stark | 可访问性检查 | Community |
| Autoflow | 流程图箭头 | Community |
| Unsplash | 图片占位 | Community |
| Lorem Ipsum | 文本占位 | Community |

---

**文档状态**: ✅ 完成
**下一步**: 开始在 Figma 中实现设计 → 与开发团队对接
