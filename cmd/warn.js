exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const db = require("megadb")
  const warns = new db.crearDB("Warns")
  const warnrazon = new db.crearDB("WarnsRazones")
  
  let xd = args.slice(1).join(" ") || "Razon Indefinida"
  
  let user = message.mentions.users.first()
  if(!user) return message.channel.send("Debes mencionar un usuario")
  
  if(!warns.tiene(message.guild.id, user.id)) {
    warns.establecer(message.guild.id, user.id, 0)
  }
  
  warns.sumar(message.guild.id, user.id, 1)
  const embed = new Discord.MessageEmbed()
  .setAuthor(``)
}