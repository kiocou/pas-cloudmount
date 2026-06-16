// Cloud Storage Provider Types
export type CloudProvider = 
  | 'aliyun'      // 阿里云盘
  | 'onedrive'    // OneDrive
  | 'google'      // Google Drive
  | 'dropbox'     // Dropbox
  | 'alist'       // Alist Bridge
  | 'webdav'      // WebDAV
  | 's3';         // S3/OSS

export type MountStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface CloudAccount {
  id: string;
  name: string;
  provider: CloudProvider;
  status: MountStatus;
  mountPoint?: string;  // e.g., "Z:"
  driveLetter?: string; // Windows drive letter
  totalSpace?: number;
  usedSpace?: number;
  lastSync?: Date;
  avatar?: string;
  token?: string; // encrypted
}

export interface TransferTask {
  id: string;
  fileName: string;
  fileSize: number;
  progress: number; // 0-100
  speed: number; // bytes/s
  status: 'pending' | 'uploading' | 'downloading' | 'paused' | 'completed' | 'failed';
  direction: 'upload' | 'download';
  accountId: string;
  createdAt: Date;
  error?: string;
}

export interface AppSettings {
  language: 'zh-CN' | 'en-US';
  theme: 'light' | 'dark' | 'system';
  startMinimized: boolean;
  autoMount: boolean;
  autoMountOnStartup: boolean;
  notifications: boolean;
  speedLimit?: number; // bytes/s
  cacheSize?: number; // MB
}

export interface AddCloudStep {
  current: number;
  total: number;
  title: string;
  description: string;
}

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
  authUrl: string;
  tokenUrl: string;
}
