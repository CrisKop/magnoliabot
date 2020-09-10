const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  const db = require("megadb");
  let prefix_db = new db.crearDB("prefixes")
  
      let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  message.channel.send( 
  new Discord.MessageEmbed()
  .setAuthor(`${message.author.username} Panel de Ayuda`)
  .addField("Comandos: ", "`"+prefix+"comandos`", true)
  .addField("Informacion: ", "`"+prefix+"botinfo`", true)
  .addField("Soporte: ", "**[Click Aca](https://google.com)**")
  .setTimestamp()
  .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
  )
  
  
}