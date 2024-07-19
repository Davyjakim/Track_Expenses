const config = require('config')

module.exports = function(){
    if (!config.get("keyforauth")) {
        throw new Error("FATAL ERROR: keyforauth is not defined.");
      }
}