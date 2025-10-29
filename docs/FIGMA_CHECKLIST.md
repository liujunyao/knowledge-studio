# Figma 设计实施清单

本文档提供了详细的检查清单,帮助你在 Figma 中系统化地完成 Knowledge Studio 的设计工作。

## 📋 使用说明

- ✅ 已完成的项目打勾
- 🔄 进行中的项目标记
- ⏳ 等待开始的项目保持原样

---

## 阶段 1: 准备工作

### 1.1 Figma 文件设置
- [ ] 创建新的 Figma 文件,命名为 "Knowledge Studio - Design System"
- [ ] 设置文件权限(团队可编辑/查看)
- [ ] 安装必要插件:
  - [ ] Iconify (图标库)
  - [ ] Content Reel (填充模拟内容)
  - [ ] Stark (无障碍检查)
  - [ ] Auto Layout (如果没有默认启用)
  - [ ] Unsplash (图片占位符)

### 1.2 页面结构创建
- [ ] 创建 "📐 Design System" 页面
- [ ] 创建 "🧩 Components" 页面
- [ ] 创建 "🖥️ Screens" 页面
- [ ] 创建 "🔗 Prototypes" 页面
- [ ] 创建 "📝 Documentation" 页面

---

## 阶段 2: Design System 实施

### 2.1 颜色系统
- [ ] **Primary Colors** (6 个颜色样式)
  - [ ] Primary/50: #eef2ff
  - [ ] Primary/100: #e0e7ff
  - [ ] Primary/500: #6366f1
  - [ ] Primary/600: #4f46e5
  - [ ] Primary/700: #4338ca
  - [ ] Primary/900: #312e81

- [ ] **Neutral Colors** (8 个颜色样式)
  - [ ] Neutral/50: #f9fafb
  - [ ] Neutral/100: #f3f4f6
  - [ ] Neutral/200: #e5e7eb
  - [ ] Neutral/300: #d1d5db
  - [ ] Neutral/500: #6b7280
  - [ ] Neutral/700: #374151
  - [ ] Neutral/800: #1f2937
  - [ ] Neutral/900: #111827

- [ ] **Semantic Colors** (12 个颜色样式)
  - [ ] Success/50: #f0fdf4
  - [ ] Success/500: #22c55e
  - [ ] Success/700: #15803d
  - [ ] Warning/50: #fffbeb
  - [ ] Warning/500: #f59e0b
  - [ ] Warning/700: #b45309
  - [ ] Error/50: #fef2f2
  - [ ] Error/500: #ef4444
  - [ ] Error/700: #b91c1c
  - [ ] Info/50: #eff6ff
  - [ ] Info/500: #3b82f6
  - [ ] Info/700: #1d4ed8

- [ ] **Model Colors** (4 个颜色样式)
  - [ ] Model/OpenAI: #10a37f
  - [ ] Model/Anthropic: #d4764a
  - [ ] Model/Google: #4285f4
  - [ ] Model/Ollama: #8b5cf6

### 2.2 文字样式
- [ ] **Heading Styles** (5 个)
  - [ ] Heading/H1: 32px, Bold, 40px 行高
  - [ ] Heading/H2: 24px, Semibold, 32px 行高
  - [ ] Heading/H3: 20px, Semibold, 28px 行高
  - [ ] Heading/H4: 18px, Medium, 24px 行高
  - [ ] Heading/H5: 16px, Medium, 24px 行高

- [ ] **Body Styles** (4 个)
  - [ ] Body/Large: 16px, Regular, 24px 行高
  - [ ] Body/Medium: 14px, Regular, 20px 行高
  - [ ] Body/Small: 13px, Regular, 18px 行高
  - [ ] Body/XSmall: 12px, Regular, 16px 行高

- [ ] **Special Styles** (3 个)
  - [ ] Code: 14px, JetBrains Mono, 20px 行高
  - [ ] Caption: 12px, Regular, 16px 行高
  - [ ] Label: 14px, Medium, 20px 行高

