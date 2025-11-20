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
      id: 'db-connection-pool',
      title: 'Database Connection Pool Exhaustion',
      duration: '30 min',
      teaches: ['Database', 'Connection Pools', 'Monitoring'],
      description: 'Your app stops responding under load. The database is fine, so what gives?',
      completed: false,
      locked: true
    }
  ],
  advanced: [
    {
      id: 'reddit-k8s',
      title: 'Reddit Kubernetes Outage',
      duration: '45 min',
      teaches: ['Kubernetes', 'Networking', 'DNS'],
      description: 'Recreate and solve Reddit\'s 2020 Kubernetes outage.',
      completed: false,
      locked: true
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
