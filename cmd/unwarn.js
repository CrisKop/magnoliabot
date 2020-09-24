exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const db = require("megadb")
  const warns = new db.crearDB("Warns")
  
  let user = message.mentions.users.first()
  if(!user) return message.channel.send("Debes mencionar un usuario")
    
  if(!args[1]) return message.channel.send("Debes seleccionar la cantidad a eliminar")
    
  if(!warns.obtener(`${message.guild.id}.${user.id}`)) return message.channel.send("Ese usuario no tiene advertencias")
  warns.restar(`${message.guild.id}.${user.id}`, args[1])
    
    const cantidad = await warns.obtener(`${message.guild.id}.${user.id}`);
   const em = new Discord.MessageEmbed()
      .setDescription(
        "Se le han eliminado warns a: **__" +
          user.username +
          "__**"
      )
      .addField("Cantidad de advertencias eliminadas:", args[1])
      .addField("**Admin/mod responsable:**", message.author.tag)
      .setColor("#13ec12")
      .setFooter(cantidad)
      .setTimestamp();
    message.channel.send(em);
  
  }