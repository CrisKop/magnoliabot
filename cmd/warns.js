exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const db = require("megadb")
  const warns = new db.crearDB("Warns")
  let user = message.mentions.users.first() || message.author;
  let w = await warns.obtener(`${message.guild.id}.${user.id}`)
  
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(user.username, user.displayAvatarURL({ size: 1024, dynamic: true }))
  .setDescription(`Tienes un total de: \n${w} Advertencias`)
  .setColor("RANDOM")
  message.channel.send(embed)
  
  }