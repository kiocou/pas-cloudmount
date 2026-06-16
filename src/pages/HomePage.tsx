import { useState } from 'react';
import { 
  Cloud, Plus, Settings, Bell, ChevronRight, 
  HardDrive, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';
import { PROVIDER_NAMES, PROVIDER_COLORS } from '../lib/utils';
import type { CloudAccount, TransferTask } from '../types';

// Helper functions
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Mock data for demonstration
const mockAccounts: CloudAccount[] = [
  {
    id: '1',
    name: '我的阿里云盘',
    provider: 'aliyun',
    status: 'connected',
    mountPoint: 'Z:',
    totalSpace: 2 * 1024 * 1024 * 1024 * 1024,
    usedSpace: 512 * 1024 * 1024 * 1024,
    lastSync: new Date(),
  },
  {
    id: '2',
    name: '工作 OneDrive',
    provider: 'onedrive',
    status: 'connected',
    mountPoint: 'Y:',
    totalSpace: 5 * 1024 * 1024 * 1024 * 1024,
    usedSpace: 2.5 * 1024 * 1024 * 1024,
    lastSync: new Date(),
  },
  {
    id: '3',
    name: 'Alist 聚合',
    provider: 'alist',
    status: 'error',
  },
];

const mockTransfers: TransferTask[] = [
  {
    id: 't1',
    fileName: '项目文档.zip',
    fileSize: 256 * 1024 * 1024,
    progress: 67,
    speed: 12 * 1024 * 1024,
    status: 'downloading',
    direction: 'download',
    accountId: '1',
    createdAt: new Date(),
  },
];

function StatusBadge({ status }: { status: CloudAccount['status'] }) {
  const config = {
    connected: { icon: CheckCircle2, text: '已连接', class: 'text-green-600 bg-green-50' },
    connecting: { icon: Loader2, text: '连接中', class: 'text-blue-600 bg-blue-50' },
    disconnected: { icon: AlertCircle, text: '未连接', class: 'text-gray-600 bg-gray-100' },
    error: { icon: AlertCircle, text: '错误', class: 'text-red-600 bg-red-50' },
  };
  
  const iconConfig = config[status] || config.disconnected;
  const Icon = iconConfig.icon;
  
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', iconConfig.class)}>
      <Icon className={cn('w-3 h-3', status === 'connecting' && 'animate-spin')} />
      {iconConfig.text}
    </span>
  );
}

export default function HomePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const usedPercent = (account: CloudAccount) => {
    if (!account.totalSpace) return 0;
    return ((account.usedSpace || 0) / account.totalSpace * 100);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Pas# CloudMount</h1>
              <p className="text-sm text-gray-500">网盘本地挂载管理器</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span className="font-medium">添加网盘</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors">
            <HardDrive className="w-6 h-6 text-gray-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">打开资源管理器</p>
              <p className="text-sm text-gray-500">查看挂载的磁盘</p>
            </div>
          </button>
        </div>

        {/* Cloud Accounts Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">已挂载的网盘</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAccounts.map((account) => (
              <div 
                key={account.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: PROVIDER_COLORS[account.provider] + '20' }}
                  >
                    <Cloud 
                      className="w-6 h-6" 
                      style={{ color: PROVIDER_COLORS[account.provider] }} 
                    />
                  </div>
                  <StatusBadge status={account.status} />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{account.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{PROVIDER_NAMES[account.provider]}</p>
                
                {account.status === 'connected' && account.totalSpace && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {formatBytes(account.usedSpace || 0)} / {formatBytes(account.totalSpace)}
                      </span>
                      <span className="text-gray-700">
                        {usedPercent(account).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: usedPercent(account) + '%' }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{account.mountPoint}</span>
                      <span>最后同步: {account.lastSync?.toLocaleTimeString()}</span>
                    </div>
                  </div>
                )}
                
                {account.status === 'error' && (
                  <p className="text-sm text-red-500">连接失败</p>
                )}
              </div>
            ))}
            
            {/* Add New Card */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-4 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center min-h-[200px]"
            >
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-500">添加新网盘</span>
            </button>
          </div>
        </section>

        {/* Transfer Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">传输任务</h2>
          {mockTransfers.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {mockTransfers.map((task) => (
                <div key={task.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.fileName}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>{formatBytes(task.fileSize)}</span>
                      <span className="text-green-600">{formatBytes(task.speed)}/s</span>
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: task.progress + '%' }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Cloud className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">暂无传输任务</p>
            </div>
          )}
        </section>
      </main>

      {/* Add Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 m-4">
            <h2 className="text-xl font-semibold mb-4">添加网盘向导</h2>
            <p className="text-gray-500 mb-4">选择要添加的网盘类型...</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['aliyun', 'onedrive', 'google', 'dropbox', 'alist', 'webdav'].map((provider) => (
                <button 
                  key={provider}
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Cloud className="w-8 h-8 mx-auto mb-2" style={{ color: PROVIDER_COLORS[provider] }} />
                  <span className="text-sm">{PROVIDER_NAMES[provider]}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
