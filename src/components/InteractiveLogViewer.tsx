import { useState } from 'react';
import { Search, Filter, Copy, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import type { LogEntry } from '../lib/types';

interface InteractiveLogViewerProps {
  logs: LogEntry[];
  onLogSelect?: (log: LogEntry, index: number) => void;
}

export function InteractiveLogViewer({ logs, onLogSelect }: InteractiveLogViewerProps) {
  const [selectedLog, setSelectedLog] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'ERROR' | 'WARN' | 'INFO'>('all');
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = search === '' ||
      log.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleLogClick = (log: LogEntry, index: number) => {
    setSelectedLog(index);
    onLogSelect?.(log, index);
  };

  const copyLog = (log: LogEntry, index: number) => {
    const logText = `[${log.time}] [${log.level}] ${log.message}`;
    navigator.clipboard.writeText(logText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
      case 'FATAL':
        return 'text-red-400';
      case 'WARN':
        return 'text-yellow-400';
      case 'INFO':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
      case 'FATAL':
        return <AlertTriangle className="w-4 h-4" />;
      case 'WARN':
        return <AlertTriangle className="w-4 h-4" />;
      case 'INFO':
        return <Info className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
      {/* Header with controls */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            {(['all', 'ERROR', 'WARN', 'INFO'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === level
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {level === 'all' ? 'All' : level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{filteredLogs.length} entries</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Live
          </span>
        </div>
      </div>

      {/* Log entries */}
      <div className="max-h-[500px] overflow-y-auto font-mono text-sm">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No logs match your filter
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className={`
                group relative py-2 px-4 cursor-pointer transition-all
                ${selectedLog === index ? 'bg-gray-800' : 'hover:bg-gray-800/50'}
                ${log.is_answer ? 'border-l-4 border-red-500 bg-red-900/10' : ''}
              `}
              onClick={() => handleLogClick(log, index)}
            >
              <div className="flex items-start gap-3">
                {/* Timestamp */}
                <span className="text-gray-500 flex-shrink-0 select-none">
                  {log.time}
                </span>

                {/* Level badge */}
                <div className={`flex items-center gap-1.5 flex-shrink-0 ${getLevelColor(log.level)}`}>
                  {getLevelIcon(log.level)}
                  <span className="font-semibold min-w-[60px]">
                    [{log.level}]
                  </span>
                </div>

                {/* Message */}
                <span className="text-gray-300 flex-1">
                  {log.message}
                </span>

                {/* Copy button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyLog(log, index);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1 hover:bg-gray-700 rounded"
                  title="Copy log"
                >
                  {copiedIndex === index ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Answer hint */}
              {log.is_answer && selectedLog === index && (
                <div className="mt-2 pl-24 text-xs text-orange-400 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                  This log entry is important for solving the scenario
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
