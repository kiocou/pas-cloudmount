import { useState } from 'react';
import { Settings as SettingsIcon, Globe, Bell, Rocket, HardDrive, ChevronLeft, Info, Cloud } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '@/components/ui';
import type { AppSettings } from '@/types';

interface SettingsPageProps {
  onNavigate: (page: 'home' | 'settings') => void;
}

const defaultSettings: AppSettings = {
  language: 'zh-CN',
  theme: 'light',
  startMinimized: false,
  autoMount: false,
  autoMountOnStartup: false,
  notifications: true,
};

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('home')}><ChevronLeft className="w-5 h-5" /></Button>
            <SettingsIcon className="w-6 h-6 text-gray-600" />
            <h1 className="text-xl font-semibold text-gray-900">设置</h1>
          </div>
        </div>
      </header>
      <main className="p-6 max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader><div className="flex items-center gap-2"><Globe className="w-5 h-5 text-gray-500" /><h2 className="text-lg font-semibold">语言与外观</h2></div></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-900">语言</p><p className="text-sm text-gray-500">选择界面显示语言</p></div>
              <select value={settings.language} onChange={(e) => updateSetting('language', e.target.value as 'zh-CN' | 'en-US')} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="zh-CN">简体中文</option><option value="en-US">English</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-900">主题</p><p className="text-sm text-gray-500">选择界面配色方案</p></div>
              <div className="flex gap-2">
                <button onClick={() => updateSetting('theme', 'light')} className={`px-4 py-2 rounded-lg border transition-colors ${settings.theme === 'light' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}>浅色</button>
                <button onClick={() => updateSetting('theme', 'dark')} className={`px-4 py-2 rounded-lg border transition-colors ${settings.theme === 'dark' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}>深色</button>
                <button onClick={() => updateSetting('theme', 'system')} className={`px-4 py-2 rounded-lg border transition-colors ${settings.theme === 'system' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}>自动</button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><div className="flex items-center gap-2"><Rocket className="w-5 h-5 text-gray-500" /><h2 className="text-lg font-semibold">启动与行为</h2></div></CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer"><div><p className="font-medium text-gray-900">开机自启</p><p className="text-sm text-gray-500">登录 Windows 时自动启动应用</p></div><input type="checkbox" checked={settings.startMinimized} onChange={(e) => updateSetting('startMinimized', e.target.checked)} className="w-5 h-5 text-blue-600 rounded" /></label>
            <label className="flex items-center justify-between cursor-pointer"><div><p className="font-medium text-gray-900">启动时最小化</p><p className="text-sm text-gray-500">启动后最小化到系统托盘</p></div><input type="checkbox" checked={settings.autoMount} onChange={(e) => updateSetting('autoMount', e.target.checked)} className="w-5 h-5 text-blue-600 rounded" /></label>
            <label className="flex items-center justify-between cursor-pointer"><div><p className="font-medium text-gray-900">自动挂载网盘</p><p className="text-sm text-gray-500">启动时自动恢复之前的挂载</p></div><input type="checkbox" checked={settings.autoMountOnStartup} onChange={(e) => updateSetting('autoMountOnStartup', e.target.checked)} className="w-5 h-5 text-blue-600 rounded" /></label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><div className="flex items-center gap-2"><Bell className="w-5 h-5 text-gray-500" /><h2 className="text-lg font-semibold">通知</h2></div></CardHeader>
          <CardContent><label className="flex items-center justify-between cursor-pointer"><div><p className="font-medium text-gray-900">启用通知</p><p className="text-sm text-gray-500">接收挂载状态和传输任务通知</p></div><input type="checkbox" checked={settings.notifications} onChange={(e) => updateSetting('notifications', e.target.checked)} className="w-5 h-5 text-blue-600 rounded" /></label></CardContent>
        </Card>
        <Card>
          <CardHeader><div className="flex items-center gap-2"><HardDrive className="w-5 h-5 text-gray-500" /><h2 className="text-lg font-semibold">存储</h2></div></CardHeader>
          <CardContent><div className="flex items-center justify-between"><div><p className="font-medium text-gray-900">缓存大小</p><p className="text-sm text-gray-500">设置本地缓存文件的最大大小</p></div><div className="flex items-center gap-2"><input type="number" defaultValue={512} className="w-24 px-3 py-2 border border-gray-300 rounded-lg" min={128} max={4096} /><span className="text-gray-500">MB</span></div></div></CardContent>
        </Card>
        <Card>
          <CardHeader><div className="flex items-center gap-2"><Info className="w-5 h-5 text-gray-500" /><h2 className="text-lg font-semibold">关于</h2></div></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-500">应用</span><div className="flex items-center gap-2"><Cloud className="w-4 h-4 text-blue-500" /><span className="font-medium">Pas# CloudMount</span></div></div>
              <div className="flex justify-between"><span className="text-gray-500">版本</span><span className="font-medium">v0.1.0-alpha</span></div>
              <div className="flex justify-between"><span className="text-gray-500">构建时间</span><span className="font-medium">2024-06-16</span></div>
              <div className="pt-3 border-t"><a href="https://github.com/kiocou/pas-cloudmount" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">GitHub 项目地址</a></div>
            </div>
          </CardContent>
        </Card>
        {hasChanges && (<div className="flex justify-end"><Button onClick={handleSave}>保存设置</Button></div>)}
      </main>
    </div>
  );
}
