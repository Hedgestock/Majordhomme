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
  bot.user.setActivity('Je sers les coupons', { type: "PLAYING" });
});

bot.login(auth.DiscordToken);

// bot.on('interactionCreate', interaction => {
// 	console.log(`${interaction.user.tag} in #${interaction.channel} triggered an interaction.`);
// });

bot.on("messageCreate", (message) => {

  console.log(message)


  //check if the bot role is mentioned, if the bot is mentionned or if the message replies to a previous message from the bot
  if (message.mentions.users.get(bot.user.id) || (message.mentions.repliedUser && message.mentions.repliedUser.id == bot.user.id) || message.mentions.roles.get("881575090616172566")) {

    const text = strip(message.cleanContent)
    //check if the message is empty
    if (/\S/.test(text)) {
      client
        .message(text, null)
        .then((apiResult: Wit.MessageResponse) => {
          console.log(apiResult)
          decipher(message, apiResult)
        });
    } else (
      message.reply(pickAnswer("else", { "%USER_AT%": `<@!${message.author.id}>` }))
    )
  }
});

function strip(message: string) {
  return message.replace("@Majordome", "").replace("@​Majordome", "");//WTF is this black magic ???
}

/// Specific behavior

function decipher(message: Discord.Message, apiResult: Wit.MessageResponse) {

  apiResult.intents.forEach(intent => {
    switch (intent.name) {
      case "serve":
        barServe(message, apiResult);
        break;
      case "menu":
        message.reply(showMenu());
        break;
      case "greet":
        message.reply(pickAnswer("greet", { "%USER_AT%": `<@!${message.author.id}>` }));
        break;
      default:
        message.reply(pickAnswer("else", { "%USER_AT%": `<@!${message.author.id}>` }));
        break;
    }
  })
  //if no intent is found, we just give a generic answer
  if (!apiResult.intents.length) {
    console.log("else")
    message.reply(pickAnswer("else", { "%USER_AT%": `<@!${message.author.id}>` }));
  }
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
        message.reply(
          pickAnswer("serve-not-available", {
            "%DRINK%": entity[0].value,
            "%USER_AT%": `<@!${message.author.id}>`,
          })
        )
      }
    });
  } else {
    message.reply(
      pickAnswer("serve-what", { "%USER_AT%": `<@!${message.author.id}>` })
    );
  }
}

function showMenu() {
  let menu = "";
  Object.entries(drinks).forEach(drink => menu += `${drink[1]} - ${drink[0]}\n`)
  console.log(menu)

  return pickAnswer("menu", { "%MENU%": menu })
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