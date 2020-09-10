exports.run = async(client, message, args) => {
  const moment = require("moment");
require("moment-duration-format");
  let Discord = require("discord.js")
  const db = require("megadb");
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
let { version } = require("discord.js");
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Informacion`)
  .setColor("RANDOM")
  .setThumbnail(client.user.displayAvatarURL())
  .addField("Prefix:", prefix)
  .addField("Info:", "👑 **Dueño:** <@!692363394719809577> y <@!520988949053702145> \n🆔 **ID Bot:** "+client.user.id+" \n👤 **Nombre Bot:** "+client.user.username+" \n\n🛠️ **Version:** v0.1 \n📚 **Libreria:** "+version+" \n📜 **Node.js**: v12.x \n\n🖥️ **Servidores:** "+client.guilds.cache.size+" \n👥 **Usuarios:** "+client.users.cache.size+" \n😆 **Emojis:** "+client.emojis.cache.size+ " \n\n📆 **Fecha creacion:** "+moment(client.user.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
  message.channel.send(embed)
}