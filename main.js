const Discord = require("discord.io");
const auth = require("./auth.json");

// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on("ready", function(evt) {
  console.log("Connected");
  console.log("Logged in as: ");
  console.log(bot.username + " - (" + bot.id + ")");
  bot.sendMessage({
    to: "694661055489769492",
    message: "Bonjour, je vais  chercher des boissons dans l'arrière boutique."
  });
});
bot.on("message", function(user, userID, channelID, message, evt) {
  if (message.includes(`<@!${bot.id}>`)) {
    switch (message) {
      default:

        bot.sendMessage({
          to: channelID,
          message: `Oui <@!${userID}> ? que puis-je faire pour vous ?`
        });
        break;
    }
  }
});

bot.on("disconnect", function(errMsg, code) {
  console.error("Disconnected");
  console.error(errMsg);
  console.error(code);
});
