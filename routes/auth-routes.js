const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

//import the DAO that handles operation for users
const usersDao = require("../modules/user-dao");

//import required library to encrypt password
const bcrypt = require("bcrypt");
const saltRounds = 10;

//login router, if already logged in, redirect to homepage
router.get("/login", function (req, res) {
    res.locals.pageTitle = "Login";
    if (res.locals.user) {
      res.redirect("/");
    } else {
      res.render("home");
    }
  });

//when we post to login page, check if the username and password submitted
//match a user in the database, give the user an authToken, save it in a cookie
//then redirect to "/", otherwise redirect to "/login", with a fail massage
router.post("/login", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    //fetch user from database
  const user = await usersDao.fetchUser(null, email);
  
  //check if the user exist in the database, if yes, match password then direct to aother page,
  //otherwise redirect to login
  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match || password === user.password) {
      // Auth success - give that user an authToken, save the token in a cookie, and redirect to the homepage.
      const authToken = uuid();
      user.authToken = authToken;
      await usersDao.updateUser(user);
      res.cookie("authToken", authToken);
      res.locals.user = user;
      
      //need to modify to a page desired, just use home page for testing
      res.setToastMessage("Welcome, " + user.user_name );
      res.redirect("/");
    } else {
      res.locals.user = null;
      res.setToastMessage("Authentication failed!");
      res.redirect("/");
    }
  } else {
    res.locals.user = null;
    res.setToastMessage("Account doesn't exist!");
    res.redirect("/");
  }
});

// on navigation to /logout, delete the authToken cookie.
// redirect to "/", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
  res.clearCookie("authToken");
  res.locals.user = null;
  res.setToastMessage("Successfully logged out!");
  res.redirect("/");
});

//Create new account
router.get("/newAccount", function (req, res) {
  res.locals.pageTitle = "New Account";
  res.render("/");
});

router.post("/newAccount", async function (req, res) {
  try {
    const plainPassword = req.body.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);

    const user = {
      user_name: req.body.user_name,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      date_of_birth: req.body.date_of_birth,
    };

    const rePassword = req.body.rePassword;

    const usernameExists = await checkUserExists(user.user_name);
    const emailExists = await checkUserExists(null, user.email);

    if (usernameExists || emailExists) {
      res.setToastMessage("Username or email already exists!");
      res.redirect("/");
    } else if (rePassword !== plainPassword) {
      res.setToastMessage("Password doesn't match!");
      res.redirect("/");
    } else {
      await usersDao.createUser(user);
      res.setToastMessage("Account creation successful. Please login using your new credentials.");
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.setToastMessage("Something went wrong!");
    res.redirect("/");
  }
});



// Username validation
router.get("/checkUserExists", async function (req, res) {
  const username = req.query.user_name;
  const email = req.query.email;

  if (await checkUserExists(username, email)) {
    res.json({ userExists: true });
  } else {
    res.json({ userExists: false });
  }
});

async function checkUserExists(username, email) {
  const checkUser = await usersDao.fetchUser(username, email);
  return checkUser !== undefined;
}


module.exports = router;