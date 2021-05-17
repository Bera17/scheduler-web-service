const jsonFile = require('../utils/codebeautify.json')

const getMeta = (request, response) => {
  //console.log(jsonFile);
        response.status(200).json(jsonFile)
  }
  
  module.exports = {
    getMeta
  }