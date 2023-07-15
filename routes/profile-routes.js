const express = require("express");
const router = express.Router();

const usersDao = require("../modules/user-dao.js");
const notesDao = require("../modules/notes-dao.js");

const {verifyAuthenticated, loginAdminVerification} = require("../middleware/auth-middleware.js");


const bcrypt = require("bcrypt");
const saltRounds =10;
//profile page router
router.get("/profile", verifyAuthenticated, loginAdminVerification, async function (req,res) {
    res.locals.pageTitle = "My Profile";
    const user = res.locals.user;
    const myNotes = await notesDao.fetchNoteByUser(user.user_name);
    res.locals.myNotes = myNotes;
    res.render("profile");
});
//update changes to user db table from edit profile
router.post("/updateProfile", async function(req,res){
const plainPassword = req.body.password;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(plainPassword,salt);

const updatedUser = {
    password:hash,
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    date_of_birth: req.body.date_of_birth
};
const user = res.locals.user;

  try {
    // Update only the changed fields
    if (updatedUser.password !== "") {
      user.password = updatedUser.password;
    }
    if (updatedUser.first_name !== "") {
      user.first_name = updatedUser.first_name;
    }
    if (updatedUser.last_name !== "") {
      user.last_name = updatedUser.last_name;
    }
    if (updatedUser.email !== "") {
      user.email = updatedUser.email;
    }
    if (updatedUser.date_of_birth !== "") {
      user.date_of_birth = updatedUser.date_of_birth;
    }
    // Add additional fields if necessary

    res.setToastMessage("Information updated successfully.");
    await usersDao.updateUser(user);
    res.redirect("/profile");
  } catch (err) {
    res.setToastMessage("Oops, something went wrong! Please try again.");
    res.redirect("/profile");
  }
});
//allow user to delete their own account
router.post("/deleteUser", loginAdminVerification, async function (req, res) {
  const userName = req.body.user_name; // Access user_name from the request body

  if (typeof userName !== "undefined" && res.locals.admin) {
    await usersDao.deleteUser(userName);
    res.setToastMessage("User deleted!");
    res.redirect("/admin");
  } else {
    await usersDao.deleteUser(res.locals.user.user_name);
    res.setToastMessage("User deleted!");
    res.redirect("/");
  }
});
//make user admin
router.post("/makeAdmin",loginAdminVerification, async function(req,res){
  const userName = req.body.user_name;
  let isAdmin = req.body.is_admin;
  isAdmin ="Y";
  await usersDao.makeAdminUser(userName);
  res.setToastMessage(userName + " is now an Admin");
  res.redirect("/admin");
})

  //delete note
  router.post("/deleteNote", loginAdminVerification, async function(req,res){
    await notesDao.deleteNote(req.body.note_id);
    res.setToastMessage("Note deleted");
    const referer = req.headers.referer || "";
  if (referer.includes("/profile")) {
    res.redirect("/profile");
  } else {
    res.redirect("/");
  }
  });

  //Admin page router
  router.get("/admin", verifyAuthenticated, loginAdminVerification, async function (req,res) {
    if (typeof res.locals.user != "undefined" && res.locals.user.is_admin) {
    res.locals.pageTitle = "Administration";
    res.locals.admin = true;
    const allUsers = await usersDao.fetchAllUsers();
    res.locals.allUsers = allUsers;
    res.render("admin");
    } else {
      res.redirect("/");
    }
});


module.exports = router;