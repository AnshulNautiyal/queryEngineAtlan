import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, Trash2 } from 'lucide-react';
import '../styles/components.css';

interface QueryEditorProps {
  query: string;
  onQueryChange: (query: string) => void;
  onExecute: () => void;
  onClear: () => void;
  isExecuting: boolean;
}

const QueryEditor: React.FC<QueryEditorProps> = ({
  query,
  onQueryChange,
  onExecute,
  onClear,
  isExecuting
}) => {
  return (
    <div className="query-section">
      <div className="section-header">
        <span>SQL Query Editor</span>
      </div>
      <div className="query-editor-container">
        <Editor
          height="200px"
          defaultLanguage="sql"
          value={query}
          onChange={(value) => onQueryChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: { enabled: true },
            hover: { enabled: true },
            contextmenu: true,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            foldingHighlight: true,
            selectOnLineNumbers: true,
            glyphMargin: true,
            overviewRulerBorder: true,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 17,
              horizontalScrollbarSize: 17,
              useShadows: false
            }
          }}
        />
      </div>
      <div className="query-controls">
        <button
          className="execute-button"
          onClick={onExecute}
          disabled={isExecuting || !query.trim()}
        >
          {isExecuting ? (
            <div className="loading-spinner" />
          ) : (
            <Play size={16} />
          )}
          Execute Query
        </button>
        <button
          className="clear-button"
          onClick={onClear}
          disabled={isExecuting}
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>
    </div>
  );
};

export default QueryEditor;
