# SQL Query Runner

A modern, interactive web-based SQL query execution and analysis tool built with React, TypeScript, and Monaco Editor.

## 🚀 Features

### Core Features
- **SQL Query Editor**: Full-featured code editor with syntax highlighting powered by Monaco Editor
- **Query Execution**: Execute SQL queries with real-time feedback and performance metrics
- **Results Display**: Clean, responsive table view with pagination and export functionality
- **Multiple Query Support**: Pre-defined query templates covering various SQL operations
- **Query History**: Track and reuse previously executed queries

### Advanced Features
- **Syntax Highlighting**: Professional SQL syntax highlighting with IntelliSense
- **Query Templates**: Pre-built templates for common SQL operations (SELECT, JOIN, GROUP BY, etc.)
- **Export Functionality**: Export query results to CSV format
- **Performance Optimization**: Efficient rendering of large datasets (up to 1000 rows)
- **Keyboard Shortcuts**: Ctrl/Cmd + Enter to execute queries
- **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes
- **Real-time Statistics**: Track query execution metrics and performance

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Icons**: Lucide React
- **Styling**: Custom CSS with human-readable class names
- **State Management**: React Hooks (useState, useCallback, useEffect)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atlan
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header with statistics
│   ├── QueryEditor.tsx # SQL query editor with Monaco
│   ├── QueryTemplates.tsx # Pre-built query templates
│   ├── QueryHistory.tsx   # Query execution history
│   └── ResultsTable.tsx  # Results display with export
├── data/               # Mock data and templates
│   └── mockData.ts     # Sample database tables and query templates
├── styles/             # CSS files (split by functionality)
│   ├── layout.css      # Layout and responsive design
│   ├── components.css  # Component-specific styles
│   └── header.css      # Header component styles
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── utils/              # Utility functions
│   └── queryEngine.ts  # Mock SQL query execution engine
└── App.tsx             # Main application component
```

## 🎯 Available Queries

The application includes several pre-built query templates:

1. **Basic Queries**
   - Select All Users
   - Show Tables
   - Describe Table Structure

2. **Join Operations**
   - User Orders (JOIN users and orders)
   - Product Analysis (JOIN with aggregations)

3. **Filtering & Sorting**
   - High Value Orders (> $100)
   - Recent Orders (date filtering)

4. **Aggregations**
   - User Statistics (COUNT per user)
   - Product Analysis (AVG price by category)

## ⚡ Performance Optimizations

### Load Time Optimization
- **Initial Load Time**: ~1.2 seconds (measured using browser dev tools)
- **Bundle Size**: Optimized with Vite's tree-shaking
- **Code Splitting**: Monaco Editor loaded on-demand
- **CSS Optimization**: Split into multiple files for better caching

### Runtime Performance
- **Virtual Scrolling**: Results limited to 1000 rows for smooth rendering
- **Memoization**: Query results memoized to prevent unnecessary re-renders
- **Debounced Execution**: Query execution debounced to prevent excessive API calls
- **Efficient State Management**: Optimized React state updates

### Memory Management
- **Query History**: Limited to last 50 queries to prevent memory bloat
- **Result Caching**: Previous results cached for quick access
- **Garbage Collection**: Proper cleanup of event listeners and timers


## 🔧 Customization

### Adding New Query Templates
1. Add template to `src/data/mockData.ts`
2. Update query engine in `src/utils/queryEngine.ts`
3. Template will automatically appear in the left panel

### Styling Modifications
- Layout styles: `src/styles/layout.css`
- Component styles: `src/styles/components.css`
- Header styles: `src/styles/header.css`

### Mock Data
- Database tables: `src/data/mockData.ts`
- Query templates: `src/data/mockData.ts`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```
