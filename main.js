const Discord = require("discord.js");
const auth = require("./auth.json");
const drinks = require("./drinks.json");

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
  console.log("Ready!");
  console.log(client);
});

// login to Discord with your app's token
client.login(auth.token);

client.on("message", message => {
  console.log(message);
});
