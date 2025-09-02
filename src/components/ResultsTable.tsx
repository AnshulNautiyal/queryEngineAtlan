import React, { useMemo } from 'react';
import { Download, Table } from 'lucide-react';
import type { QueryResult } from '../types';
import '../styles/components.css';

interface ResultsTableProps {
  result: QueryResult | null;
  isLoading: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ result, isLoading }) => {
  const exportToCSV = () => {
    if (!result) return;
    
    const csvContent = [
      result.columns.join(','),
      ...result.data.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query_results_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatCell = (cell: any) => {
    if (cell === null || cell === undefined) return 'NULL';
    if (typeof cell === 'number') return cell.toLocaleString();
    if (typeof cell === 'boolean') return cell ? 'true' : 'false';
    return String(cell);
  };

  const displayData = useMemo(() => {
    if (!result) return [];
    return result.data.slice(0, 1000); // Limit to 1000 rows for performance
  }, [result]);

  if (isLoading) {
    return (
      <div className="results-section">
        <div className="section-header">
          <span>Query Results</span>
          <div className="loading-spinner" />
        </div>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
          Executing query...
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="results-section">
        <div className="section-header">
          <span>Query Results</span>
          <Table size={16} />
        </div>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
          Execute a query to see results
        </div>
      </div>
    );
  }

  return (
    <div className="results-section">
      <div className="section-header">
        <span>Query Results</span>
        <button
          onClick={exportToCSV}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '14px'
          }}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
      
      <div className="results-table-container">
        <table className="results-table">
          <thead>
            <tr>
              {result.columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{formatCell(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="results-summary">
        <span>
          Showing {displayData.length} of {result.rowCount} rows
          {result.rowCount > 1000 && ' (limited to 1000 for performance)'}
        </span>
        <span>Execution time: {result.executionTime.toFixed(2)}ms</span>
      </div>
    </div>
  );
};

export default ResultsTable;
