const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//fetch user data by email or username
async function fetchUser(username, email) {
  const db = await dbPromise;
  let query = SQL`SELECT * FROM users WHERE 1=1`;

  if (username) {
    query.append(SQL` AND user_name = ${username}`);
  }

  if (email) {
    query.append(SQL` AND email = ${email}`);
  }

  const user = await db.get(query);
  return user;
}


//add auth token to database
async function updateUser(user) {
    const db = await dbPromise;
  
    await db.run(SQL`
          update users
          set email = ${user.email}, password = ${user.password},
              first_name = ${user.first_name}, last_name = ${user.last_name}, email = ${user.email}, date_of_birth = ${user.date_of_birth}, 
               authToken = ${user.authToken}
          where user_name = ${user.user_name}`);
  }
  //get user with authToken
  async function getUserWithAuthToken(authToken) {
    const db = await dbPromise;
  
    const user = await db.get(SQL`
          select * from users
          where authToken = ${authToken}`);
  
    return user;
  }

  async function createUser(user) {
    const db = await dbPromise;
  
    await db.run(SQL`
          insert into users (user_name, password, first_name, last_name, email, date_of_birth) 
          values
          (${user.user_name}, ${user.password}, ${user.first_name}, ${user.last_name}, ${user.email}, ${user.date_of_birth}
          )`);
     
  }

  //delete user by username
async function deleteUser(username) {
  const db = await dbPromise;

  const user = await db.run(SQL`
            delete from users
            where user_name = ${username}`);

  return user;
}
//fetch all users
async function fetchAllUsers(){
  const db = await dbPromise;
  const allUsers = await db.all(SQL`
            select * from users`);

  return allUsers;
}
//make a user an admin
async function makeAdminUser(username){
const db= await dbPromise;
await db.run(SQL`UPDATE users
SET is_admin = "Y"
WHERE user_name = ${username} `)
}

  module.exports = {
    fetchUser,
    updateUser,
    getUserWithAuthToken,
    createUser,
    deleteUser,
    fetchAllUsers,
    makeAdminUser,
  };