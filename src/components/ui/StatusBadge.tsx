import { CheckCircle2, AlertCircle, Loader2, Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
}

const variantStyles: Record<string, { icon: typeof CheckCircle2; text: string; className: string }> = {
  connected: { 
    icon: CheckCircle2, 
    text: '已连接', 
    className: 'bg-green-50 text-green-700' 
  },
  connecting: { 
    icon: Loader2, 
    text: '连接中', 
    className: 'bg-blue-50 text-blue-700' 
  },
  disconnected: { 
    icon: Circle, 
    text: '未连接', 
    className: 'bg-gray-100 text-gray-600' 
  },
  error: { 
    icon: AlertCircle, 
    text: '错误', 
    className: 'bg-red-50 text-red-700' 
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = variantStyles[status] || variantStyles.disconnected;
  const Icon = config.icon;
  
  return (
    <span
      className={
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ' +
        config.className
      }
    >
      <Icon className={'w-3 h-3' + (status === 'connecting' ? ' animate-spin' : '')} />
      {config.text}
    </span>
  );
}
