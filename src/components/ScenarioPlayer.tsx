import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TabNavigation } from './TabNavigation';
import { TaskPanel } from './TaskPanel';
import { LogViewer } from './LogViewer';
import { CodeEditor } from './CodeEditor';
import type { Scenario, TaskResult, LogEntry, CodeContent } from '../lib/types';
import { loadScenario } from '../lib/scenarioLoader';

export function ScenarioPlayer() {
  const { level, scenarioId } = useParams();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadScenario(level!, scenarioId!);
        setScenario(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load scenario');
        setLoading(false);
      }
    };

    if (level && scenarioId) {
      loadData();
    }
  }, [level, scenarioId]);

  const handleTaskComplete = (result: TaskResult) => {
    const newResults = [...taskResults];
    newResults[currentTask] = result;
    setTaskResults(newResults);

    if (result.correct && currentTask < (scenario?.tasks.length || 0) - 1) {
      setTimeout(() => {
        setCurrentTask(currentTask + 1);
      }, 1500);
    }
  };

  const handleLogSelect = (logId: string) => {
    setSelectedLogId(logId);

    if (scenario?.tasks[currentTask]?.type === 'find-in-logs') {
      const task = scenario.tasks[currentTask];
      const logs = scenario.tabs.find(t => t.type === 'logs')?.content as LogEntry[];
      const selectedLog = logs?.find(l => (l.id || `log-${logs.indexOf(l)}`) === logId);

      if (selectedLog?.is_answer) {
        handleTaskComplete({
          correct: true,
          message: '✓ Correct! You found the error.',
          explanation: task.explanation
        });
      } else {
        handleTaskComplete({
          correct: false,
          message: 'Not quite. Try again.',
          hint: 'Look for the log entry that shows the error.'
        });
      }
    }
  };

  const allTasksComplete = scenario && taskResults.filter(r => r?.correct).length === scenario.tasks.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scenario...</p>
        </div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Scenario not found'}</p>
          <Link to={`/${level}`} className="text-blue-600 hover:underline">
            ← Back to scenarios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/${level}`} className="text-blue-600 hover:underline">
            ← Back to {level} scenarios
          </Link>
          <h1 className="text-2xl font-bold">{scenario.title}</h1>
          <div className="text-gray-600">
            Task {currentTask + 1} of {scenario.tasks.length}
          </div>
        </div>

        {/* Context */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">📖 Context</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{scenario.context}</p>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={scenario.tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6 min-h-[400px]">
          <TabContent
            tab={scenario.tabs[activeTab]}
            onLogSelect={handleLogSelect}
            selectedLogId={selectedLogId}
          />
        </div>

        {/* Task Panel */}
        {!allTasksComplete && (
          <TaskPanel
            task={scenario.tasks[currentTask]}
            onComplete={handleTaskComplete}
            result={taskResults[currentTask]}
          />
        )}

        {/* Completion Panel */}
        {allTasksComplete && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              🎉 Scenario Complete!
            </h2>
            <div className="prose max-w-none mb-6">
              <div className="whitespace-pre-wrap text-gray-700">
                {scenario.completion.summary}
              </div>
            </div>

            {scenario.completion.resources && scenario.completion.resources.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">📚 Additional Resources</h3>
                <ul className="space-y-2">
                  {scenario.completion.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {resource.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <Link
                to={`/${level}`}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Scenarios
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface TabContentProps {
  tab: any;
  onLogSelect?: (logId: string) => void;
  selectedLogId?: string | null;
}

function TabContent({ tab, onLogSelect, selectedLogId }: TabContentProps) {
  if (tab.type === 'logs') {
    return (
      <LogViewer
        logs={tab.content as LogEntry[]}
        onLogSelect={onLogSelect}
        selectedLogId={selectedLogId || undefined}
      />
    );
  }
  if (tab.type === 'code') {
    return <CodeEditor code={tab.content as CodeContent} />;
  }
  if (tab.type === 'markdown') {
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: tab.content as string }}
      />
    );
  }
  return <div className="whitespace-pre-wrap">{tab.content as string}</div>;
}