### 2.3 效果样式
- [ ] **Shadow Styles** (4 个)
  - [ ] Shadow/SM: 0px 1px 2px rgba(0,0,0,0.05)
  - [ ] Shadow/MD: 0px 4px 6px rgba(0,0,0,0.1)
  - [ ] Shadow/LG: 0px 10px 15px rgba(0,0,0,0.1)
  - [ ] Shadow/XL: 0px 20px 25px rgba(0,0,0,0.1)

- [ ] **Border Radius** (创建组件变量)
  - [ ] Radius/SM: 4px
  - [ ] Radius/MD: 8px
  - [ ] Radius/LG: 12px
  - [ ] Radius/XL: 16px
  - [ ] Radius/Full: 9999px

### 2.4 间距系统
- [ ] 创建 8px 基础网格
- [ ] 设置布局网格:Columns (12列,72px,24px gutter)
- [ ] 验证所有间距值符合 8px 倍数规则

---

## 阶段 3: Atoms 组件创建

### 3.1 Button 组件
- [ ] 创建 Button 基础框架(Auto Layout)
- [ ] 添加 Variant: Type (Primary, Secondary, Ghost, Destructive)
- [ ] 添加 Variant: State (Default, Hover, Active, Disabled)
- [ ] 添加 Variant: Size (Small, Medium, Large)
- [ ] 配置内边距:小(8px 16px),中(12px 24px),大(16px 32px)
- [ ] 添加图标支持(左图标/右图标/仅图标)
- [ ] 测试所有组合(4 type × 4 state × 3 size = 48 种组合)

### 3.2 Input 组件
- [ ] 创建 Input 基础框架
- [ ] 添加 Variant: State (Default, Focus, Error, Disabled)
- [ ] 添加 Variant: Size (Small, Medium, Large)
- [ ] 配置高度:小(32px),中(40px),大(48px)
- [ ] 添加前缀/后缀图标支持
- [ ] 添加 Placeholder 文本
- [ ] 创建配套 Label 组件
- [ ] 创建配套 HelperText 组件

### 3.3 Badge 组件
- [ ] 创建 Badge 基础框架
- [ ] 添加 Variant: Type (Default, Success, Warning, Error, Info)
- [ ] 添加 Variant: Size (Small, Medium)
- [ ] 配置圆角:Radius/Full
- [ ] 添加图标支持(可选)

### 3.4 Icon 组件
- [ ] 使用 Iconify 插件导入常用图标集
- [ ] 创建 Icon 组件框架
- [ ] 添加 Variant: Size (16px, 20px, 24px, 32px)
- [ ] 组织图标库:
  - [ ] UI 操作图标(搜索、设置、关闭等)
  - [ ] 模型图标(OpenAI、Anthropic、Google、Ollama)
  - [ ] 状态图标(成功、警告、错误、信息)
  - [ ] 知识点图标(标注、探索、掌握等)

### 3.5 Avatar 组件
- [ ] 创建 Avatar 基础框架
- [ ] 添加 Variant: Size (Small 32px, Medium 40px, Large 48px)
- [ ] 添加 Variant: Type (Image, Initials, Icon)
- [ ] 配置圆角:Radius/Full
- [ ] 添加在线状态指示器(可选)

### 3.6 其他 Atoms
- [ ] Checkbox 组件(未选中/选中/不确定/禁用)
- [ ] Radio 组件(未选中/选中/禁用)
- [ ] Switch 组件(关闭/开启/禁用)
- [ ] Divider 组件(水平/垂直)
- [ ] Spinner 组件(加载指示器)

---

## 阶段 4: Molecules 组件创建

### 4.1 ConversationCard 组件
- [ ] 创建卡片基础框架(Auto Layout,垂直)
- [ ] 添加顶部信息栏:
  - [ ] 模型图标 + 名称
  - [ ] 时间戳
  - [ ] 更多操作按钮
