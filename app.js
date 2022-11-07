const express = require('express');

const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/error.middleware');
const pageNotFound = require('./src/middlewares/notfound.middleware');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/static', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(indexRouter);

app.use(errorHandler);
app.use(pageNotFound);

module.exports = app;