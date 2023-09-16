"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryNoteByContent = exports.queryNoteById = exports.initDB = void 0;
const pg_1 = require("pg");
// Initialize the database connection
const db = new pg_1.Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'nodejs_db',
    password: 'mypassword',
    port: 5432,
});
const initDB = () => {
    db.connect((err) => {
        if (err) {
            console.error('Cannot connect to psql but aplication will work corroctly without db mode');
        }
        else {
            console.log('Connected to PostgreSQL database.');
        }
    });
};
exports.initDB = initDB;
const queryNoteById = (id) => {
    db.query('SELECT * FROM notes WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error('Error querying note by ID:', err);
        }
        else {
            const notes = result.rows;
            if (notes.length === 0) {
                console.log('Note not found.');
            }
            else {
                const note = notes[0];
                console.log(`Note found - ID: ${note.id}, Content: ${note.content}`);
            }
        }
    });
};
exports.queryNoteById = queryNoteById;
const queryNoteByContent = (id) => {
    db.query('SELECT * FROM notes WHERE content = $1', [id], (err, result) => {
        if (err) {
            console.error('Error querying note by content:', err);
        }
        else {
            const notes = result.rows;
            if (notes.length === 0) {
                console.log('Note not found.');
            }
            else {
                const note = notes[0];
                console.log(`Note found - ID: ${note.id}, Content: ${note.content}`);
            }
        }
    });
};
exports.queryNoteByContent = queryNoteByContent;
// Export the database connection for use in other files
exports.default = db;
