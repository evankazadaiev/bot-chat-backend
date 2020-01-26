const admin = require('firebase-admin');
let serviceAccount = require('../../private/bot-chat-74180-firebase-adminsdk-gjpsg-6abe31103e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
