const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let xd = args.slice(0).join(" ");

  let db = require("megadb");

  let prefix_db = new db.crearDB("prefixes");

  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send(
      "❌ `|` **Perdon " +
        `${message.author}` +
        ", No tienes permisos de `Administrador` para ejecutar ese comando**"
    );

  //if(!log.tiene(`${message.guild.id}`)) return message.channel.send("❌ No has establecido el canal de logs \nUsa: `setlogs #canal`")
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`Anti-Joins Usuarios/Bots`, client.user.displayAvatarURL())
        .addField(
          "☑️ **__Activacion:__**",
          `👤 **Activa Anti-Users** ${prefix}anti-joins users \n🤖 **Activa Anti-Bots** ${prefix}anti-joins bots \n🧭 **Activa Todo** ${prefix}anti-joins onall`
        )
        .addField(
          "❌ **__Desactivacion:__**",
          `👤 **Desactiva Anti-Users** ${prefix}anti-joins uoff \n🤖 **Desactiva Anti-Bots** ${prefix}anti-joins boff \n🧭 **Desactiva Todo** ${prefix}anti-joins offall`
        )
    );
  
  if (args[0] === "users") {
    const u = new db.crearDB("AntiUser");
    if (u.tiene(message.guild.id))
      return message.channel.send("☑️ Los Anti-Users Ya estan activados");
    u.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ Anti-Users **Activada** Correctamente");
  }
  if (args[0] === "bots") {
    let ab = new db.crearDB("AntiBots");
    if (ab.tiene(message.guild.id))
      return message.channel.send("☑️ Los Anti-Bots Ya estan activados");
    ab.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ Anti-Bots **Activada** Correctamente");
  }

  if (args[0] === "boff") {
    let ab = new db.crearDB("AntiBots");
    ab.eliminar(`${message.guild.id}`);
    return message.channel.send(
      "☑️ Anti-Joins Bots **Desactivada** Correctamente"
    );
  }
  if (args[0] === "uoff") {
    const u = new db.crearDB("AntiUser");
    u.eliminar(`${message.guild.id}`);
    return message.channel.send(
      "☑️ Anti-Joins Users **Desactivada** Correctamente"
    );
  }

  if (args[0] === "onall") {
    let ab = new db.crearDB("AntiBots");
    const u = new db.crearDB("AntiUser");
    u.establecer(`${message.guild.id}.at`, "activado");
    ab.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send(
      "☑️ Anti-Joins `USERS Y BOTS` **Activada** Correctamente"
    );
  }

  if (args[0] === "offall") {
    let ab = new db.crearDB("AntiBots");
    const u = new db.crearDB("AntiUser");
    u.eliminar(`${message.guild.id}`);
    ab.eliminar(`${message.guild.id}`);
    return message.channel.send(
      "☑️ Anti-Joins `USERS Y BOTS` **Desactivada** Correctamente"
    );
  }
};
