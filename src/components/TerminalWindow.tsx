import type { ReactNode } from 'react';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'error' | 'success';
  showControls?: boolean;
}

export function TerminalWindow({
  title,
  children,
  className = '',
  variant = 'default',
  showControls = true
}: TerminalWindowProps) {
  const variantStyles = {
    default: 'border-gray-700 bg-gray-800',
    error: 'border-terminal-red/30 bg-gray-800 shadow-error',
    success: 'border-terminal-green/30 bg-gray-800'
  };

  return (
    <div className={`rounded-lg border-2 ${variantStyles[variant]} overflow-hidden ${className}`}>
      {/* Terminal chrome header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        {/* Filename */}
        <span className="font-mono text-sm text-gray-400">
          {title}
        </span>

        {/* Window controls */}
        {showControls && (
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors cursor-pointer" title="Close"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors cursor-pointer" title="Minimize"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60 hover:bg-green-500 transition-colors cursor-pointer" title="Maximize"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
