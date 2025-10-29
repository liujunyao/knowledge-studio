# Figma 快速启动指南

## 🤔 关于 Figma 文件的重要说明

### Figma 文件不能像传统文件一样导入！

Figma 是一个**基于云的设计工具**：
- ❌ 没有 `.fig` 或 `.figma` 本地文件可以下载
- ❌ 无法从 Markdown 文档自动生成 Figma 设计
- ✅ Figma 文件存储在云端，通过浏览器或应用访问
- ✅ 可以复制（Duplicate）现有的 Figma 文件
- ✅ 可以从 Figma Community 获取模板

---

## 🚀 三种创建 Knowledge Studio 原型的方式

### 方式 1: 从零开始手动创建（完全掌控）

**适合**: 想要完全理解设计系统，学习 Figma 的人

#### 步骤：
1. **访问 Figma**
   - 网页版: https://www.figma.com
   - 或下载桌面应用: https://www.figma.com/downloads/

2. **注册/登录账号**
   - 免费账号即可开始

3. **创建新文件**
   ```
   点击左上角 "+" → "Design file"
   或按快捷键: Ctrl/Cmd + N
   ```

4. **按照文档逐步创建**
   - 📖 参考: `FIGMA_GUIDE.md` (详细步骤)
   - ✅ 参考: `FIGMA_CHECKLIST.md` (213 项任务清单)
   - 🎨 参考: `DESIGN_SYSTEM.md` (设计规范)
   - 🖥️ 参考: `UI_LAYOUTS.md` (页面布局)
   - 🔗 参考: `FIGMA_PROTOTYPE.md` (交互原型)

5. **建议的创建顺序**
   ```
   第 1 周: Design System（颜色、字体、间距）
   第 2 周: Atoms 组件（Button、Input、Badge 等）
   第 3 周: Molecules 组件（Card、MessageBubble 等）
   第 4 周: Organisms 组件（Sidebar、ChatInterface 等）
   第 5 周: 页面设计（Welcome、Main、Explorer 等）
   第 6 周: 原型交互（7 个核心流程）
   ```

**预计时间**: 30-40 小时（对于 Figma 新手）
**优点**: 完全理解设计系统，可自由定制
**缺点**: 耗时较长

---

### 方式 2: 使用现有模板快速启动（推荐）

**适合**: 想要快速启动，专注于定制而非从零创建

#### Figma Community 相似模板

Knowledge Studio 是一个 **AI 对话 + 知识管理** 应用，可以基于以下类型的模板修改：

**推荐模板 1: Chat/Messaging App**
```
搜索关键词: "chat app design system"
推荐模板:
• "Chat App UI Kit" by Figma
• "Messaging App Design" by UI8
• "Telegram Clone UI Kit"

获取方式:
1. 访问 Figma Community: https://www.figma.com/community
2. 搜索 "chat app"
3. 找到喜欢的模板
4. 点击 "Duplicate" (复制到你的账号)
5. 根据 Knowledge Studio 需求修改
```

**推荐模板 2: Dashboard/SaaS UI Kit**
```
搜索关键词: "dashboard design system" "SaaS UI kit"
推荐模板:
• "Dashboard UI Kit" by Figma
• "SaaS Design System" by UI8
• "Admin Dashboard Template"

适合的原因:
• 已有侧边栏结构
• 已有完整的设计系统
• 已有表格、卡片等组件
```

**推荐模板 3: Note-taking/Knowledge Management**
```
搜索关键词: "notion clone" "note taking app"
推荐模板:
• "Notion Clone UI Kit"
• "Note App Design System"
• "Knowledge Base Template"

适合的原因:
• 知识组织结构相似
• 文档编辑界面参考
• 标签和分类系统
```

#### 使用模板的步骤

```
1. 在 Figma Community 找到合适的模板
   https://www.figma.com/community

2. 点击 "Duplicate" 复制到你的账号
   (会创建一个可编辑的副本)

3. 重命名文件
   "Knowledge Studio - Design System"

4. 根据我们的设计规范修改:

   颜色系统 → 替换为我们的 Indigo 主题
   - Primary: #6366f1
   - 参考 DESIGN_SYSTEM.md 第2节

   组件定制 → 添加我们的特色功能
   - KnowledgePointMarker (知识点标注)
   - ExplorationTree (探索链)
   - ModelSelector (模型选择器)

   页面调整 → 按照 UI_LAYOUTS.md 布局
   - 三栏布局（Sidebar + Chat + Knowledge Panel）
   - 知识探索器页面

5. 添加我们的核心交互
   参考 FIGMA_PROTOTYPE.md 的 7 个交互流程
```

**预计时间**: 10-15 小时（修改现有模板）
**优点**: 快速启动，已有完整组件库
**缺点**: 需要大量修改，可能需要删除不需要的部分

---

### 方式 3: 使用 AI 辅助设计工具（最快）

**适合**: 快速验证概念，生成初始设计

#### 推荐工具

**3.1 Figma AI Plugins**

```
在 Figma 中安装插件:
Resources → Plugins → Search

推荐插件:
1. "Wireframe" by Figma
   - 快速生成页面线框图
   - 输入描述 → 自动生成布局

2. "Content Reel"
   - 自动填充模拟内容
   - 对话、用户名、时间戳等

3. "Iconify"
   - 搜索和插入图标
   - 支持 Material Icons, Font Awesome 等

4. "Unsplash"
   - 插入高质量占位图片
```

**3.2 使用 AI 生成初始设计**

