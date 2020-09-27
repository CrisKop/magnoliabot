exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let db = require("megadb");

  const points = new db.crearDB("AlisPoints")
  let user = message.mentions.users.first() || message.author
  let puntos = await points.obtener(`${message.guild.id}.${user.id}`)
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Puntaje Alianzas de: ${user.username}`)
  .setDescription(puntos)
  message.channel.send(embed)
  }