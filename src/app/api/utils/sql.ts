import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

const connection = DATABASE_URL
  ? postgres(DATABASE_URL, {
      ssl: { rejectUnauthorized: false },
      prepare: false
    })
  : null;

const NullishQueryFunction = () => {
  throw new Error(
    'No database connection string was provided. Perhaps process.env.DATABASE_URL has not been set'
  );
};

const sql: any = connection
  ? (() => {
      const queryFn = (first: any, ...args: any[]) => {
        if (Array.isArray(first) && 'raw' in first) {
          // Tagged template literal: sql`SELECT * FROM users WHERE id = ${id}`
          return connection(first as any, ...args);
        } else if (typeof first === 'string') {
          // Dynamic query execution: sql("SELECT * FROM users WHERE id = $1", [id])
          return connection.unsafe(first, args[0] || []);
        }
        return connection(first, ...args);
      };

      // Add a basic transaction helper to execute multiple statements sequentially
      queryFn.transaction = async (queries: any[]) => {
        return connection.begin(async (tx) => {
          const results = [];
          for (const q of queries) {
            // connection queries have .statement and .values
            if (q && typeof q.statement === 'string') {
              results.push(await tx.unsafe(q.statement, q.values || []));
            } else if (q && typeof q.then === 'function') {
              // If it is a pending query promise, it might be executed on the connection,
              // but we await it to keep transaction sequencing
              results.push(await q);
            } else {
              results.push(await (tx as any)(q));
            }
          }
          return results;
        });
      };

      return queryFn;
    })()
  : NullishQueryFunction;

export default sql;
