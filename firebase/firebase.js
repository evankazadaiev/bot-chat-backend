const admin = require('firebase-admin');
let serviceAccount = require('../private/bot-chat-74180-firebase-adminsdk-gjpsg-6abe31103e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;


// var defaultApp = admin.initializeApp(defaultAppConfig);
//
// console.log(defaultApp.name);  // '[DEFAULT]'
//
// // Retrieve services via the defaultApp variable...
// var defaultAuth = defaultApp.auth();
// var defaultDatabase = defaultApp.database();
//
// // ... or use the equivalent shorthand notation
// defaultAuth = admin.auth();
// defaultDatabase = admin.database();
