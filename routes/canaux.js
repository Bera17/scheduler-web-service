const {USER, HOST, DATABASE, PASSWORD, PORTDB} = require('../utils/config')
const Pool = require('pg').Pool
const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB,
})

const getCanaux = (request, response) => {
  pool.query('SELECT * FROM "scheduler-app".canaux ', (error, results) => {
      if (error) {
          throw error
      }
      console.log({"canaux":results.rows});
      response.status(200).json({"canaux":results.rows})
  })
}

module.exports = {
  getCanaux
}