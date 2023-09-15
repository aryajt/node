import { Pool } from 'pg';

// Initialize the database connection
const db = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'django-todo',
    password: 'mypassword',
    port: 5432,
});

export const initDB = () => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
        } else {
            console.log('Connected to PostgreSQL database.');
        }
    });
};

export const queryNoteById = (id: number) => {
    db.query('SELECT * FROM notes WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error('Error querying note by ID:', err);
        } else {
            const notes = result.rows;
            if (notes.length === 0) {
                console.log('Note not found.');
            } else {
                const note = notes[0];
                console.log(`Note found - ID: ${note.id}, Content: ${note.content}`);
            }
        }
    });
};
export const queryNoteByContent = (id: string) => {
    db.query('SELECT * FROM notes WHERE content = $1', [id], (err, result) => {
        if (err) {
            console.error('Error querying note by content:', err);
        } else {
            const notes = result.rows;
            if (notes.length === 0) {
                console.log('Note not found.');
            } else {
                const note = notes[0];
                console.log(`Note found - ID: ${note.id}, Content: ${note.content}`);
            }
        }
    });
};
// Export the database connection for use in other files
export default db;
