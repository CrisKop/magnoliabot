exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
 const embed = new Discord.MessageEmbed()
 .setAuthor(`Estoy en ${client.guilds.cache.size} servidores`)
 .setDescription(client.guilds.cache.map(r => r.name + ` | Cantidad: **${r.memberCount}** `).join("\n"))
 .setColor("GREEN")
.setThumbnail(client.user.displayAvatarURL())
 message.channel.send(embed)
}