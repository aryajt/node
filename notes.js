"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllNotes = exports.removeNote = exports.findNote = exports.listNotes = exports.createNote = void 0;
const notes = [];
let nextId = 1;
const createNote = (content) => {
    const note = { id: nextId++, content };
    notes.push(note);
    console.log(`Note created with ID ${note.id}`);
};
exports.createNote = createNote;
const listNotes = () => {
    if (notes.length === 0) {
        console.log('No notes found.');
    }
    else {
        console.log('Notes:');
        notes.forEach((note) => console.log(`ID: ${note.id}, Content: ${note.content}`));
    }
};
exports.listNotes = listNotes;
const findNote = (query) => {
    const foundNotes = notes.filter((note) => note.content.includes(query));
    if (foundNotes.length === 0) {
        console.log('No matching notes found.');
    }
    else {
        console.log('Matching notes:');
        foundNotes.forEach((note) => console.log(`ID: ${note.id}, Content: ${note.content}`));
    }
};
exports.findNote = findNote;
const removeNote = (query) => {
    const index = notes.findIndex((note) => note.content === query);
    if (index !== -1) {
        const removedNote = notes.splice(index, 1)[0];
        console.log(`Note with ID ${removedNote.id} removed.`);
    }
    else {
        console.log('Note not found.');
    }
};
exports.removeNote = removeNote;
const removeAllNotes = () => {
    if (notes.length === 0) {
        console.log('No notes to remove.');
    }
    else {
        notes.length = 0;
        console.log('All notes removed.');
    }
};
exports.removeAllNotes = removeAllNotes;
