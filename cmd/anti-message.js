const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let xd = args.slice(0).join(" ");
  let usuario = message.author;
  let db = require("megadb");
  let am = new (require("megadb")).crearDB("AntiMessage");
  
  let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ No tienes permisos de `Administrador`.");

  let ap = new db.crearDB("premiumssv");
  
  if(ap.tiene(message.guild.id) === false) return message.channel.send("No puedes usar este comando, porque el servidor no tiene las ventajas premium") 
  if (ap.tiene(`${message.guild.id}`)) { 
  if (!xd)
    return message.channel.send(
      "☑️ Activa usando `anti-message enable` \n❌ Desactiva usando `anti-message disable`"
    );

    if(args[0] === "disable"){
    am.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiMessage **Desactivada** Correctamente"
      );
  } else if (args[0] === "enable"){
     if (am.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Message Ya estan activados");
     am.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ AntiMessage **Activada** Correctamente");
  }
}