const {USER, HOST, DATABASE, PASSWORD, PORTDB} = require('../utils/config')
const Pool = require('pg').Pool
const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB,
})

const getLogin = (request, response) => {
  const {email , password} = request.body;

  pool
    .query(`
      SELECT id, email, last_connection FROM "scheduler-app".users
        WHERE email = $1 AND password = $2`, 
        [email, password])
  .then((results)=> {
    response.status(201).send({id: results.rows[0].id, email: results.rows[0].email, token:''+email+new Date().toISOString()})
  })
  .catch(err => console.log("Error executing query", err.stack))
  }
  
  module.exports = {
    getLogin
  }