- [ ] 添加标题区域(可编辑)
- [ ] 添加预览摘要(2行截断)
- [ ] 添加底部标签区域(Badge 组件)
- [ ] 添加 Hover 状态(背景色变化 + 阴影)
- [ ] 添加 Selected 状态(左侧蓝色边框)
- [ ] 添加知识点数量指示器

### 4.2 MessageBubble 组件
- [ ] 创建 Variant: Role (User, Assistant)
- [ ] 用户消息:右对齐,Primary 背景
- [ ] AI 消息:左对齐,Neutral 背景
- [ ] 添加顶部信息:Avatar + 名称 + 时间
- [ ] 添加消息内容区域(支持 Markdown)
- [ ] 添加底部操作栏:
  - [ ] 复制按钮
  - [ ] 标注知识点按钮
  - [ ] 重新生成按钮(仅 AI 消息)
- [ ] 添加知识点标注高亮显示

### 4.3 KnowledgePointMarker 组件
- [ ] 创建标注标记基础框架
- [ ] 添加 Variant: Status (NotUnderstood, PartiallyUnderstood, Mastered)
- [ ] 配置颜色:
  - [ ] 不理解:Error/500 (红色)
  - [ ] 部分理解:Warning/500 (橙色)
  - [ ] 已掌握:Success/500 (绿色)
- [ ] 添加图标:❓⚠️✅
- [ ] 添加 Hover 状态(显示完整信息)
- [ ] 创建配套的标注高亮样式

### 4.4 SearchBar 组件
- [ ] 组合 Input + Icon(搜索图标)
- [ ] 添加快捷键提示(Cmd+K)
- [ ] 添加最近搜索下拉菜单
- [ ] 添加搜索过滤器按钮

### 4.5 TagSelector 组件
- [ ] 创建标签选择器基础框架
- [ ] 组合 Input + Badge 列表
- [ ] 添加标签创建功能
- [ ] 添加标签删除功能
- [ ] 添加下拉建议列表

### 4.6 ModelSelector 组件
- [ ] 创建模型选择器下拉菜单
- [ ] 添加模型图标 + 名称
- [ ] 添加模型状态(可用/不可用/配置中)
- [ ] 添加快速切换功能
- [ ] 分组显示(OpenAI、Anthropic、Google、Ollama)

### 4.7 其他 Molecules
- [ ] Breadcrumb 组件(导航路径)
- [ ] Tooltip 组件(工具提示)
- [ ] Dropdown Menu 组件(下拉菜单)
- [ ] EmptyState 组件(空状态占位符)

---

## 阶段 5: Organisms 组件创建

### 5.1 Sidebar 组件
- [ ] 创建侧边栏框架(240px 宽度)
- [ ] 添加顶部 Logo 区域
- [ ] 添加 SearchBar 组件
- [ ] 添加 "新对话" 按钮
- [ ] 创建项目/文件夹树形结构:
  - [ ] 文件夹图标 + 展开/折叠
  - [ ] ConversationCard 列表
  - [ ] 拖拽排序支持(视觉设计)
- [ ] 添加底部设置区域:
  - [ ] 用户 Avatar + 名称
  - [ ] 设置按钮
- [ ] 添加 Collapsed 状态(64px 宽度,仅图标)

### 5.2 ChatInterface 组件
- [ ] 创建聊天界面框架
- [ ] 添加顶部工具栏:
  - [ ] 对话标题(可编辑)
  - [ ] ModelSelector 组件
  - [ ] 操作按钮(导出、分享、删除)
- [ ] 添加消息列表区域:
  - [ ] MessageBubble 组件列表
  - [ ] 滚动到底部按钮
  - [ ] 加载更多历史消息
- [ ] 添加底部输入区域:
  - [ ] 多行文本输入框
  - [ ] 工具栏(格式化、插入、附件)
  - [ ] 发送按钮
  - [ ] 字符计数

