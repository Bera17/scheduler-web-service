const { authJwt } = require("../middleware");
const controller = require("../controllers/canaux.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/canaux',
    [authJwt.verifyToken], controller.getCanaux)
};