import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Task, TaskResult, MultipleChoiceTask, CodeFixTask, FindInLogsTask } from '../lib/types';
import { CodeEditor } from './CodeEditor';

interface TaskPanelProps {
  task: Task;
  onComplete: (result: TaskResult) => void;
  result?: TaskResult;
}

export function TaskPanel({ task, onComplete, result }: TaskPanelProps) {
  if (task.type === 'multiple-choice') {
    return <MultipleChoiceTaskComponent task={task} onComplete={onComplete} result={result} />;
  }
  if (task.type === 'code-fix') {
    return <CodeFixTaskComponent task={task} onComplete={onComplete} result={result} />;
  }
  if (task.type === 'find-in-logs') {
    return <FindInLogsTaskComponent task={task} onComplete={onComplete} result={result} />;
  }
  return null;
}

function MultipleChoiceTaskComponent({
  task,
  onComplete,
  result
}: {
  task: MultipleChoiceTask;
  onComplete: (result: TaskResult) => void;
  result?: TaskResult;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === task.correct;
    onComplete({
      correct: isCorrect,
      message: isCorrect ? '✓ Correct!' : 'Not quite. Try again.',
      explanation: isCorrect ? task.explanation : undefined,
      hint: isCorrect ? undefined : 'Look at the logs carefully.'
    });
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">📝 Task</h3>
      <p className="text-gray-700 mb-4">{task.question}</p>

      <div className="space-y-2 mb-4">
        {task.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(index)}
            disabled={result?.correct}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
              selectedOption === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${result?.correct ? 'opacity-60' : ''}`}
          >
            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
          </button>
        ))}
      </div>

      {!result?.correct && (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      )}

      {result && <TaskResultDisplay result={result} />}
    </div>
  );
}

function CodeFixTaskComponent({
  task,
  onComplete,
  result
}: {
  task: CodeFixTask;
  onComplete: (result: TaskResult) => void;
  result?: TaskResult;
}) {
  const [code, setCode] = useState(task.starting_code);

  const handleSubmit = () => {
    const validation = task.validation;

    for (const pattern of validation.must_contain) {
      if (!code.includes(pattern)) {
        onComplete({
          correct: false,
          message: `Missing: ${pattern}`,
          hint: 'Check the requirements'
        });
        return;
      }
    }

    if (validation.must_not_contain) {
      for (const pattern of validation.must_not_contain) {
        if (code.includes(pattern)) {
          onComplete({
            correct: false,
            message: `Please remove: ${pattern}`
          });
          return;
        }
      }
    }

    onComplete({
      correct: true,
      message: '✓ Code looks good!',
      explanation: task.explanation
    });
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">💻 Task</h3>
      <p className="text-gray-700 mb-4">{task.instructions}</p>

      <div className="mb-4">
        <CodeEditor
          code={{
            language: 'javascript',
            content: code,
            editable: true
          }}
          onChange={setCode}
        />
      </div>

      {!result?.correct && (
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Check Solution
        </button>
      )}

      {result && <TaskResultDisplay result={result} />}
    </div>
  );
}

function FindInLogsTaskComponent({
  task,
  onComplete,
  result
}: {
  task: FindInLogsTask;
  onComplete: (result: TaskResult) => void;
  result?: TaskResult;
}) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">🔍 Task</h3>
      <p className="text-gray-700 mb-4">{task.instructions}</p>
      <p className="text-sm text-gray-500">Click on the log entry that answers the question.</p>

      {result && <TaskResultDisplay result={result} />}
    </div>
  );
}

function TaskResultDisplay({ result }: { result: TaskResult }) {
  return (
    <div className={`mt-4 p-4 rounded-lg border-2 ${
      result.correct
        ? 'bg-green-50 border-green-300'
        : 'bg-red-50 border-red-300'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {result.correct ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <span className="font-semibold">{result.message}</span>
      </div>

      {result.hint && (
        <div className="flex items-start gap-2 mt-2 text-sm text-gray-700">
          <AlertCircle className="w-4 h-4 mt-0.5 text-blue-600" />
          <span>{result.hint}</span>
        </div>
      )}

      {result.explanation && (
        <div className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">
          {result.explanation}
        </div>
      )}
    </div>
  );
}
