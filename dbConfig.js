import mysql from "mysql2/promise"

export const pool = mysql.createPool({
  // host: 'localholast', // or your MySQL host
  // user: 'root',
  // password: '',
  // database: 'lamaesthetic'

  host: 'lamaesthetic.co.uk', // or your MySQL host
  user: 'u994158989_admin',
  password: 'Lamaesthetic123',
  database: 'u994158989_lamaesthetic'
});
  


