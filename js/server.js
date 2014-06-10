var fs = require("fs");
var host = "0.0.0.0";
var port = 4000;
var express = require("express");

var app = express();
app.use(app.router);
app.use(express.static(__dirname + "/build"));

app.listen(port, host);
