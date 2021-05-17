// import { Pool } from "pg";
var Pool  = require('pg').Pool;

// const pool = new Pool({ max: 10, connectionString: process.env.DATABASE_URL });
const pool = new Pool({ max: 10, connectionString: "postgresql://dev:password@localhost:5432/dev" });
// pool.options.log = console.log;

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err)
  process.exit(-1)
})

async function query(statement, values) {
  const client = await pool.connect();
  const result = await client.query(statement, values);
  client.release();
  return result;
}

function getClient() {
  return pool.connect();
}

// export default {
module.exports = {
  query,
  getClient,
  close: pool.end
};
