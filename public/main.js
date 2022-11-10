const socket = io();
const chatBtn = document.querySelector('#send-btn');
const productBtn = document.querySelector('#product-btn');
const list = document.querySelector('#chat-box');
const table = document.querySelector('#table');
const tableRows = document.querySelector('#products-table');
const noProducst = document.querySelector('#no-product')

let messages = [];
let products = [];

function sendNewMessage(){
  const username = document.querySelector('#email').value;
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

  socket.emit('NEW_PRODUCT_TO_SERVER', productObject);
  document.querySelector('#productName').value = '';
  document.querySelector('#productPrice').value = '';
  document.querySelector('#thumbnail').value = '';
  
}

function printMessages(messages) {
  list.innerHTML = '';
  if(messages.length  !== 0) {
    messages.forEach(element => {
      list.insertAdjacentHTML('beforeend', `<li class="list-group-item mb-2"> <span class="username" ><b>${element.username}</b></span> (<span class="timestamp">${element.timestamp}</span>): <span class="message-text"><i>${element.message}</i></span></li>`)
    });
  }

}

function printProducts() {
  console.log('products in printProducts', products)
  if(products.length > 0) {
    noProducst.style.display = 'none'
    table.style.display = 'block'
    tableRows.innerHTML = '';
    products.forEach(element => {
      tableRows.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${element.productName}</td>
          <td>${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(element.productPrice)}</td>
          <td><img src="${element.thumbnail}" height="40" width="40" alt=""></td>
        </tr>
      `)
    });
  } else {
      table.style.display = 'none'
      noProducst.style.display = 'block'

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
  console.log('Estoy recibiendo mensajes', data);
  messages = data;
  printMessages(messages);
})

socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
  console.log('NEW_MESSAGE_FROM_SERVER > ', data, messages);
  messages.push(data);
  printMessages(messages)
})

socket.on('UPDATE_PRODUCTS', (data) => {
  products = data;
  console.log('Estoy recibiendo productos', products);
  printProducts(products);
})

socket.on('NEW_PRODUCTS_FROM_SERVER', (data) => {
  console.log('data en main.js', data);
  products.push(data);
  console.log('products en main.js', products);
  printProducts();
})