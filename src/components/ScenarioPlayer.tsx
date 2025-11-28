import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, BookOpen, Lock, Lightbulb, Target } from 'lucide-react';
import { InteractiveLogViewer } from './InteractiveLogViewer';
import { RealIncidentContext } from './RealIncidentContext';
import { ScenarioTimer, PerformanceSummary } from './ScenarioTimer';
import { TaskPanel } from './TaskPanel';
import { TabNavigation } from './TabNavigation';
import { CodeEditor } from './CodeEditor';
import type { Scenario, TaskResult, LogEntry, CodeContent, Tab, ScenarioMode } from '../lib/types';
import { loadScenario } from '../lib/scenarioLoader';
import { getNextScenario as getNextScenarioFromManifest } from '../lib/manifestLoader';
import { useProgressStore } from '../lib/progressStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function ScenarioPlayer() {
  const { level, scenarioId } = useParams();
  const [searchParams] = useSearchParams();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const [completed, setCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<ScenarioMode>(() => {
    const modeFromUrl = searchParams.get('mode') as ScenarioMode | null;
    return modeFromUrl || 'guided';
  });
  const markScenarioComplete = useProgressStore((state) => state.markScenarioComplete);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await loadScenario(level!, scenarioId!);
        setScenario(data);

        // Set default mode based on scenario's available modes if not already set from URL
        const modeFromUrl = searchParams.get('mode') as ScenarioMode | null;
        if (!modeFromUrl && data.modes) {
          // Default to first available mode
          setSelectedMode(data.modes[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load scenario');
      } finally {
        setLoading(false);
      }
    }
    if (level && scenarioId) {
      load();
    }
  }, [level, scenarioId, searchParams]);

  const handleTaskComplete = (result: TaskResult) => {
    setTaskResults([...taskResults, result]);

    if (result.correct) {
      if (currentTask < scenario!.tasks.length - 1) {
        setTimeout(() => setCurrentTask(currentTask + 1), 1000);
      } else {
        setCompleted(true);
        // Mark scenario as complete
        if (scenario) {
          markScenarioComplete(scenario.id);
        }
        const timer = document.querySelector('[data-timer]');
        if (timer) {
          const seconds = parseInt(timer.getAttribute('data-seconds') || '0');
          setTimeElapsed(seconds);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading scenario...</p>
        </div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Scenario not found'}</p>
          <Link to={`/${level}`} className="text-orange-500 hover:underline">
            ← Back to scenarios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white">
      {/* Timer - adjusted position to not overlap */}
      {!completed && (
        <div className="fixed top-20 right-4 z-30">
          <ScenarioTimer
            targetTime={scenario.duration.split(' ')[0]}
            onComplete={setTimeElapsed}
          />
        </div>
      )}

      {/* Top bar */}
      <div className="border-b border-gray-700 bg-gray-900/95 backdrop-blur-md sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/${level}`}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold font-mono text-lg">{scenario.title}</h1>
                {selectedMode === 'guided' && (
                  <Badge className="bg-blue-500 text-white">
                    <Lightbulb className="w-3 h-3 mr-1" />
                    Guided
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground capitalize">
                {scenario.level} • {scenario.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress indicator */}
            <Badge variant="secondary" className="px-4 py-2 hidden sm:flex">
              Task {currentTask + 1}/{scenario.tasks.length}
            </Badge>

            {/* AI Hint button - locked state */}
            <Button
              disabled
              variant="outline"
              className="relative group border-gray-700 opacity-60 cursor-not-allowed"
              title="AI Hints feature coming soon!"
            >
              <Lock className="w-4 h-4 mr-2 text-gray-500" />
              <Sparkles className="w-4 h-4 mr-2 text-gray-500" />
              <span className="hidden sm:inline">AI Hint</span>
              <Badge className="ml-2 bg-purple-600 text-white text-xs">Soon</Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content - Split screen */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left: Context + Tabs */}
        <div className="border-r border-gray-700 overflow-y-auto">
          {/* Context banner */}
          <div className="p-6 bg-linear-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-700">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
              <div>
                <h2 className="font-semibold font-mono mb-2 text-blue-100">CONTEXT</h2>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {scenario.context}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <TabNavigation
            tabs={scenario.tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab content */}
          <div className="p-6">
            <TabContent tab={scenario.tabs[activeTab]} />
          </div>
        </div>

        {/* Right: Tasks */}
        <div className="bg-gray-900/50 overflow-y-auto">
          <div className="p-6">
            {!completed ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold font-mono mb-2">YOUR_MISSION</h2>
                  <p className="text-gray-400">
                    Complete the tasks below to solve the outage
                  </p>
                </div>

                {/* Mode Switcher - Discreet */}
                {scenario.modes && scenario.modes.length > 1 && (
                  <div className="mb-4 flex items-center justify-between p-3 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-lg">
                    <span className="text-sm text-gray-400">Learning Mode:</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={selectedMode === 'guided' ? 'default' : 'outline'}
                        onClick={() => setSelectedMode('guided')}
                        className={selectedMode === 'guided' ? 'bg-blue-500 hover:bg-blue-600' : 'border-gray-600'}
                      >
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Guided
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedMode === 'challenge' ? 'default' : 'outline'}
                        onClick={() => setSelectedMode('challenge')}
                        className={selectedMode === 'challenge' ? 'bg-red-500 hover:bg-red-600' : 'border-gray-600'}
                      >
                        <Target className="w-3 h-3 mr-1" />
                        Challenge
                      </Button>
                    </div>
                  </div>
                )}

                {/* Guided Mode Hints Panel */}
                {selectedMode === 'guided' && (
                  <Card className="mb-6 border-blue-500/50 bg-blue-900/30 backdrop-blur-lg shadow-lg shadow-blue-500/10">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-blue-100 mb-2">Guided Mode Active</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p>💡 <strong>Tips:</strong></p>
                            <ul className="list-disc list-inside space-y-1 text-gray-400">
                              <li>Read the context and logs carefully</li>
                              <li>Look for error patterns and timestamps</li>
                              <li>Each task builds on the previous one</li>
                              <li>Take your time - learning is the goal!</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <TaskPanel
                  task={scenario.tasks[currentTask]}
                  onComplete={handleTaskComplete}
                  result={taskResults[currentTask]}
                />
              </>
            ) : (
              <CompletionScreen scenario={scenario} timeElapsed={timeElapsed} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabContent({ tab }: { tab: Tab }) {
  if (tab.type === 'logs') {
    return <InteractiveLogViewer logs={tab.content as LogEntry[]} />;
  }

  if (tab.type === 'code') {
    const codeContent = tab.content as CodeContent;
    return <CodeEditor code={codeContent} />;
  }

  if (tab.type === 'markdown') {
    return (
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: tab.content as string }}
      />
    );
  }

  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <pre className="whitespace-pre-wrap text-muted-foreground font-mono text-sm">
          {tab.content as string}
        </pre>
      </CardContent>
    </Card>
  );
}

function CompletionScreen({
  scenario,
  timeElapsed
}: {
  scenario: Scenario;
  timeElapsed: number;
}) {
  const navigate = useNavigate();
  const [nextScenario, setNextScenario] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    getNextScenarioFromManifest(scenario.level, scenario.id)
      .then(setNextScenario)
      .catch(console.error);
  }, [scenario.level, scenario.id]);

  const handleNextScenario = () => {
    if (nextScenario) {
      navigate(`/${scenario.level}/${nextScenario.id}`);
    } else {
      navigate(`/${scenario.level}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2">Scenario Complete!</h2>
        <p className="text-gray-400">You've successfully debugged the outage</p>
      </div>

      {/* Performance */}
      <PerformanceSummary
        timeElapsed={timeElapsed}
        targetTime={scenario.duration.split(' ')[0]}
      />

      {/* Completion summary */}
      <Card className="p-6">
        <CardContent className="p-0">
          <div
            className="prose prose-invert max-w-none whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: scenario.completion.summary }}
          />
        </CardContent>
      </Card>

      {/* Resources */}
      {scenario.completion.resources && scenario.completion.resources.length > 0 && (
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Continue Learning</h3>
          <div className="space-y-3">
            {scenario.completion.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <span className="text-gray-300 group-hover:text-white">
                  {resource.title}
                </span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Real incident context */}
      {scenario.real_incident && (
        <RealIncidentContext {...scenario.real_incident} />
      )}

      {/* Next actions */}
      <div className="flex gap-4">
        <Button variant="secondary" className="flex-1" size="lg" asChild>
          <Link to={`/${scenario.level}`}>
            Back to Scenarios
          </Link>
        </Button>
        <Button
          onClick={handleNextScenario}
          className="flex-1 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          size="lg"
        >
          {nextScenario ? 'Next Scenario →' : 'View All Scenarios'}
        </Button>
      </div>
    </div>
  );
}
