exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
  const sug = new db.crearDB("Sugerencias");

  let canal = message.mentions.channels.first();
  if (!canal)
    return message.channel.send(
      "❌ `|` **Debes mencionar un canal para seleccionar las sugerencias**"
    );
  sug.establecer(message.guild.id, canal.id);
  message.channel.send(
    "☑️ `|` **Canal de sugerencias seleccionado correctamente** " +
      `<#${canal.id}>`)
  canal.send("☑️ `|` **El canal ha sido seleccionado para recibir sugerencias**")
};
