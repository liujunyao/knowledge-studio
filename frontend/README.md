# Knowledge Studio Frontend

Knowledge Studio 的前端应用，基于 React + TypeScript + Vite + Electron 构建。

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite 7** - 构建工具
- **Electron 38** - 桌面应用框架
- **React Router DOM v7** - 路由管理
- **Tailwind CSS v4** - 样式框架
- **Lucide React** - 图标库

## 项目结构

```
frontend/
├── electron/           # Electron 主进程代码
│   └── main.js        # Electron 主进程入口
├── src/
│   ├── components/    # 可复用组件
│   │   ├── ui/       # UI 基础组件（shadcn/ui）
│   │   ├── ModelConfigForm.tsx
│   │   └── NewConversationDialog.tsx
│   ├── layouts/      # 布局组件
│   │   └── MainLayout.tsx
│   ├── pages/        # 页面组件
│   │   ├── Home.tsx
│   │   ├── Conversations.tsx
│   │   ├── Chat.tsx
│   │   ├── Knowledge.tsx
│   │   └── Settings.tsx
│   ├── services/     # API 服务
│   │   └── api.ts
│   ├── types/        # TypeScript 类型定义
│   │   └── electron.d.ts
│   ├── App.tsx       # 应用主组件
│   ├── main.tsx      # 应用入口
│   └── index.css     # 全局样式
├── public/           # 静态资源
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# Web 开发模式
pnpm dev

# Electron 桌面应用开发模式
pnpm electron:dev
```

### 构建

```bash
# 构建 Web 应用
pnpm build

# 构建 Electron 应用
pnpm electron:build
```

## 主要功能

### 1. 对话管理
- 创建新对话
- 查看对话列表
- 实时聊天界面
- 支持多种 LLM 提供商

### 2. 模型配置
- 添加/删除模型配置
- 配置 API Key
- 自定义 Base URL
- 调整模型参数（温度等）

### 3. 知识库
- 知识点收集（即将推出）
- 知识图谱可视化（即将推出）

## API 集成

前端通过 `/src/services/api.ts` 与后端 FastAPI 服务通信：

- 后端地址：`http://127.0.0.1:8000`
- API 文档：`http://127.0.0.1:8000/docs`

## 设计系统

使用 Tailwind CSS 自定义设计系统，颜色主题定义在 `tailwind.config.js` 中：

- **Primary**: 蓝色 (#2563eb)
- **Success**: 绿色 (#16a34a)
- **Warning**: 黄色 (#ca8a04)
- **Error**: 红色 (#dc2626)
- **Neutral**: 灰色

## 环境变量

可选的环境变量配置（`.env` 文件）：

```bash
VITE_API_URL=http://localhost:8000  # 后端 API 地址
```

## 注意事项

- 确保后端服务已启动（`cd backend && uv run uvicorn app.main:app --reload`）
- Electron 开发时会自动启动后端服务
- 使用 pnpm 作为包管理器
