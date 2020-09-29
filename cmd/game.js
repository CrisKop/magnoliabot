exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const dinero = new db.crearDB("Dinero");
  let humanize = require("humanize-duration");
  const dbs = require("quick.db");
  const ms = require("parse-ms");

  let prefix_db = new db.crearDB("prefixes");

  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  let user = message.author;
  let author = await dbs.fetch(`game_${message.guild.id}_${user.id}`);
  let timeout = 600000;
  if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        `❌ Ya has jugado \n\nIntenta de nuevo en: ${time.minutes}m ${time.seconds}s `
      );
    message.channel.send(timeEmbed);
  } else {
    let palabras = [
      "ElSkay",
      "Dinero",
      "Banco",
      "La Casa De Papel",
      "Sex Education.",
      "Elite",
      "Seguridad",
      "Falexy",
      "Wolf",
      "Fargan",
      "Wolf Security",
      "Barcelona",
      "Parangaricutirimicuaro",
      "GaTos",
      "Perros",
      "MineCraft",
      "Youtube",
      "Netflix",
      "Monkey Security",
      "Monkey",
      "Pepe la Rana",
      "El Pepino"
    ];
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let filtro = m => m.content === palabra;
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/760318470112935936/760519980906446918/3520277.png"
        )
        .setAuthor(`🎲 | Juego Rapido | 🎲`, client.user.displayAvatarURL())
        .setDescription(
          "🎮 `|` **__Tienes que escribir la palabra que se muestra rapidamente para ganar__**"
        )
        .addField("📜 `|` **__Palabra:__**", "`" + palabra + "`")
    );
    
     Math.floor(Math.random() * (1001 - 100)) + 100;
    let rdm = Math.floor(Math.random() * (1001 - 100)) + 100;

    
    message.channel
      .awaitMessages(filtro, { max: 1, time: 60000, errors: ["time"] })
      .then(msg => {
        message.channel.send(
          new Discord.MessageEmbed()
          .setThumbnail("https://cdn.discordapp.com/attachments/758153151508643890/760536717391953990/3435908.png")
          .setColor("GREEN")
            .setAuthor(
              `🎉 | Ganaste ${msg.first().author.username} | 🎉`)
            .setDescription(
              "💝 `|` **__Felicidades, has ganado el juego, y eres un master en la escritura__** \nGanaste `"+rdm+"` De dinero, Usa: `"+prefix+"perfil`"
            )
          .addField("⏲️ `|` **__Tiempo:__**", `${humanize(Date.now() - message.createdTimestamp, {language: "es"})}`)
        );
        dinero.sumar(`${message.guild.id}.${message.author.id}`, rdm);
        dbs.set(`game_${message.guild.id}_${user.id}`, Date.now());
      })
      .catch(() => {
        message.channel.send(`Ninguno lo logro...`);
      });
  }
};
