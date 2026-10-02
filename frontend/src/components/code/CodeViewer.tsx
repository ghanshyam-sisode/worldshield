import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import { Copy, FileCode2 } from 'lucide-react';
import { Button } from '../ui';
import { toast } from 'sonner';

interface CodeViewerProps {
  code: string;
  language?: string;
  filename?: string;
  lineStart?: number;
  lineEnd?: number;
}

export function CodeViewer({ code, language = 'typescript', filename, lineStart, lineEnd }: CodeViewerProps) {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('worldshield-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#0D1117',
          'editor.lineHighlightBackground': '#161C24',
          'editorLineNumber.foreground': '#707B89',
          'editorIndentGuide.background': '#232B36',
          'editor.selectionBackground': '#232B36',
        },
      });
      monaco.editor.setTheme('worldshield-dark');
    }
  }, [monaco]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  const lineCount = code.split('\n').length;
  const editorHeight = Math.max(Math.min(lineCount * 21 + 30, 400), 100);

  return (
    <div className="rounded-xl border border-border bg-background-secondary overflow-hidden flex flex-col">
      <div className="h-10 border-b border-border bg-surface flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
          <FileCode2 className="h-4 w-4 text-text-muted" />
          {filename || 'source'}
          {lineStart && lineEnd && (
            <span className="text-text-muted ml-2 text-xs">
              Lines {lineStart}-{lineEnd}
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy} title="Copy code">
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="w-full relative" style={{ height: `${editorHeight}px` }}>
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="worldshield-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: false,
            renderLineHighlight: 'all',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}
