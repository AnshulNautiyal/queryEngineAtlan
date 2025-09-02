import type { QueryResult } from '../types';
import { mockTables } from '../data/mockData';

// Simple mock SQL parser and executor
// TODO: implement proper SQL parsing instead of keyword matching
export class MockQueryEngine {
  private tables = mockTables;

  executeQuery(query: string): QueryResult {
    const startTime = performance.now();
    
    try {
      // trim and lowercase for matching
      const normalizedQuery = query.trim().toLowerCase();
      
      // Handle different query types
      if (normalizedQuery.startsWith('select')) {
        return this.executeSelectQuery(query);
      } else if (normalizedQuery.startsWith('show tables')) {
        return this.showTables();
      } else if (normalizedQuery.startsWith('describe') || normalizedQuery.startsWith('desc')) {
        return this.describeTable(query);
      } else {
        // Default: return a sample result
        return this.getDefaultResult();
      }
    } catch (error) {
      return {
        columns: ['Error'],
        data: [[`Query execution failed: ${error}`]],
        rowCount: 1,
        executionTime: performance.now() - startTime
      };
    }
  }

  private executeSelectQuery(query: string): QueryResult {
    // basic keyword matching for demo
    const queryLower = query.toLowerCase();
    
    // Check for specific patterns
    if (queryLower.includes('users') && queryLower.includes('orders') && queryLower.includes('join')) {
      return this.executeUserOrdersJoin();
    } else if (queryLower.includes('count') && queryLower.includes('group by')) {
      return this.executeUserStatistics();
    } else if (queryLower.includes('avg') && queryLower.includes('category')) {
      return this.executeProductAnalysis();
    } else if (queryLower.includes('price > 100')) {
      return this.executeHighValueOrders();
    } else if (queryLower.includes('users')) {
      return this.executeUsersQuery();
    } else if (queryLower.includes('orders')) {
      return this.executeOrdersQuery();
    } else if (queryLower.includes('products')) {
      return this.executeProductsQuery();
    } else {
      return this.getDefaultResult();
    }
  }

  private executeUsersQuery(): QueryResult {
    const usersTable = this.tables.find(t => t.name === 'users')!;
    return {
      columns: usersTable.columns,
      data: usersTable.data,
      rowCount: usersTable.data.length,
      executionTime: Math.random() * 50 + 10
    };
  }

  private executeOrdersQuery(): QueryResult {
    const ordersTable = this.tables.find(t => t.name === 'orders')!;
    return {
      columns: ordersTable.columns,
      data: ordersTable.data,
      rowCount: ordersTable.data.length,
      executionTime: Math.random() * 50 + 10
    };
  }

  private executeProductsQuery(): QueryResult {
    const productsTable = this.tables.find(t => t.name === 'products')!;
    return {
      columns: productsTable.columns,
      data: productsTable.data,
      rowCount: productsTable.data.length,
      executionTime: Math.random() * 50 + 10
    };
  }

  private executeUserOrdersJoin(): QueryResult {
    const usersTable = this.tables.find(t => t.name === 'users')!;
    const ordersTable = this.tables.find(t => t.name === 'orders')!;
    
    const joinedData = ordersTable.data.map(order => {
      const user = usersTable.data.find(user => user[0] === order[1]);
      return [user?.[1] || 'Unknown', order[2], order[3], order[4]];
    });

    return {
      columns: ['name', 'product_name', 'quantity', 'price'],
      data: joinedData,
      rowCount: joinedData.length,
      executionTime: Math.random() * 100 + 20
    };
  }

  private executeUserStatistics(): QueryResult {
    const usersTable = this.tables.find(t => t.name === 'users')!;
    const ordersTable = this.tables.find(t => t.name === 'orders')!;
    
    const userStats = usersTable.data.map(user => {
      const orderCount = ordersTable.data.filter(order => order[1] === user[0]).length;
      return [user[1], orderCount];
    });

    return {
      columns: ['name', 'order_count'],
      data: userStats,
      rowCount: userStats.length,
      executionTime: Math.random() * 80 + 15
    };
  }

  private executeProductAnalysis(): QueryResult {
    
    const categoryStats = [
      ['Laptop', 1749.99, 2],
      ['Accessory', 57.75, 2],
      ['Display', 299.99, 1],
      ['Audio', 114.99, 2],
      ['Tablet', 499.99, 1],
      ['Camera', 399.99, 1],
      ['Printer', 199.99, 1]
    ];

    return {
      columns: ['category', 'avg_price', 'product_count'],
      data: categoryStats,
      rowCount: categoryStats.length,
      executionTime: Math.random() * 60 + 12
    };
  }

  private executeHighValueOrders(): QueryResult {
    const ordersTable = this.tables.find(t => t.name === 'orders')!;
    const highValueOrders = ordersTable.data.filter(order => order[4] > 100);
    
    return {
      columns: ordersTable.columns,
      data: highValueOrders,
      rowCount: highValueOrders.length,
      executionTime: Math.random() * 40 + 8
    };
  }

  private showTables(): QueryResult {
    const tableNames = this.tables.map(t => [t.name]);
    
    return {
      columns: ['Tables'],
      data: tableNames,
      rowCount: tableNames.length,
      executionTime: Math.random() * 10 + 2
    };
  }

  private describeTable(query: string): QueryResult {
    const tableName = query.toLowerCase().includes('users') ? 'users' : 
                     query.toLowerCase().includes('orders') ? 'orders' : 
                     query.toLowerCase().includes('products') ? 'products' : 'users';
    
    const table = this.tables.find(t => t.name === tableName)!;
    const columnInfo = table.columns.map((col) => [col, 'varchar(255)', 'YES', '', '']);
    
    return {
      columns: ['Field', 'Type', 'Null', 'Key', 'Default'],
      data: columnInfo,
      rowCount: columnInfo.length,
      executionTime: Math.random() * 15 + 3
    };
  }

  private getDefaultResult(): QueryResult {
    return {
      columns: ['message'],
      data: [['Query executed successfully. No specific data to display.']],
      rowCount: 1,
      executionTime: Math.random() * 20 + 5
    };
  }
}
