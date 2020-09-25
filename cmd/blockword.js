exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const db = require("megadb")
  const words = new db.crearDB("Palabras")
  
  if(words.tiene(message.guild.id)){
    words.establecer(message.guild.id, [])
  }
  let xd = args.join(" ")
  if(!xd) return message.channel.send("Debes colocar una palabra a bloquear")
  
  let x = await words.obtener(message.guild.id)
  if(x.includes(args[0]) == true) return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(`❌ | Ha Ocurrido Un Error`)
  .setDescription("**__La palabra que digito "+xd+" Ya esta bloqueada en el servidor")
  .setColor("RED")
  )
  words.push(message.guild.id, xd)
  message.channel.send("Palabra `"+xd+"` Bloqueada Correctamente")
}