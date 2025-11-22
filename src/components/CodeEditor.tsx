import { Editor } from '@monaco-editor/react';
import type { CodeContent } from '../lib/types';
import { TerminalWindow } from './TerminalWindow';

interface CodeEditorProps {
  code: CodeContent;
  onChange?: (value: string) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const handleChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      onChange(value);
    }
  };

  // Generate filename based on language
  const getFileName = (language: string) => {
    const extensions: Record<string, string> = {
      javascript: 'app.js',
      typescript: 'app.ts',
      python: 'main.py',
      java: 'Main.java',
      go: 'main.go',
      rust: 'main.rs',
      yaml: 'config.yaml',
      json: 'data.json',
      html: 'index.html',
      css: 'styles.css',
    };
    return extensions[language] || 'code.txt';
  };

  return (
    <TerminalWindow title={getFileName(code.language)} variant="default">
      <div className="overflow-hidden -mx-4 -my-4">
        <Editor
          height="400px"
          language={code.language}
          value={typeof code.content === 'string' ? code.content : code.content}
          onChange={handleChange}
          options={{
            readOnly: !code.editable && !onChange,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 10, bottom: 10 },
          }}
          theme="vs-dark"
        />
      </div>
    </TerminalWindow>
  );
}
