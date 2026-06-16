import { useState } from 'react';
import { Cloud, Plus, Settings, Bell, HardDrive, ChevronRight } from 'lucide-react';
import { Button, CloudCard, TransferProgress, Modal, Input } from '@/components/ui';
import type { CloudAccount, TransferTask } from '@/types';

interface HomePageProps {
  onNavigate: (page: 'home' | 'settings') => void;
}

const mockAccounts: CloudAccount[] = [
  { id: '1', name: '我的阿里云盘', provider: 'aliyun', status: 'connected', mountPoint: 'Z:', totalSpace: 2 * 1024 * 1024 * 1024 * 1024, usedSpace: 512 * 1024 * 1024 * 1024, lastSync: new Date() },
  { id: '2', name: '工作 OneDrive', provider: 'onedrive', status: 'connected', mountPoint: 'Y:', totalSpace: 5 * 1024 * 1024 * 1024 * 1024, usedSpace: 2.5 * 1024 * 1024 * 1024, lastSync: new Date() },
  { id: '3', name: 'Alist 聚合', provider: 'alist', status: 'error' },
];

const mockTransfers: TransferTask[] = [
  { id: 't1', fileName: '项目文档.zip', fileSize: 256 * 1024 * 1024, progress: 67, speed: 12 * 1024 * 1024, status: 'downloading', direction: 'download', accountId: '1', createdAt: new Date() },
];

const providerList = [
  { id: 'aliyun', name: '阿里云盘', color: '#FF6A00' },
  { id: 'onedrive', name: 'OneDrive', color: '#0078D4' },
  { id: 'google', name: 'Google Drive', color: '#4285F4' },
  { id: 'dropbox', name: 'Dropbox', color: '#0061FF' },
  { id: 'alist', name: 'Alist', color: '#10B981' },
  { id: 'webdav', name: 'WebDAV', color: '#6366F1' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setAddStep(2);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setAddStep(1);
    setSelectedProvider(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center"><Cloud className="w-6 h-6 text-white" /></div>
            <div><h1 className="text-xl font-semibold text-gray-900">Pas# CloudMount</h1><p className="text-sm text-gray-500">网盘本地挂载管理器</p></div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('settings')}><Bell className="w-5 h-5 text-gray-600" /></Button>
            <Button variant="ghost" size="icon" onClick={() => onNavigate('settings')}><Settings className="w-5 h-5 text-gray-600" /></Button>
          </div>
        </div>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button onClick={() => setShowAddModal(true)} className="h-auto py-4 justify-start"><Plus className="w-5 h-5" /><span className="font-medium">添加网盘</span></Button>
          <Button variant="secondary" className="h-auto py-4 justify-start"><HardDrive className="w-5 h-5 text-gray-600" /><div className="text-left"><p className="font-medium text-gray-900">打开资源管理器</p><p className="text-sm text-gray-500 font-normal">查看挂载的磁盘</p></div></Button>
        </div>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">已挂载的网盘</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAccounts.map((account) => (<CloudCard key={account.id} account={account} />))}
            <button onClick={() => setShowAddModal(true)} className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-4 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center min-h-[200px]"><Plus className="w-8 h-8 text-gray-400 mb-2" /><span className="text-gray-500">添加新网盘</span></button>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4"> 传输任务</h2>
          {mockTransfers.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200">
              {mockTransfers.map((task) => (<div key={task.id} className="flex items-center"><div className="flex-1"><TransferProgress fileName={task.fileName} fileSize={task.fileSize} progress={task.progress} speed={task.speed} /></div><ChevronRight className="w-5 h-5 text-gray-400 mx-4" /></div>))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center"><Cloud className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">暂无传输任务</p></div>
          )}
        </section>
      </main>
      <Modal isOpen={showAddModal} onClose={handleCloseModal} title={addStep === 1 ? '添加网盘' : '配置挂载选项'}>
        {addStep === 1 && (<div><p className="text-gray-500 mb-4">选择要添加的网盘类型</p><div className="grid grid-cols-3 gap-3">{providerList.map((provider) => (<button key={provider.id} onClick={() => handleProviderSelect(provider.id)} className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"><Cloud className="w-8 h-8 mx-auto mb-2" style={{ color: provider.color }} /><span className="text-sm">{provider.name}</span></button>))}</div></div>)}
        {addStep === 2 && selectedProvider && (<div className="space-y-4"><div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3"><Cloud className="w-8 h-8" style={{ color: providerList.find(p => p.id === selectedProvider)?.color }} /><span className="font-medium">{providerList.find(p => p.id === selectedProvider)?.name}</span></div><Input label="显示名称" placeholder="给我的阿里云盘" defaultValue="我的阿里云盘" /><Input label="挂载盘符" placeholder="Z:" defaultValue="Z:" /><div className="flex gap-3 pt-4"><Button variant="secondary" onClick={() => setAddStep(1)}>上一步</Button><Button className="flex-1">完成挂载</Button></div></div>)}
        {addStep === 1 && (<div className="flex justify-end mt-6"><Button variant="secondary" onClick={handleCloseModal}>取消</Button></div>)}
      </Modal>
    </div>
  );
}
