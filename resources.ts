export const drinks = {
  "Sans alcool": {
    Eau: "Eau",
    Café: "",
    Thé: "",
    Chocolat: "",
    Lait: "",
    Sirop: {
      Menthe: "",
      Grenadine: "",
      Fraise: "",
    },
    Jus: {
      "Jus d'orange": "",
      "Jus de pomme": "",
      "Jus d'ananas": "",
      "Jus de raisin": "",
    },
    Soda: {
      "Coca-Cola": "",
      Orangina: "",
      Fanta: "",
    },
    Virgin: {
      "Virgin mojito": "",
    },
  },
  Alcoolisée: {
    Vin: {
      Bordeau: "Vin",
      Champagne: "Champ",
    },
    Bière: {
      Corona: "",
      Heineken: "",
      Kronenbourg: "",
      Pelforth: "",
      "1664": "",
      Paulaner: "Bière",
      Skoll: "",
    },
    Cocktail: {
      Mojito: "Mojito",
      "Gin Tonic": "",
      "Sex on the beach": "",
      Sunset: "",
    },
    // Spiritueux: {
    //   Gin: "Gin",
    //   Whisky: "",
    //   Rhum: "",
    //   Saké: ""
    // }
  },
};

export const dialogs = {
  else: [
    "Oui %USER_AT% ? que puis-je faire pour vous ?",
    "Vous désirez ?",
    "Pour vous servir",
  ],
  greet: [
    "Bonjour %USER_AT%.",
    "Je vous souhaite un agréable moment de même !"
  ],
  marry: ["Pas demain _en Ougandais_"],
  menu: ["Voici le menu pour aujourd'hui :\n%MENU%"],
  purr: [
    "ronronpetipatapon",
    "prrrprrprrprr...",
    "Ron ron.",
    "RrrrRrrrRrrr...",
  ],
  "rps-loose": ["Oh, on dirait que l'humain surpasse encore la machine."],
  "rps-tie": ["Une égalité ? Remettons ça."],
  "rps-win": ["J'ai gagné, ne vous en déplaise."],
  serve: [
    "Voici votre %DRINK%.",
    "Et voilà votre %DRINK% %USER_AT%, c'est envoyé !",
    "Je suis immédiatement de retour avec votre %DRINK%.",
    "Tout de suite.",
  ],
  "serve-what": [
    "Excusez-moi %USER_AT%, je n'ai pas compris ce que je devais vous servir.",
    "Mes capacités de compréhension, pourtant bien supérieure à la moyenne, ne me permettent pas de determiner ce dont vous avez envie.",
  ],
  "serve-not-available": [
    'Je ne pense pas avoir de "%DRINK%" en réserve, Veuillez m\'en pardonner %USER_AT%.',
    "Si vous tenez vraiment à ce que je vou serve cela, n'hsitez pas à en parler à mon maître.",
    "Le menu n'affiche pas encore cela, mais parlez en au gérant du server et nous aurons bientôt notre incroyable %DRINK% en stock !",
  ],
  swear: ["Un grand pouvoir implique de grandes responsabilités..."],
  thank: [
    "Je suis là pour vous servir %USER_AT% !",
    "Je ne fais que mon devoir.",
    "Si j'avais un cœur, vous me le réchaufferiez.",
    "Étonnant d'être serveur sur un serveur, non ?",
    "1000 mercis ne valent pas un pourboire.",
  ],
};
