const {PORT} = require('./utils/config')
const express = require('express')
const {morgan} = require('./middleware/index')
const dbRecord = require('./routes/records')
var cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use(morgan.logger)

const db = require("./models");
db.sequelize.sync()

app.get('/api/records', dbRecord.getRecords)
app.post('/api/records', dbRecord.createRecord)
app.put('/api/records', dbRecord.updateRecord)
app.delete('/api/records', dbRecord.deleteRecord)
//require('./routes/records.routes')(app);

//app.get('/api/canaux', dbCanaux.getCanaux)
require('./routes/canaux.routes')(app);

// app.get('/api/metadata', metaData.getMeta)
require('./routes/metadata.routes')(app);

//app.post('/api/login', user.getLogin);
require('./routes/auth.routes')(app);

app.use(morgan.errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})