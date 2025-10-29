# Knowledge Studio - HTML 原型

完整的可交互 HTML 原型，基于 Figma 设计规范实现。

## 📁 文件结构

```
prototype/
├── README.md                  # 本文档
├── design-system.css          # 设计系统 CSS（颜色、字体、间距等）
├── components.css             # 组件样式（Atoms, Molecules, Organisms）
├── welcome.html               # 欢迎页面
├── index.html                 # 主界面（对话页面）
├── app.js                     # 交互脚本
└── (未来可添加更多页面)
```

## 🚀 如何使用

### 方式 1: 直接在浏览器中打开

1. 打开文件管理器，进入 `prototype/` 文件夹
2. 双击 `welcome.html` 打开欢迎页面
3. 或双击 `index.html` 直接打开主界面

### 方式 2: 使用本地服务器（推荐）

使用本地服务器可以避免跨域问题，提供更好的体验。

**使用 Python（推荐）:**
```bash
cd prototype
python -m http.server 8000
# 或 Python 2.x
python -m SimpleHTTPServer 8000
```

**使用 Node.js:**
```bash
cd prototype
npx serve
```

**使用 VS Code Live Server:**
1. 安装 Live Server 扩展
2. 右键点击 `welcome.html` 或 `index.html`
3. 选择 "Open with Live Server"

然后在浏览器中访问: `http://localhost:8000/welcome.html`

## 📄 页面说明

### 1. welcome.html - 欢迎页面

**功能:**
- 应用介绍和品牌展示
- 6 个快速启动模板（技术学习、产品设计、创意写作、科研助手、商业分析、语言学习）
- 点击模板会自动跳转到主界面并预填充提示词

**交互:**
- 点击 "开始新对话" 按钮 → 跳转到主界面
- 点击任意模板卡片 → 跳转到主界面并自动填充对应的初始问题

### 2. index.html - 主界面

**功能:**
- 完整的三栏布局（Sidebar + ChatInterface + KnowledgePanel）
- 对话列表和项目文件夹管理
- AI 对话消息展示
- 知识点标注和管理
- 知识探索链视图

**交互演示:**
- ✅ 侧边栏折叠展开
- ✅ 项目文件夹折叠展开
- ✅ 对话卡片点击切换
- ✅ 知识点标注（点击消息中的知识点或"标注"按钮）
- ✅ 深入探索（点击知识点卡片的"深入探索"按钮）
- ✅ 知识面板三个标签切换（知识点、探索链、图谱）
- ✅ 发送消息（输入框支持 Ctrl+Enter 发送）
- ✅ 键盘快捷键（见下方说明）

## ⌨️ 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Cmd/Ctrl + K` | 聚焦搜索框 |
| `Cmd/Ctrl + N` | 创建新对话 |
| `Cmd/Ctrl + B` | 切换侧边栏 |
| `Cmd/Ctrl + Enter` | 发送消息（在输入框中） |
| `Esc` | 关闭弹窗 |

## 🎨 设计系统

### 颜色系统

**Primary（主色）:**
- `#6366f1` (Indigo-500) - 主要按钮、链接、选中状态

**Semantic（语义色）:**
- `#22c55e` (Green) - ✅ 已掌握的知识点
- `#f59e0b` (Orange) - ⚠️ 部分理解的知识点
- `#ef4444` (Red) - ❓ 不理解的知识点
- `#3b82f6` (Blue) - 信息提示

**Model（模型色）:**
- `#10a37f` - OpenAI (GPT-4)
- `#d4764a` - Anthropic (Claude)
- `#4285f4` - Google (Gemini)
- `#8b5cf6` - Ollama (本地模型)

### 间距系统

基于 **8px 网格系统**:
- `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px`

### 字体系统

**字体家族:**
- 系统字体栈: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- 代码字体: `'JetBrains Mono', 'Fira Code', monospace`

**字号:**
- H1: 32px
- H2: 24px
- H3: 20px
- Body: 14px
- Caption: 12px

## 🧩 组件库

### Atoms（原子组件）
- ✅ Button（4 种类型 × 3 种尺寸）
- ✅ Input（输入框 + Textarea）
- ✅ Badge（标签徽章）
- ✅ Avatar（头像）

### Molecules（分子组件）
- ✅ ConversationCard（对话卡片）
- ✅ MessageBubble（消息气泡）
- ✅ KnowledgePointMarker（知识点标注）
- ✅ SearchBar（搜索栏）

### Organisms（有机体组件）
- ✅ Sidebar（侧边栏）
- ✅ ChatInterface（聊天界面）
- ✅ KnowledgePanel（知识面板）

## 🎯 核心功能演示

### 1. 知识点标注流程

```
步骤 1: 选择 AI 消息中的文本
  ↓
步骤 2: 点击"标注"按钮或直接点击已标注的知识点
  ↓
步骤 3: 在弹窗中选择理解状态（不理解/部分理解/已掌握）
  ↓
步骤 4: （可选）添加备注和相关问题
  ↓
步骤 5: 点击"确认标注"
  ↓
结果: 知识点出现在右侧知识面板，文本带有颜色标记
```

### 2. 深入探索流程

```
步骤 1: 在知识面板中找到不理解的知识点
  ↓
步骤 2: 点击"深入探索 →"按钮
  ↓
步骤 3: 选择探索方向（基础概念/实际应用/深入原理/自定义）
  ↓
步骤 4: 选择使用的 AI 模型
  ↓
步骤 5: 点击"开始探索"
  ↓
结果: 创建新的子对话，自动关联到父知识点
```

