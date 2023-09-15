#!/usr/bin/env node
import * as readline from 'readline';
import { createNote, listNotes, findNote, removeNote, removeAllNotes } from './notes';
import db, { initDB, queryNoteById, queryNoteByContent } from './database'; // Import database functions

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'notes> ',
});

let dbMode = false; // Flag to track if in db mode

rl.prompt();

rl.on('line', (line) => {
    const [command, ...args] = line.trim().split(' ');

    // Check for the "db mode" command
    if (command === 'db' && args[0] === 'mode') {
        dbMode = true;
        console.log('Switched to PostgreSQL database mode.');
    }

    if (dbMode) {
        switch (command) {
            case 'create_table':
                db.query(`
          CREATE TABLE IF NOT EXISTS notes (
            id serial PRIMARY KEY,
            content text
          );
        `, (err, result) => {
                    if (err) {
                        console.error('Error creating table:', err);
                    } else {
                        console.log('Table "notes" created.');
                    }
                });
                break;

            case 'insert':
                // Example: Insert a note into the PostgreSQL database
                const noteContent = args.join(' ');

                db.query('INSERT INTO notes (content) VALUES ($1)', [noteContent], (err, result) => {
                    if (err) {
                        console.error('Error inserting note:', err);
                    } else {
                        console.log('Note inserted.');
                    }
                });
                break;

            case 'query':
                // Example: Query all notes from the PostgreSQL database
                db.query('SELECT * FROM notes', (err, result) => {
                    if (err) {
                        console.error('Error querying notes:', err);
                    } else {
                        const notes = result.rows;
                        if (notes.length === 0) {
                            console.log('No notes found.');
                        } else {
                            console.log('Notes:');
                            notes.forEach((note) => console.log(`ID: ${note.id}, Content: ${note.content}`));
                        }
                    }
                });
                break;
            case 'query_id':
                const noteId = parseInt(args[0], 10); // Parse the ID argument as an integer
                if (isNaN(noteId)) {
                    console.log('Invalid ID. Please provide a valid numeric ID.');
                } else {
                    queryNoteById(noteId);
                }
                break;

            case 'query_content':
                const content = args.join(' ');

                queryNoteByContent(content);

                break;

            case 'exit':
                // Exit the database mode
                db.end();
                dbMode = false;
                console.log('Exiting PostgreSQL database mode.');
                break;

            default:
                console.log('Invalid database command. Try: create_table, insert_note, query_notes, exit');
                break;
        }
    }
    else {
        // Handle non-database commands
        switch (command) {
            case 'create':
                createNote(args.join(' '));
                break;
            case 'list':
                listNotes();
                break;
            case 'find':
                findNote(args.join(' '));
                break;
            case 'remove':
                removeNote(args.join(' '));
                break;
            case 'removeall':
                removeAllNotes();
                break;
            case 'quit':
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Invalid command. Try: create, list, find, remove, removeall, db mode, exit');
                break;
        }
    }
    rl.prompt();
}).on('close', () => {
    process.exit(0);
});

// Initialize the database (you need to implement this in database.ts)
initDB();
