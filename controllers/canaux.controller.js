const {POOL: pool} = require('../utils/config')

const getCanaux = (request, response) => {
  pool.query('SELECT * FROM "scheduler-app".canaux ', (error, results) => {
      if (error) {
          throw error
      }
      //console.log({"canaux":results.rows});
      response.status(200).json({"canaux":results.rows})
  })
}

module.exports = {
  getCanaux
}