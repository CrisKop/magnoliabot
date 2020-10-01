exports.run = async (client, message, args) => {
let Discord = require("discord.js")
const db = require("megadb")
const ate = new db.crearDB("AntiTextos")

let xd = args.slice(0).join(" ")
    let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Administrador` para ejecutar ese comando**");
     if (!xd)
    return message.channel.send(
      "☑️ Activa usando `anti-textos enable` \n❌ Desactiva usando `anti-textos disable`"
    );

    if(args[0] === "disable"){
    ate.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiTextos **Desactivada** Correctamente"
      );
  } else if (args[0] === "enable"){
     if (ate.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Textos Ya estan activados");
     ate.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ AntiTextos **Activada** Correctamente");
  }
}