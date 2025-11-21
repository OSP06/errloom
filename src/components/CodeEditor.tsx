import { Editor } from '@monaco-editor/react';
import type { CodeContent } from '../lib/types';

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

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900">
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
        }}
        theme="vs-dark"
      />
    </div>
  );
}
