import type { DatabaseTable, QueryTemplate } from '../types';

// Mock database tables
export const mockTables: DatabaseTable[] = [
  {
    name: 'users',
    columns: ['id', 'name', 'email', 'age', 'city', 'join_date'],
    data: [
      [1, 'Alex Chen', 'alex.chen@techcorp.com', 28, 'San Francisco', '2023-01-15'],
      [2, 'Sarah Kim', 'sarah.kim@startup.io', 32, 'Seattle', '2023-02-20'],
      [3, 'Marcus Rodriguez', 'marcus@devstudio.com', 25, 'Austin', '2023-03-10'],
      [4, 'Priya Patel', 'priya@datacorp.com', 29, 'Boston', '2023-04-05'],
      [5, 'David Thompson', 'david@fintech.com', 35, 'Denver', '2023-05-12'],
      [6, 'Lisa Wang', 'lisa@cloudtech.com', 27, 'Portland', '2023-06-18'],
      [7, 'James Wilson', 'james@ai-startup.com', 31, 'Miami', '2023-07-22'],
      [8, 'Maria Garcia', 'maria@blockchain.io', 33, 'Phoenix', '2023-08-30'],
      [9, 'Kevin Lee', 'kevin@mobileapp.com', 26, 'Nashville', '2023-09-14'],
      [10, 'Rachel Brown', 'rachel@cybersec.com', 34, 'Salt Lake City', '2023-10-08'],
    ]
  },
  {
    name: 'orders',
    columns: ['order_id', 'user_id', 'product_name', 'quantity', 'price', 'order_date'],
    data: [
      [1001, 1, 'Laptop', 1, 1200.00, '2023-11-01'],
      [1002, 2, 'Mouse', 2, 25.50, '2023-11-02'],
      [1003, 3, 'Keyboard', 1, 89.99, '2023-11-03'],
      [1004, 1, 'Monitor', 1, 299.99, '2023-11-04'],
      [1005, 4, 'Headphones', 1, 149.99, '2023-11-05'],
      [1006, 5, 'Tablet', 1, 499.99, '2023-11-06'],
      [1007, 2, 'Speaker', 2, 79.99, '2023-11-07'],
      [1008, 6, 'Camera', 1, 399.99, '2023-11-08'],
      [1009, 7, 'Printer', 1, 199.99, '2023-11-09'],
      [1010, 8, 'Scanner', 1, 129.99, '2023-11-10'],
    ]
  },
  {
    name: 'products',
    columns: ['product_id', 'name', 'category', 'price', 'stock', 'supplier'],
    data: [
      [1, 'MacBook Pro', 'Laptop', 1999.99, 50, 'Apple'],
      [2, 'Dell XPS', 'Laptop', 1499.99, 30, 'Dell'],
      [3, 'Logitech Mouse', 'Accessory', 25.50, 200, 'Logitech'],
      [4, 'Mechanical Keyboard', 'Accessory', 89.99, 100, 'Corsair'],
      [5, '4K Monitor', 'Display', 299.99, 75, 'Samsung'],
      [6, 'Wireless Headphones', 'Audio', 149.99, 120, 'Sony'],
      [7, 'iPad Pro', 'Tablet', 499.99, 80, 'Apple'],
      [8, 'Bluetooth Speaker', 'Audio', 79.99, 150, 'JBL'],
      [9, 'DSLR Camera', 'Camera', 399.99, 25, 'Canon'],
      [10, 'Laser Printer', 'Printer', 199.99, 40, 'HP'],
    ]
  }
];

// Query templates
export const queryTemplates: QueryTemplate[] = [
  {
    id: '1',
    name: 'Select All Users',
    description: 'Retrieve all users from the database',
    query: 'SELECT * FROM users;',
    category: 'Basic'
  },
  {
    id: '2',
    name: 'User Orders',
    description: 'Get all orders with user information',
    query: 'SELECT u.name, o.product_name, o.quantity, o.price FROM users u JOIN orders o ON u.id = o.user_id;',
    category: 'Joins'
  },
  {
    id: '3',
    name: 'High Value Orders',
    description: 'Find orders with price greater than $100',
    query: 'SELECT * FROM orders WHERE price > 100 ORDER BY price DESC;',
    category: 'Filtering'
  },
  {
    id: '4',
    name: 'User Statistics',
    description: 'Count orders per user',
    query: 'SELECT u.name, COUNT(o.order_id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name;',
    category: 'Aggregation'
  },
  {
    id: '5',
    name: 'Product Analysis',
    description: 'Average price by category',
    query: 'SELECT category, AVG(price) as avg_price, COUNT(*) as product_count FROM products GROUP BY category;',
    category: 'Analysis'
  },
  {
    id: '6',
    name: 'Recent Orders',
    description: 'Orders from the last 7 days',
    query: 'SELECT * FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);',
    category: 'Date Filtering'
  }
];
