const db = require('./firebase');

module.exports = (function() {
  let defaultBotMessages;
  
  return {
    initDefaultCollection() {
      const bots = ['john_snow', 'martin', 'sherlock', 'monica', 'dallas', 'ivan'];
      bots.forEach(b => {
        db.collection('ChatRooms').doc(b).set({ messages: [] })
      })
    },
    async addCollectionAndDocuments(collectionKey, objectsToAdd) {
      const collectionRef = db.collection(collectionKey);
      const batch = db.batch();
      Object.keys(objectsToAdd).forEach(key => {
        const docData = { botResponses: objectsToAdd[key] };
        const newDocRef = collectionRef.doc(key);
        batch.set(newDocRef, docData);
      });
      return await batch.commit();
    },
    getRandomMessage() {
      const random = defaultBotMessages[Math.floor(Math.random() * defaultBotMessages.length)];
      return random;
    },
    async getBotMessages(botId) {
      try {
        const snapshot = await db.doc(`botMessages/${botId}`).get();
        if(snapshot.exists) {
          const { botResponses = [] }  = snapshot.data();
          defaultBotMessages = botResponses;
          return defaultBotMessages;
        } else {
          console.log('error occurred while getting bot messages');
          return [];
        }
      } catch (error) {
        throw error;
      }
    },
    async getRooms() {
      try {
        const snapshot = await db.collection('ChatRooms').get();
        let ids = [];
        snapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        return ids;
      } catch (err) {
        console.log('Error getting documents', err);
      }
    },
    async getAllMessagesByRoomId(roomId) {
      const roomRef = db.doc(`ChatRooms/${roomId}`);
      console.log(roomId);
      try {
        const snapShot = await roomRef.get();
        if(snapShot.exists) {
          const hasData = Object.keys(snapShot.data()).length;
          if(hasData) {
            return snapShot.data();
          } else {
            await roomRef.set({ messages: [] });
            return { messages: [] }
          }
        } else {
          await this.setNewRoom(roomId);
          return { messages: [] }
        }
      } catch (error) {
        throw error;
      }
    },
    async setNewRoom(roomId) {
      const roomRef = db.doc(`ChatRooms/${roomId}`);
      const snapShot = await roomRef.get();
      if(!snapShot.exists) {
        return await roomRef.set({ messages: [] });
      }
      return;
    },
    async saveMessageToRoom(roomId, message) {
      try {
      const roomRef = db.doc(`ChatRooms/${roomId}`);
      const snapShot = await roomRef.get();
        if(snapShot.exists) {
          const { messages = [] } = snapShot.data();
          const newMessages = [...messages, message];
          return await roomRef.set({ messages: newMessages });
        } else {
          return await roomRef.set({messages: [message]});
        }
      } catch (error) {
        throw error;
      }
    }
  }
  
})();
