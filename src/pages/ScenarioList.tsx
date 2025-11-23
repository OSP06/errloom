import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Lock, Play, ArrowLeft, Trophy } from 'lucide-react';
import { useProgressStore } from '../lib/progressStore';
import { useState, useEffect } from 'react';
import { getScenariosByLevel, type ScenarioMetadata } from '../lib/manifestLoader';
import { TerminalWindow } from '../components/TerminalWindow';

// Legacy export for backward compatibility with ScenarioPlayer
export const scenarios = {
  beginner: [
    {
      id: '404-error',
      title: 'The 404 Error',
      duration: '15 min',
      teaches: ['HTTP', 'Logs', 'Routing'],
      description: 'Your first production bug. Learn to read logs and understand HTTP status codes.',
      completed: false,
      locked: false
    },
    {
      id: 'slow-api',
      title: 'The Slow API',
      duration: '20 min',
      teaches: ['Performance', 'Database', 'N+1 Queries'],
      description: 'Your homepage takes 8 seconds to load. Find and fix the N+1 query problem.',
      completed: false,
      locked: false
    },
    {
      id: 'memory-leak',
      title: 'The Memory Leak',
      duration: '18 min',
      teaches: ['Memory', 'Event Listeners', 'Cleanup'],
      description: 'Your server crashes every few hours. Track down the memory leak.',
      completed: false,
      locked: false
    },
    {
      id: 'cors-error',
      title: 'The CORS Error',
      duration: '17 min',
      teaches: ['CORS', 'HTTP Headers', 'Browser Security'],
      description: 'Your API works in Postman but not in the browser. Why?',
      completed: false,
      locked: false
    },
    {
      id: 'env-variable',
      title: 'The Missing Environment Variable',
      duration: '16 min',
      teaches: ['Environment Variables', 'Configuration', 'Deployment'],
      description: 'Everything worked locally, but production crashes on startup. What went wrong?',
      completed: false,
      locked: false
    }
  ],
  intermediate: [
    {
      id: 'db-pool-exhausted',
      title: 'Database Connection Pool Exhausted',
      duration: '25 min',
      teaches: ['Connection Pooling', 'Resource Management', 'Database Scaling'],
      description: 'Black Friday traffic spike! Your database is idle but all requests timeout. Why?',
      completed: false,
      locked: false
    },
    {
      id: 'cache-stampede',
      title: 'The Cache Stampede',
      duration: '28 min',
      teaches: ['Caching', 'Cache Invalidation', 'Race Conditions'],
      description: 'You cleared the cache. Now 10,000 users are hammering your database simultaneously.',
      completed: false,
      locked: false
    },
    {
      id: 'failed-deployment',
      title: 'The Failed Deployment',
      duration: '22 min',
      teaches: ['Deployments', 'Rollback', 'Database Migrations'],
      description: 'Rolling back the code made things WORSE. The database still has the new schema!',
      completed: false,
      locked: false
    },
    {
      id: 'queue-backup',
      title: 'The Message Queue Backup',
      duration: '24 min',
      teaches: ['Message Queues', 'Async Processing', 'Backpressure'],
      description: '8,000 welcome emails stuck in queue. Users are waiting hours. Scale up!',
      completed: false,
      locked: false
    },
    {
      id: 'rate-limit-cascade',
      title: 'The Rate Limit Cascade',
      duration: '23 min',
      teaches: ['Rate Limiting', 'API Dependencies', 'Circuit Breakers'],
      description: 'Stripe is rate limiting you. User retries make it 8x worse. Stop the cascade!',
      completed: false,
      locked: false
    }
  ],
  advanced: [
    {
      id: 'reddit-k8s-outage',
      title: 'Reddit\'s Kubernetes Meltdown',
      duration: '35 min',
      teaches: ['Kubernetes', 'Auto-scaling', 'Resource Limits'],
      description: 'Auto-scaler death spiral: 50 healthy pods → 500 crashing pods in 60 seconds. Stop it!',
      completed: false,
      locked: false
    },
    {
      id: 'gitlab-data-loss',
      title: 'GitLab\'s Accidental Database Deletion',
      duration: '30 min',
      teaches: ['Backups', 'Human Error', 'Disaster Recovery'],
      description: 'You just ran rm -rf on production. 276GB deleted. Your backups are broken. Now what?',
      completed: false,
      locked: false
    },
    {
      id: 'discord-redis-failure',
      title: 'Discord\'s Redis Cascade Failure',
      duration: '32 min',
      teaches: ['Redis', 'Hot Keys', 'Circuit Breakers'],
      description: '@everyone to 5M users. 50K req/sec to one key. Redis melting. No fallback. Cascade!',
      completed: false,
      locked: false
    },
    {
      id: 'aws-cascade-failure',
      title: 'AWS S3 Cascade Failure',
      duration: '33 min',
      teaches: ['Dependencies', 'Blast Radius', 'Cascades'],
      description: 'Typo removed 500 servers instead of 5. S3 down. Half the internet down. Status page down!',
      completed: false,
      locked: false
    },
    {
      id: 'cloudflare-bgp-hijack',
      title: 'Cloudflare\'s BGP Route Leak',
      duration: '30 min',
      teaches: ['BGP', 'Network Infrastructure', 'Internet Architecture'],
      description: 'Small ISP misconfigured BGP. Global traffic routing through Pennsylvania. Internet broken.',
      completed: false,
      locked: false
    }
  ]
};

