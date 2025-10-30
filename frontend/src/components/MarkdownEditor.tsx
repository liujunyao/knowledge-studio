import { useMemo } from 'react';
import { EditorView } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';

interface MarkdownEditorProps {
  value: string;
  onChange: (nextValue: string) => void;
  readOnly?: boolean;
  height?: string;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  readOnly = false,
  height = '400px',
  placeholder,
}: MarkdownEditorProps) {
  const extensions = useMemo(() => {
    const baseExtensions = [
      markdown(),
      EditorView.lineWrapping,
      EditorView.theme({
        '&': {
          fontSize: '14px',
          backgroundColor: '#ffffff',
        },
        '.cm-content': {
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
          padding: '16px',
        },
        '.cm-scroller': {
          overflow: 'auto',
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
        },
        '.cm-gutters': {
          backgroundColor: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
        },
      }),
    ];

    return readOnly ? baseExtensions : [...baseExtensions, oneDark];
  }, [readOnly]);

  return (
    <CodeMirror
      value={value}
      onChange={(nextValue) => onChange(nextValue)}
      height={height}
      editable={!readOnly}
      extensions={extensions}
      theme={readOnly ? undefined : oneDark}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        indentOnInput: true,
        bracketMatching: true,
      }}
      placeholder={placeholder}
    />
  );
}
