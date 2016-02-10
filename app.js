var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
  console.log('Listening on port' + port);
});
