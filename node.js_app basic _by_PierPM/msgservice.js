// Service message
var express = require('express');
const apiRouter = express.Router();

// declaration service 
//exemple URL: http://localhost:8282/message/nom
apiRouter.route('/message/:name')
.get( function(req , res , next ) {
    var nameParam = req.params.name;
    var message = "Bonjour " + nameParam + ", comment allez vous; Vous êtes bien matinal ... "
    res.send(JSON.stringify(message));
});

module.exports.apiRouter = apiRouter;