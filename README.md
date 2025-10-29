# Knowledge Studio

AI 对话知识管理系统 - 让 AI 对话中的知识真正为你所用

## 项目概述

Knowledge Studio 是一款桌面应用,旨在帮助用户收集、组织和深度探索 AI 对话中的知识。通过与多种大语言模型(OpenAI、Anthropic、Google、Ollama)对话,用户可以标注不理解的知识点,进行深度探索,并构建个人知识图谱。

### 核心功能

1. **多模型集成** - 支持多家 LLM 提供商,使用自己的 API Key
2. **知识收集** - 自动收集和组织对话中的知识点
3. **深度探索** - 标注理解程度,对不理解的内容进行深入探索
4. **知识拓扑** - 可视化知识关系,生成知识图谱
5. **团队协作** - 分享和协作知识库(计划中)

### 差异化优势

- ❓ **理解状态追踪** - 标注知识点为"不理解"、"部分理解"、"已掌握"
- 🔍 **深度探索链** - 从原始对话创建探索分支,逐层深入理解
- 🗺️ **知识地图** - 自动生成知识拓扑图,可视化学习路径

## 技术架构

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 库**: Tailwind CSS + shadcn/ui
- **桌面框架**: Electron

### 后端
- **语言**: Python 3.11+
- **框架**: FastAPI
- **数据库**: SQLite (异步)
- **ORM**: SQLAlchemy 2.0 (async)
- **LLM**: OpenAI SDK, Anthropic SDK, Google Generative AI

### 项目结构

```
knowledge-studio/
├── frontend/               # React + Electron 前端
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── services/      # API 客户端
│   │   └── types/         # TypeScript 类型
│   └── electron/          # Electron 主进程
│       ├── main.js        # 主进程入口
│       └── preload.js     # 预加载脚本
│
├── backend/               # Python FastAPI 后端
│   ├── app/
│   │   ├── main.py        # FastAPI 应用入口
│   │   ├── api/           # API 路由
│   │   ├── models/        # SQLAlchemy 模型
│   │   └── db/            # 数据库配置
│   └── requirements.txt   # Python 依赖
│
├── docs/                  # 文档
│   ├── PRD.md            # 产品需求文档
│   └── DESIGN_SYSTEM.md  # 设计系统
│
└── prototype/             # HTML 原型
```

## 开发指南

### 环境要求

- Node.js 18+
- Python 3.11+
- uv (Python 包管理器)

### 安装依赖

#### 后端

```bash
cd backend

# 使用 uv 创建虚拟环境
uv venv

# 安装依赖
uv pip install -r requirements.txt
```

#### 前端

```bash
cd frontend

# 安装依赖
npm install
```

### 运行开发环境

#### 启动后端

```bash
cd backend
uv run uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

后端 API 将运行在 http://127.0.0.1:8000

#### 启动前端

**方式 1: Web 开发模式**

```bash
cd frontend
npm run dev
```

访问 http://localhost:5173

**方式 2: Electron 开发模式**

```bash
cd frontend
npm run electron:dev
```

这将同时启动 Vite 开发服务器和 Electron 应用。

### API 文档

后端启动后,访问以下地址查看 API 文档:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

### 数据库

数据库文件位置: `~/.knowledge-studio/knowledge_studio.db`

数据库表会在首次启动时自动创建。

## API 端点

### 模型管理

- `GET /api/models/` - 列出可用的 LLM 模型

### 对话管理

- `POST /api/conversations/` - 创建新对话
- `GET /api/conversations/` - 获取对话列表
- `GET /api/conversations/{id}` - 获取对话详情
- `DELETE /api/conversations/{id}` - 删除对话

### 消息管理

- `POST /api/conversations/{id}/messages` - 添加消息
- `GET /api/conversations/{id}/messages` - 获取消息列表

### 知识点管理

- `GET /api/knowledge/` - 获取知识点列表 (TODO)
- `POST /api/knowledge/` - 创建知识点 (TODO)

## 打包发布

### 构建前端

```bash
cd frontend
npm run build
```

### 打包 Electron 应用

```bash
cd frontend
npm run electron:build
```

生成的安装包位于 `frontend/release/` 目录。

## 开发路线图

### v1.0 (当前阶段)

- [x] 项目架构设计
- [x] 设计系统和 UI 原型
- [x] Python 后端 API
- [x] 数据库模型
- [x] Electron 集成
- [ ] 前端界面实现
- [ ] LLM API 集成
- [ ] 知识点标注功能
- [ ] 深度探索功能

### v1.1

- [ ] 知识图谱可视化
- [ ] 项目/文件夹管理
- [ ] 搜索和过滤
- [ ] 导出功能

### v2.0

- [ ] Web 版本
- [ ] 团队协作
- [ ] 云端同步
- [ ] 平台统一 API 调用

## 贡献指南

欢迎贡献代码、报告问题或提出新功能建议!

## 许可证

MIT License

## 联系方式

- GitHub Issues: [提交问题或建议]
- 文档: 查看 `docs/` 目录
