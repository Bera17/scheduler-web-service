require('dotenv').config()
//Server
const PORT = process.env.PORT
//DB
const USER=process.env.USER
const HOST=process.env.HOST
const DATABASE=process.env.DATABASE
const PASSWORD=process.env.PASSWORD
const PORTDB=process.env.PORTDB
const dialect= 'postgres'
//pg query
const Pool = require('pg').Pool
const POOL = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB,
})

module.exports = {
  PORT,USER, HOST, DATABASE, PASSWORD, PORTDB, dialect, POOL
}