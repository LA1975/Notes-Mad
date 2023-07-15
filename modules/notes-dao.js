const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//contains functions to interact with notes database

//fetch all notes
async function fetchAllNotes(){
    const db = await dbPromise;

    const allNotes = await db.all(SQL`select note_id, text, date_created, due_date, label, user_name 
    from notes n, users u
    where n.user_name = u.user_name
    order by date_created desc;`);

    return allNotes;
}
//fetch a note by note_id
async function fetchNote(id) {
    const db = await dbPromise;
  
    const note = await db.get(SQL`
      SELECT n.note_id, n.text, n.date_created, n.due_date, n.label, n.user_name
      FROM notes n, users u
      WHERE n.user_name = u.user_name AND n.note_id = ${id}
    `);
  
    return note ;
  }
  
//delete a note with a note_id
async function deleteNote(id){
    const db = await dbPromise;
    await db.run(SQL`delete from notes where note_id =${id}`);
}

//fetch notes by username
async function  fetchNoteByUser(username){
    const db = await dbPromise;
    const notes = await db.all(SQL`select * from notes where user_name = ${username}
    order by date_created desc;`);
    return notes;
}
async function createNewNote(newNote){
    const db = await dbPromise;
    await db.run(SQL`
    insert into notes (user_name, text, date_created) 
    values
    (${newNote.user_name}, ${newNote.text}, ${newNote.date_created}
    )`);
}
async function updateNote(note) {
    const db = await dbPromise;
    await db.run(SQL`
      UPDATE notes
      SET text = ${note.text}
      WHERE note_id = ${note.note_id}`);
  }

module.exports = {
    fetchAllNotes,
    fetchNote,
    deleteNote,
    fetchNoteByUser,
    createNewNote,
    updateNote,
};