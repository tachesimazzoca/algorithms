var fs = require("fs");
var host = "0.0.0.0";
var port = 4000;
var express = require("express");

var args = process.argv.slice(2);
var docroot = (args.length > 0) ? args[0] : __dirname + '/build';

var app = express();
app.use(app.router);
app.use(express.static(docroot));

app.listen(port, host);