### 3. 探索链查看

```
步骤 1: 切换到知识面板的"探索链"标签
  ↓
步骤 2: 查看树形结构的探索路径
  ↓
步骤 3: 点击任意节点可以跳转到对应对话
  ↓
步骤 4: 点击"在知识探索器中查看"可以查看完整视图
```

## 🎬 动画效果

- **按钮 Hover**: `scale(1.02)` + 颜色变深 (150ms)
- **卡片 Hover**: 阴影加深 + 轻微上移 (200ms)
- **弹窗打开**: `scale(0.95 → 1)` + 淡入 (200ms)
- **消息发送**: 滑入动画 + 自动滚动到底部
- **知识点标注**: 下划线绘制动画 + 图标淡入

## 🌓 主题切换

虽然当前原型主要展示浅色主题，但设计系统已支持深色模式。

**手动切换（通过浏览器控制台）:**
```javascript
// 切换到深色模式
document.documentElement.setAttribute('data-theme', 'dark');

// 切换到浅色模式
document.documentElement.setAttribute('data-theme', 'light');

// 或使用内置函数
toggleTheme();
```

## 📱 响应式设计

当前原型针对桌面应用设计（最小 1024px）:
- **推荐尺寸**: 1280×800 或更大
- **最小尺寸**: 1024×768

在小于 1024px 的屏幕上:
- 侧边栏会自动折叠
- 知识面板可以通过按钮切换显示/隐藏

## 🔧 自定义和扩展

### 修改颜色

编辑 `design-system.css` 中的 CSS 变量:

```css
:root {
  /* 修改主色调 */
  --primary-500: #6366f1;  /* 改成你喜欢的颜色 */

  /* 修改模型颜色 */
  --model-openai: #10a37f;  /* OpenAI 品牌色 */
  /* ... */
}
```

### 添加新页面

1. 创建新的 HTML 文件（如 `settings.html`）
2. 引入 CSS 文件:
   ```html
   <link rel="stylesheet" href="design-system.css">
   <link rel="stylesheet" href="components.css">
   ```
3. 引入 JS 文件:
   ```html
   <script src="app.js"></script>
   ```

### 添加新组件

在 `components.css` 中添加新的组件样式:

```css
.my-new-component {
  /* 使用设计系统的变量 */
  padding: var(--spacing-4);
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  /* ... */
}
```

## 🐛 已知限制

这是一个**静态原型**，用于演示设计和交互流程:

- ❌ 没有真实的后端 API 连接
- ❌ 数据不会持久化（刷新页面会重置）
- ❌ AI 回复是模拟的（不是真实的 LLM 调用）
- ❌ 搜索功能是 UI 展示（没有实际搜索逻辑）
- ❌ 知识图谱视图是占位符

这些功能将在实际开发阶段实现。

## 🚀 从原型到开发

当准备开始实际开发时:

1. **技术栈选择**:
   - 桌面应用: Tauri v2 (Rust + WebView)
   - 前端框架: React 18 + TypeScript
   - 样式方案: Tailwind CSS + shadcn/ui
   - 状态管理: Zustand
   - 数据库: SQLite + SQLCipher

2. **迁移策略**:
   - 复用设计系统的 CSS 变量定义
   - 将组件样式转换为 React 组件
   - 使用 Tailwind 的 utility classes 替代自定义 CSS
   - 保持相同的颜色、间距、字体规范

3. **参考文档**:
   - `../docs/PRD.md` - 产品需求文档
   - `../docs/DESIGN_SYSTEM.md` - 设计系统规范
   - `../docs/UI_LAYOUTS.md` - 页面布局说明
   - `../docs/FIGMA_PROTOTYPE.md` - 原型交互规范

## 📸 截图预览

### 欢迎页面
- 品牌展示
- 6 个模板卡片
- 响应式网格布局

### 主界面
- 三栏布局（Sidebar 240px + Chat + Knowledge Panel 240px）
- 对话列表和项目管理
- 知识点标注高亮显示
- 知识面板三个视图

### 弹窗交互
- 知识点标注弹窗（带状态选择）
- 深入探索弹窗（探索方向选择）

## 💡 使用建议

1. **演示用途**: 向团队、客户展示产品概念和交互流程
2. **用户测试**: 收集早期用户反馈，验证交互设计
3. **开发参考**: 作为前端开发的视觉和交互规范
4. **设计迭代**: 快速修改样式和布局，无需重新设计 Figma

## 📞 反馈和改进

如果发现问题或有改进建议:
1. 在项目中创建 Issue
2. 或直接修改 HTML/CSS/JS 文件进行调整

## 📚 相关文档

- [PRD.md](../docs/PRD.md) - 产品需求文档
- [DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md) - 设计系统规范
- [UI_LAYOUTS.md](../docs/UI_LAYOUTS.md) - UI 布局说明
- [FIGMA_GUIDE.md](../docs/FIGMA_GUIDE.md) - Figma 设计指南
- [FIGMA_PROTOTYPE.md](../docs/FIGMA_PROTOTYPE.md) - 原型交互规范

---

**Knowledge Studio** - AI 对话知识管理系统

由 Claude Code 基于设计规范生成 · 2024
