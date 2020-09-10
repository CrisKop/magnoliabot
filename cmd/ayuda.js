const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  
  message.channel.send( 
  new Discord.MessageEmbed()
  .setAuthor(`${message.author.username} Panel de Ayuda`)
  .addField("Comandos: ", "`f/comandos`", true)
  .addField("Informacion: ", "`f/botinfo`", true)
  .addField("Soporte: ", "**[Click Aca](Nada-Aun)**")
  .setTimestamp()
  .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
  )
  
  
}