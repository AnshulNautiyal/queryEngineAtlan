import React from 'react';
import { FileText } from 'lucide-react';
import type { QueryTemplate } from '../types';
import '../styles/components.css';

interface QueryTemplatesProps {
  templates: QueryTemplate[];
  onTemplateSelect: (template: QueryTemplate) => void;
  selectedTemplateId?: string;
}

const QueryTemplates: React.FC<QueryTemplatesProps> = ({
  templates,
  onTemplateSelect,
  selectedTemplateId
}) => {
  return (
    <div className="query-section">
      <div className="section-header">
        <span>Query Templates</span>
        <FileText size={16} />
      </div>
      <ul className="template-list">
        {templates.map((template) => (
          <li
            key={template.id}
            className={`template-item ${selectedTemplateId === template.id ? 'active' : ''}`}
            onClick={() => onTemplateSelect(template)}
          >
            <div className="template-name">{template.name}</div>
            <div className="template-description">{template.description}</div>
            <div className="template-category">{template.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryTemplates;
