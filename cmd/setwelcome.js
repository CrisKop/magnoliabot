exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  const welcome = new db.crearDB("setwelcome", "welcomeleave");
  const welcomeimg = new db.crearDB("setwelcomeimg", "welcomeleave");

  let canal = message.mentions.channels.first();
  let perms = message.member.hasPermission("MANAGE_GUILD");

  if (!perms)
    return message.channel.send(
      "❌ No tienes permisos"
    );

  if (!canal)
    return message.channel.send(
      "❌ `|` **Debes mencionar un canal**"
    );

  if (welcomeimg.tiene(`${message.guild.id}`)) {
    welcome.establecer(`${message.guild.id}`, canal.id);

    return message.channel.send(
      "☑️ `|` **Nuevo canal de welcome establecido.** <#" +
        canal.id +
        ">"
    );
  }

  welcomeimg.establecer(
    `${message.guild.id}`,
    "https://www.itl.cat/pngfile/big/231-2311128_fondo-de-pantalla-4k-gamer.jpg"
  );

  welcome.establecer(`${message.guild.id}`, canal.id);

  message.channel.send(
    "☑️ `|` **Nuevo canal de welcome establecido.** <#" +
      canal.id +
      ">"
  );
};