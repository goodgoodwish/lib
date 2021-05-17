const { Pool, Client } = require('pg')

let pool = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'dev',
  password: '',
  port: 5432,
  max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
})

pool = new Pool({ max: 10, connectionString: "postgresql://dev:password@localhost:5432/dev" });

pool.query("SELECT 'pool example' col_name", (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  user: 'dev',
  host: 'localhost',
  database: 'dev',
  password: '',
  port: 5432,
})

client.connect()

client.query("SELECT line_item_type from line_item_types", (err, res) => {
  console.log(err, res)
  client.end()
})

async function getType() {
    const pool_sess = await pool.connect()
    try {
        const res = await pool.query("SELECT line_item_type from line_item_types limit 2");
        const itemTypes = res.rows;
        for (row of itemTypes) {
            console.log(row.line_item_type)
        }
    } 
    catch (e) {
        console.error(e)
    } 
    finally {
        pool_sess.release()
    }
}

getType();

