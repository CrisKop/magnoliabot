exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const db = require("megadb")
  const warns = new db.crearDB("Warns")
  
  let user = message.mentions.users.first() || message.author;
  
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(user.username, user.displayAvatarURL({ size: 2024, dynamic: true }))
  
  
  }