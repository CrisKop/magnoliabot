exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
  const sug = new db.crearDB("Sugerencias");

  let canal = message.mentions.channels.first();
  if (!canal)
    return message.channel.send(
      "❌ `|` **Debes mencionar un canal para seleccionar las sugerencias** \nSi desea eliminar el canal de sugerencias usa `setsugerencia off`"
    );

  sug.establecer(message.guild.id, canal.id);
  message.channel.send(
    "☑️ `|` **Canal de sugerencias seleccionado correctamente** " +
      `<#${canal.id}>`)
};