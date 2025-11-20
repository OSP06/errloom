export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Scenario {
  id: string;
  level: DifficultyLevel;
  title: string;
  duration: string;
  teaches: string[];
  context: string;
  tabs: Tab[];
  tasks: Task[];
  completion: CompletionInfo;
}

export interface Tab {
  name: string;
  type: 'text' | 'logs' | 'code' | 'markdown';
  content: string | LogEntry[] | CodeContent;
}

export interface LogEntry {
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  id?: string;
  is_answer?: boolean;
}

export interface CodeContent {
  language: string;
  content: string;
  editable?: boolean;
}

export type Task = MultipleChoiceTask | CodeFixTask | FindInLogsTask;

export interface MultipleChoiceTask {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CodeFixTask {
  type: 'code-fix';
  instructions: string;
  starting_code: string;
  validation: {
    must_contain: string[];
    must_not_contain?: string[];
  };
  solution: string;
  explanation: string;
}

export interface FindInLogsTask {
  type: 'find-in-logs';
  instructions: string;
  explanation: string;
}

export interface CompletionInfo {
  summary: string;
  resources?: Array<{
    title: string;
    url: string;
  }>;
}

export interface TaskResult {
  correct: boolean;
  message: string;
  explanation?: string;
  hint?: string;
}