```
可以使用这些 AI 工具生成初始设计:

• v0.dev (by Vercel)
  https://v0.dev
  - 输入文字描述 → 生成 React 组件代码
  - 可以截图后在 Figma 中重新设计
  - 示例提示词: "Create a chat interface with sidebar..."

• Uizard
  https://uizard.io
  - AI 生成 UI 设计
  - 可以导出到 Figma (付费功能)

• Galileo AI
  https://www.usegalileo.ai
  - 文字描述 → UI 设计
  - 可以导出到 Figma

使用流程:
1. 输入描述 (参考 PRD.md)
2. 生成初始设计
3. 截图或导出
4. 在 Figma 中重新绘制或导入
5. 按照我们的设计系统调整
```

**预计时间**: 5-10 小时（AI 生成 + 手动调整）
**优点**: 最快速度获得可用原型
**缺点**: 需要大量手动调整，可能不够精确

---

## 🎯 我的推荐方案（混合方式）

### 阶段 1: 快速原型（第 1-2 周）

**目标**: 快速验证核心概念和交互流程

```
步骤:
1. 从 Figma Community 复制一个 Chat App 模板
   推荐: "Telegram UI Kit" 或类似模板

2. 快速修改为 Knowledge Studio 风格
   • 修改颜色为 Indigo (#6366f1)
   • 添加知识点标注功能（手动绘制）
   • 创建 3-5 个关键页面:
     - Welcome Screen
     - Main Chat Interface
     - Knowledge Panel (右侧面板)

3. 设置基本交互
   • 新建对话
   • 发送消息
   • 标注知识点

4. 分享给团队评审
   获取早期反馈
```

**时间投入**: 10-15 小时
**产出**: 可交互的低保真原型

---

### 阶段 2: 精细化设计（第 3-4 周）

**目标**: 完善设计系统，创建完整组件库

```
步骤:
1. 创建完整的 Design System
   按照 FIGMA_GUIDE.md 第 2-3 节
   • 颜色样式 (45 个)
   • 文字样式 (12 个)
   • 效果样式 (阴影等)

2. 系统化创建组件
   按照 FIGMA_CHECKLIST.md
   • Atoms (23 个组件)
   • Molecules (25 个组件)
   • Organisms (21 个组件)

3. 设计所有页面
   按照 UI_LAYOUTS.md
   • 10 个主要页面
   • Light + Dark 模式

4. 完善交互原型
   按照 FIGMA_PROTOTYPE.md
   • 7 个核心交互流程
   • 动画和过渡效果
```

**时间投入**: 20-30 小时
**产出**: 完整的高保真原型 + 组件库

---

### 阶段 3: 开发交付（第 5 周）

**目标**: 准备开发交接材料

```
步骤:
1. 启用 Dev Mode
   供开发者查看规范

2. 导出资源
   • Logo (多尺寸 SVG)
   • 图标 (SVG)
   • Design Tokens (JSON)

3. 创建开发文档
   • 组件使用说明
   • 交互规范说明
   • API 对接说明

4. 开发者培训
   演示如何使用 Figma Inspect
```

**时间投入**: 5-10 小时
**产出**: 开发就绪的设计文件

---

## 💡 如果你现在就想看到效果

### 选项 A: 我用文字描述，你手动绘制

我可以提供更详细的**逐步操作指南**，类似于：

```
创建 Button 组件:
1. 按 F (Frame tool)
2. 点击画布，输入尺寸: 120 × 40
3. 按 T (Text tool)，输入 "发送消息"
4. 选中 Frame，按 Shift+A (Auto Layout)
5. 设置 Padding: 12px 24px
6. ...详细步骤
```

### 选项 B: 我提供模板链接，你复制修改

我可以搜索并推荐最适合的 Figma Community 模板。

### 选项 C: 我生成代码，你直接开发

跳过 Figma 设计阶段，直接用代码实现：
- 使用 Tailwind CSS（已定义的设计系统）
- 使用 shadcn/ui 组件库
- 参考 DESIGN_SYSTEM.md 的颜色和尺寸

这样开发完成后，设计和实现是一体的。

---

## ❓ 你希望采用哪种方式？

请告诉我：

**A. 快速启动**
   → 我帮你找合适的 Figma 模板，提供修改指南

**B. 详细教学**
   → 我提供逐步操作的 Figma 教程（适合学习）

**C. 跳过设计，直接开发**
   → 基于设计文档直接写代码，用 React + Tailwind 实现

**D. 混合方式**
   → 先找模板快速原型 → 再精细化设计 → 最后开发

---

## 🎓 Figma 学习资源

如果你想学习 Figma，推荐：

**官方教程**
- Figma 101: https://www.figma.com/resources/learn-design/
- YouTube: Figma Official Channel

**社区教程**
- DesignCourse (YouTube)
- Figma 中文教程 (Bilibili)

**练习项目**
- 跟着教程复制知名应用界面（Twitter, Notion 等）
- 参加 Daily UI Challenge

---

## 📋 总结对比

| 方式 | 时间 | 难度 | 灵活性 | 学习价值 | 推荐度 |
|------|------|------|--------|----------|--------|
| 从零创建 | 30-40h | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 修改模板 | 10-15h | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| AI 辅助 | 5-10h | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 直接开发 | 0h 设计 | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**我的推荐**:
- **如果你想学习设计**: 从零创建或修改模板
- **如果你想快速验证**: 修改模板 + AI 辅助
- **如果你是开发者**: 直接开发（设计和代码一体）

---

请告诉我你的选择，我会提供更具体的下一步指导！🚀
