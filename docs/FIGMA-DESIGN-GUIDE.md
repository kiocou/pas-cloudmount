# Figma 设计模板指南

本指南帮助您在 Figma 中创建设计文件，按照 docs/UI-DESIGN-SPEC.md 中的规范设计 Pas# CloudMount 的 UI。

## 1. 创建 Figma 文件

### 1.1 新建文件
1. 打开 Figma
2. 点击右上角 \"+\" 创建新文件
3. 选择 **Design** 文件类型
4. 文件名: Pas# CloudMount Design

### 1.2 页面结构
`
Pas# CloudMount Design/
├── Cover (封面)
├── Design Tokens (设计令牌)
├── Components (组件库)
│   ├── Buttons
│   ├── Form Elements
│   ├── Cards
│   └── Feedback
├── Pages (页面设计)
│   ├── Dashboard
│   ├── Add Cloud Wizard
│   └── Settings
└── Assets (资源)
    └── Icons
`

## 2. 设置 Design Tokens (设计令牌)

### 2.1 创建颜色变量
在 Figma Variables 中创建以下颜色集合：

**Colors/Primitive**
`
gray-50: #F9FAFB
gray-100: #F3F4F6
gray-200: #E5E7EB
gray-300: #D1D5DB
gray-400: #9CA3AF
gray-500: #6B7280
gray-600: #4B5563
gray-700: #374151
gray-800: #1F2937
gray-900: #111827

blue-50: #EFF6FF
blue-100: #DBEAFE
blue-500: #3B82F6
blue-600: #2563EB
blue-700: #1D4ED8

green-50: #DCFCE7
green-500: #22C55E
green-700: #166534

red-50: #FEE2E2
red-500: #EF4444
red-700: #991B1B

yellow-50: #FEF3C7
yellow-500: #F59E0B
`

**Colors/Semantic**
`
background: #FFFFFF
surface: #F9FAFB
border: #E5E7EB
text-primary: #111827
text-secondary: #6B7280
text-muted: #9CA3AF

primary: #3B82F6
primary-hover: #2563EB
success: #22C55E
warning: #F59E0B
error: #EF4444
`

### 2.2 创建间距变量
`
spacing-1: 4px
spacing-2: 8px
spacing-3: 12px
spacing-4: 16px
spacing-6: 24px
spacing-8: 32px
spacing-12: 48px
`

### 2.3 创建圆角变量
`
radius-sm: 4px
radius-md: 8px
radius-lg: 12px
radius-xl: 16px
radius-full: 9999px
`

## 3. 创建组件

### 3.1 Button 按钮组件

**尺寸变体**: Small, Medium, Large
**类型变体**: Primary, Secondary, Ghost, Danger
**状态**: Default, Hover, Active, Disabled, Loading

**设计规范**:
| 变体 | 背景色 | 文字色 | 边框 |
|------|--------|--------|------|
| Primary | #3B82F6 | #FFFFFF | 无 |
| Secondary | #FFFFFF | #374151 | #E5E7EB |
| Ghost | 透明 | #374151 | 无 |
| Danger | #EF4444 | #FFFFFF | 无 |

### 3.2 CloudCard 网盘卡片组件

**尺寸**: 280x200px (最小)
**结构**:
`
┌──────────────────────────┐
│ [图标] [状态徽章]       │  ← 48x48 图标 + 徽章
│                          │
│ 网盘名称                  │  ← 14px Medium #111827
│ 网盘类型                  │  ← 12px Regular #6B7280
│                          │
│ ████████░░░░░  50%      │  ← 进度条
│ 100GB / 200GB           │  ← 12px Regular #9CA3AF
│                          │
│ Z:    最后同步: 10:30    │  ← 12px Regular #9CA3AF
└──────────────────────────┘
`

### 3.3 StatusBadge 状态徽章

**尺寸**: 自适应文字 + padding 8px
**类型**:
| 状态 | 背景色 | 文字色 | 图标 |
|------|--------|--------|------|
| 已连接 | #DCFCE7 | #166534 | ✓ Check |
| 连接中 | #DBEAFE | #1E40AF | ↻ Loader (动画) |
| 错误 | #FEE2E2 | #991B1B | ⚠ Alert |
| 未连接 | #F3F4F6 | #4B5563 | ○ Circle |

### 3.4 Modal 模态框

