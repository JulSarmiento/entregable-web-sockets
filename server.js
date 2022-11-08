require('dotenv').config();
const http = require('./app');

const PORT = process.env.PORT || 3001;

const server = http.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));
server.on('error', error => console.error(error));