const utils = require('modules/firebase/firebase.utils');
const chatUtils = require('modules/chat/chat.utils');
const { PORT } = require('config/config');
const io = require('socket.io')(PORT);
const nsp = io.of('/bot-chat');

// utils.initDefaultCollection();

nsp.on('connection', socket => {
  console.log('User Connected');
  
  socket.on('rooms', async () => {
    const rooms = await utils.getRooms();
    socket.emit('rooms', rooms);
  });
  
  socket.on('join_room', async (roomId) => {
    //WHEN USER JOINED
    socket.join(roomId);
    const { messages } = await utils.getMessagesByRoomId(roomId);
    
    nsp.to(roomId).emit('join_room', messages);
  });
  
  socket.on('message', async ({ roomId, message }) => {
    await utils.saveMessageToRoom(roomId, message);
    try {
      await setTimeout(async () => {
        const randomMessage = chatUtils.getRandomMessage(roomId);
        randomMessage.timestamp = new Date();
        await nsp.to(roomId).emit('message', randomMessage);
        await utils.saveMessageToRoom(roomId, randomMessage);
      }, (Math.random() * (5 - 1) + 1) * 1000);
    } catch(error) {
      throw error;
    }
  });
  
  
  socket.on('leave', roomId => {
    console.log('leaving room >>> ', roomId);
    socket.leave(roomId);
  });
});



