# Pas# CloudMount UI 设计规范

## 1. 设计理念

### 1.1 设计目标
- **简洁直观**：用户无需学习即可上手
- **现代化**：采用当前流行的设计语言
- **一致性**：统一的视觉风格和交互模式
- **高效**：最小化操作步骤，快速完成任务

### 1.2 设计风格
- **风格**: Modern Productivity App (现代化生产力工具)
- **灵感**: Notion + Linear + Raycast 的结合
- **特点**: 大量留白、清晰的层次、精致的细节

## 2. 颜色系统

### 2.1 主色调
| 名称 | 色值 | 用途 |
|------|------|------|
| Primary Blue | #3B82F6 | 主要按钮、链接、强调 |
| Primary Hover | #2563EB | 按钮悬停状态 |
| Primary Light | #EFF6FF | 浅色背景、选中状态 |

### 2.2 功能色
| 名称 | 色值 | 用途 |
|------|------|------|
| Success | #22C55E | 成功状态、已连接 |
| Warning | #F59E0B | 警告状态 |
| Error | #EF4444 | 错误状态、失败 |
| Info | #3B82F6 | 信息提示 |

### 2.3 中性色
| 名称 | 色值 | 用途 |
|------|------|------|
| Background | #FFFFFF | 页面背景 (亮色) |
| Background Alt | #F9FAFB | 卡片背景 |
| Surface | #F3F4F6 | 按钮背景、次要区域 |
| Border | #E5E7EB | 边框线 |
| Text Primary | #111827 | 主要文字 |
| Text Secondary | #6B7280 | 次要文字 |
| Text Muted | #9CA3AF | 禁用文字 |

### 2.4 深色模式
| 名称 | 色值 | 用途 |
|------|------|------|
| Background | #111827 | 页面背景 |
| Surface | #1F2937 | 卡片背景 |
| Border | #374151 | 边框线 |
| Text Primary | #F9FAFB | 主要文字 |

## 3. 字体系统

### 3.1 字体家族
- **中文**: Inter, Microsoft YaHei, PingFang SC, sans-serif
- **英文**: Inter, -apple-system, BlinkMacSystemFont, sans-serif
- **代码**: JetBrains Mono, Fira Code, monospace

### 3.2 字号规范
| 名称 | 大小 | 行高 | 用途 |
|------|------|------|------|
| Display | 32px | 40px | 页面大标题 |
| H1 | 24px | 32px | 区块标题 |
| H2 | 20px | 28px | 卡片标题 |
| H3 | 16px | 24px | 小标题 |
| Body | 14px | 20px | 正文 |
| Small | 12px | 16px | 辅助文字 |
| Tiny | 10px | 14px | 标签文字 |

## 4. 间距系统

基础间距单位: 4px
间距阶梯: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

## 5. 圆角系统

| 名称 | 值 | 用途 |
|------|-----|------|
| sm | 4px | 小按钮、标签 |
| md | 8px | 输入框、小卡片 |
| lg | 12px | 卡片、模态框 |
| xl | 16px | 大型容器 |
| full | 9999px | 圆形按钮、头像 |

## 6. 主界面设计

### 6.1 页面布局
`
Header: Logo + 搜索 + 通知 + 设置 + 用户头像 (64px)
Main: 
  - Quick Actions: 添加网盘、打开资源管理器
  - Cloud Cards: 已挂载的网盘卡片网格
  - Transfers: 传输任务列表
`

### 6.2 网盘卡片设计
- 网盘类型图标 + 连接状态徽章
- 网盘名称 (14px Medium)
- 网盘类型 (12px Gray)
- 使用量进度条 + 已用/总量
- 挂载点和同步时间

### 6.3 状态徽章
| 状态 | 背景色 | 文字色 | 图标 |
|------|--------|--------|------|
| 已连接 | #DCFCE7 | #166534 | CheckCircle |
| 连接中 | #DBEAFE | #1E40AF | Loader (旋转) |
| 错误 | #FEE2E2 | #991B1B | AlertCircle |
| 未连接 | #F3F4F6 | #4B5563 | Circle |

## 7. 添加网盘向导设计

### 7.1 向导流程 (4步)
1. 选择网盘类型 - 网格展示支持的网盘
2. OAuth授权 - 浏览器授权 + 回调
3. 配置挂载 - 盘符、路径、选项
4. 完成 - 成功提示 + 打开资源管理器

### 7.2 配置选项
- 挂载盘符: 自动分配或手动选择
- 挂载路径: 可选，默认为根目录
- 开机自动挂载: 复选框
- 连接成功后打开资源管理器: 复选框

## 8. 动效规范

### 8.1 时长
| 类型 | 时长 | 用途 |
|------|------|------|
| Fast | 100ms | 微交互 |
| Normal | 200ms | 标准过渡 |
| Slow | 300ms | 页面切换 |

### 8.2 缓动函数
- **Ease Out**: cubic-bezier(0.16, 1, 0.3, 1) - 元素进入
- **Ease In**: cubic-bezier(0.7, 0, 0.84, 0) - 元素退出
- **Ease In Out**: cubic-bezier(0.65, 0, 0.35, 1) - 元素移动

## 9. 组件清单

- [ ] Button (按钮) - Primary, Secondary, Ghost, Danger
- [ ] Input (输入框)
- [ ] Select (下拉选择)
- [ ] Switch (开关)
- [ ] Checkbox (复选框)
- [ ] Badge (徽章)
- [ ] Card (卡片)
- [ ] Modal (模态框)
- [ ] Toast (提示)
- [ ] Progress (进度条)
- [ ] Tooltip (提示文字)

## 10. Figma 设计建议

### 10.1 设计文件结构
`
Pas# CloudMount Design/
├── Cover (封面)
├── Design Tokens (设计令牌)
├── Components (组件)
│   ├── Buttons
│   ├── Cards
│   ├── Forms
│   └── Modals
├── Pages (页面)
│   ├── Main Dashboard
│   ├── Add Cloud Wizard
│   └── Settings
└── Icons (图标)
`

### 10.2 建议的设计工具
- 使用 Figma Variables 功能创建颜色主题
- 创建 Dark Mode 变体
- 使用 Auto Layout 确保响应式设计

*文档版本: v1.0*
*最后更新: 2024-06-16*
