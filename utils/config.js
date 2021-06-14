require('dotenv').config()

const PORT = process.env.PORT

const USER=process.env.USER
const HOST=process.env.HOST
const DATABASE=process.env.DATABASE
const PASSWORD=process.env.PASSWORD
const PORTDB=process.env.PORTDB


const Pool = require('pg').Pool
const POOL = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB,
})

module.exports = {
  PORT,USER, HOST, DATABASE, PASSWORD, PORTDB, POOL
}