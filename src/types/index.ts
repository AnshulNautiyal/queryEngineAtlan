export interface QueryResult {
  columns: string[];
  data: any[][];
  rowCount: number;
  executionTime: number;
}

export interface QueryHistory {
  id: string;
  query: string;
  timestamp: Date;
  executionTime: number;
  rowCount: number;
}

export interface QueryTemplate {
  id: string;
  name: string;
  description: string;
  query: string;
  category: string;
}

export interface DatabaseTable {
  name: string;
  columns: string[];
  data: any[][];
}
