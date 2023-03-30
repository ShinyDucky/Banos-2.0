require('dotenv').config();
const {
  token,
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { initializeApp } = require('firebase/app')
const fs = require('fs');
const keepAlive = require(`./server`);


// Firebase Config
const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: `${authDomain}`,
  databaseURL: `${databaseURL}`,
  projectId: `${projectId}`,
  storageBucket: `${storageBucket}`,
  messagingSenderId: `${messagingSenderId}`,
  appId: `${appId}`
};

initializeApp(firebaseConfig);

// E
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions')
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter(file => file.endsWith('.js'));
  for (const file of functionFiles)
    require(`./src/functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);
keepAlive();



