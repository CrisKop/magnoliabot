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
  let ar = new (require("megadb")).crearDB("AntiRoles");
    
    let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Administrador` para ejecutar ese comando**");
     if (!xd)
    return message.channel.send(
      "☑️ Activa usando `anti-roles enable` \n❌ Desactiva usando `anti-roles disable`"
    );

    if(args[0] === "disable"){
    ar.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiRoles **Desactivada** Correctamente"
      );
  } else if (args[0] === "enable"){
     if (ar.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Roles Ya estan activados");
     ar.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ AntiRoles **Activada** Correctamente");
  }

  }