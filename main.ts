import * as Discord from "discord.js"
import * as auth from "./auth.json"
import * as drinks from "./drinks.json"

// create a new Discord client
const bot = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
bot.once("ready", () => {
  console.log("Ready!");
  console.log(bot);
});

// login to Discord with your app's token
bot.login(auth.token);

bot.on("message", message => {
  console.log();
  if (message.content.includes(`<@!${bot.user?.id}>`)) {
    switch (message.content) {
      default:
        message.channel.send({
          message: `Oui ${message.author.tag} ? que puis-je faire pour vous ?`
        });
        break;
    }
  }
});
