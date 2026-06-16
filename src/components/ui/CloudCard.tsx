import { Cloud } from 'lucide-react';
import { cn, formatBytes } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import type { CloudAccount } from '@/types';

interface CloudCardProps {
  account: CloudAccount;
  onClick?: () => void;
  className?: string;
}

export function CloudCard({ account, onClick, className }: CloudCardProps) {
  const providerColors: Record<string, string> = {
    aliyun: '#FF6A00',
    onedrive: '#0078D4',
    google: '#4285F4',
    dropbox: '#0061FF',
    alist: '#10B981',
    webdav: '#6366F1',
    s3: '#F59E0B',
  };

  const providerNames: Record<string, string> = {
    aliyun: '阿里云盘',
    onedrive: 'OneDrive',
    google: 'Google Drive',
    dropbox: 'Dropbox',
    alist: 'Alist',
    webdav: 'WebDAV',
    s3: 'S3/OSS',
  };

  const usedPercent = account.totalSpace 
    ? (account.usedSpace || 0) / account.totalSpace * 100 
    : 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: (providerColors[account.provider] || '#6B7280') + '20' }}
        >
          <Cloud 
            className="w-6 h-6" 
            style={{ color: providerColors[account.provider] || '#6B7280' }} 
          />
        </div>
        <StatusBadge status={account.status} />
      </div>
      
      <h3 className="font-medium text-gray-900 mb-1">{account.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{providerNames[account.provider] || account.provider}</p>
      
      {account.status === 'connected' && account.totalSpace && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              {formatBytes(account.usedSpace || 0)} / {formatBytes(account.totalSpace)}
            </span>
            <span className="text-gray-700">{usedPercent.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: usedPercent + '%' }}
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
  );
}
