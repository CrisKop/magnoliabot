exports.run = async(client, message, args) => {
  let Discord = require("discord.js")
  const db = require("megadb");
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Los beneficios para vips`)
  .setDescription("Los beneficios para vips son los siguientes: \nFiltro Antispam \nLista Raiders \nNoticias y novedades antes que todos \nFiltro Antimessage")
 message.channel.send(embed) 
}