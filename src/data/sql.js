// MySQL / SQL — concepts + query programs. Sample tables neeche diye hain.
const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, lang: "sql", norun: true, ...x });

const TABLES = `-- Sample tables used in these queries
-- employees(id, name, email, dept_id, manager_id, salary, joined_on)
-- departments(id, name)
-- customers(id, name, city)
-- orders(id, customer_id, amount, status, created_at)`;

export default [
  // ---------- Concepts ----------
  E("What is MySQL?", ["mysql", "what is mysql", "rdbms"],
    "MySQL is an open-source relational database. It stores data in tables with rows and columns, uses SQL for queries, and supports keys, joins, indexes and ACID transactions with the InnoDB engine.",
    "Table wala database, SQL se baat karte hain."),

  E("What are DDL, DML, DCL and TCL?", ["ddl dml", "ddl", "dml", "dcl", "tcl", "sql command types"],
    "DDL defines structure: CREATE, ALTER, DROP, TRUNCATE. DML changes data: INSERT, UPDATE, DELETE, and SELECT for reading. DCL is for permissions: GRANT, REVOKE. TCL controls transactions: COMMIT, ROLLBACK, SAVEPOINT.",
    "DDL = structure. DML = data. DCL = permission. TCL = transaction."),

  E("What are primary key, foreign key and unique key?", ["primary key", "foreign key", "unique key", "keys in sql"],
    "A primary key uniquely identifies each row and can't be NULL. A unique key also prevents duplicates but allows one NULL in MySQL. A foreign key links to a primary key in another table and keeps data consistent.",
    "Primary = unique + not null. Unique = duplicate nahi. Foreign = doosri table se link.",
    { code: `CREATE TABLE merchants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pan VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  city_id INT,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL
);` }),

  E("What are constraints in SQL?", ["constraints", "not null", "check constraint", "default"],
    "Constraints are rules on columns: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK and DEFAULT. They stop bad data from entering the table.",
    "Galat data rokne ke rules."),

  E("What are the types of joins?", ["types of joins", "joins in sql", "right join", "self join", "cross join"],
    "INNER JOIN returns matching rows from both tables. LEFT JOIN returns all left rows plus matches. RIGHT JOIN returns all right rows plus matches. A self join joins a table to itself, like employee and manager. CROSS JOIN returns every combination. MySQL doesn't have FULL OUTER JOIN, so we use LEFT JOIN UNION RIGHT JOIN.",
    "Inner = match. Left = left ke sab. Right = right ke sab. Self = khud se. Cross = har combination."),

  E("What is the difference between WHERE and HAVING?", ["where vs having", "having"],
    "WHERE filters rows before grouping and can't use aggregates. HAVING filters groups after GROUP BY and can use aggregates like COUNT or SUM.",
    "WHERE = rows pe. HAVING = groups pe.",
    { type: "diff", pair: ["where", "having"],
      code: `SELECT dept_id, COUNT(*) AS total
FROM employees
WHERE salary > 30000          -- rows filter
GROUP BY dept_id
HAVING COUNT(*) > 5;          -- groups filter` }),

  E("What is the difference between DELETE, TRUNCATE and DROP?", ["delete vs truncate", "truncate", "drop", "delete truncate drop"],
    "DELETE removes selected rows with a WHERE clause, can be rolled back and fires triggers. TRUNCATE removes all rows quickly and resets auto increment, but keeps the table. DROP removes the whole table including structure.",
    "DELETE = kuch rows. TRUNCATE = sab rows, table rahega. DROP = table hi gayab.",
    { type: "diff", pair: ["delete", "truncate", "drop"], table: [["", "DELETE", "TRUNCATE", "DROP"], ["Removes", "Selected rows", "All rows", "Table + data"], ["WHERE", "Yes", "No", "No"], ["Rollback", "Yes (in transaction)", "No (DDL)", "No"], ["Auto increment", "Not reset", "Reset", "Gone"]] }),

  E("What is the difference between CHAR and VARCHAR?", ["char vs varchar", "varchar", "char"],
    "CHAR is fixed length and pads with spaces, good for fixed codes like PAN or state code. VARCHAR is variable length and stores only what's needed, good for names and emails.",
    "CHAR = fixed size. VARCHAR = jitna data utni jagah.", { type: "diff", pair: ["char", "varchar"] }),

  E("What is the difference between UNION and UNION ALL?", ["union vs union all", "union"],
    "UNION combines results and removes duplicates, which is slower. UNION ALL keeps duplicates and is faster.",
    "UNION = duplicate hatao. UNION ALL = sab rakho.", { type: "diff", pair: ["union", "union all"] }),

  E("What is the difference between IN and EXISTS?", ["in vs exists", "exists"],
    "IN checks a value against a list or subquery result. EXISTS checks if a subquery returns any row and stops at the first match, so it's often faster for large correlated subqueries.",
    "IN = list mein hai? EXISTS = koi row hai?", { type: "diff", pair: ["in", "exists"] }),

  E("What is a subquery and a correlated subquery?", ["subquery", "correlated subquery", "nested query"],
    "A subquery is a query inside another query. A correlated subquery uses a value from the outer query, so it runs once per outer row, like finding employees who earn more than their department's average.",
    "Query ke andar query. Correlated = bahar ki row pe depend.",
    { code: `SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);` }),

  E("What is an index? Clustered vs non-clustered?", ["index", "indexes", "clustered index", "non clustered index", "indexing mysql"],
    "An index is a sorted structure, a B-tree in InnoDB, that finds rows quickly without scanning the whole table. In InnoDB, the primary key is the clustered index, meaning rows are stored in that order. Other indexes are secondary, non-clustered, and point to the primary key. Too many indexes slow down inserts and updates.",
    "Kitaab ka index. Primary key = clustered.",
    { code: `CREATE INDEX idx_orders_customer_status ON orders (customer_id, status);
EXPLAIN SELECT * FROM orders WHERE customer_id = 10 AND status = 'PAID';` }),

  E("What is a composite index and the leftmost prefix rule?", ["composite index", "leftmost prefix", "multi column index"],
    "A composite index is on more than one column, like (customer_id, status). MySQL can use it for queries that filter by customer_id, or customer_id and status, but not by status alone. That's the leftmost prefix rule.",
    "(a, b) index: a ya a+b pe kaam karega, sirf b pe nahi."),

  E("How do you optimize a slow MySQL query?", ["optimize query", "slow query mysql", "explain", "query optimization mysql"],
    "First I run EXPLAIN to see if it does a full table scan. Then I add the right index, select only needed columns instead of SELECT *, avoid functions on indexed columns in WHERE, paginate with LIMIT, avoid N+1 queries, and check the slow query log.",
    "EXPLAIN → index → SELECT kam columns → LIMIT."),

  E("What is normalization? 1NF, 2NF, 3NF?", ["normalization", "1nf", "2nf", "3nf", "normal forms"],
    "Normalization organizes tables to reduce duplicate data. 1NF: each column has atomic values, no repeating groups. 2NF: 1NF plus every non-key column depends on the whole primary key. 3NF: 2NF plus no non-key column depends on another non-key column.",
    "Ek fact ek hi jagah store karo."),

  E("What is denormalization?", ["denormalization"],
    "Denormalization intentionally adds some duplicate data, like storing a total or customer name in orders, to make reads faster and avoid heavy joins. It's a trade-off with update complexity.",
    "Speed ke liye thoda duplicate data."),

  E("What are ACID properties?", ["acid", "acid properties"],
    "Atomicity: all steps succeed or none. Consistency: data follows all rules. Isolation: transactions running together don't affect each other. Durability: committed data survives a crash.",
    "A = sab ya kuch nahi. C = rules follow. I = alag-alag. D = permanent."),

  E("What is a transaction in MySQL? Example?", ["transaction", "transactions mysql", "commit rollback", "start transaction"],
    "A transaction groups queries into one unit. We start it, run the queries, and COMMIT if all succeed or ROLLBACK if any fails. Example: when a user buys gold, we deduct the wallet and add gold grams in one transaction.",
    "Sab saath mein pass ya sab wapas.",
    { code: `START TRANSACTION;
UPDATE wallets SET balance = balance - 5000 WHERE user_id = 7 AND balance >= 5000;
INSERT INTO gold_holdings (user_id, grams, rate_per_gram) VALUES (7, 0.7123, 7019.50);
COMMIT;   -- if any step fails: ROLLBACK;` }),

  E("What are transaction isolation levels?", ["isolation levels", "dirty read", "repeatable read", "read committed", "phantom read"],
    "READ UNCOMMITTED allows dirty reads. READ COMMITTED reads only committed data. REPEATABLE READ, MySQL's default, gives the same result if we read the same row again. SERIALIZABLE is the strictest and runs transactions as if one by one. Higher isolation is safer but slower.",
    "Kitna ek transaction doosre ka adhoora data dekh sakta hai."),

  E("What is a deadlock and how do you avoid it?", ["deadlock", "locking", "row lock", "select for update"],
    "A deadlock happens when two transactions each hold a lock the other needs. InnoDB detects it and rolls one back. We avoid it by keeping transactions short, locking rows in the same order, using proper indexes, and retrying on deadlock errors. SELECT ... FOR UPDATE locks rows we're about to change.",
    "Dono ek doosre ka wait kar rahe. Short transaction + same order."),

  E("What is the difference between a stored procedure and a function?", ["stored procedure", "function vs procedure", "stored procedure vs function"],
    "A stored procedure is called with CALL, can return multiple result sets and modify data, and can have IN and OUT parameters. A function returns a single value and can be used inside a SELECT.",
    "Procedure = CALL, bada kaam. Function = ek value, SELECT mein use.",
    { type: "diff", pair: ["stored procedure", "function"] }),

  E("What is a trigger?", ["trigger", "triggers"],
    "A trigger is SQL that runs automatically before or after INSERT, UPDATE or DELETE on a table. Example: writing an audit log row whenever a merchant's KYC status changes.",
    "Table pe kuch hua toh apne aap chalne wala code."),

  E("What is a view?", ["view", "views", "create view"],
    "A view is a saved SELECT query that behaves like a virtual table. It simplifies complex joins and can hide sensitive columns.",
    "Saved query jo table jaisi dikhe.",
    { code: `CREATE VIEW merchant_summary AS
SELECT m.id, m.name, c.name AS city, m.kyc_status
FROM merchants m LEFT JOIN cities c ON c.id = m.city_id;` }),

  E("What are window functions (ROW_NUMBER, RANK, DENSE_RANK)?", ["window functions", "row_number", "rank", "dense_rank", "over partition by"],
    "Window functions calculate over a set of rows without collapsing them like GROUP BY does. ROW_NUMBER gives a unique number, RANK leaves gaps after ties, and DENSE_RANK doesn't leave gaps. PARTITION BY restarts the numbering per group. They're available from MySQL 8.",
    "Group kiye bina ranking. RANK gap deta hai, DENSE_RANK nahi.",
    { code: `SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn,
  RANK()       OVER (ORDER BY salary DESC) AS rnk,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS drnk
FROM employees;
-- salaries 90, 80, 80, 70 → rn 1,2,3,4 | rank 1,2,2,4 | dense 1,2,2,3` }),

  E("What is a CTE (WITH clause)?", ["cte", "with clause", "common table expression"],
    "A CTE is a named temporary result defined with WITH, used to make complex queries readable. Recursive CTEs can walk hierarchies like an employee-manager tree.",
    "Query ke andar naam wala temporary table.",
    { code: `WITH dept_avg AS (
  SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e JOIN dept_avg d ON d.dept_id = e.dept_id
WHERE e.salary > d.avg_sal;` }),

  E("How do you do pagination in MySQL?", ["pagination mysql", "limit offset", "keyset pagination"],
    "LIMIT with OFFSET: page 3 with 10 per page is LIMIT 10 OFFSET 20. For very large tables, keyset pagination is faster: WHERE id > last_seen_id ORDER BY id LIMIT 10.",
    "LIMIT + OFFSET. Bade table pe id > last_id.",
    { code: `SELECT * FROM orders ORDER BY id DESC LIMIT 10 OFFSET 20;
-- keyset
SELECT * FROM orders WHERE id < 1050 ORDER BY id DESC LIMIT 10;` }),

  E("How do you handle NULL values? COALESCE / IFNULL?", ["null handling", "coalesce", "ifnull", "is null"],
    "We check NULL with IS NULL or IS NOT NULL, never = NULL. COALESCE returns the first non-null value, and IFNULL replaces a NULL with a default.",
    "= NULL kaam nahi karta, IS NULL use karo.",
    { code: `SELECT name, COALESCE(mobile, alt_mobile, 'N/A') AS contact FROM customers;` }),

  E("What are LIKE wildcards?", ["like", "wildcard", "like operator"],
    "% matches any number of characters and _ matches exactly one. LIKE 'vi%' finds names starting with vi. A leading % can't use a normal index, so it's slow on big tables.",
    "% = kuch bhi. _ = ek character."),

  E("What is ON DELETE CASCADE?", ["on delete cascade", "cascade", "referential actions"],
    "With ON DELETE CASCADE, deleting a parent row automatically deletes its child rows. Other options are SET NULL and RESTRICT. For financial data I prefer RESTRICT or soft delete, so nothing important is lost by mistake.",
    "Parent delete → child bhi delete."),

  E("What is soft delete?", ["soft delete", "deleted_at", "paranoid"],
    "Soft delete marks a row as deleted with a deleted_at timestamp instead of removing it, so data can be restored and audited. Queries must filter out deleted rows. Sequelize supports it with paranoid: true.",
    "Row hatao mat, deleted_at bhar do."),

  E("What is the difference between InnoDB and MyISAM?", ["innodb vs myisam", "innodb", "myisam", "storage engine"],
    "InnoDB is the default engine. It supports transactions, foreign keys, row-level locking and crash recovery. MyISAM has no transactions or foreign keys and uses table-level locking. For payments and orders, InnoDB is the right choice.",
    "InnoDB = transactions + FK + row lock.", { type: "diff", pair: ["innodb", "myisam"] }),

  E("What is the difference between MySQL and MongoDB?", ["mysql vs mongodb", "relational vs document"],
    "MySQL stores data in tables with a fixed schema and is great for relations and strong transactions, like payments and orders. MongoDB stores flexible JSON-like documents and scales out easily, good for changing data like logs or catalogs. I've used both: MySQL with Sequelize and MongoDB with Mongoose.",
    "MySQL = table + strict. MongoDB = document + flexible.", { type: "diff", pair: ["mysql", "mongodb"] }),

  E("Which data type do you use to store money?", ["money data type", "decimal", "store amount", "float for money"],
    "DECIMAL, like DECIMAL(12,2) for rupees or DECIMAL(12,4) for gold grams, because FLOAT and DOUBLE have rounding errors. Another option is to store amounts as integers in paise.",
    "Paisa kabhi FLOAT mein nahi. DECIMAL ya paise mein integer."),

  E("How do you prevent SQL injection in Node.js with MySQL?", ["sql injection mysql", "parameterized query", "prepared statement mysql2"],
    "Never build SQL with string concatenation. Use parameterized queries with placeholders in mysql2, or ORM methods in Sequelize. Also validate input and use a database user with minimum permissions.",
    "? placeholder use karo, string jodo mat.",
    { lang: "ts", code: `// ❌ "SELECT * FROM users WHERE email = '" + email + "'"
const [rows] = await pool.execute("SELECT id, name FROM users WHERE email = ?", [email]);` }),

  E("What is connection pooling in MySQL with Node.js?", ["connection pool mysql", "mysql2 pool", "createpool"],
    "A pool keeps a few open connections and reuses them, instead of opening a new connection for every request. In mysql2 we use createPool with a connectionLimit. Sequelize has its own pool settings.",
    "Connections reuse karo.",
    { lang: "ts", code: `const pool = mysql.createPool({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS,
  database: "augmont", waitForConnections: true, connectionLimit: 10,
});` }),

  E("What is AUTO_INCREMENT?", ["auto increment", "auto_increment"],
    "AUTO_INCREMENT generates the next number automatically for a column, usually the primary key. TRUNCATE resets it, DELETE doesn't.",
    "Id apne aap badhti hai."),

  E("What is GROUP BY? Example with COUNT and SUM.", ["group by", "aggregate functions", "count sum avg"],
    "GROUP BY groups rows that have the same value so we can use aggregates like COUNT, SUM, AVG, MIN and MAX on each group.",
    "Same value wali rows ka group + count/sum.",
    { code: `SELECT status, COUNT(*) AS orders, SUM(amount) AS total
FROM orders
GROUP BY status;` }),

  // ---------- Query programs ----------
  ...[
    ["Query: Nth highest salary (e.g. 3rd)", ["nth highest salary", "3rd highest salary", "third highest salary"],
      "I use DENSE_RANK so ties are handled, then pick rank N. Without window functions, DISTINCT with ORDER BY and LIMIT 1 OFFSET N-1.",
      `${TABLES}

-- MySQL 8 (handles ties)
SELECT name, salary FROM (
  SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) t
WHERE rnk = 3;

-- Without window functions
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;`,
      [["Why DENSE_RANK and not ROW_NUMBER?", "If two people have the same salary, ROW_NUMBER gives them different numbers. DENSE_RANK keeps ties together."], ["Why DISTINCT in the LIMIT version?", "Without it, duplicate salaries would shift the result."]]],
    ["Query: Highest salary in each department", ["highest salary per department", "department wise max salary", "max salary each department"],
      "GROUP BY department with MAX, or a window function to also get the employee name.",
      `SELECT d.name AS department, MAX(e.salary) AS max_salary
FROM employees e
JOIN departments d ON d.id = e.dept_id
GROUP BY d.name;

-- with employee name
SELECT dept_id, name, salary FROM (
  SELECT dept_id, name, salary,
         RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
  FROM employees
) t
WHERE rnk = 1;`,
      [["Why PARTITION BY?", "It restarts the ranking for each department."]]],
    ["Query: Top 3 salaries in each department", ["top 3 per department", "top n per group"],
      "DENSE_RANK partitioned by department, then keep rank 3 or less.",
      `SELECT dept_id, name, salary FROM (
  SELECT dept_id, name, salary,
         DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
  FROM employees
) t
WHERE rnk <= 3
ORDER BY dept_id, salary DESC;`, []],
    ["Query: Employees who earn more than their manager", ["earn more than manager", "self join example", "employee manager query"],
      "A self join: join employees to employees on manager_id = id, then compare salaries.",
      `SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON m.id = e.manager_id
WHERE e.salary > m.salary;`,
      [["What is a self join?", "Joining a table with itself using aliases, here employee and manager rows from the same table."]]],
    ["Query: Find duplicate emails", ["find duplicate emails", "duplicate records sql", "duplicates query"],
      "GROUP BY email and keep groups with COUNT more than 1.",
      `SELECT email, COUNT(*) AS cnt
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;`, []],
    ["Query: Delete duplicate rows but keep one", ["delete duplicates", "remove duplicate rows sql"],
      "Self join on the same email and delete the row with the higher id, keeping the smallest id.",
      `DELETE e1 FROM employees e1
JOIN employees e2
  ON e1.email = e2.email AND e1.id > e2.id;`,
      [["How do you stop duplicates in future?", "Add a UNIQUE index on email."]]],
    ["Query: Count employees in each department (including empty ones)", ["count per department", "employees per department", "department count"],
      "LEFT JOIN from departments so departments with zero employees also appear, and COUNT the employee id.",
      `SELECT d.name, COUNT(e.id) AS total
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.id
GROUP BY d.id, d.name;`,
      [["Why COUNT(e.id) and not COUNT(*)?", "COUNT(*) would count 1 for empty departments because of the NULL row. COUNT(e.id) skips NULLs."]]],
    ["Query: Departments with no employees", ["departments without employees", "no employees", "left join is null"],
      "LEFT JOIN and keep rows where the employee side is NULL, or use NOT EXISTS.",
      `SELECT d.name
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.id
WHERE e.id IS NULL;

-- or
SELECT name FROM departments d
WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.id);`, []],
    ["Query: Customers who never placed an order", ["customers without orders", "never ordered"],
      "LEFT JOIN orders and keep customers where the order is NULL.",
      `SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;`, []],
    ["Query: Total order amount per customer, highest first", ["total per customer", "sum per customer", "top customers"],
      "Join, GROUP BY customer, SUM the amount, and ORDER BY descending.",
      `SELECT c.name, SUM(o.amount) AS total_spent, COUNT(o.id) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.status = 'PAID'
GROUP BY c.id, c.name
ORDER BY total_spent DESC
LIMIT 10;`, []],
    ["Query: Monthly sales total", ["monthly sales", "group by month", "month wise total"],
      "Group by year and month using DATE_FORMAT.",
      `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(amount) AS total
FROM orders
WHERE status = 'PAID'
GROUP BY month
ORDER BY month;`, []],
    ["Query: Running total of daily sales", ["running total sql", "cumulative sum sql"],
      "SUM as a window function ordered by date.",
      `SELECT DATE(created_at) AS day,
       SUM(amount) AS day_total,
       SUM(SUM(amount)) OVER (ORDER BY DATE(created_at)) AS running_total
FROM orders
GROUP BY DATE(created_at);`, []],
    ["Query: Employees who joined in the last 30 days", ["last 30 days", "date filter sql", "recent records"],
      "Compare the date with CURDATE() minus an interval.",
      `SELECT name, joined_on
FROM employees
WHERE joined_on >= CURDATE() - INTERVAL 30 DAY;`, []],
    ["Query: Employees earning more than their department average", ["above department average", "salary above average"],
      "Correlated subquery, or a join with a grouped average.",
      `SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);`, []],
    ["Query: Update with JOIN (increase salary for one department)", ["update with join", "update join mysql"],
      "MySQL allows UPDATE with a JOIN.",
      `UPDATE employees e
JOIN departments d ON d.id = e.dept_id
SET e.salary = e.salary * 1.10
WHERE d.name = 'IT';`, []],
    ["Query: Second highest order amount for each customer", ["second highest per group", "second highest each customer"],
      "DENSE_RANK partitioned by customer, then rank 2.",
      `SELECT customer_id, amount FROM (
  SELECT customer_id, amount,
         DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS rnk
  FROM orders
) t
WHERE rnk = 2;`, []],
    ["Query: Pivot — count orders by status in columns", ["pivot sql", "conditional aggregation", "case when sum"],
      "Use SUM with CASE WHEN for each status.",
      `SELECT customer_id,
  SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END)    AS paid,
  SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending,
  SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END)  AS failed
FROM orders
GROUP BY customer_id;`, []],
    ["Query: Create tables for a digital gold app", ["gold app schema", "design tables gold", "digital gold database design"],
      "Users, wallets, gold rates, transactions and holdings, with DECIMAL for money and grams, foreign keys and indexes.",
      `CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL UNIQUE,
  pan CHAR(10) UNIQUE,
  kyc_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gold_rates (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  metal ENUM('GOLD','SILVER') NOT NULL,
  buy_rate DECIMAL(12,2) NOT NULL,
  sell_rate DECIMAL(12,2) NOT NULL,
  valid_till DATETIME NOT NULL
);

CREATE TABLE transactions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  type ENUM('BUY','SELL') NOT NULL,
  grams DECIMAL(12,4) NOT NULL,
  rate DECIMAL(12,2) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  gst DECIMAL(12,2) NOT NULL DEFAULT 0,
  status ENUM('PENDING','SUCCESS','FAILED') NOT NULL DEFAULT 'PENDING',
  idempotency_key VARCHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_tx_user_created (user_id, created_at)
);`,
      [["Why DECIMAL(12,4) for grams?", "Gold is bought in small fractions like 0.0125 grams, so we need 4 decimal places without rounding errors."], ["Why idempotency_key UNIQUE?", "So the same buy request can't be saved twice if the user double-clicks or the network retries."]]],
  ].map(([q, tags, a, code, cross]) => ({ q, tags, a, hi: "Query likhte waqt pehle tables aur output bolo, phir likho.", code, cross, lang: "sql", norun: true, type: "program", ex: "Explain each clause in order: FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT." })),
];
