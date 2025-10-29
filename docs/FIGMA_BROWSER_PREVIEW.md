# Figma 浏览器原型预览指南

## 概述

是的，Figma 原型完全支持在浏览器中查看和交互！无需安装任何软件，任何人都可以通过浏览器体验你的交互原型。

---

## 🌐 浏览器查看方式

### 方式 1: 直接分享原型链接（推荐）

#### 步骤 1: 在 Figma 中创建原型
1. 打开你的 Figma 文件
2. 切换到 **Prototype** 模式（右上角）
3. 设置交互连接（从一个元素拖拽到另一个页面）
4. 配置交互参数（On Click, Hover, Dissolve 等）

#### 步骤 2: 进入演示模式
1. 点击右上角的 **▶️ 播放按钮**（或按 `Shift + Space`）
2. 这会打开全屏预览模式

#### 步骤 3: 获取分享链接
```
方法 A: 通过分享按钮
┌─────────────────────────────────────────────┐
│ Figma 界面右上角                            │
│ [Share] 按钮 → 点击                         │
│   ↓                                         │
│ 弹出分享对话框                              │
│   ┌───────────────────────────────────┐     │
│   │ Share "Knowledge Studio"          │     │
│   ├───────────────────────────────────┤     │
│   │ 🔗 Get link                       │     │
│   │                                   │     │
│   │ Anyone with the link ▼            │ ◄── 选择此项
│   │ [x] Can view                      │     │
│   │ [ ] Can edit                      │     │
│   │                                   │     │
│   │ Link to:                          │     │
│   │ ( ) Current page                  │     │
│   │ (•) Prototype ◄────────────────── 选择此项
│   │                                   │     │
│   │ Prototype settings:               │     │
│   │ Device: Desktop                   │     │
│   │ Starting frame: Welcome Screen ▼  │     │
│   │ [x] Show hotspot hints on click   │     │
│   │                                   │     │
│   │ https://figma.com/proto/abc123... │     │
│   │                    [Copy link] ◄── 复制链接
│   └───────────────────────────────────┘     │
└─────────────────────────────────────────────┘

方法 B: 通过演示模式
1. 进入演示模式（▶️ 播放按钮）
2. 点击右上角 **Share Prototype**
3. 复制链接
```

#### 步骤 4: 在浏览器中打开
```
分享的链接格式:
https://www.figma.com/proto/[FILE_ID]/[FILE_NAME]?
  node-id=123-456
  &scaling=min-zoom
  &page-id=0:1
  &starting-point-node-id=123:456

在任何浏览器中粘贴此链接即可查看原型！
支持:
• Chrome / Edge / Safari / Firefox
• 桌面浏览器 + 移动浏览器
• 无需登录 Figma 账号（如果设置为 Anyone with link）
```

---

## 📱 浏览器预览功能

### 支持的交互功能

```
✅ 完全支持的功能:
├─ 点击交互（On Click）
├─ 鼠标悬停（On Hover）
├─ 页面切换动画（Instant, Dissolve, Smart Animate）
├─ Overlay 弹出层（Modal, Dropdown）
├─ 滚动区域（Scrollable frames）
├─ 固定元素（Fixed position）
├─ 键盘快捷键触发（After Delay）
├─ 拖拽交互（On Drag）
└─ 视频和 GIF 播放

❌ 不支持的功能:
├─ 编辑内容（只读模式）
├─ 查看图层结构
├─ 查看组件规范（需要 Dev Mode）
└─ 导出资源
```

### 交互控制

```
浏览器预览界面:
┌─────────────────────────────────────────────────────────────┐
│ [←] [→] [⚙️] [💬] [?] [↗️] [✕]  ◄── 顶部工具栏              │
│  ↑   ↑   ↑   ↑   ↑   ↑   ↑                                 │
│  │   │   │   │   │   │   └── 退出全屏                      │
│  │   │   │   │   │   └────── 在新标签页打开                │
│  │   │   │   │   └────────── 显示帮助                      │
│  │   │   │   └────────────── 评论模式（需要权限）          │
│  │   │   └────────────────── 设置（缩放、背景等）          │
│  │   └────────────────────── 下一个页面                    │
│  └────────────────────────── 上一个页面                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                   [原型界面显示区域]                         │
│                                                             │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ 🎯 Hotspot hints (hover)                ◄── 底部状态栏     │
│ 00:00 / 12:34 (如果有原型流程录制)                          │
└─────────────────────────────────────────────────────────────┘
```

### 设置选项（⚙️ 按钮）

