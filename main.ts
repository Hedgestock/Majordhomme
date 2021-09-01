import * as Discord from "discord.js";
import * as Wit from "node-wit";
import * as auth from "./auth.json";
import * as drinks from "./resources/drinks.json";
import * as dialogs from "./resources/dialogs.json";


const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

const client = new Wit.Wit({
  accessToken: auth.WitToken,
});

bot.once("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('🤤', { type: "PLAYING" });
});

bot.login(auth.DiscordToken);

// bot.on('interactionCreate', interaction => {
// 	console.log(`${interaction.user.tag} in #${interaction.channel} triggered an interaction.`);
// });

bot.on("messageCreate", (message) => {

  //check if the bot is mentionned or if the message replies to a previous message from the bot.
  if (message.mentions.users.get(bot.user.id) || (message.mentions.repliedUser && message.mentions.repliedUser.id == bot.user.id)) {
    client
      .message(strip(message.cleanContent), null)
      .then((apiResult: Wit.MessageResponse) => {
        // console.log(apiResult)
        decipher(message, apiResult)
      });
  }
});

function strip(message: string) {
  return message.replace("@​Majordome", "");
}

/// Specific behavior

function decipher(message: Discord.Message, apiResult: Wit.MessageResponse) {
  apiResult.intents.forEach(intent => {
    switch (intent.name) {
      case "serve":
        barServe(message, apiResult);
        break;
      case "greet":
        message.reply(pickAnswer("greet", { "%USER_AT%": `<@!${message.author.id}>` }))
        break;
      default:
    }
  })

}

function barServe(message: Discord.Message, apiResult: Wit.MessageResponse) {
  console.log(apiResult);
  if (Object.keys(apiResult.entities).length) {
    Object.values(apiResult.entities).forEach((entity: any) => {
      if (drinks[entity[0].value]) { // if the drink is known
        message.react(drinks[entity[0].value]);
        message.channel // serve and announce it
          .send(
            pickAnswer("serve", {
              "%DRINK%": entity[0].value,
              "%USER_AT%": `<@!${message.author.id}>`,
            })
          )
      } else { // otherwise announce that it's not in stock
        message.channel
          .send(
            pickAnswer("serve-not-available", {
              "%DRINK%": entity[0].value,
              "%USER_AT%": `<@!${message.author.id}>`,
            })
          )
      }
    });
  } else {
    message.channel.send(
      pickAnswer("serve-what", { "%USER_AT%": `<@!${message.author.id}>` })
    );
  }
}

/// Custom answer

function pickAnswer(command: string, replacements?) {
  return fillTemplate(
    dialogs[command][Math.floor(Math.random() * dialogs[command].length)],
    replacements
  );
}

function fillTemplate(str: string, replacements) {
  return str.replace(/%\w+%/g, function (all) {
    return replacements[all] || all;
  });
}