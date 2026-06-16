# Pas# CloudMount

网盘本地挂载管理器 - 让网盘像本地硬盘一样使用

## 功能特性

- **多网盘支持**：支持阿里云盘、OneDrive、Google Drive、Dropbox、Alist、WebDAV 等
- **虚拟磁盘**：将网盘挂载为本地盘符，在资源管理器中直接访问
- **传输管理**：支持上传/下载任务管理，实时进度显示
- **系统托盘**：后台运行，最小化到托盘，开机自启
- **现代化 UI**：简洁美观的界面设计，支持深色/浅色主题

## 技术栈

- **前端**：React 18 + TypeScript + Tailwind CSS
- **桌面框架**：Tauri 2.x
- **后端**：Rust
- **数据库**：SQLite

## 开发

### 环境要求

- Node.js 18+
- Rust 1.77+
- Windows 10/11

### 安装依赖

```bash
cd pas-cloudmount
npm install
```

### 开发模式

```bash
npm run tauri dev
```

### 构建发布

```bash
npm run tauri build
```

## 项目结构

```
pas-cloudmount/
├── src/                    # React 前端源码
│   ├── components/         # UI 组件
│   ├── pages/              # 页面组件
│   └── lib/                # 工具函数
├── src-tauri/              # Rust 后端源码
│   └── src/
│       ├── cloud_provider/ # 云服务商适配
│       ├── mounter/        # 挂载管理
│       └── storage/        # 存储管理
└── docs/                   # 设计文档
```

## License

MIT
