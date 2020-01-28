# Bot chat back-end



## Demo. Make sure you have started back-end server first.

1. [Front-end demo](https://vuejs-bot-chat-app-live.herokuapp.com/).
2. [Back-end server](https://vuejs-bot-chat-backend.herokuapp.com/).

## Technologies/frameworks used:

1. [Express](https://expressjs.com/ru/) Node.js framework.
1. [Socket.io](https://socket.io/docs/client-api/)
1. [Npm](https://www.npmjs.com/) Package manager.
1. [Firebase](https://firebase.google.com/) Firebase Admin SDK & firestore.

The instructions below will help you set up the development environment.

## Project setup Environment

1. Clone the repository `git clone https://github.com/evankazadaiev/bot-chat-backend.git`
1. `cd bot-chat-backend`
1. `npm install` to install the dependencies.
1. Make sure you have set up a cloud firestore database in firebase. In order to do this, visit [Firebase](https://firebase.google.com/), go to console, create a project is neccessary, create a cloud firestore database, then go to Settings -> Service accounts tab -> click `Generate private key`, download json with database configurations.
1. Create .env file in bot-chat-backend root folder, fill in this file with database configuration fields.
1. `npm run devStart` to compile and hot-reload for development.
