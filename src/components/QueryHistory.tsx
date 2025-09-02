import React from 'react';
import { History, Clock } from 'lucide-react';
import type { QueryHistory as QueryHistoryType } from '../types';
import '../styles/components.css';

interface QueryHistoryProps {
  history: QueryHistoryType[];
  onHistorySelect: (historyItem: QueryHistoryType) => void;
}

const QueryHistory: React.FC<QueryHistoryProps> = ({
  history,
  onHistorySelect
}) => {


  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="query-section">
      <div className="section-header">
        <span>Query History</span>
        <History size={16} />
      </div>
      {history.length === 0 ? (
        <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
          No queries executed yet
        </div>
      ) : (
        <ul className="history-list">
          {history.slice(0, 10).map((item) => (
            <li
              key={item.id}
              className="history-item"
              onClick={() => onHistorySelect(item)}
            >
              <div className="history-query">{item.query}</div>
              <div className="history-meta">
                <span>
                  <Clock size={12} />
                  {formatDate(item.timestamp)}
                </span>
                <span>{item.executionTime.toFixed(2)}ms</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueryHistory;
