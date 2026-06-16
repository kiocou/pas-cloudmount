# Pas# CloudMount

> 网盘本地挂载管理器 - 像使用本地磁盘一样使用网盘

## 产品介绍

Pas# CloudMount 是一款 Windows 平台上的网盘本地挂载管理器，支持将阿里云盘、OneDrive、Google Drive、Dropbox 等主流网盘挂载为本地磁盘，无需手动同步即可直接访问和管理网盘文件。

## 核心特性

- 🖥️ **原生虚拟磁盘** - 通过 WinFSP 实现真正的本地磁盘挂载
- 📦 **多网盘支持** - 支持 30+ 主流网盘服务
- ⚡ **高性能** - 优化的缓存机制，流畅的文件操作体验
- 🔐 **安全可靠** - Token 本地加密存储，不上传用户数据
- 🎨 **现代化界面** - 简洁直观的用户界面
- 🌐 **开机自启** - 支持后台运行和自动挂载

## 技术栈

- **前端**: React 18 + TypeScript + Tailwind CSS
- **框架**: Tauri 2.x (Rust)
- **虚拟磁盘**: WinFSP
- **HTTP**: reqwest
- **存储**: SQLite

## 系统要求

- Windows 10 20H2 或更高版本
- Windows 11 全版本
- x64 架构

## 快速开始

### 环境准备

`ash
# 确保已安装
- Node.js 18+
- Rust 1.70+
- pnpm (推荐) 或 npm
`

### 安装依赖

`ash
# 安装前端依赖
npm install

# 安装 Tauri CLI (如需要)
npm install -D @tauri-apps/cli@latest
`

### 开发模式

`ash
# 启动开发服务器
npm run tauri dev
`

### 构建发布

`ash
# 构建生产版本
npm run tauri build
`

## 项目结构

`
pas-cloudmount/
├── src/                    # React 前端源码
│   ├── components/         # React 组件
│   ├── pages/              # 页面组件
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具函数
│   ├── stores/             # 状态管理
│   └── types/              # TypeScript 类型定义
├── src-tauri/              # Tauri/Rust 后端源码
│   ├── src/
│   │   ├── main.rs         # 应用入口
│   │   └── lib.rs          # 核心逻辑
│   ├── Cargo.toml          # Rust 依赖配置
│   └── tauri.conf.json     # Tauri 配置
└── package.json
`

## 支持的网盘

| 网盘 | 状态 | 认证方式 |
|------|------|----------|
| 阿里云盘 | ✅ 已支持 | OAuth |
| OneDrive | ✅ 已支持 | OAuth |
| Google Drive | 🚧 开发中 | OAuth |
| Dropbox | 🚧 开发中 | OAuth |
| Alist | 🚧 开发中 | Token |
| WebDAV | 🚧 开发中 | Basic/Bearer |

## 开发路线图

- [x] 项目基础结构搭建
- [x] React 前端框架
- [x] Tauri 集成配置
- [ ] WinFSP 虚拟磁盘实现
- [ ] 阿里云盘 API 集成
- [ ] OneDrive API 集成
- [ ] 传输管理模块
- [ ] 系统托盘支持
- [ ] 开机自启功能

## License

MIT License
