import { useState, useEffect } from 'react';
import { Clock, Trophy, Target } from 'lucide-react';

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
    <div className="fixed top-4 right-4 bg-gray-900 text-white rounded-xl px-6 py-4 shadow-2xl border border-gray-700 z-50">
      <div className="flex items-center gap-4">
        <Clock className="w-6 h-6 text-orange-400" />
        <div>
          <div className="text-3xl font-mono font-bold tabular-nums">
            {formatTime(seconds)}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <Target className="w-3 h-3" />
            <span>Target: {targetTime} min</span>
            {isUnderTarget && (
              <span className="text-green-400 font-semibold ml-2">
                ⚡ On pace!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all ${
            isUnderTarget ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ width: `${Math.min(percentOfTarget, 100)}%` }}
        />
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
