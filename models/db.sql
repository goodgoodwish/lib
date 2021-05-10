/**
Goal: tables for LocalLibrary website.

Express web framework (Node.js/JavaScript)
Express Tutorial Part 3: Using a Database

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

**/

drop table if exists author cascade;
create table author (
    author_id int,
    first_name text,
    family_name text,
    date_of_birth date,
    date_of_death date,
    name text,
    lifespan text,
    url text
);

create table genre (
    name text primary key,
    url text
);

create table book (
    book_id int,
    title text,
    author_id int,
    summary text,
    isbn text,
    genre text,
    url text
);

create table book_instance (
    book_inst_id int,
    book_id int,
    imprint text,
    status text,
    due_back date,
    url text
);


