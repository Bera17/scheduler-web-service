const { authJwt } = require("../middleware");
const controller = require("../controllers/records.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/records', controller.getRecords)

    app.post('/api/records', controller.createRecord)

    app.put('/api/records', controller.updateRecord)

    app.delete('/api/records', controller.deleteRecord)

    // app.get('/api/records', 
    // [authJwt.verifyToken], controller.getRecords)

    // app.post('/api/records', 
    // [authJwt.verifyToken], controller.createRecord)

    // app.put('/api/records', 
    // [authJwt.verifyToken], controller.updateRecord)

    // app.delete('/api/records', 
    // [authJwt.verifyToken], controller.deleteRecord)

};