const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');

const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/error.middleware');
const pageNotFound = require('./src/middlewares/notfound.middleware');
const app = express()
const http = new HttpServer(app);
const io = new IoServer(http);

const messages = [];
const products = [];

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/static', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(indexRouter);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado.');

  socket.emit('UPDATE_DATA', messages);
  socket.on('NEW_MESSAGE_TO_SERVER', data => {
    messages.push(data);
    io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data)
  })

  socket.emit('UPDATE_PRODUCTS', products);
  socket.on('NEW_PRODCUT_TO_SERVER', (data) => {
    products.push(data);
    io.sockets.emit('NEW_PRODUCTS_FROM_SERVER', data);
  })
})

app.use(errorHandler);
app.use(pageNotFound);

module.exports = http;