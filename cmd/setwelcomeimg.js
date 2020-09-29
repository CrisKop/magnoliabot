const Discord = require("discord.js");
const db = require("megadb");
const welcomeimg = new db.crearDB("setwelcomeimg", "welcomeleave");
exports.run = async (client, message, args) => {
    let perms = message.member.hasPermission("MANAGE_GUILD");

    if (!perms)
      return message.channel.send(
            "❌ `|` **Perdon " +
        `${message.author}` +
        ", No tienes permisos de `Gestionar Server` para ejecutar ese comando**")
    if (!args.join(" "))
      return message.channel.send("❌ `|` **Debes colocar un enlace para definir la imagen**")

    if (!message.content.includes("http"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            "❌ `|` **Debes colocar un enlace con** `Http`"
          )
          .setColor("RED")
      );

    welcomeimg.establecer(`${message.guild.id}`, args.join(" "));

    message.channel.send("☑️ `|` **El fondo ha sido seleccionado correctamente**")
};
