import * as Discord from "discord.js";
import { MessageResponse, Wit } from "node-wit";
import * as auth from "./auth.json";
import { dialogs, drinks } from "./resources";

let flatDrinks = {};

const bot = new Discord.Client();

const client = new Wit({
  accessToken: auth.WitToken,
});

bot.once("ready", () => {
  console.log("Ready!");
});

bot.login(auth.DiscordToken);

bot.on("message", (message) => {
  if (message.cleanContent.includes("@Majordome")) {
    client
      .message(message.cleanContent, null)
      .then((apiResult: MessageResponse) => {
        if (apiResult.entities.hasOwnProperty("intent")) {
          handleIntent(message, apiResult);
        } else if (apiResult.entities.hasOwnProperty("rps")) {
          handleRPS(message, apiResult);
        } else {
          message.channel.send(
            pickAnswer("else", { "%USER_AT%": `<@!${message.author.id}>` })
          );
        }
      });
  }
});

/// Specific behavior

function handleIntent(message: Discord.Message, apiResult: MessageResponse) {
  const action = apiResult.entities.intent[0].value;
  switch (action) {
    case "serve":
      handleServe(message, apiResult);
      break;
    case "menu":
      message.channel.send(
        pickAnswer(action, {
          "%MENU%": menuText,
        })
      );
      break;
    case "thank":
      message.channel.send(
        pickAnswer(action, {
          "%USER_AT%": `<@!${message.author.id}>`,
        })
      );
      break;
    case "marry":
      message.channel.send(pickAnswer(action));
      break;
    case "purr":
      message.channel.send(pickAnswer(action));
      break;
    default:
      message.channel.send(
        pickAnswer(action, {
          "%USER_AT%": `<@!${message.author.id}>`,
        })
      );
      break;
  }
}

function handleRPS(message: Discord.Message, apiResult: MessageResponse) {
  const rps = { pierre: "Pierre", feuille: "Feuille", ciseaux: "Ciseaux" };
  apiResult.entities.rps.forEach(({ value }) => {
    let answer = `${
      [rps.pierre, rps.feuille, rps.ciseaux][Math.floor(Math.random() * 3)]
    }\n`;
    if (answer.includes(value)) {
      answer += pickAnswer("rps-tie");
    } else if (
      (value.includes(rps.pierre) && answer.includes(rps.ciseaux)) ||
      (value.includes(rps.feuille) && answer.includes(rps.pierre)) ||
      (value.includes(rps.ciseaux) && answer.includes(rps.feuille))
    ) {
      answer += pickAnswer("rps-loose");
    } else if (
      (value.includes(rps.ciseaux) && answer.includes(rps.pierre)) ||
      (value.includes(rps.pierre) && answer.includes(rps.feuille)) ||
      (value.includes(rps.feuille) && answer.includes(rps.ciseaux))
    ) {
      answer += pickAnswer("rps-win");
    }
    message.channel.send(answer);
  });
}

function handleServe(message: Discord.Message, apiResult: MessageResponse) {
  console.log(apiResult.entities.intent);
  if (apiResult.entities.hasOwnProperty("drink")) {
    apiResult.entities.drink.forEach((drink) => {
      serveDrink(message, drink.value);
    }); //FIXME
  } else {
    message.channel.send(
      pickAnswer("serve-what", { "%USER_AT%": `<@!${message.author.id}>` })
    );
  }
}

function serveDrink(message: Discord.Message, drink: string) {
  console.log(drink);
  if (!flatDrinks.hasOwnProperty(drink)) {
    message.channel.send(
      pickAnswer("serve-not-available", {
        "%DRINK%": drink,
        "%USER_AT%": `<@!${message.author.id}>`,
      })
    );
    return;
  }

  // Handle multiple drinks
  if (drink == "Eau") {
    message.react("🚰");
  } else if (drink == "Thé") {
    message.react("🍵");
  } else if (drink == "Café") {
    message.react("☕");
  } else if (drink == "Chocolat") {
    message.react("🧉");
  } else if (drink == "Lait") {
    message.react("🥛");
  } else if (drink == "Champagne") {
    message.react("🥂");
  } else if (drink == "Saké") {
    message.react("🍶");
  } else if (flatDrinks[drink].includes("Soda")) {
    message.react("🥤");
  } else if (flatDrinks[drink].includes("Sirop")) {
    message.react("🍹");
  } else if (flatDrinks[drink].includes("Virgin")) {
    message.react("🍹");
  } else if (flatDrinks[drink].includes("Jus")) {
    message.react("🧃");
  } else if (flatDrinks[drink].includes("Bière")) {
    message.react("🍺");
  } else if (flatDrinks[drink].includes("Vin")) {
    message.react("🍷");
  } else if (flatDrinks[drink].includes("Spiritueux")) {
    message.react("🥃");
  } else if (flatDrinks[drink].includes("Cocktail")) {
    message.react("🍸");
  }
  message.channel
    .send(
      pickAnswer("serve", {
        "%DRINK%": drink,
        "%USER_AT%": `<@!${message.author.id}>`,
      })
    )
    .then((msg) => {
      if (drink == "Champagne") {
        msg.react("🍾");
      }
      // if (
      //   message.content.includes("glaçon") ||
      //   message.content.includes("glacon") ||
      //   message.content.includes("glace") ||
      //   message.content.includes("glacé")
      // ) {
      //   message.react("🧊");
      // }
    });
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

/// Menu generation

const menuText = displayMenu();

function displayMenu() {
  let menu = `**== Menu ==\n__Boisson :__**${createMenu(drinks, "", [])}`;
  return menu;
}

function createMenu(menuData, indent, path: string[]) {
  let res = "";
  indent += "   ";
  let count = 0;
  for (const key in menuData) {
    if (menuData.hasOwnProperty(key)) {
      if (typeof menuData[key] == "string") {
        flatDrinks[key] = [...path];
        if (count % 5 == 0) {
          res += `\n${indent}${key}`;
        } else {
          res += ` - ${key}`;
        }
      } else {
        res += `\n${indent}${key} :`;
        path.push(key);
        res += createMenu(menuData[key], indent, path);
        path.pop();
      }
    }
    count++;
  }
  return res;
}
