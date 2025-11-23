import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { InteractiveLogViewer } from './InteractiveLogViewer';
import { RealIncidentContext } from './RealIncidentContext';
import { ScenarioTimer, PerformanceSummary } from './ScenarioTimer';
import { TaskPanel } from './TaskPanel';
import { TabNavigation } from './TabNavigation';
import { CodeEditor } from './CodeEditor';
import type { Scenario, TaskResult, LogEntry, CodeContent, Tab } from '../lib/types';
import { loadScenario } from '../lib/scenarioLoader';
import { getNextScenario as getNextScenarioFromManifest } from '../lib/manifestLoader';
import { useProgressStore } from '../lib/progressStore';

export function ScenarioPlayer() {
  const { level, scenarioId } = useParams();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const [completed, setCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markScenarioComplete = useProgressStore((state) => state.markScenarioComplete);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await loadScenario(level!, scenarioId!);
        setScenario(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load scenario');
      } finally {
        setLoading(false);
      }
    }
    if (level && scenarioId) {
      load();
    }
  }, [level, scenarioId]);

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
      {/* Timer */}
      {!completed && (
        <ScenarioTimer
          targetTime={scenario.duration.split(' ')[0]}
          onComplete={setTimeElapsed}
        />
      )}

      {/* Top bar */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/${level}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold font-mono text-lg">{scenario.title}</h1>
              <p className="text-sm text-gray-400 capitalize">
                {scenario.level} • {scenario.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress indicator */}
            <div className="px-4 py-2 bg-gray-800 rounded-lg">
              <span className="text-sm">
                Task {currentTask + 1}/{scenario.tasks.length}
              </span>
            </div>

            {/* AI Hint button (coming soon) */}
            <button
              disabled
              className="px-4 py-2 bg-gray-700 text-gray-500 rounded-lg flex items-center gap-2 cursor-not-allowed relative group"
              title="AI Hints coming soon!"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Hint</span>
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon!
              </span>
            </button>
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
              <BookOpen className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
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
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">
        {tab.content as string}
      </pre>
    </div>
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div
          className="prose prose-invert max-w-none whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: scenario.completion.summary }}
        />
      </div>

      {/* Resources */}
      {scenario.completion.resources && scenario.completion.resources.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
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
        </div>
      )}

      {/* Real incident context */}
      {scenario.real_incident && (
        <RealIncidentContext {...scenario.real_incident} />
      )}

      {/* Next actions */}
      <div className="flex gap-4">
        <Link
          to={`/${scenario.level}`}
          className="flex-1 py-3 px-6 bg-gray-800 hover:bg-gray-700 text-center rounded-lg font-semibold transition-colors"
        >
          Back to Scenarios
        </Link>
        <button
          onClick={handleNextScenario}
          className="flex-1 py-3 px-6 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-center rounded-lg font-semibold transition-all"
        >
          {nextScenario ? 'Next Scenario →' : 'View All Scenarios'}
        </button>
      </div>
    </div>
  );
}