### 5.3 KnowledgePanel 组件
- [ ] 创建知识点面板框架(320px 宽度)
- [ ] 添加顶部标签切换:
  - [ ] 📍 知识点
  - [ ] 🔗 探索链
  - [ ] 📊 知识图谱
- [ ] 创建知识点列表视图:
  - [ ] 按理解状态分组
  - [ ] KnowledgePointMarker 组件
  - [ ] 点击跳转到原始位置
- [ ] 创建探索链视图:
  - [ ] 树形结构显示
  - [ ] 深度层级指示
  - [ ] 点击打开相关对话
- [ ] 添加折叠/展开功能

### 5.4 KnowledgeExplorer 组件
- [ ] 创建知识探索界面框架
- [ ] 添加顶部面包屑导航
- [ ] 创建左侧探索树:
  - [ ] 父对话节点
  - [ ] 子对话节点(缩进)
  - [ ] 连接线视觉设计
  - [ ] 深度层级数字标记
- [ ] 创建右侧对话详情
- [ ] 添加 "继续深入探索" 按钮

### 5.5 SettingsPanel 组件
- [ ] 创建设置面板框架
- [ ] 添加左侧导航菜单:
  - [ ] API Keys
  - [ ] Models
  - [ ] 通用设置
  - [ ] 外观
  - [ ] 快捷键
  - [ ] 关于
- [ ] 创建 API Keys 设置页:
  - [ ] Input 组件(密码类型)
  - [ ] 测试连接按钮
  - [ ] 保存按钮
- [ ] 创建 Models 设置页:
  - [ ] 模型列表
  - [ ] 启用/禁用开关
  - [ ] 默认模型选择
- [ ] 创建外观设置页:
  - [ ] 主题切换(浅色/深色/自动)
  - [ ] 字体大小选择
  - [ ] 语言选择

---

## 阶段 6: Screens 页面设计

### 6.1 主界面(Conversation View)
- [ ] 创建 1440×900 画板
- [ ] 放置 Sidebar 组件(左侧)
- [ ] 放置 ChatInterface 组件(中间)
- [ ] 放置 KnowledgePanel 组件(右侧)
- [ ] 使用 Content Reel 填充模拟对话内容
- [ ] 添加知识点标注示例
- [ ] 检查整体布局平衡

### 6.2 欢迎界面(Welcome Screen)
- [ ] 创建 1440×900 画板
- [ ] 设计中央欢迎卡片:
  - [ ] Logo + 标语
  - [ ] "开始新对话" 按钮
  - [ ] 模板对话建议(卡片列表)
- [ ] 添加背景装饰元素(可选)

### 6.3 知识探索界面(Knowledge Explorer)
- [ ] 创建 1440×900 画板
- [ ] 放置 Sidebar 组件(可折叠)
- [ ] 放置 KnowledgeExplorer 组件(主区域)
- [ ] 设计探索链示例:
  - [ ] 父对话:"React 性能优化"
  - [ ] 子对话 1:"React.memo 详解"
  - [ ] 子对话 2:"useMemo 使用场景"
  - [ ] 子对话 3:"虚拟列表实现原理"
- [ ] 显示深度层级(Depth 1, 2, 3)

### 6.4 知识管理界面(Knowledge Management)
- [ ] 创建 1440×900 画板
- [ ] 放置 Sidebar 组件
- [ ] 设计知识库列表视图:
  - [ ] 搜索和过滤栏
  - [ ] 知识点卡片网格
  - [ ] 排序选项(按时间、理解状态、主题)
- [ ] 设计知识图谱视图(占位符)

### 6.5 设置界面(Settings)
- [ ] 创建 1440×900 画板
- [ ] 放置 Sidebar 组件
- [ ] 放置 SettingsPanel 组件
- [ ] 填充各设置页示例内容

### 6.6 空状态界面
- [ ] 无对话时的空状态
- [ ] 无知识点时的空状态
- [ ] 搜索无结果的空状态
- [ ] 每个空状态包含:
  - [ ] 插图或图标
  - [ ] 提示文案
  - [ ] 操作建议按钮

