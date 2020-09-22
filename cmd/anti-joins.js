const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let xd = args.slice(0).join(" ");

  let db = require("megadb");
  
  let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ No tienes permisos de `Administrador`.");

  //if(!log.tiene(`${message.guild.id}`)) return message.channel.send("❌ No has establecido el canal de logs \nUsa: `setlogs #canal`")
  if (!args[0]) return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(`Anti-Joins Usuarios`))
  
  if(args[0] === "users"){
    const u = new db.crearDB("AntiUser");
    if (u.tiene(message.guild.id))
    return message.channel.send("☑️ Los Anti-Users Ya estan activados");
    u.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ Anti-Users **Activada** Correctamente");
  }
  if(args[0] === "bots"){
     let ab = new db.crearDB("AntiBots");
    if (ab.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Bots Ya estan activados");
    ab.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ Anti-Bots **Activada** Correctamente");
  }
};
