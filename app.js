/**
 * Main application file.
 */

// Setup Express
const express = require("express");
const app = express();
const port = process.env.PORT ||3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Setup body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname + '/public')));

// Use the toaster middleware
app.use(require("./middleware/toaster-middleware.js"));

// Use the add user to locals middleware
const { addUserToLocals } = require("./middleware/auth-middleware.js")
app.use(addUserToLocals);

// Setup routes
app.use(require("./routes/application-routes.js"));
app.use(require("./routes/auth-routes.js"));
app.use(require("./routes/profile-routes.js"));




// Start the server running.
app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});


