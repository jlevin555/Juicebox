const { Client } = require('pg'); // imports the pg module

//var conString = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
var YourUserName = 'postgres';
var YourPassword = 'password';
var conString = 'localhost:6161/juicebox-dev';
// supply the db name and location of the database
const client = new Client(`postgres://${YourUserName}:${YourPassword}@${conString}`);

async function createUser({ 
    username, 
    password,
    name,
    location
}) {
  try {
    const { rows } = await client.query(`
      INSERT INTO users(username, password, name, location) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password, name, location]);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(`SELECT id, username, name, location, active FROM users;`);

  return rows;
}

module.exports = {  
  client,
  createUser,
  getAllUsers,
}