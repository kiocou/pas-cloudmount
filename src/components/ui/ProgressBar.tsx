import { formatBytes } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({ 
  progress, 
  showLabel = true, 
  label,
  size = 'md',
  className 
}: ProgressBarProps) {
  const heights: Record<string, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={'w-full ' + (className || '')}>
      <div className={'w-full bg-gray-100 rounded-full overflow-hidden ' + heights[size]}>
        <div 
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: Math.min(100, Math.max(0, progress)) + '%' }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{label || progress.toFixed(1) + '%'}</span>
        </div>
      )}
    </div>
  );
}

interface TransferProgressProps {
  fileName: string;
  fileSize: number;
  progress: number;
  speed?: number;
}

export function TransferProgress({ 
  fileName, 
  fileSize, 
  progress, 
  speed 
}: TransferProgressProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{fileName}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
          <span>{formatBytes(fileSize)}</span>
          {speed && <span className="text-green-600">{formatBytes(speed)}/s</span>}
        </div>
      </div>
      <div className="w-32">
        <ProgressBar progress={progress} size="sm" />
      </div>
    </div>
  );
}
