type Note = {
    id: number;
    content: string;
  };
  
  const notes: Note[] = [];
  let nextId = 1;
  
  export const createNote = (content: string) => {
    const note: Note = { id: nextId++, content };
    notes.push(note);
    console.log(`Note created with ID ${note.id}`);
  };
  
  export const listNotes = () => {
    if (notes.length === 0) {
      console.log('No notes found.');
    } else {
      console.log('Notes:');
      notes.forEach((note) => console.log(`ID: ${note.id}, Content: ${note.content}`));
    }
  };
  
  export const findNote = (query: string) => {
    const foundNotes = notes.filter((note) => note.content.includes(query));
    if (foundNotes.length === 0) {
      console.log('No matching notes found.');
    } else {
      console.log('Matching notes:');
      foundNotes.forEach((note) => console.log(`ID: ${note.id}, Content: ${note.content}`));
    }
  };
  
  export const removeNote = (query: string) => {
    const index = notes.findIndex((note) => note.content === query);
    if (index !== -1) {
      const removedNote = notes.splice(index, 1)[0];
      console.log(`Note with ID ${removedNote.id} removed.`);
    } else {
      console.log('Note not found.');
    }
  };
  
  export const removeAllNotes = () => {
    if (notes.length === 0) {
      console.log('No notes to remove.');
    } else {
      notes.length = 0;
      console.log('All notes removed.');
    }
  };
  