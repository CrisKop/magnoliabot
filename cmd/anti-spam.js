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
  
  let xd = args.slice(0).join(" ");
  let usuario = message.author;
  let amp = new (require("megadb")).crearDB("AntiSpam");
  
    let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Administrador` para ejecutar ese comando**");
     if (!xd)
    return message.channel.send(
      "☑️ Activa usando `anti-spam enable` \n❌ Desactiva usando `anti-spam disable`"
    );

    if(args[0] === "disable"){
    amp.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiSpam **Desactivada** Correctamente"
      );
  } else if (args[0] === "enable"){
     if (amp.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Spam Ya estan activados");
     amp.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ AntiSpam **Activada** Correctamente");
  }
}