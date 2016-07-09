var express = require('express');
var fetch = require('node-fetch');

var app = express();
var port = 3003;
var backend_api_config = {
    host: 'http://192.168.1.3:8080'
};

//todo
var USER_ID = 1;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "POST") {
        var data = "";
        req.on('data', function (chunk) {
            data += chunk
        });
        req.on('end', function () {
            req.rawBody = data;
            if (data)
                req.body = JSON.parse(data);
            else
                req.body = {};
            next();
        })
    }
    else {
        next();
    }
});

app.get("/received/all", function (req, res) {
    fetch(backend_api_config.host + '/recieved/' + USER_ID, {}).then(function (response) {
        return response.json();
    }).then(function (data) {
        res.json(data);
    }).catch(function (error) {
        res.json(error);
    });
});

app.post("/test", function (req, res) {
    switch (req.body.payment_instrument) {
    }
});

app.listen(port) && console.log('API MOCK server is running...');