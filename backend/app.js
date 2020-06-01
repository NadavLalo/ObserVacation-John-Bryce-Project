var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const fileupload = require('express-fileupload');
var cors = require('cors');
var app = express();
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(fileupload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/', indexRouter);

module.exports = app;
