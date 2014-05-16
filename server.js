"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var util = require("util");

var app = express();
app.use(bodyParser());

app.use(function(req, res, next) {
  console.log("%s %s", req.method, req.path)
  next();
});

app.use(express.static(__dirname));

app.post("/send-order/", function(req, res) {
  var order = req.body;

  var text = util.format("Pedido de %s %s:\n", order.name, order.surname);
  text += order.address + "\n";
  text += JSON.stringify(order.cart) + "\n";
  console.log(text);

  fs.appendFile("orders.txt", text);

  res.send(202);
});

app.use(function(req, res, next) {
  res.sendfile("index.html");
});

var server = app.listen(5000, function() {
  console.log("Listening on port %d", server.address().port);
});
