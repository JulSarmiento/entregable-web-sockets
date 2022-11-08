const socket = io();
const chatBtn = document.querySelector('#send-btn');
const productBtn = document.querySelector('#product-btn');
const list = document.querySelector('#chat-box');
const table = document.querySelector('#table');
const tableRows = document.querySelector('#products-table');
let messages = [];
let products = [];

function sendNewMessage(){
  const username = document.querySelector('#username').value;
  const message = document.querySelector('#message').value;

  if(!message || !username) {
    return
  }

  const messageObject = {
    username,
    message,
    timestamp: new Date().toLocaleString()
  }

  socket.emit('NEW_MESSAGE_TO_SERVER', messageObject);
  document.querySelector('#message').value = '';
}

function sendNewProduct(){
  const productName = document.querySelector('#productName').value;
  const productPrice = document.querySelector('#productPrice').value;
  const thumbnail = document.querySelector('#thumbnail').value;

  if(!productName || !productPrice || !thumbnail) {
    return
  }

  const productObject = {
    productName,
    productPrice,
    thumbnail
  };

  socket.emit('NEW_PRODCUT_TO_SERVER', productObject);
  document.querySelector('#productName').value = '';
  document.querySelector('#productPrice').value = '';
  document.querySelector('#thumbnail').value = '';
  
}

function printMessages(messages) {
  list.innerHTML = '';
  if(messages.length  !== 0) {
    messages.forEach(element => {
      list.insertAdjacentHTML('beforeend', `<li> <span class="username" >${element.username}</span> (<span class="timestamp">${element.timestamp}</span>): <span class="message-text">${element.message}</span></li>`)
    });
  }

}

function printProducts(products) {
  if(products.length === 0) {
    table.innerHTML = `            
      <div class="alert alert-warning" role="alert">
        No hay productos para mostrar.
      </div>
    `
  }

  tableRows.innerHTML = '';
  if(products.length  !== 0) {
    products.forEach(element => {
      tableRows.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${element.productName}</td>
          <td>${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(element.productPrice)}</td>
          <td><img src="${element.thumbnail}" height="40" width="40" alt=""></td>
        </tr>
      `)
    });
  }

}

chatBtn.addEventListener('click', (e) => {
  e.preventDefault();
  sendNewMessage();
});

productBtn.addEventListener('click', (e) => {
  e.preventDefault();
  sendNewProduct();
})

socket.on('UPDATE_DATA', (data) => {
  console.log('Estoy recibiendo data', data);
  messages = data;
  printMessages(data);
})

socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
  messages.push(data);
  printMessages(messages)
})

socket.on('UPDATE_PRODUCTS', (data) => {
  console.log('Estoy recibiendo data', data);
  products = data;
  printProducts(products);
})

socket.on('NEW_PRODUCTS_FROM_SERVER', (data) => {
  products.push(data);
  printProducts(products);
})