```
┌─────────────────────────────────┐
│ Presentation settings           │
├─────────────────────────────────┤
│ Background:                     │
│ ( ) None                        │
│ (•) Custom (#F5F5F5)            │
│                                 │
│ Scaling:                        │
│ ( ) Fill                        │
│ (•) Fit                         │
│ ( ) Actual size                 │
│                                 │
│ Show:                           │
│ [x] Hotspot hints on click      │
│ [x] Navigation arrows           │
│ [ ] Comments (if allowed)       │
│                                 │
│ Restart prototype               │
└─────────────────────────────────┘
```

---

## 🔗 分享链接类型详解

### 1. Prototype Link（原型链接）
```
用途: 供他人体验交互原型
特点:
• 只能查看和交互，不能编辑
• 可以评论（如果启用）
• 自动从指定的起始页面开始
• 隐藏 Figma 编辑界面

示例 URL:
https://www.figma.com/proto/AbC123dEf456/Knowledge-Studio?
  node-id=1-2
  &scaling=scale-down
  &page-id=0:1
  &starting-point-node-id=1:2
```

### 2. Design File Link（设计文件链接）
```
用途: 供设计师和开发者查看详细设计
特点:
• 可以查看图层结构
• 可以使用 Inspect 模式查看 CSS
• 可以进入 Dev Mode
• 可以导出资源（如果有权限）

示例 URL:
https://www.figma.com/file/AbC123dEf456/Knowledge-Studio
```

### 3. Embed Link（嵌入链接）
```
用途: 嵌入到网页、Notion、Confluence 等
特点:
• <iframe> 格式
• 可以设置宽度和高度
• 支持所有原型交互

示例代码:
<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1);"
  width="800"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/AbC123dEf456/Knowledge-Studio?node-id=1-2"
  allowfullscreen>
</iframe>
```

---

## 🎯 最佳实践

### 为浏览器预览优化原型

#### 1. 设置清晰的起始页面
```
在 Figma 中:
1. 选择 Welcome Screen 页面
2. 右键 → Set as starting point for prototyping
3. 页面左上角会出现 "🏠" 图标

这样分享链接打开时会直接显示欢迎界面。
```

#### 2. 启用 Hotspot Hints（热点提示）
```
在分享设置中启用:
[x] Show hotspot hints on click

用户点击屏幕时，所有可交互的区域会高亮显示蓝色边框，
帮助他们发现可以点击的元素。
```

#### 3. 添加导航流程
```
为关键页面创建返回按钮:
┌─────────────────────────────────┐
│ [← 返回首页]  Page Title        │
│                                 │
│ [Content...]                    │
└─────────────────────────────────┘

交互设置:
• Trigger: On Click
• Action: Navigate to → Welcome Screen
• Animation: Instant (快速返回) 或 Dissolve
```

#### 4. 创建演示流程（Flows）
```
Figma 支持多个独立的原型流程:

Flow 1: 新用户引导
  Welcome → Onboarding → Main Interface

Flow 2: 知识点标注
  Main Interface → Annotation Modal → Knowledge Panel

Flow 3: 深入探索
  Knowledge Panel → Exploration Options → New Conversation

在分享时可以选择特定 Flow 的起始点。
```

---

## 📲 移动端浏览器预览

### 在手机/平板上查看原型

```
方法 1: 直接在移动浏览器打开链接
1. 复制原型链接
2. 在手机浏览器中粘贴打开
3. 自动适配屏幕尺寸

方法 2: 使用 Figma Mirror App（iOS/Android）
1. 下载 Figma Mirror 应用
2. 登录 Figma 账号
3. 扫描二维码或选择文件
4. 实时预览（连接到桌面 Figma）

优点: 更快的同步速度，支持实时更新
```

### 移动端优化建议

```
如果原型需要在移动端查看:

1. 创建移动端尺寸的 Frame
   常见尺寸:
   • iPhone 14 Pro: 393×852
   • iPad Pro 11": 834×1194
   • Android (Generic): 360×800

2. 调整 Scaling 设置
   在分享设置中选择:
   • Fill: 填满屏幕（可能裁切）
   • Fit: 适应屏幕（完整显示）
   • Actual size: 实际尺寸（可能太小）

3. 考虑触摸交互
   • 按钮至少 44×44 px（iOS 标准）
   • 避免过小的点击目标
   • 测试滚动性能
```

---

## 🎬 创建演示视频

### 录制浏览器原型演示

