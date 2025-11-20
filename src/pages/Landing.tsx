import { Link } from 'react-router-dom';
import { BookOpen, Zap, Flame } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            OutageLab
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Debug Production Outages in Your Browser
          </p>
          <p className="text-gray-500">
            No setup • No cost • No cloud required
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Beginner Card */}
          <LevelCard
            icon={<BookOpen className="w-8 h-8" />}
            level="beginner"
            color="green"
            title="BEGINNER"
            subtitle="New to production work"
            features={[
              'HTTP & API basics',
              'Reading logs',
              'Performance debugging',
              'Error handling'
            ]}
            stats="5 scenarios • ~90 mins"
          />

          {/* Intermediate Card */}
          <LevelCard
            icon={<Zap className="w-8 h-8" />}
            level="intermediate"
            color="yellow"
            title="INTERMEDIATE"
            subtitle="1-3 years experience"
            features={[
              'Database pooling',
              'Cache strategies',
              'Deploy & rollback',
              'Queue management'
            ]}
            stats="5 scenarios • ~2 hours"
          />

          {/* Advanced Card */}
          <LevelCard
            icon={<Flame className="w-8 h-8" />}
            level="advanced"
            color="red"
            title="ADVANCED"
            subtitle="3+ years experience"
            features={[
              'Reddit K8s outage',
              'GitLab data loss',
              'Discord Redis failure',
              'AWS cascade failure'
            ]}
            stats="5 scenarios • ~3 hours"
          />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="mb-4">
            100% Free • Open Source • No Sign-Up Required
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/yourusername/outagelab"
               className="text-blue-600 hover:underline">
              GitHub
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Level Card Component
interface LevelCardProps {
  icon: React.ReactNode;
  level: string;
  color: 'green' | 'yellow' | 'red';
  title: string;
  subtitle: string;
  features: string[];
  stats: string;
}

function LevelCard({ icon, level, color, title, subtitle, features, stats }: LevelCardProps) {
  const colorClasses = {
    green: 'border-green-500 bg-green-50',
    yellow: 'border-yellow-500 bg-yellow-50',
    red: 'border-red-500 bg-red-50'
  };

  return (
    <div className={`border-2 rounded-lg p-6 ${colorClasses[color]} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <p className="text-gray-600 mb-4">{subtitle}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <p className="text-sm text-gray-500 mb-4">{stats}</p>

      <Link
        to={`/${level}`}
        className="block w-full py-3 px-6 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800 transition-colors"
      >
        Start Here
      </Link>
    </div>
  );
}
