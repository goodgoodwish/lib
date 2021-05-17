// import Postgres from "../libs/Postgres";
// import { Project } from "../types/Project.type";
var Postgres = require('../libs/Postgres');

async function add(name, url) {
  const statement = `INSERT INTO genre (name, url)
   VALUES ($1, $2)
   RETURNING *
   `;
  const res = await Postgres.query(statement, [name, url]);
  return res;
}

async function delAll() {
  const statement = `delete from genre
   `;
  const res = await Postgres.query(statement, []);
  return res;
}

async function update(id, book) {
  const statement = `
    UPDATE
      projects 
    SET
      name = $2,
      timezone = $3,
      updated_at = NOW()
    WHERE
      id = $1
  `;

  await Postgres.query(statement, [id, book.title, book.author_id]);
}

async function remove(id) {
  await Postgres.query("DELETE FROM book WHERE id = $1", [id]);
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

module.exports = {
  add,
  update,
  remove,
  delAll,
  getAll,
  getById
};
