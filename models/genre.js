// import Postgres from "../libs/Postgres";
// import { Project } from "../types/Project.type";
var Postgres = require('../libs/Postgres');

async function add(name, url) {
  const statement = `INSERT INTO genre (name)
   VALUES ($1)
   RETURNING *
   `;
  const res = await Postgres.query(statement, [name]);
  return res.rows[0];
}

async function delAll() {
  const statement = `delete from genre`;
  const res = await Postgres.query(statement, []);
  return res;
}

async function update(name) {
  const statement = `
    UPDATE
      genre 
    SET
      name = $1
    WHERE
      name = $1
  `;

  await Postgres.query(statement, [name,]);
}

async function remove(id) {
  await Postgres.query("DELETE FROM genre WHERE name = $1", [id]);
}

async function getAll() {
  const statement = "SELECT name, url FROM genre";
  const result = await Postgres.query(statement, []);
  return result.rows;
}

async function getById(id) {
  const statement = "SELECT name, url FROM genre WHERE name = $1";
  const result = await Postgres.query(statement, [id]);
  return result.rows[0];
}

async function genreCount() {
  const sql = "select count(*) cnt from genre";
  const ans = await Postgres.query(sql)
  return ans.rows[0].cnt
}

module.exports = {
  add,
  update,
  remove,
  delAll,
  getAll,
  getById,
  genreCount,
};
