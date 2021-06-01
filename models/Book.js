// import Postgres from "../libs/Postgres";
// import { Project } from "../types/Project.type";
var Postgres = require('../libs/Postgres')

async function add(id, title, author_id, summary, isbn, genre, url) {
  const statement = `INSERT INTO projects (id, title, author_id, summary, isbn, genre, url)
   VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  await Postgres.query(statement, [id, title, author_id, summary, isbn, genre, url]);
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
  const statement = `SELECT book_id, title, b.author_id, summary, isbn, genre, b.url, a.name author_name
    FROM book b, author a
    where b.author_id = a.author_id`;
  const result = await Postgres.query(statement, []);
  return result.rows;
}

async function getById(id) {
  const statement = "SELECT id, name, timezone FROM book WHERE id = $1";
  const result = await Postgres.query(statement, [id]);
  return result.rows[0];
}

async function getByGenre(genre) {
  const statement = `SELECT book_id, title, author_id, summary, isbn, genre, url
  FROM book 
  WHERE genre in (select name from genre where id = $1)`;
  const result = await Postgres.query(statement, [genre]);
  return result.rows;
}

async function bookCount() {
  const sql = "SELECT COUNT(*) book_count FROM book";
  const result = await Postgres.query(sql);
  return result.rows[0].book_count;
}

// export default {
module.exports = {
  add,
  update,
  remove,
  getAll,
  getById,
  getByGenre,
  bookCount,
};
