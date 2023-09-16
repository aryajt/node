#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const notes_1 = require("./notes");
const database_1 = __importStar(require("./database")); // Import database functions
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
                database_1.default.query(`
          CREATE TABLE IF NOT EXISTS notes (
            id serial PRIMARY KEY,
            content text
          );
        `, (err, result) => {
                    if (err) {
                        console.error('Error creating table:', err);
                    }
                    else {
                        console.log('Table "notes" created.');
                    }
                });
                break;
            case 'insert':
                // Example: Insert a note into the PostgreSQL database
                const noteContent = args.join(' ');
                database_1.default.query('INSERT INTO notes (content) VALUES ($1)', [noteContent], (err, result) => {
                    if (err) {
                        console.error('Error inserting note:', err);
                    }
                    else {
                        console.log('Note inserted.');
                    }
                });
                break;
            case 'query':
                // Example: Query all notes from the PostgreSQL database
                database_1.default.query('SELECT * FROM notes', (err, result) => {
                    if (err) {
                        console.error('Error querying notes:', err);
                    }
                    else {
                        const notes = result.rows;
                        if (notes.length === 0) {
                            console.log('No notes found.');
                        }
                        else {
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
                }
                else {
                    (0, database_1.queryNoteById)(noteId);
                }
                break;
            case 'query_content':
                const content = args.join(' ');
                (0, database_1.queryNoteByContent)(content);
                break;
            case 'exit':
                // Exit the database mode
                database_1.default.end();
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
                (0, notes_1.createNote)(args.join(' '));
                break;
            case 'list':
                (0, notes_1.listNotes)();
                break;
            case 'find':
                (0, notes_1.findNote)(args.join(' '));
                break;
            case 'remove':
                (0, notes_1.removeNote)(args.join(' '));
                break;
            case 'removeall':
                (0, notes_1.removeAllNotes)();
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
(0, database_1.initDB)();