---

## 阶段 7: 原型交互

### 7.1 核心用户流程
- [ ] **流程 1:创建新对话**
  - [ ] 欢迎界面 → 点击 "新对话" → 主界面
  - [ ] 主界面侧边栏 → 点击 "+" 按钮 → 主界面(新对话)

- [ ] **流程 2:标注知识点**
  - [ ] 主界面 → 选择 AI 回复文本 → 弹出标注菜单
  - [ ] 标注菜单 → 选择理解状态 → 知识点面板更新
  - [ ] 知识点面板 → 点击知识点 → 跳转到原始位置

- [ ] **流程 3:深入探索**
  - [ ] 主界面 → 点击知识点标注 → 显示详情卡片
  - [ ] 详情卡片 → 点击 "深入探索" → 创建新对话(关联)
  - [ ] 新对话 → 自动带入上下文 → 继续探索

- [ ] **流程 4:查看探索链**
  - [ ] 主界面 → 点击知识点面板 "探索链" 标签
  - [ ] 探索链视图 → 点击节点 → 打开相关对话
  - [ ] 相关对话 → 显示探索路径面包屑

- [ ] **流程 5:切换模型**
  - [ ] 主界面 → 点击顶部模型选择器 → 下拉菜单
  - [ ] 下拉菜单 → 选择新模型 → 模型切换成功

### 7.2 交互动画设置
- [ ] 页面切换:使用 "Instant" (快速切换)
- [ ] 弹出层:使用 "Move In" + "Dissolve"(200ms)
- [ ] 面板展开/折叠:使用 "Smart Animate"(300ms)
- [ ] 按钮 Hover:使用 "Change to" + "Smart Animate"(150ms)
- [ ] 列表项 Hover:使用背景色渐变(200ms)

### 7.3 Overlay 交互
- [ ] 创建知识点详情 Modal(居中叠加层)
- [ ] 创建确认删除 Dialog(居中叠加层)
- [ ] 创建右键菜单 Dropdown(锚点定位)
- [ ] 创建知识点面板(右侧滑入)
- [ ] 所有叠加层设置点击外部关闭

---

## 阶段 8: 响应式和适配

### 8.1 窗口尺寸适配
- [ ] 设计最小窗口尺寸版本(1024×768)
  - [ ] 侧边栏自动折叠
  - [ ] 知识点面板自动隐藏
  - [ ] 优化按钮尺寸和间距

- [ ] 设计推荐窗口尺寸版本(1280×800)
  - [ ] 完整三栏布局
  - [ ] 所有功能可见

- [ ] 设计大屏幕版本(1920×1080)
  - [ ] 内容最大宽度限制(1600px)
  - [ ] 两侧留白

### 8.2 暗色主题
- [ ] 创建暗色主题颜色样式:
  - [ ] Background: #111827
  - [ ] Surface: #1f2937
  - [ ] Border: #374151
  - [ ] Text Primary: #f9fafb
  - [ ] Text Secondary: #d1d5db
- [ ] 复制所有组件创建暗色版本
- [ ] 复制所有页面创建暗色版本
- [ ] 确保对比度符合 WCAG AA 标准

---

## 阶段 9: 无障碍检查

### 9.1 颜色对比度
- [ ] 使用 Stark 插件检查所有文本对比度
- [ ] 确保正常文本对比度 ≥ 4.5:1
- [ ] 确保大字体(18px+)对比度 ≥ 3:1
- [ ] 修复所有对比度不足的组合

### 9.2 焦点状态
- [ ] 为所有交互元素添加 Focus 状态
- [ ] Focus 状态使用明显的外边框(2px Primary/500)
- [ ] 确保 Tab 键顺序符合逻辑
- [ ] 标注 Tab 顺序(使用数字标记)

### 9.3 语义化标注
- [ ] 为所有图标添加文字标签(用于屏幕阅读器)
- [ ] 为所有表单添加 Label
- [ ] 为所有按钮添加描述性文本
- [ ] 为复杂组件添加 ARIA 标注建议(在注释中)

