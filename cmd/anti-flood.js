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
  let af = new (require("megadb")).crearDB("AntiFlood");
    
    let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Administrador` para ejecutar ese comando**");
     if (!xd)
    return message.channel.send(
      "☑️ Activa usando `anti-flood enable` \n❌ Desactiva usando `anti-flood disable`"
    );

    if(args[0] === "disable"){
    af.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiFood **Desactivada** Correctamente"
      );
  } else if (args[0] === "enable"){
     if (af.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Flood Ya estan activados");
     af.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ AntiFlood **Activada** Correctamente");
  }

  }