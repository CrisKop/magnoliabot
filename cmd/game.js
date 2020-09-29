exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const dinero = new db.crearDB("Dinero");
  let humanize = require("humanize-duration");
  const dbs = require("quick.db");
  const ms = require("parse-ms");

  let user = message.author;
  let author = await dbs.fetch(`game_${message.guild.id}_${user.id}`);
  let timeout = 180000;
  if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        `❌ Ya has jugado \n\nIntenta de nuevo en: ${time.minutes}m ${time.seconds}s `
      );
    message.channel.send(timeEmbed);
  } else {
    let palabras = ["ElSkay", "Dinero", "Banco", "La Casa De Papel", "Sex Education.", "Elite", "Seguridad", "Falexy", "Wolf", "Fargan", "Wolf Security", "Barcelona", "Parangaricutirimicuaro", "GaTos", "Perros", "MineCraft", "Youtube", "Netflix", "Monkey Security", "Monkey", "Pepe la Rana", "El Pepino"];
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let filtro = m => m.content === palabra;
    message.channel.send(
      new Discord.MessageEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/760318470112935936/760519980906446918/3520277.png")
        .setAuthor(`🎲 | Juego Rapido | 🎲`, client.user.displayAvatarURL())
        .setDescription(
          "🎮 `|` **__Tienes que escribir la palabra que se muestra rapidamente para ganar__**"
        )
        .addField("📜 `|` **__Palabra:__**", "`" + palabra + "`")
    );
    message.channel
      .awaitMessages(filtro, { max: 1, time: 60000, errors: ["time"] })
      .then(msg => {
        message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(`Ganaste ${message.aut`));
        dinero.sumar(`${message.guild.id}.${message.author.id}`, 100);
      dbs.set(`game_${message.guild.id}_${user.id}`, Date.now());
      })
      .catch(() => {
        message.channel.send(`Ninguno lo logro...`);
      });
  }
};
