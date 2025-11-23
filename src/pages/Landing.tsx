import { Link } from 'react-router-dom';
import { BookOpen, Zap, Flame, Code, Clock, Trophy, Target, CheckCircle, FileCode, Server } from 'lucide-react';
import { useState, useEffect } from 'react';
import { loadManifest, type Manifest } from '../lib/manifestLoader';
import { ErrloomIcon } from '../components/icons/ErrloomIcon';

export function Landing() {
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    loadManifest().then(setManifest).catch(console.error);
  }, []);

  const totalScenarios = manifest?.stats.totalScenarios || 15;
  const totalHours = manifest?.stats.totalHours || 7;
  const beginnerStats = manifest?.levels.beginner.stats.formattedDuration || '1h 26m';
  const intermediateStats = manifest?.levels.intermediate.stats.formattedDuration || '2h 2m';
  const advancedStats = manifest?.levels.advanced.stats.formattedDuration || '2h 40m';

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-orange-600/20 via-red-600/20 to-purple-600/20 animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          {/* Logo & Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-transparent rounded-2xl mb-6">
              <ErrloomIcon size={96} strokeWidth={2} />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold font-mono mb-6 bg-linear-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Errloom
            </h1>

            {/* What is Errloom */}
            <div className="max-w-3xl mx-auto mb-6">
              <p className="text-2xl md:text-3xl text-gray-200 mb-4 font-light leading-relaxed">
                Master production debugging through <span className="text-orange-400 font-semibold">real-world disaster scenarios</span>
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Practice debugging real production outages from Reddit, GitLab, Discord, AWS, and Cloudflare.
                Learn how to read logs, trace errors, and fix critical bugs—all in your browser, no setup required.
              </p>

              {/* Compact inline stats */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-mono">
                <span className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300">
                  <Target className="w-4 h-4 inline mr-1.5 text-orange-400" />
                  {totalScenarios} scenarios
                </span>
                <span className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300">
                  <Clock className="w-4 h-4 inline mr-1.5 text-orange-400" />
                  {totalHours}+ hours
                </span>
                <span className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300">
                  <Trophy className="w-4 h-4 inline mr-1.5 text-green-400" />
                  100% free
                </span>
                <span className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300">
                  <Code className="w-4 h-4 inline mr-1.5 text-red-400" />
                  Real incidents
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => {
                const element = document.getElementById('choose-level');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-8 py-4 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all shadow-2xl"
            >
              Start Learning Now →
            </button>
            <a
              href="https://github.com/OSP06/errloom/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transform hover:scale-105 transition-all border border-gray-700 flex items-center gap-2"
            >
              <Code className="w-5 h-5" />
              Contribute
            </a>
          </div>

          {/* Prominent Feature Banners - Centered */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
            <a
              href="https://github.com/OSP06/errloom"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/95 backdrop-blur-sm border-2 border-gray-700 hover:border-orange-500 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-linear-to-br from-orange-500 to-red-600 rounded-lg shrink-0">
                  <FileCode className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-mono font-bold text-lg text-white">View Source Code</div>
                  <div className="font-mono text-sm text-gray-400">MIT License • Open Source</div>
                </div>
              </div>
            </a>

            <a
              href="https://github.com/OSP06/errloom#deployment"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/95 backdrop-blur-sm border-2 border-gray-700 hover:border-green-500 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg shrink-0">
                  <Server className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-mono font-bold text-lg text-white">Self-Host Errloom</div>
                  <div className="font-mono text-sm text-gray-400">Deploy Your Own Scenario • Free Forever</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-mono text-center mb-12">Why Errloom?</h2>
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
            title="Add your Own Scenarios"
            description="Open source platform—contribute and share your own debugging challenges"
            icon="⚡"
          />
        </div>
      </div>

      {/* Level Cards Section */}
      <div id="choose-level" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-8">
        <h2 className="text-3xl font-bold font-mono text-center mb-4">Choose Your Level</h2>
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
            stats={`5 scenarios • ~${beginnerStats}`}
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
            stats={`5 scenarios • ~${intermediateStats}`}
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
            stats={`5 scenarios • ~${advancedStats}`}
            difficulty="Hard"
            badge="Real Incidents"
          />
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="bg-linear-to-r from-gray-800 to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold font-mono text-center mb-12">What You'll Master</h2>
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
      <div className={`absolute inset-0 bg-linear-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-linear-to-br ${colorClasses[color]} text-white`}>
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
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mb-6">{stats}</p>

        <Link
          to={`/${level}`}
          className={`block w-full py-4 px-6 bg-linear-to-r ${colorClasses[color]} text-white text-center rounded-xl font-bold hover:shadow-2xl transition-all`}
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
      <CheckCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
      <span className="text-gray-300">{skill}</span>
    </div>
  );
}
