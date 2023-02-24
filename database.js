// This is a library database to keep track of the books they offer
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('book-log.db', (err) => {
    if(err) {
        console.err(err.message);
        throw err;
    }
    else {
        // Build both tables
        console.log('CONNECTING TO book-log DATABASE ...');
        db.run(`CREATE TABLE authors (
            id INT PRIMARY KEY AUTOINCREMENT,
            name TEXT)`, (err) => {
                if(err) {
                    console.log('authors TABLE ALREADY CREATED');
                }
            });
        db.run(`CREATE TABLE books (
            ISBN INT PRIMARY KEY,
            title TEXT,
            author_id INT FOREIGN KEY REFERENCES authors(id),
            qty INT)`, (err) => {
                if(err) {
                    console.log('books TABLE ALREADY CREATED')
                }
            });
        /*
        CREATE TABLE authors (
            id INT PRIMARY KEY,
            name TEXT);
        CREATE TABLE books (
            id INT PRIMARY KEY,
            ISBN INT,
            title TEXT,
            author_id INT FOREIGN KEY REFERENCES authors(id),
            qty INT);
        */
    }
});

module.exports = db;