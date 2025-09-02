import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import QueryEditor from './components/QueryEditor';
import QueryTemplates from './components/QueryTemplates';
import QueryHistory from './components/QueryHistory';
import ResultsTable from './components/ResultsTable';
import { MockQueryEngine } from './utils/queryEngine';
import { queryTemplates } from './data/mockData';
import { performanceTracker } from './utils/performance';
import type { QueryResult, QueryHistory as QueryHistoryType } from './types';
import './styles/layout.css';
import './styles/components.css';

const queryEngine = new MockQueryEngine();

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryType[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const executeQuery = useCallback(async () => {
    if (!query.trim()) return;

    console.log('Executing query:', query); // debug log
    setIsExecuting(true);
    setError(null);
    performanceTracker.startTimer('query_execution');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));
      
      const queryResult = queryEngine.executeQuery(query);
      const executionTime = performanceTracker.endTimer('query_execution');
      console.log(`Query executed in ${executionTime.toFixed(2)}ms`);
      setResult(queryResult);

      // Add to history
      const historyItem: QueryHistoryType = {
        id: Date.now().toString(),
        query: query.trim(),
        timestamp: new Date(),
        executionTime: queryResult.executionTime,
        rowCount: queryResult.rowCount
      };

      setQueryHistory(prev => [historyItem, ...prev.slice(0, 49)]); // Keep last 50 queries
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setIsExecuting(false);
    }
  }, [query]);

  const clearQuery = useCallback(() => {
    setQuery('');
    setResult(null);
    setError(null);
    setSelectedTemplateId('');
  }, []);

  const handleTemplateSelect = useCallback((template: any) => {
    setQuery(template.query);
    setSelectedTemplateId(template.id);
    setError(null);
  }, []);

  const handleHistorySelect = useCallback((historyItem: QueryHistoryType) => {
    setQuery(historyItem.query);
    setSelectedTemplateId('');
    setError(null);
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      executeQuery();
    }
  }, [executeQuery]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    performanceTracker.measurePageLoad();
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const totalQueries = queryHistory.length;
  const averageExecutionTime = queryHistory.length > 0 
    ? queryHistory.reduce((sum, item) => sum + item.executionTime, 0) / queryHistory.length 
    : 0;

  return (
    <div className="app-container">
      <Header 
        totalQueries={totalQueries}
        averageExecutionTime={averageExecutionTime}
      />
      
      <main className="main-content">
        <div className="left-panel">
          <QueryTemplates
            templates={queryTemplates}
            onTemplateSelect={handleTemplateSelect}
            selectedTemplateId={selectedTemplateId}
          />
          <QueryHistory
            history={queryHistory}
            onHistorySelect={handleHistorySelect}
          />
        </div>
        
        <div className="right-panel">
          <QueryEditor
            query={query}
            onQueryChange={setQuery}
            onExecute={executeQuery}
            onClear={clearQuery}
            isExecuting={isExecuting}
          />
          
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <ResultsTable
            result={result}
            isLoading={isExecuting}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