const levelConfig = {
  beginner: {
    color: 'from-green-600 to-emerald-600',
    badge: 'bg-green-500/20 text-green-400 border-green-500'
  },
  intermediate: {
    color: 'from-yellow-600 to-orange-600',
    badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
  },
  advanced: {
    color: 'from-red-600 to-orange-600',
    badge: 'bg-red-500/20 text-red-400 border-red-500'
  }
};

export function ScenarioList() {
  const { level } = useParams<{ level: string }>();
  const [scenarioList, setScenarioList] = useState<ScenarioMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const config = levelConfig[level as keyof typeof levelConfig];
  const isScenarioComplete = useProgressStore((state) => state.isScenarioComplete);

  useEffect(() => {
    async function loadScenarios() {
      try {
        setLoading(true);
        const scenarios = await getScenariosByLevel(level!);
        setScenarioList(scenarios);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load scenarios');
      } finally {
        setLoading(false);
      }
    }

    if (level) {
      loadScenarios();
    }
  }, [level]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading scenarios...</p>
        </div>
      </div>
    );
  }

  if (error || !scenarioList.length) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'No scenarios found'}</p>
          <Link to="/" className="text-orange-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const completedCount = scenarioList.filter(s => isScenarioComplete(s.id)).length;
  const progress = (completedCount / scenarioList.length) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-orange-400 hover:text-orange-300 mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <h1 className={`text-5xl font-bold font-mono capitalize bg-linear-to-r ${config.color} bg-clip-text text-transparent`}>
              {level} Level
            </h1>
            {completedCount === scenarioList.length && (
              <Trophy className="w-10 h-10 text-yellow-400" />
            )}
          </div>
          <p className="text-gray-400 text-lg">
            {level === 'beginner' && 'Master the fundamentals of production debugging'}
            {level === 'intermediate' && 'Advanced production debugging challenges'}
            {level === 'advanced' && 'Real production disasters from major tech companies'}
          </p>
        </div>

        {/* Progress */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300 font-semibold">Your Progress</span>
            <span className="text-gray-400">{completedCount}/{scenarioList.length} completed</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className={`bg-linear-to-r ${config.color} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="mt-3 text-green-400 font-semibold">🎉 Level Complete! Amazing work!</p>
          )}
        </div>

        {/* Scenario Cards */}
        <div className="space-y-4">
          {scenarioList.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              scenario={{ ...scenario, completed: isScenarioComplete(scenario.id) }}
              level={level!}
              index={index + 1}
              config={config}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ScenarioCardProps {
  scenario: {
    id: string;
    title: string;
    duration: string;
    teaches: string[];
    description: string;
    completed: boolean;
    locked: boolean;
  };
  level: string;
  index: number;
  config: {
    color: string;
    badge: string;
  };
}

function ScenarioCard({ scenario, level, index, config }: ScenarioCardProps) {
  const { completed, locked, id, title, duration, teaches, description } = scenario;

  const getStatusIcon = () => {
    if (completed) return '✓';
    if (locked) return '🔒';
    return '⚠️';
  };

  const getVariant = () => {
    if (completed) return 'success' as const;
    if (locked) return 'default' as const;
    return 'error' as const;
  };

  return (
    <TerminalWindow
      title={`scenario_${id.replace(/-/g, '_')}.debug`}
      variant={getVariant()}
      className={`${locked ? 'opacity-60' : 'hover:scale-[1.01]'} transition-all group`}
    >
      <div className="space-y-4">
        {/* Header with status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className={`text-3xl font-bold font-mono bg-linear-to-r ${config.color} bg-clip-text text-transparent`}>
              {index}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-mono text-terminal-red">
                  {getStatusIcon()} ERROR:
                </span>
                <h3 className="text-xl font-mono text-white">
                  {title.replace(/\s+/g, '_').toUpperCase()}
                </h3>
              </div>
              <div className="font-mono text-xs text-gray-500 space-y-1">
                <div>├─ Duration:  {duration}</div>
                <div>├─ Topics:    {teaches.join(', ')}</div>
                <div>└─ Severity:  {locked ? '🔒 LOCKED' : completed ? '✓ COMPLETED' : level.toUpperCase()}</div>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {completed && (
              <div className="bg-green-500/20 border border-green-500 rounded-full p-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            )}
            {locked && (
              <div className="bg-gray-700 border border-gray-600 rounded-full p-2">
                <Lock className="w-6 h-6 text-gray-500" />
              </div>
            )}
            {!completed && !locked && (
              <div className={`bg-linear-to-r ${config.color} rounded-full p-2`}>
                <Play className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed border-l-2 border-gray-700 pl-4">
          {description}
        </p>

        {/* Action button */}
        {!locked && (
          <Link
            to={`/${level}/${id}`}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r ${config.color} text-white rounded-lg font-mono font-semibold hover:shadow-xl transition-all`}
          >
            {completed ? 'REVIEW_SCENARIO' : 'START_DEBUG'} →
          </Link>
        )}

        {locked && (
          <button
            disabled
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-gray-500 rounded-lg font-mono font-semibold cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            LOCKED
          </button>
        )}
      </div>
    </TerminalWindow>
  );
}
