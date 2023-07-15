const usersDao = require("../modules/user-dao");

//once logged in, send user info to locals 
async function addUserToLocals(req, res, next) {
    const user = await usersDao.getUserWithAuthToken(req.cookies.authToken);
    res.locals.user = user;
    next();
}

//check if it is logged in
function verifyAuthenticated(req, res, next) {
    if(res.locals.user) {
        next();
    }
    else {
        res.redirect("/");
    }
}
//send normal user/admin confirmation to handlebars
function loginAdminVerification (req, res, next) {
    if (res.locals.user) {
        res.locals.login = true;
        if (res.locals.user.is_admin) {
          res.locals.admin = true;
        }
    }
    next();
};

module.exports = {
    addUserToLocals,
    verifyAuthenticated,
    loginAdminVerification
}