import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Task, TaskResult, MultipleChoiceTask, CodeFixTask, FindInLogsTask } from '../lib/types';
import { CodeEditor } from './CodeEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="p-6 bg-gray-800/40 backdrop-blur-lg border-gray-700/50 shadow-xl">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold mb-4">📝 Task</h3>
        <p className="text-muted-foreground mb-4">{task.question}</p>

        <div className="space-y-2 mb-4">
          {task.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              disabled={result?.correct}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 backdrop-blur-sm ${
                selectedOption === index
                  ? 'border-orange-500 bg-orange-900/40 text-white shadow-lg shadow-orange-500/20'
                  : 'border-gray-700 hover:border-gray-600 text-muted-foreground bg-gray-800/30 hover:bg-gray-800/50'
              } ${result?.correct ? 'opacity-60' : ''}`}
            >
              <span className="font-medium text-orange-400">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>

        {!result?.correct && (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Submit Answer
          </Button>
        )}

        {result && <TaskResultDisplay result={result} />}
      </CardContent>
    </Card>
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
    <Card className="p-6 bg-gray-800/40 backdrop-blur-lg border-gray-700/50 shadow-xl">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold mb-4">💻 Task</h3>
        <p className="text-muted-foreground mb-4">{task.instructions}</p>

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
          <Button
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Check Solution
          </Button>
        )}

        {result && <TaskResultDisplay result={result} />}
      </CardContent>
    </Card>
  );
}

function FindInLogsTaskComponent({
  task,
  result
}: {
  task: FindInLogsTask;
  onComplete: (result: TaskResult) => void;
  result?: TaskResult;
}) {
  return (
    <Card className="p-6 bg-gray-800/40 backdrop-blur-lg border-gray-700/50 shadow-xl">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold mb-4">🔍 Task</h3>
        <p className="text-muted-foreground mb-4">{task.instructions}</p>
        <p className="text-sm text-muted-foreground">Click on the log entry that answers the question.</p>

        {result && <TaskResultDisplay result={result} />}
      </CardContent>
    </Card>
  );
}

function TaskResultDisplay({ result }: { result: TaskResult }) {
  return (
    <div className={`mt-4 p-4 rounded-lg border ${
      result.correct
        ? 'bg-green-900/30 border-green-500 text-green-100'
        : 'bg-red-900/30 border-red-500 text-red-100'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {result.correct ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )}
        <span className="font-semibold">{result.message}</span>
      </div>

      {result.hint && (
        <div className="flex items-start gap-2 mt-2 text-sm text-gray-300">
          <AlertCircle className="w-4 h-4 mt-0.5 text-blue-400" />
          <span>{result.hint}</span>
        </div>
      )}

      {result.explanation && (
        <div className="mt-3 text-sm text-gray-300 whitespace-pre-wrap">
          {result.explanation}
        </div>
      )}
    </div>
  );
}
