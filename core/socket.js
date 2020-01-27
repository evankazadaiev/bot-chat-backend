const utils = require('../modules/firebase/firebase.utils');


const express = require('express');
const socketio = require('socket.io');
const { PORT } = require('../config/config');
const cors = require('cors');
const router = require('../router/');

module.exports = class Socket {
  constructor() {
    this.app = express();
    this.io = socketio(this.app.listen(PORT || 3000));
    this.initApp();
    this.initListeners();
  }
  initApp() {
    this.app.use(router);
    this.app.use(cors());
  }
  initListeners() {
    this.io.on('connection', socket => {
      console.log('USER CONNECTED');
      socket.on('join_room', async (roomId) => await this.onJoin(socket, roomId));
      socket.on('rooms', async () => await this.onRooms(socket));
      socket.on('message', async (data) => await this.onMessage(data));
      socket.on('leave', async (roomId) => await this.onLeave(socket, roomId));
    });
    this.io.on('disconnect', socket => {
      socket.removeAllListeners();
    });
  }
  async onJoin(socket, roomId) {
    socket.join(roomId);
    await utils.getBotMessages(roomId);
    const { messages } = await utils.getAllMessagesByRoomId(roomId);
    this.io.to(roomId).emit('join_room', messages);
  }
  async onRooms(socket) {
    const rooms = await utils.getRooms();
    socket.emit('rooms', rooms);
  }
  async onMessage({ roomId, message }) {
    await utils.saveMessageToRoom(roomId, message);
    try {
      await setTimeout(async () => {
        const randomMessage = utils.getRandomMessage();
        randomMessage.timestamp = new Date();
        await this.io.to(roomId).emit('message', randomMessage);
        await utils.saveMessageToRoom(roomId, randomMessage);
      }, (Math.random() * (5 - 1) + 1) * 1000);
    } catch(error) {
      throw error;
    }
  }
  onLeave(socket, roomId) {
    console.log('leaving room >>> ', roomId);
    socket.leave(roomId);
  }
}
