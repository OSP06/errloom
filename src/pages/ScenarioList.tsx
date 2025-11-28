import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Lock, Play, ArrowLeft, Trophy, Lightbulb, Target } from 'lucide-react';
import { useProgressStore } from '../lib/progressStore';
import { useState, useEffect } from 'react';
import { getScenariosByLevel, type ScenarioMetadata } from '../lib/manifestLoader';
import { TerminalWindow } from '../components/TerminalWindow';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  const [selectedModes, setSelectedModes] = useState<Record<string, 'guided' | 'challenge'>>({});
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
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
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
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
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
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Your Progress</span>
              <span className="text-muted-foreground">{completedCount}/{scenarioList.length} completed</span>
            </div>
            <Progress value={progress} className="h-3" />
            {progress === 100 && (
              <p className="mt-3 text-green-400 font-semibold">🎉 Level Complete! Amazing work!</p>
            )}
          </CardContent>
        </Card>

        {/* Scenario Cards */}
        <div className="space-y-4">
          {scenarioList.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              scenario={{ ...scenario, completed: isScenarioComplete(scenario.id) }}
              level={level!}
              index={index + 1}
              config={config}
              selectedMode={selectedModes[scenario.id] || (scenario.modes?.includes('guided') ? 'guided' : 'challenge')}
              onModeChange={(mode: 'guided' | 'challenge') => setSelectedModes(prev => ({ ...prev, [scenario.id]: mode }))}
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
    modes?: ('guided' | 'challenge')[];
  };
  level: string;
  index: number;
  config: {
    color: string;
    badge: string;
  };
  selectedMode: 'guided' | 'challenge';
  onModeChange: (mode: 'guided' | 'challenge') => void;
}

function ScenarioCard({ scenario, level, index, config, selectedMode, onModeChange }: ScenarioCardProps) {
  const { completed, locked, id, title, duration, teaches, description, modes } = scenario;
  // Default to showing both modes if not specified
  const hasBothModes = !modes || modes.length > 1;

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

        {/* Learning Mode Indicator & Toggle */}
        <div className="p-3 bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 rounded-lg">
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

        {/* Action button */}
        {!locked && (
          <Button asChild className={`bg-linear-to-r ${config.color} hover:shadow-xl font-mono`}>
            <Link to={`/${level}/${id}?mode=${selectedMode}`}>
              {completed ? 'REVIEW_SCENARIO' : 'START_DEBUG'} →
            </Link>
          </Button>
        )}

        {locked && (
          <Button disabled variant="secondary" className="font-mono">
            <Lock className="w-4 h-4" />
            LOCKED
          </Button>
        )}
      </div>
    </TerminalWindow>
  );
}