---

## 阶段 10: 导出和交付

### 10.1 组件库发布
- [ ] 整理组件库结构
- [ ] 为每个组件添加使用说明(Description)
- [ ] 发布为团队库(Team Library)
- [ ] 创建组件库文档页面

### 10.2 设计资源导出
- [ ] 导出所有图标(SVG 格式)
- [ ] 导出 Logo 资源(SVG + PNG)
- [ ] 导出模型品牌图标(各尺寸)
- [ ] 整理到 `/assets` 文件夹

### 10.3 开发者交付
- [ ] 启用 Figma Dev Mode
- [ ] 检查所有组件的代码提示
- [ ] 标注所有间距和尺寸
- [ ] 导出 Design Tokens(使用 Tokens Studio 插件,可选)
- [ ] 创建设计-开发交接文档:
  - [ ] 组件对应关系(Figma → React)
  - [ ] 颜色变量对应关系
  - [ ] 文字样式对应关系
  - [ ] 特殊交互说明

### 10.4 原型演示准备
- [ ] 创建完整用户旅程演示流程
- [ ] 设置演示起始页(欢迎界面)
- [ ] 测试所有交互链接
- [ ] 创建演示视频(可选,使用屏幕录制)
- [ ] 准备设计介绍 PPT(可选)

---

## 阶段 11: 迭代和优化

### 11.1 内部审查
- [ ] 团队设计评审会议
- [ ] 收集反馈意见
- [ ] 创建优化任务清单
- [ ] 执行优化调整

### 11.2 用户测试准备
- [ ] 创建可交互原型链接
- [ ] 准备用户测试任务清单
- [ ] 准备观察记录模板

### 11.3 设计文档完善
- [ ] 更新 DESIGN_SYSTEM.md(如有变化)
- [ ] 更新 UI_LAYOUTS.md(如有变化)
- [ ] 创建设计更新日志
- [ ] 同步设计文件和文档

---

## 📊 进度追踪

| 阶段 | 任务数 | 已完成 | 进度 |
|------|--------|--------|------|
| 1. 准备工作 | 10 | 0 | 0% |
| 2. Design System | 45 | 0 | 0% |
| 3. Atoms 组件 | 23 | 0 | 0% |
| 4. Molecules 组件 | 25 | 0 | 0% |
| 5. Organisms 组件 | 21 | 0 | 0% |
| 6. Screens 页面 | 22 | 0 | 0% |
| 7. 原型交互 | 20 | 0 | 0% |
| 8. 响应式适配 | 11 | 0 | 0% |
| 9. 无障碍检查 | 12 | 0 | 0% |
| 10. 导出交付 | 16 | 0 | 0% |
| 11. 迭代优化 | 8 | 0 | 0% |
| **总计** | **213** | **0** | **0%** |

---

## 💡 使用建议

1. **按阶段推进**: 不要跳过阶段,每个阶段都是下一阶段的基础
2. **每日回顾**: 每天结束时更新进度,标记已完成项目
3. **及时保存**: Figma 自动保存,但建议定期手动创建版本快照
4. **团队协作**: 如果多人协作,分配任务时标注负责人
5. **灵活调整**: 根据实际情况调整任务优先级,但保持核心流程完整

---

## 🎯 质量标准

每个阶段完成后,检查以下质量标准:

- [ ] 所有组件符合设计系统规范
- [ ] 所有间距使用 8px 倍数
- [ ] 所有颜色使用预定义颜色样式
- [ ] 所有文字使用预定义文字样式
- [ ] 所有组件使用 Auto Layout
- [ ] 所有交互元素有 Hover/Active/Disabled 状态
- [ ] 所有页面有空状态设计
- [ ] 所有设计通过无障碍检查

---

完成所有清单项目后,你将拥有一个完整、专业、可交付的 Figma 设计文件!🎉
