import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Lock, Play } from 'lucide-react';

// Mock data - will be replaced with actual scenario loading
const scenarios = {
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

export function ScenarioList() {
  const { level } = useParams<{ level: string }>();
  const scenarioList = scenarios[level as keyof typeof scenarios] || [];

  const completedCount = scenarioList.filter(s => s.completed).length;
  const progress = (completedCount / scenarioList.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold capitalize mb-2">
            {level} Level
          </h1>
          <p className="text-gray-600">
            Master the fundamentals of production debugging
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="text-gray-600">{completedCount}/{scenarioList.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Scenario Cards */}
        <div className="space-y-4">
          {scenarioList.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              level={level!}
              index={index + 1}
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
}

function ScenarioCard({ scenario, level, index }: ScenarioCardProps) {
  const { completed, locked, id, title, duration, teaches, description } = scenario;

  return (
    <div className={`bg-white rounded-lg p-6 border-2 ${
      locked ? 'opacity-60' : 'hover:shadow-lg'
    } transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-300">
            {index}.
          </span>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <span>⏱️ {duration}</span>
              <span>•</span>
              <span>📚 {teaches.join(', ')}</span>
            </div>
          </div>
        </div>

        <div>
          {completed && <CheckCircle className="w-6 h-6 text-green-500" />}
          {locked && <Lock className="w-6 h-6 text-gray-400" />}
          {!completed && !locked && <Play className="w-6 h-6 text-blue-600" />}
        </div>
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      {!locked && (
        <Link
          to={`/${level}/${id}`}
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {completed ? 'Review Scenario' : 'Start Scenario'} →
        </Link>
      )}
    </div>
  );
}
