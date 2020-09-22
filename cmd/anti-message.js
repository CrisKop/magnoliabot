const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let xd = args.slice(0).join(" ");

  let db = require("megadb");
  let am = new (require("megadb")).crearDB("AntiMessage");
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
      "☑️ Activa usando `anti-message enable` \n❌ Desactiva usando `anti-message disable`"
    );

  if (args[0] === "disable") {
    am.eliminar(`${message.guild.id}`);
     if (!log.tiene(`${message.guild.id}`)) return;
    let logs = await log.obtener(`${message.guild.id}`);
    const canalrendered = client.channels.cache.get(logs);
    canalrendered.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `🌐 ${client.user.username} Filtros 🌐`,
          client.user.displayAvatarURL()
        )
        .setDescription("🍬 `|` **_Filtro Anti-Messages Desactivado_** \n`Canal Logs:` "+ `${we}`)
        .addField("👮 `|` **__Desactivado Por:__**", `${message.author}`)
        .addField("☄️ `|` **__Filtro:__**", "`Anti-Messages`")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RED")
    );
    return message.channel.send("☑️ AntiMessages **Desactivada** Correctamente");
  } else if (args[0] === "enable") {
    if (am.tiene(message.guild.id))
      return message.channel.send("☑️ Los Anti-Messages Ya estan activados");
    am.establecer(`${message.guild.id}.at`, "activado");
    if (!log.tiene(`${message.guild.id}`)) return;
    let logs = await log.obtener(`${message.guild.id}`);
    const canalrendered = client.channels.cache.get(logs);
    canalrendered.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `🌐 ${client.user.username} Filtros 🌐`,
          client.user.displayAvatarURL()
        )
        .setDescription("🍬 `|` **_Filtro Anti-Messages Activado_** \n`Canal logs:` "+ `${we}`)
        .addField("👮 `|` **__Activado Por:__**", `${message.author}`)
        .addField("☄️ `|` **__Filtro:__**", "`Anti-Messages `")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
    );
    return message.channel.send("☑️ AntiMessages **Activada** Correctamente");
  }
};
