var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var userRouter = require("./routes/users");

var app = express();

const corsOptions = {
  origin: ['*'],
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ['Content-Type'],
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/products', productsRouter);

module.exports = app;
