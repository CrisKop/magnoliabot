exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");

  let perms = message.member.hasPermission("MANAGE_CHANNELS");
  if (!perms)
    return message.channel.send(
      "❌ `|` **Perdon " +
        `${message.author}` +
        ", No tienes permisos de `Gestionar Canales` para ejecutar ese comando**"
    );
  const log = new db.crearDB("Logs");
  let channel = message.mentions.channels.first()

  if (!channel)
    return message.channel.send("❌ `|` **Debes mencionar un canal**");

  log.establecer(`${message.guild.id}`, channel.id);
  message.channel.send(
    "☑️ `|` **Se ha establecido el canal de logs correctamente** " +
      `${channel}`
  );
  channel.send(
    "☑️ `|` **El canal ha sido seleccionado para recibir logs generales**"
  );
};
