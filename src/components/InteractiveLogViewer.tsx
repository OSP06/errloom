import { useState } from 'react';
import { Search, Copy, CheckCircle } from 'lucide-react';
import type { LogEntry } from '../lib/types';
import { TerminalWindow } from './TerminalWindow';

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
        return 'text-terminal-red';
      case 'WARN':
        return 'text-terminal-orange';
      case 'INFO':
        return 'text-terminal-cyan';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <TerminalWindow title="error.log" variant="default">
      <div className="space-y-3">
        {/* Terminal prompt */}
        <div className="font-terminal text-sm text-terminal-green">
          $ tail -f /var/log/production.log
        </div>

        {/* Search and filters */}
        <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="grep -i '...'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-terminal-bg border border-gray-700 rounded font-mono text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-terminal-green"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['all', 'ERROR', 'WARN', 'INFO'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-3 py-1.5 rounded font-mono text-xs font-semibold transition-colors ${
                  filter === level
                    ? 'bg-terminal-red text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {level === 'all' ? '●ALL' : `○${level}`}
              </button>
            ))}
          </div>
        </div>

        {/* Log entries */}
        <div className="max-h-[450px] overflow-y-auto font-terminal text-sm bg-terminal-bg rounded border border-gray-800 p-2">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-mono">
              No logs match your filter
            </div>
          ) : (
            filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`
                  group relative py-1.5 px-3 cursor-pointer transition-all rounded
                  ${selectedLog === index ? 'bg-gray-800/80' : 'hover:bg-gray-800/40'}
                  ${log.is_answer ? 'border-l-2 border-terminal-red bg-terminal-red/5' : ''}
                `}
                onClick={() => handleLogClick(log, index)}
              >
                <div className="flex items-start gap-3">
                  {/* Timestamp */}
                  <span className="text-gray-600 shrink-0 select-none">
                    [{log.time}]
                  </span>

                  {/* Level badge */}
                  <div className={`flex items-center gap-1 shrink-0 ${getLevelColor(log.level)}`}>
                    <span className="font-bold min-w-[60px]">
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
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-1 hover:bg-gray-700 rounded"
                    title="Copy log"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle className="w-4 h-4 text-terminal-green" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Answer hint */}
                {log.is_answer && selectedLog === index && (
                  <div className="mt-1.5 pl-20 text-xs text-terminal-orange flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-terminal-orange rounded-full animate-pulse"></span>
                    This log entry is important for solving the scenario
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700 font-mono text-xs text-gray-500">
          <span>📊 {filteredLogs.length} entries</span>
          <span className="flex items-center gap-2">
            <span className="text-terminal-red">🔴 {logs.filter(l => l.level === 'ERROR').length} errors</span>
            <span className="text-terminal-orange">🟡 {logs.filter(l => l.level === 'WARN').length} warns</span>
          </span>
        </div>
      </div>
    </TerminalWindow>
  );
}
