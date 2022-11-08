const socket = io();
const btn = document.querySelector('#send-btn');
const list = document.querySelector('#chat-box');
const messages = [];

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

function printMessages(messages) {
  list.innerHTML = '';
  if(messages.length  !== 0) {
    messages.forEach(element => {
      list.insertAdjacentHTML('beforeend', `<li> <span class="username" >${element.username}</span> (<span class="timestamp">${element.timestamp}</span>): <span class="message-text">${element.message}</span></li>`)
    });
  }

}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  sendNewMessage();
});

socket.on('UPDATE_DATA', (data) => {
  console.log('Estoy recibiendo data', data);
  message = data;
  printMessages(data);
})

socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
  messages.push(data);
  printMessages(messages)
})