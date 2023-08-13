const express = require("express");
const router = express.Router();

const notesDao = require("../modules/notes-dao.js");

const { loginAdminVerification} = require("../middleware/auth-middleware.js");

router.get("/", loginAdminVerification,  async function (req, res) {
  
  res.locals.pageTitle = "My Profile";
  const user = res.locals.user;
  if(user){
  const myNotes = await notesDao.fetchNoteByUser(user.user_name);
  res.locals.myNotes = myNotes;
  }


    res.render("home");
  });

  router.post("/newNote", async function(req,res){
    const user = res.locals.user;
    const newNote = {
        user_name: user.user_name,
        text:req.body.text,
        date_created: Date()
    }
    //create new note only if text is present
    if (newNote.text != ""){
    await notesDao.createNewNote(newNote);
    }
    res.redirect("/");
  });

  //router for editing a note
  router.post('/edit', (req, res) => {
    
    const editedNote = {
      text:req.body.text,
      note_id:req.body.note_id
    }
    //will only edit note if text is present
    if(editedNote.text !=""){
    notesDao.updateNote(editedNote);
    }
    res.redirect("/");
  });
  //router for displaying about page
  router.get('/about',(req,res) =>{
  res.locals.pageTitle = "About";


    res.render("about");
  });
  

  module.exports = router;