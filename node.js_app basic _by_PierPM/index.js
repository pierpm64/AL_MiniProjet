const express = require("express");
const bodyParser = require("body-parser");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require("http");
var msgService = require('./msgservice');
const router = express.Router();
const app = express();

//Enregistrement du calback:
function registerCallbacks(xhr,callback,errCallback) {
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4){
            if((xhr.status == 200 || xhr.status == 0)) {
                callback(xhr.responseText);
            }
            else {
            if(errCallback)
                errCallback(xhr.responseText);
            }
        }
    };
}

// appel AJAX générique
function makeAjaxGetRequest(url,callback,errCallback) {
    var xhr = new XMLHttpRequest();
    registerCallbacks(xhr,callback,errCallback);
    xhr.open("GET", url, true);xhr.send(null);
}

//support parsing of JSON post data
var jsonParser = bodyParser.json();
app.use(jsonParser);

// app.use(express.static('public'));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

let curpath = process.cwd();

router.get('/', function (req, res) {
    res.sendFile(curpath + "/html/index.html");
});

router.post('/', (request, response) => {
    // recuperation du nom saisi en post
    let name = request.body.name;
    // appel AJAX
    makeAjaxGetRequest("http://localhost/message/" + name,function(data){
		console.log("message en get : " + JSON.parse(data));
        response.send(JSON.parse(data));
        // response.send(JSON.parse(data));
        // response.end(JSON.parse(data));
    });
    // response.end("yes");
});

app.use(msgService.apiRouter);// to apiRouter(s)

app.listen(80,
    () => console.log("le serveur écoute sur le port 80"));