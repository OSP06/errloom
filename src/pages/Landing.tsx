import { Link } from 'react-router-dom';
import { BookOpen, Zap, Flame, Code, Clock, Trophy, Target, CheckCircle, Github } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-purple-600/20 animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          {/* Logo & Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-2xl">
              <Flame className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Errloom
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Debug Production Outages in Your Browser
            </p>
            <p className="text-gray-400 text-lg">
              Learn from real disasters • No setup • 100% free
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <StatCard icon={<Target className="w-6 h-6" />} value="15" label="Scenarios" />
            <StatCard icon={<Clock className="w-6 h-6" />} value="6+" label="Hours" />
            <StatCard icon={<Trophy className="w-6 h-6" />} value="100%" label="Free" />
            <StatCard icon={<Code className="w-6 h-6" />} value="Real" label="Incidents" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => {
                const element = document.getElementById('choose-level');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all shadow-2xl"
            >
              Start Learning Now →
            </button>
            <a
              href="https://github.com/OSP06/errloom"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transform hover:scale-105 transition-all border border-gray-700 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Errloom?</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Real Production Disasters"
            description="Learn from actual incidents at Reddit, GitLab, Discord, AWS, and Cloudflare"
            icon="🔥"
          />
          <FeatureCard
            title="Interactive Learning"
            description="Hands-on scenarios with code fixes, log analysis, and multiple-choice questions"
            icon="🎮"
          />
          <FeatureCard
            title="No Setup Required"
            description="100% browser-based. No cloud, no backend, no installation needed"
            icon="⚡"
          />
        </div>
      </div>

      {/* Level Cards Section */}
      <div id="choose-level" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-8">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your Level</h2>
        <p className="text-gray-400 text-center mb-12">From fundamentals to real-world disasters</p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Beginner Card */}
          <LevelCard
            icon={<BookOpen className="w-8 h-8" />}
            level="beginner"
            color="green"
            title="BEGINNER"
            subtitle="New to production work"
            features={[
              '404 errors & routing',
              'N+1 query problems',
              'Memory leaks',
              'CORS issues',
              'Environment variables'
            ]}
            stats="5 scenarios • ~86 minutes"
            difficulty="Easy"
          />

          {/* Intermediate Card */}
          <LevelCard
            icon={<Zap className="w-8 h-8" />}
            level="intermediate"
            color="yellow"
            title="INTERMEDIATE"
            subtitle="1-3 years experience"
            features={[
              'Connection pool exhaustion',
              'Cache stampedes',
              'Failed deployments',
              'Message queue backups',
              'Rate limit cascades'
            ]}
            stats="5 scenarios • ~122 minutes"
            difficulty="Medium"
          />

          {/* Advanced Card */}
          <LevelCard
            icon={<Flame className="w-8 h-8" />}
            level="advanced"
            color="red"
            title="ADVANCED"
            subtitle="3+ years experience"
            features={[
              'Reddit K8s meltdown',
              'GitLab database deletion',
              'Discord Redis failure',
              'AWS S3 cascade',
              'Cloudflare BGP hijack'
            ]}
            stats="5 scenarios • ~160 minutes"
            difficulty="Hard"
            badge="Real Incidents"
          />
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Master</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <SkillItem skill="Reading and analyzing production logs" />
            <SkillItem skill="Debugging N+1 queries and performance issues" />
            <SkillItem skill="Understanding cache strategies and stampedes" />
            <SkillItem skill="Managing database connections and pools" />
            <SkillItem skill="Preventing cascade failures" />
            <SkillItem skill="Kubernetes resource management" />
            <SkillItem skill="Circuit breakers and rate limiting" />
            <SkillItem skill="Incident response and recovery" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-center border-t border-gray-800">
        <p className="text-gray-400 mb-4">
          100% Free • Open Source • No Sign-Up Required
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="https://github.com/OSP06/errloom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-600">•</span>
          <a href="mailto:ompateldev06@gmail.com" className="text-orange-400 hover:text-orange-300 transition-colors">
            Contact
          </a>
        </div>
        <p className="text-gray-600 text-sm mt-6">
          Made with ❤️ for developers learning production debugging
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-orange-500 transition-colors">
      <div className="flex justify-center mb-2 text-orange-400">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-orange-500 transition-all hover:transform hover:scale-105">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

interface LevelCardProps {
  icon: React.ReactNode;
  level: string;
  color: 'green' | 'yellow' | 'red';
  title: string;
  subtitle: string;
  features: string[];
  stats: string;
  difficulty: string;
  badge?: string;
}

function LevelCard({ icon, level, color, title, subtitle, features, stats, difficulty, badge }: LevelCardProps) {
  const colorClasses = {
    green: 'from-green-600 to-emerald-600 border-green-500',
    yellow: 'from-yellow-600 to-orange-600 border-yellow-500',
    red: 'from-red-600 to-orange-600 border-red-500'
  };

  const difficultyColors = {
    green: 'bg-green-500/20 text-green-400 border-green-500',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
    red: 'bg-red-500/20 text-red-400 border-red-500'
  };

  return (
    <div className="bg-gray-800 border-2 rounded-2xl p-8 hover:border-opacity-100 transition-all hover:transform hover:scale-105 relative overflow-hidden group">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
            {icon}
          </div>
          {badge && (
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{subtitle}</p>

        {/* Difficulty badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 border ${difficultyColors[color]}`}>
          {difficulty}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mb-6">{stats}</p>

        <Link
          to={`/${level}`}
          className={`block w-full py-4 px-6 bg-gradient-to-r ${colorClasses[color]} text-white text-center rounded-xl font-bold hover:shadow-2xl transition-all`}
        >
          Start {title}
        </Link>
      </div>
    </div>
  );
}

function SkillItem({ skill }: { skill: string }) {
  return (
    <div className="flex items-start gap-3 bg-gray-900 p-4 rounded-lg border border-gray-800">
      <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
      <span className="text-gray-300">{skill}</span>
    </div>
  );
}
