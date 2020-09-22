const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let xd = args.slice(0).join(" ");

  let db = require("megadb");
  let al = new (require("megadb")).crearDB("AntiLoggers");
  const log = new db.crearDB("Logs");
  let l = await log.obtener(message.guild.id)
   let we;
  if (log.tiene(`${message.guild.id}`)) {
    we = `Activado: <#${l}>`;
  }

  if (!log.tiene(`${message.guild.id}`)) {
    we = "❌ **Canal no definido**";
  }
  
  let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ No tienes permisos de `Administrador`.");

  //if(!log.tiene(`${message.guild.id}`)) return message.channel.send("❌ No has establecido el canal de logs \nUsa: `setlogs #canal`")
  if (!xd)
    return message.channel.send(
      "☑️ Activa usando `anti-loggers enable` \n❌ Desactiva usando `anti-loggers disable`"
    );

  if (args[0] === "disable") {
    al.eliminar(`${message.guild.id}`);
     if (!log.tiene(`${message.guild.id}`)) return;
    let logs = await log.obtener(`${message.guild.id}`);
    const canalrendered = client.channels.cache.get(logs);
    canalrendered.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `🌐 ${client.user.username} Filtros 🌐`,
          client.user.displayAvatarURL()
        )
        .setDescription("🍬 `|` **_Filtro Anti-Loggers Desactivado_** \n`Canal Logs:` "+ `${we}`)
        .addField("👮 `|` **__Desactivado Por:__**", `${message.author}`)
        .addField("☄️ `|` **__Filtro:__**", "`Anti-Loggers`")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RED")
    );
    return message.channel.send("☑️ AntiLoggers **Desactivada** Correctamente");
  } else if (args[0] === "enable") {
    if (al.tiene(message.guild.id))
      return message.channel.send("☑️ Los Anti-Loggers Ya estan activados");
    al.establecer(`${message.guild.id}.at`, "activado");
    if (!log.tiene(`${message.guild.id}`)) return;
    let logs = await log.obtener(`${message.guild.id}`);
    const canalrendered = client.channels.cache.get(logs);
    canalrendered.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `🌐 ${client.user.username} Filtros 🌐`,
          client.user.displayAvatarURL()
        )
        .setDescription("🍬 `|` **_Filtro Anti-Loggers Activado_** \n`Canal logs:` "+ `${we}`)
        .addField("👮 `|` **__Activado Por:__**", `${message.author}`)
        .addField("☄️ `|` **__Filtro:__**", "`Anti-Loggers`")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
    );
    return message.channel.send("☑️ AntiLoggers **Activada** Correctamente");
  }
};
