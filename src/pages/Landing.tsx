import { Link } from 'react-router-dom';
import { BookOpen, Zap, Flame, Code, Clock, Trophy, Target, CheckCircle, FileCode, Server, Lightbulb, Gauge, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { loadManifest, getViralScenarios, type Manifest, type ScenarioMetadata } from '../lib/manifestLoader';
import { ErrloomIcon } from '../components/icons/ErrloomIcon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function Landing() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [viralScenarios, setViralScenarios] = useState<ScenarioMetadata[]>([]);
  const [viralModes, setViralModes] = useState<Record<string, 'guided' | 'challenge'>>({});

  useEffect(() => {
    loadManifest().then(setManifest).catch(console.error);
    getViralScenarios().then(setViralScenarios).catch(console.error);
  }, []);

  const totalScenarios = manifest?.stats.totalScenarios || 15;
  const totalHours = manifest?.stats.totalHours || 7;
  const beginnerStats = manifest?.levels.beginner.stats.formattedDuration || '1h 26m';
  const intermediateStats = manifest?.levels.intermediate.stats.formattedDuration || '2h 2m';
  const advancedStats = manifest?.levels.advanced.stats.formattedDuration || '2h 40m';
  const beginnerCount = manifest?.levels.beginner.stats.count || 5;
  const intermediateCount = manifest?.levels.intermediate.stats.count || 5;
  const advancedCount = manifest?.levels.advanced.stats.count || 5;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      {/* Hero Section - Modern Video-First Design */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 gradient-mesh"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 w-full">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-transparent rounded-2xl mb-4">
              <ErrloomIcon size={72} strokeWidth={2} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-mono mb-4 bg-linear-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Errloom
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-2 font-light">
              Master production debugging through <span className="text-orange-400 font-semibold">real-world disasters</span>
            </p>
          </div>

          {/* Large Video Player - Prominently Displayed */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="relative glass-card rounded-2xl p-2 glow-orange">
              <video
                src="/assets/marketing/Demo.webm"
                className="w-full rounded-xl"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                Your browser does not support the video tag.
              </video>

              {/* Scroll Indicator - Overlaid on Video */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                <button
                  onClick={() => {
                    const element = document.getElementById('features');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="flex flex-col items-center gap-1 text-white/70 hover:text-orange-400 transition-colors cursor-pointer group bg-black/40 backdrop-blur-sm rounded-full px-4 py-2"
                  aria-label="Scroll down"
                >
                  <span className="text-xs font-mono opacity-80 group-hover:opacity-100 transition-opacity">Scroll</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Glassmorphic Stats Cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="glass-card rounded-xl px-6 py-3 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                <span className="font-mono font-bold text-lg">{totalScenarios}</span>
                <span className="text-gray-400 text-sm">scenarios</span>
              </div>
            </div>
            <div className="glass-card rounded-xl px-6 py-3 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="font-mono font-bold text-lg">{totalHours}+</span>
                <span className="text-gray-400 text-sm">hours</span>
              </div>
            </div>
            <div className="glass-card rounded-xl px-6 py-3 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-400" />
                <span className="font-mono font-bold text-lg">100%</span>
                <span className="text-gray-400 text-sm">free</span>
              </div>
            </div>
            <div className="glass-card rounded-xl px-6 py-3 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-red-400" />
                <span className="font-mono font-bold text-lg">Real</span>
                <span className="text-gray-400 text-sm">incidents</span>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Practice debugging real production outages from Reddit, GitLab, Discord, AWS, and Cloudflare.
            Learn how to read logs, trace errors, and fix critical bugs—all in your browser, no setup required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => {
                const element = document.getElementById('choose-level');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-8 py-6 bg-linear-to-r from-orange-600 to-red-600 text-white font-bold text-lg hover:from-orange-700 hover:to-red-700 shadow-2xl hover:scale-105 transition-transform"
            >
              Start Learning Now →
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="hover:scale-105 transition-transform"
            >
              <a
                href="https://github.com/OSP06/errloom/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Code className="w-5 h-5" />
                Contribute
              </a>
            </Button>
          </div>

          {/* Prominent Feature Banners - Bento Grid Style */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <a
              href="https://github.com/OSP06/errloom"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card rounded-2xl p-6 hover:glow-orange transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-linear-to-br from-orange-500 to-red-600 rounded-xl shrink-0">
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
              className="group glass-card rounded-2xl p-6 hover:glow-orange transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl shrink-0">
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

      {/* Features Section - Bento Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-mono text-center mb-12">Why Errloom?</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card rounded-2xl p-8 hover:glow-orange transition-all hover:scale-105 md:col-span-1">
            <div className="text-5xl mb-4">🔥</div>
            <h3 className="text-xl font-bold mb-3">Real Production Disasters</h3>
            <p className="text-muted-foreground">Learn from actual incidents at Reddit, GitLab, Discord, AWS, and Cloudflare</p>
          </div>

          <div className="glass-card rounded-2xl p-8 hover:glow-orange transition-all hover:scale-105 md:col-span-1">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-3">Interactive Learning</h3>
            <p className="text-muted-foreground">Hands-on scenarios with code fixes, log analysis, and multiple-choice questions</p>
          </div>

          <div className="glass-card rounded-2xl p-8 hover:glow-orange transition-all hover:scale-105 md:col-span-1">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Add your Own Scenarios</h3>
            <p className="text-muted-foreground">Open source platform—contribute and share your own debugging challenges</p>
          </div>
        </div>
      </div>

      {/* Viral Scenarios Section - Bento Grid */}
      {viralScenarios.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-800">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-orange-400" />
            <h2 className="text-3xl font-bold font-mono text-center">Viral Tech Disasters</h2>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-400 text-center mb-12">Real incidents that broke the internet and made headlines worldwide</p>

          {/* Bento Grid Layout - Apple Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viralScenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                className={`${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <ViralScenarioCard
                  scenario={scenario}
                  selectedMode={viralModes[scenario.id] || (scenario.modes?.includes('guided') ? 'guided' : 'challenge')}
                  onModeChange={(mode: 'guided' | 'challenge') => setViralModes(prev => ({ ...prev, [scenario.id]: mode }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

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
            stats={`${beginnerCount} scenarios • ~${beginnerStats}`}
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
            stats={`${intermediateCount} scenarios • ~${intermediateStats}`}
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
            stats={`${advancedCount} scenarios • ~${advancedStats}`}
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
    <Card className="glass-card border-2 hover:glow-orange p-6 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-linear-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

      <CardContent className="relative p-0 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-linear-to-br ${colorClasses[color]} text-white`}>
            {icon}
          </div>
          {badge && (
            <Badge className="bg-purple-600 text-white hover:bg-purple-700">
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{subtitle}</p>

        {/* Difficulty badge */}
        <Badge className={`mb-6 ${difficultyColors[color]}`} variant="outline">
          {difficulty}
        </Badge>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground mb-6">{stats}</p>

        <Button asChild className={`w-full bg-linear-to-r ${colorClasses[color]} hover:shadow-2xl`}>
          <Link to={`/${level}`}>
            Start {title}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function SkillItem({ skill }: { skill: string }) {
  return (
    <div className="glass-card flex items-start gap-3 p-4 rounded-xl hover:glow-orange transition-all duration-200 hover:scale-105">
      <CheckCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
      <span className="text-gray-300">{skill}</span>
    </div>
  );
}

interface ViralScenarioCardProps {
  scenario: ScenarioMetadata;
  selectedMode: 'guided' | 'challenge';
  onModeChange: (mode: 'guided' | 'challenge') => void;
}

function ViralScenarioCard({ scenario, selectedMode, onModeChange }: ViralScenarioCardProps) {
  const levelColors = {
    beginner: 'from-green-600 to-emerald-600',
    intermediate: 'from-yellow-600 to-orange-600',
    advanced: 'from-red-600 to-orange-600'
  };

  const color = levelColors[scenario.level as keyof typeof levelColors] || levelColors.beginner;
  // Default to showing both modes if not specified
  const hasBothModes = !scenario.modes || scenario.modes.length > 1;

  return (
    <Card className="glass-card border-2 hover:glow-orange transition-all duration-300 group hover:scale-105 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header with badges */}
        <div className="flex items-start justify-between mb-4">
          <Badge className="bg-orange-500 text-white shadow-lg shadow-orange-500/50">
            <Flame className="w-3 h-3 mr-1" />
            Viral
          </Badge>
          <Badge variant="outline" className="capitalize border-gray-600">
            {scenario.level}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
          {scenario.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {scenario.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scenario.teaches.slice(0, 2).map((topic, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
          {scenario.teaches.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{scenario.teaches.length - 2} more
            </Badge>
          )}
        </div>

        {/* Mode Selection - Interactive toggle */}
        <div className="mb-4 p-3 bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {selectedMode === 'guided' ? (
                <Lightbulb className="w-4 h-4 text-blue-400" />
              ) : (
                <Target className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm font-semibold text-gray-200">
                {selectedMode === 'guided' ? 'Guided Mode' : 'Challenge Mode'}
              </span>
            </div>

            {/* Toggle buttons - only show if scenario has both modes */}
            {hasBothModes && (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={selectedMode === 'guided' ? 'default' : 'ghost'}
                  onClick={() => onModeChange('guided')}
                  className={`h-7 px-2 text-xs ${selectedMode === 'guided' ? 'bg-blue-500 hover:bg-blue-600' : 'border-gray-600 hover:bg-gray-800'}`}
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Guided
                </Button>
                <Button
                  size="sm"
                  variant={selectedMode === 'challenge' ? 'default' : 'ghost'}
                  onClick={() => onModeChange('challenge')}
                  className={`h-7 px-2 text-xs ${selectedMode === 'challenge' ? 'bg-red-500 hover:bg-red-600' : 'border-gray-600 hover:bg-gray-800'}`}
                >
                  <Target className="w-3 h-3 mr-1" />
                  Challenge
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400">
            {selectedMode === 'guided'
              ? 'Step-by-step hints and explanations to help you learn'
              : 'Test your debugging skills with minimal guidance'
            }
          </p>
        </div>

        {/* Footer */}
        <div className="space-y-3 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {scenario.duration}
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {scenario.level}
            </span>
          </div>

          <Button asChild size="sm" className={`w-full bg-linear-to-r ${color} shadow-lg hover:shadow-xl transition-all`}>
            <Link to={`/${scenario.level}/${scenario.id}?mode=${selectedMode}`}>
              Start Scenario →
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
