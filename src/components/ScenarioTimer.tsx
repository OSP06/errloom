import { useState, useEffect } from 'react';
import { Trophy, Target } from 'lucide-react';

interface ScenarioTimerProps {
  targetTime: string;
  onComplete?: (time: number) => void;
}

export function ScenarioTimer({ targetTime }: ScenarioTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const targetSeconds = parseInt(targetTime) * 60;
  const isUnderTarget = seconds < targetSeconds;
  const percentOfTarget = (seconds / targetSeconds) * 100;

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700 z-50 overflow-hidden w-40">
      {/* Terminal chrome header */}
      <div className="bg-gray-900 border-b border-gray-700 px-2 py-1 flex items-center justify-between">
        <span className="font-mono text-[10px] text-gray-400">timer</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/60"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/60"></div>
        </div>
      </div>

      {/* Timer content */}
      <div className="p-2.5">
        <div className="text-center mb-2">
          <div className="text-2xl font-mono font-bold tabular-nums text-terminal-green">
            {formatTime(seconds)}
          </div>
          <div className="h-px bg-gray-700 my-1.5"></div>
          <div className="font-mono text-[10px] text-gray-400 space-y-0.5">
            <div>TARGET: {targetTime}:00</div>
            <div className={isUnderTarget ? 'text-terminal-green' : 'text-terminal-red'}>
              {isUnderTarget ? '✓ AHEAD' : '✗ BEHIND'}
            </div>
          </div>
        </div>

        {/* Compact progress bar */}
        <div className="font-terminal text-[10px]">
          {Array.from({ length: 14 }).map((_, i) => {
            const threshold = (i / 14) * 100;
            if (threshold < percentOfTarget) {
              return <span key={i} className={isUnderTarget ? 'text-terminal-green' : 'text-terminal-red'}>▓</span>;
            }
            return <span key={i} className="text-gray-700">░</span>;
          })}
          <span className={`ml-1 ${isUnderTarget ? 'text-terminal-green' : 'text-terminal-red'}`}>
            {Math.min(Math.round(percentOfTarget), 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export function PerformanceSummary({
  timeElapsed,
  targetTime,
  personalBest
}: {
  timeElapsed: number;
  targetTime: string;
  personalBest?: number;
}) {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const targetSeconds = parseInt(targetTime) * 60;
  const beatTarget = timeElapsed < targetSeconds;
  const timeDiff = Math.abs(timeElapsed - targetSeconds);

  return (
    <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Your Performance</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-3xl font-bold text-orange-600">{formatTime(timeElapsed)}</p>
          <p className="text-sm text-gray-600">Your Time</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-400">{targetTime} min</p>
          <p className="text-sm text-gray-600">Target Time</p>
        </div>
        {personalBest && (
          <div>
            <p className="text-3xl font-bold text-purple-600">{formatTime(personalBest)}</p>
            <p className="text-sm text-gray-600">Your Best</p>
          </div>
        )}
      </div>

      {beatTarget ? (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
          <Trophy className="w-5 h-5" />
          <span className="font-semibold">
            Fast Solver! Beat target by {formatTime(timeDiff)}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
          <Target className="w-5 h-5" />
          <span className="font-semibold">
            Try again to beat the target time! ({formatTime(timeDiff)} over)
          </span>
        </div>
      )}
    </div>
  );
}
