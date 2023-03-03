const { Client } = require('pg'); // imports the pg module

//var conString = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
var YourUserName = 'postgres';
var YourPassword = 'password';
var conString = 'localhost:6161/juicebox-dev';
// supply the db name and location of the database
const client = new Client(`postgres://${YourUserName}:${YourPassword}@${conString}`);


async function createUser({ username, password }) {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `);

  return rows;


  /*
  try {
    const result = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);

    return result;
  } catch (error) {
    throw error;
  }
  */
}

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `);

  return rows;
}

// and export them
module.exports = {
  client,
  getAllUsers, 
  createUser
}