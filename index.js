if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Socket = require('./core/socket');


new Socket();
