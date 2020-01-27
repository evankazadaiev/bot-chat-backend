const admin = require('firebase-admin');
const serviceAccount = require('../../private/bot-chat-firebase-admin-sdk');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