```
方法 1: Figma 内置录制功能
1. 进入演示模式（▶️ 播放）
2. 按 Shift + R 开始录制
3. 进行操作演示
4. 按 Shift + R 停止录制
5. 自动保存为 .webm 视频文件

方法 2: 使用屏幕录制工具
• macOS: QuickTime Player (Cmd+Shift+5)
• Windows: Xbox Game Bar (Win+G)
• Chrome: 浏览器扩展 (如 Loom, Screencastify)

方法 3: Figma 原型 URL + Loom
1. 打开原型链接
2. 启动 Loom 录制
3. 边讲解边操作
4. 自动生成可分享的视频链接
```

---

## 💬 评论和反馈

### 在浏览器原型中添加评论

```
启用评论功能:
┌─────────────────────────────────┐
│ Share "Knowledge Studio"        │
├─────────────────────────────────┤
│ Anyone with the link ▼          │
│ [x] Can view                    │
│ [x] Can comment  ◄────────────── 勾选此项
│                                 │
│ Link to: Prototype              │
└─────────────────────────────────┘

浏览器中添加评论:
1. 点击顶部工具栏的 💬 图标
2. 点击原型上的任意位置
3. 输入评论内容
4. 评论会固定在该位置

评论类型:
• 文字评论
• @提及团队成员（需要权限）
• 回复现有评论
• 标记为已解决
```

---

## 🔐 权限和安全设置

### 分享权限级别

```
1. Only people invited to this file
   • 最安全
   • 需要 Figma 账号 + 明确邀请
   • 适合内部团队

2. Anyone with the link - Can view
   • 平衡安全性和便利性
   • 无需 Figma 账号
   • 适合客户演示、用户测试

3. Anyone with the link - Can edit
   • 协作编辑
   • 需要 Figma 账号
   • 适合设计团队协作

推荐设置（对于 Knowledge Studio 原型）:
┌─────────────────────────────────┐
│ ✅ Anyone with the link         │
│ ✅ Can view                     │
│ ✅ Can comment                  │
│ ✅ Link to: Prototype           │
│ ✅ Show hotspot hints           │
└─────────────────────────────────┘
```

### 密码保护（付费功能）

```
Figma Professional/Organization 账号可以设置密码:

Share → Link settings → Require password
┌─────────────────────────────────┐
│ [x] Require password            │
│ Password: [**********]          │
│                                 │
│ 打开链接时需要输入此密码         │
└─────────────────────────────────┘
```

---

## 📊 分析和追踪（企业版功能）

### 查看原型浏览数据

```
Figma Enterprise 提供的数据:
• 查看次数
• 查看者列表（如果已登录）
• 平均停留时间
• 最常访问的页面
• 评论数量

访问方式:
File → Analytics
```

---

## 🚀 Knowledge Studio 原型分享建议

### 推荐的分享策略

```
场景 1: 内部团队评审
├─ 分享类型: Design File Link
├─ 权限: Team members can edit
├─ 用途: 设计协作、开发交接
└─ 工具: Figma Desktop App + Dev Mode

场景 2: 客户演示
├─ 分享类型: Prototype Link
├─ 权限: Anyone with link - Can view & comment
├─ 用途: 收集反馈
└─ 工具: 浏览器 + 录屏演示

场景 3: 用户测试
├─ 分享类型: Prototype Link (可嵌入 Maze, UserTesting)
├─ 权限: Anyone with link - Can view
├─ 用途: 可用性测试
└─ 工具: 浏览器 + 用户测试平台

场景 4: 开发者交接
├─ 分享类型: Design File Link
├─ 权限: Can view + Dev Mode access
├─ 用途: 查看规范、导出资源
└─ 工具: Figma Desktop/浏览器 + Inspect Mode
```

### 完整的分享流程示例

```
Knowledge Studio 原型发布流程:

1️⃣ 完成原型设计
   ├─ 所有页面设计完成
   ├─ 交互连接已设置
   ├─ 动画效果已调整
   └─ Welcome Screen 设为起始点

2️⃣ 内部测试
   ├─ 团队成员预览
   ├─ 测试所有交互流程
   ├─ 修复发现的问题
   └─ 确认在不同浏览器正常工作

3️⃣ 创建分享链接
   ├─ Share → Prototype
   ├─ Anyone with link - Can view & comment
   ├─ Show hotspot hints: ON
   ├─ Starting frame: Welcome Screen
   └─ 复制链接

4️⃣ 多渠道分享
   ├─ 邮件: 发送给利益相关者
   │  Subject: Knowledge Studio 原型演示
   │  Body: [链接] + 简短说明 + 预期反馈
   │
   ├─ Notion/Confluence: 嵌入到文档
   │  使用 Embed block 插入 iframe
   │
   ├─ Slack/Teams: 发送到设计频道
   │  链接会自动展开预览
   │
   └─ GitHub Issue/PR: 附加到相关讨论
      Markdown: [查看原型](https://figma.com/proto/...)

5️⃣ 收集反馈
   ├─ 查看评论（Figma 内）
   ├─ 记录问题（GitHub Issues）
   ├─ 迭代改进
   └─ 更新版本号

6️⃣ 最终交付
   ├─ 创建 Version (File → Save to version history)
   ├─ 版本命名: "V1.0 - MVP Design - Ready for Development"
   ├─ 分享 Design File Link 给开发团队
   └─ 启用 Dev Mode access
```

