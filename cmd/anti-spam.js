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
  let db = require("megadb");
  let am = new (require("megadb")).crearDB("AntiMessage");
  
let ap = new db.crearDB("premiumssv");
  
  if (ab.tiene(`${message.guild.id}.at`)) { 
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
  
}