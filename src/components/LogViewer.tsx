import type { LogEntry } from '../lib/types';

interface LogViewerProps {
  logs: LogEntry[];
  onLogSelect?: (logId: string) => void;
  selectedLogId?: string;
}

export function LogViewer({ logs, onLogSelect, selectedLogId }: LogViewerProps) {
  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-50 border-red-300 text-red-900';
      case 'WARN':
        return 'bg-yellow-50 border-yellow-300 text-yellow-900';
      case 'INFO':
        return 'bg-blue-50 border-blue-300 text-blue-900';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-900';
    }
  };

  return (
    <div className="font-mono text-sm space-y-1">
      {logs.map((log, index) => {
        const logId = log.id || `log-${index}`;
        const isSelected = selectedLogId === logId;

        return (
          <div
            key={logId}
            onClick={() => onLogSelect?.(logId)}
            className={`p-2 border-l-4 rounded ${getLevelColor(log.level)} ${
              onLogSelect ? 'cursor-pointer hover:shadow-md' : ''
            } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
          >
            <span className="text-gray-600">[{log.time}]</span>{' '}
            <span className="font-bold">{log.level}</span>{' '}
            <span>{log.message}</span>
          </div>
        );
      })}
    </div>
  );
}