**最大宽度**: 480px (小) / 640px (中) / 800px (大)
**圆角**: 16px
**阴影**: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
**背景遮罩**: rgba(0, 0, 0, 0.5)

### 3.5 ProgressBar 进度条

**高度**: 4px (小) / 8px (中) / 12px (大)
**圆角**: 9999px (全圆角)
**背景**: #F3F4F6
**填充色**: #3B82F6

## 4. 页面设计

### 4.1 Dashboard 主页面 (1200x800)

`
┌──────────────────────────────────────────────────────────┐
│ [Logo]  Pas# CloudMount     🔔  ⚙️  👤                   │ Header 64px
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [+ 添加网盘]        [📁 打开资源管理器]                   │ Quick Actions
│                                                          │
│  已挂载的网盘                                            │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐        │
│  │ 阿里   │  │OneDrive│  │ Google │  │+ 添加  │        │ Cloud Cards
│  │ 云盘   │  │        │  │ Drive  │  │        │        │
│  └────────┘  └────────┘  └────────┘  └────────┘        │
│                                                          │
│  传输任务                                                │
│  ┌──────────────────────────────────────────────────┐    │ Transfers
│  │ 文件名            进度            速度    操作  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
`

### 4.2 Add Cloud Wizard 添加网盘向导

**步骤指示器**: 
`
● ─── ○ ─── ○ ─── ○
1    2    3    4
`

**步骤 1: 选择网盘类型**
`
┌────────────────────────────────────────────────┐
│                 添加网盘                         │
│                                                │
│          选择要添加的云存储服务类型               │
│                                                │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│   │    🔶    │  │    🔷    │  │    🔵    │    │
│   │ 阿里云盘 │  │ OneDrive │  │ Google  │    │
│   └──────────┘  └──────────┘  └──────────┘    │
│                                                │
│   ┌──────────┐  ┌──────────┐                   │
│   │    🔷    │  │    🟢    │                   │
│   │ Dropbox │  │  Alist   │                   │
│   └──────────┘  └──────────┘                   │
│                                                │
│                              [取消]  [下一步→]  │
└────────────────────────────────────────────────┘
`

**步骤 3: 配置挂载选项**
`
┌────────────────────────────────────────────────┐
│                 配置挂载选项                     │
│                                                │
│  显示名称                                        │
│  ┌────────────────────────────────────────┐   │
│  │ 我的阿里云盘                             │   │
│  └────────────────────────────────────────┘   │
│                                                │
│  挂载盘符                                        │
│  ┌────────────────┐  ┌────────────────┐        │
│  │ 自动分配      ▼ │  │ Z:            │        │
│  └────────────────┘  └────────────────┘        │
│                                                │
│  ☐ 开机自动挂载                                 │
│  ☐ 连接成功后打开资源管理器                      │
│                                                │
│  [← 上一步]                    [完成挂载 ✓]     │
└────────────────────────────────────────────────┘
`

## 5. 使用 Auto Layout

所有组件和布局必须使用 Auto Layout，确保：
- 响应式设计
- 一致的间距
- 正确的对齐

### Auto Layout 设置
- **主容器**: Vertical Auto Layout
- **间距**: 使用 spacing 变量 (8px, 16px, 24px)
- **对齐**: 水平居中或左对齐
- **填充**: 16px 或 24px

## 6. 导出规范

### 6.1 组件导出
- 使用 Component 而非 Frame
- 命名规范: Component/Button/Primary
- 创建 Component Set 管理变体

### 6.2 图标导出
- 格式: SVG
- 尺寸: 16x16, 20x20, 24x24, 32x32
- 描边: 1.5px 或 2px

## 7. Figma 文件链接

创建设计文件后，请将链接添加到项目文档中：

`markdown
## 设计文件
- [Figma Design File](YOUR_FIGMA_LINK_HERE)
`

## 8. 后续步骤

1. 在 Figma 中创建设计文件
2. 按照本指南设置 Design Tokens
3. 创建组件库
4. 设计各个页面
5. 完成后将 Figma 链接添加到项目文档

## 参考资源

- [Figma Variables 文档](https://help.figma.com/hc/en-us/articles/15343805664407-Variables-in-Figma)
- [Auto Layout 教程](https://help.figma.com/hc/en-us/articles/360040451373-Auto-layout-in-Figma)
- [Component 最佳实践](https://help.figma.com/hc/en-us/articles/360041068473-Components-in-Figma)

---

*文档版本: v1.0*
*最后更新: 2024-06-16*
