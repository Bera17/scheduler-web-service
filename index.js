const {PORT} = require('./utils/config')
const express = require('express')
const {morgan} = require('./middleware/index')
var cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use(morgan.logger)

const db = require("./models");
db.sequelize.sync()

require('./routes/records.routes')(app);

require('./routes/canaux.routes')(app);

require('./routes/metadata.routes')(app);

require('./routes/auth.routes')(app);

app.use(morgan.errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})