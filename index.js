const {PORT} = require('./utils/config')
const express = require('express')
const middlewares = require('./utils/middlewares')
const dbRecord = require('./routes/records')
const dbCanaux = require('./routes/canaux')
const metaData = require('./routes/metaData')
var cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use(middlewares.logger)
app.use(middlewares.attachCurrentuser)

app.get('/api/records', dbRecord.getRecords)
app.post('/api/records', dbRecord.createRecord)
app.put('/api/records', dbRecord.updateRecord)
app.delete('/api/records', dbRecord.deleteRecord)

app.get('/api/canaux', dbCanaux.getCanaux)

app.get('/api/metadata', metaData.getMeta)

app.use(middlewares.errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})