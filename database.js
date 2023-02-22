// This is a library database to keep track of the books they offer
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('book-log.db', (err) => {
    if(err) {
        console.err(err.message);
        throw err;
    }
    else {
        console.log('CONNECTING TO book-log DATABASE ...');
        // use db.run to make schema for our database (still working on design)
        /*
        CREATE TABLE books (
            id INT PRIMARY KEY,
            title TEXT,
            author_id INT FOREIGN KEY REFERENCES authors(id),
            qty INT)
        */
    }
});