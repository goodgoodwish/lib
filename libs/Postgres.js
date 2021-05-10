import { Pool } from "pg";

const pool = new Pool({ max: 10, connectionString: process.env.DATABASE_URL });

async function query(statement, values) {
  const client = await pool.connect();
  const result = await client.query(statement, values);
  client.release();
  return result;
}

function getClient() {
  return pool.connect();
}

export default {
  query,
  getClient,
  close: pool.end
};
