exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const dinero = new db.crearDB("Dinero");
  let humanize = require("humanize-duration");
  const dbs = require("quick.db");
  const ms = require("parse-ms");

  let user = message.author;
  let author = await dbs.fetch(`game_${message.guild.id}_${user.id}`);
  let timeout = 300000;
  if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        `❌ Ya has jugado \n\nIntenta de nuevo en: ${time.minutes}m ${time.seconds}s `
      );
    message.channel.send(timeEmbed);
  } else {
    let palabras = ["Seguridad", "Falexy", "Wolf", "Fargan", "Wolf Security", "Barcelona", "Parangaricutirimicuaro"];
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let filtro = m => m.content === palabra;
    message.channel.send(
      new Discord.MessageEmbed()
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
          `Gano ${msg.first().author} en ${humanize(
            Date.now() - message.createdTimestamp,
            { language: "es" }
          )} \n**GANO: \`100\` De dinero**`
        );
        dinero.sumar(`${message.guild.id}.${message.author.id}`, 100);
      dbs.set(`game_${message.guild.id}_${user.id}`, Date.now());
      })
      .catch(() => {
        message.channel.send(`Ninguno lo logro...`);
      });
  }
};
