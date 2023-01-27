
const express = require('express');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');


const app = express();
const cors = require('cors');


app.use(cors({
    optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({
    extended: true
}));





app.get("/", function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
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
