const {USER, HOST, DATABASE, PASSWORD, PORTDB} = require('../utils/config')
const Pool = require('pg').Pool
const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB,
})

const getRecords = (request, response) => {
    pool.query('SELECT * FROM "scheduler-app".records WHERE start >= CURRENT_DATE AND "end" < CURRENT_DATE+1', (error, results) => {
        if (error) {
            throw error
        }
        //console.log({"records":results.rows});
        response.status(200).json({"records":results.rows})
    })
}

const createRecord = (request, response) => {
    const parsedObj = JSON.parse(request.body.models)
    const { etat, avancement, titre, canalId, start, end } = parsedObj.models[0]

    pool.query('INSERT INTO "scheduler-app".records (etat, avancement, titre, "canalId", start, "end") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [etat, avancement, titre, canalId, start, end], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results);
        response.status(201).send({"records": results.rows[0]})
    })
}

const updateRecord = (request, response) => {
    const parsedObj = JSON.parse(request.body.models)
    const id = parseInt(parsedObj.models[0].recordId)
    const { etat, avancement, titre, canalId, start, end } = parsedObj.models[0]
  
    pool.query(
      'UPDATE "scheduler-app".records SET etat=$1, avancement=$2, titre=$3, "canalId"=$4, start=$5, "end"=$6 WHERE "recordId" = $7',
      [etat, avancement, titre, canalId, start, end, id],
      (error, results) => {
        if (error) {
          throw error
        }
        console.log(results);
        response.status(201).send({"records": results.rows[0]})
      }
    )
}

const deleteRecord = (request, response) => {
    const parsedObj = JSON.parse(request.body.models)
    const id = parseInt(parsedObj.models[0].recordId)

    pool.query('DELETE FROM "scheduler-app".records WHERE "recordId" = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('')
    })
}

  module.exports = {
      getRecords,
      createRecord,
      updateRecord,
      deleteRecord
  }