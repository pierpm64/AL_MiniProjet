var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//route principale:
app.get('/', function(req, res , next) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body><form name = 'form1' method= 'POST' action = '/name'/>");
    res.write('<p>Entrez votre nom</p>');
    res.write('<input type = "text" name = "name"/><input type="submit" value = "submit"/></form>');
    res.write("</body></html>");
    res.end();
});
app.post('/name', function(req, res , next) {
    res.setHeader('Content-Type', 'text/html');
	let name = req.body.name;
    res.write("<html> <body>");
    res.write('<p>Bonjour '+name+'</p>');
    res.write("</body></html>");
    res.end();
});
app.listen(8888 , function () {
    console.log("simple express node server listening at 8888");
});