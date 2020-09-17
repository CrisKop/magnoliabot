exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  const db = require("megadb")
  
  const log = new db.crearDB("Logs")
  let channel = message.mentions.channels.first() || message.channel;
  
  if(!channel) return message.channel.send("Menciona un canal")
  
  log.establecer(`${message.guild.id}`, channel.id)
  message.channel.send("Se ha establecido el canal de logs correctamente "+`${channel}`)
 }