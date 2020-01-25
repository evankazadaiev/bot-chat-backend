const botMessages = require('./chat.data');

module.exports = (function() {
  
  
  return {
    getRandomMessage(botId) {
      const random = botMessages[botId][Math.floor(Math.random() * botMessages[botId].length)];
      return random;
    }
  }
})();
