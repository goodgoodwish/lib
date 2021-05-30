/**
Goal: tables for LocalLibrary website.

Express web framework (Node.js/JavaScript)
Express Tutorial Part 3: Using a Database

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

**/

drop table if exists author cascade;
create table author (
    author_id serial,
    first_name text,
    family_name text,
    date_of_birth date,
    date_of_death date,
    name text GENERATED ALWAYS AS (first_name||' '||family_name) stored,
    lifespan text,
    url text GENERATED ALWAYS AS ('/catalog/author/'||author_id::text) stored
);

insert into author(author_id, first_name , family_name , date_of_birth , date_of_death , lifespan)
select 1, 'San 3', 'Zhang', '2002-10-18', '2202-10-18', 200;

drop table if exists genre cascade;
create table genre (
    id serial,
    name text,
    url text GENERATED ALWAYS AS ('/catalog/genre/'||id::text) stored
);

drop table if exists book cascade;
create table book (
    book_id serial,
    title text,
    author_id int,
    summary text,
    isbn text,
    genre text,
    url text GENERATED ALWAYS AS ('/catalog/book/'||book_id::text) stored
);

insert into book(book_id, title, author_id, summary, isbn, genre)
select 1, 'Red rose', 1, 'About flower', '7788ABC', 'color';
insert into book(book_id, title, author_id, summary, isbn, genre)
select 2, 'Yellow rose', 1, 'About flower', '5288DEF', 'color';

drop table if exists book_instance cascade;
create table book_instance (
    book_inst_id serial,
    book_id int,
    imprint text,
    status text,
    due_back date,
    url text GENERATED ALWAYS AS ('/catalog/book/'||book_inst_id::text) stored
);

insert into book_instance(book_inst_id, book_id, imprint, status, due_back)
select 1, 1, 'Hard cover', 'A', Now() + interval '1 year';

