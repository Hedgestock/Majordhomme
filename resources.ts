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
  menu: ["Voici le menu pour aujourd'hui :\n%MENU%"],
  serve: [
    "Voici votre %DRINK%.",
    "Et voilà votre %DRINK% %USER_AT%, c'est envoyé !",
    "Je suis immédiatement de retour avec votre %DRINK%.",
    "Tout de suite.",
  ],
  "serve-what": [
    "Excusez-moi %USER_AT%, je n'ai pas compris ce que je devais vous servir.",
  ],
  thank: [
    "Je suis là pour vous servir %USER_AT% !",
    "Je ne fais que mon devoir.",
    "Si j'avais un cœur, vous me le réchaufferiez.",
    "Étonnant d'être serveur sur un serveur, non ?",
    "1000 mercis ne valent pas un pourboire.",
  ],
  marry: ["Pas demain _en Ougandais_"],
  "rps-win": ["J'ai gagné, ne vous en déplaise."],
  "rps-loose": ["Oh, on dirait que l'humain surpasse encore la machine."],
  "rps-tie": ["Une égalité ? Remettons ça."],
  else: [
    "Oui %USER_AT% ? que puis-je faire pour vous ?",
    "Vous désirez ?",
    "Pour vous servir",
  ],
};
