import React from 'react';
import { Database, Zap, Clock } from 'lucide-react';
import '../styles/header.css';

interface HeaderProps {
  totalQueries: number;
  averageExecutionTime: number;
}

const Header: React.FC<HeaderProps> = ({ totalQueries, averageExecutionTime }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div>
          <h1 className="app-title">
            <Database size={24} />
            SQL Query Runner
          </h1>
          <p className="app-subtitle">
            Interactive SQL query execution and analysis tool
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <Zap size={16} />
            <span>{totalQueries} queries executed</span>
          </div>
          <div className="stat-item">
            <Clock size={16} />
            <span>{averageExecutionTime.toFixed(2)}ms avg</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
