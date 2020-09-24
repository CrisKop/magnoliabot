exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const db = require("megadb")
  const warns = new db.crearDB("Warns")
  
  let user = message.mentions.users.first()
  if(!user) return message.channel.send("Debes mencionar un usuario")
  
  let xd = args.slice(1).join(" ") || "Razon Indefinida"
  
  if(!warns.tiene(`${message.guild.id}.${user.id}`)) {
    warns.establecer(`${message.guild.id}.${user.id}`, 0)
  }
  
  warns.sumar(`${message.guild.id}.${user.id}`, 1)
  let cantidad = await warns.obtener(`${message.guild.id}.${user.id}`)
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${user.username} Ha sido advertido!`, client.user.displayAvatarURL())
  .addField("Usuario:", user.username)
  .addField("Moderador:", message.author.tag)
  .addField("Advertencias:", cantidad)
  .addField("Razon:", xd)
  .setColor("RANDOM")
  .setThumbnail(user.displayAvatarURL({ size: 2024, dynamic: true}))
  message.channel.send(embed)
}