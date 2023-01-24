// index.js
// where your node app starts

// init project
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require('cors');
app.use(cors({
    optionsSuccessStatus: 200
})); // some legacy browsers choke on 204
app.use(bodyParser.urlencoded({
    extended: true
}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({
        greeting: 'hello API'
    });
});

app.get("/api/:dateVar?", (req, res) => {
    let parameter = req.params.dateVar;
    let resJson, date;
    if (!parameter) {
        date = new Date();
    } else {
        if (!isNaN(parameter)) {
            date = new Date(parseInt(parameter));
        } else {
            date = new Date(parameter);
        }
    }

    if (date.toGMTString() === 'Invalid Date') {

        res.json({
            error: "Invalid Date"
        });
    } else {
        let unixVar = date.getTime();
        let gmtVar = date.toGMTString();
        resJson = {
            unix: unixVar,
            utc: gmtVar
        };
        res.json(resJson);
    }
})


// listen for requests :)
app.listen(process.env.PORT || 3000);