---

## 🌟 高级技巧

### 1. 创建交互式演示文档

```
在同一个 Figma 文件中创建:
├─ Page 1: Prototype (交互原型)
├─ Page 2: Documentation (文档说明)
└─ Page 3: Components (组件库)

在 Page 2 中嵌入 Page 1 的原型:
1. 在 Documentation 页面创建一个 Frame
2. 插入 → Embed → Figma Prototype
3. 粘贴 Prototype Link
4. 调整大小和位置

这样用户可以在一个页面中同时看到:
• 原型演示
• 使用说明
• 设计规范
```

### 2. 使用 Variants 创建交互状态

```
为 Button 组件创建 Variants:
┌────────────────────────────────┐
│ Button (Component Set)         │
├────────────────────────────────┤
│ Type=Primary, State=Default    │
│ Type=Primary, State=Hover      │
│ Type=Primary, State=Active     │
│ Type=Primary, State=Disabled   │
└────────────────────────────────┘

在原型中使用:
1. 添加 Button 实例
2. 设置交互: On Hover → Change to → State=Hover
3. 自动 Smart Animate 过渡

优势:
• 一次设计，多处复用
• 自动同步更新
• 减少原型文件大小
```

### 3. 使用 Overlay 创建模态框

```
创建 Modal 交互:
1. 设计 Modal Frame (如 Annotation Modal)
2. 主页面的触发按钮设置:
   • Trigger: On Click
   • Action: Open overlay
   • Overlay: Annotation Modal
   • Position: Center
   • Background: Dim (40% opacity)
   • Close when clicking outside: ✓

3. Modal 的关闭按钮:
   • Trigger: On Click
   • Action: Close overlay

效果:
• Modal 从中心弹出（带动画）
• 背景变暗
• 点击外部自动关闭
```

---

## 📝 总结

### Knowledge Studio 原型浏览器预览 Checklist

- [ ] ✅ 原型设计完成
- [ ] ✅ 所有交互连接已设置（7 个主要流程）
- [ ] ✅ 动画效果已配置（根据 FIGMA_PROTOTYPE.md）
- [ ] ✅ Welcome Screen 设为起始点
- [ ] ✅ Hotspot hints 已启用
- [ ] ✅ 在 Chrome/Safari/Firefox 测试通过
- [ ] ✅ 在移动浏览器测试通过（可选）
- [ ] ✅ 创建分享链接（Prototype mode）
- [ ] ✅ 权限设置: Anyone with link - Can view & comment
- [ ] ✅ 发送给团队成员预览
- [ ] ✅ 收集反馈并迭代
- [ ] ✅ 保存为版本（V1.0 MVP）
- [ ] ✅ 分享给开发团队（Dev Mode access）

---

## 🔗 相关资源

### 官方文档
- Figma Prototyping Guide: https://help.figma.com/hc/en-us/categories/360002051613-Prototyping
- Sharing Prototypes: https://help.figma.com/hc/en-us/articles/360040531773
- Figma Mirror App: https://help.figma.com/hc/en-us/articles/360039829114

### Knowledge Studio 设计文档
- FIGMA_GUIDE.md - Figma 实施指南
- FIGMA_PROTOTYPE.md - 原型文件结构和交互规范
- FIGMA_CHECKLIST.md - 设计任务清单
- DESIGN_SYSTEM.md - 设计系统规范
- UI_LAYOUTS.md - 页面布局设计

---

完成后，你的 Figma 原型将可以:
✅ 在任何浏览器中打开和交互
✅ 无需安装任何软件
✅ 支持完整的交互和动画
✅ 可嵌入到其他平台（Notion、Confluence）
✅ 收集评论和反馈
✅ 录制演示视频
✅ 分享给团队、客户和用户进行测试！🎉
