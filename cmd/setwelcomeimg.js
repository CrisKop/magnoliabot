const Discord = require("discord.js");
const db = require("megadb");
const welcomeimg = new db.crearDB("setwelcomeimg", "welcomeleave");
exports.run = async (client, message, args) => {
    let perms = message.member.hasPermission("MANAGE_GUILD");

    if (!perms)
      return message.channel.send("❌ No tienes permisos")
  
    if (!args.join(" "))
      return message.channel.send("❌ `|` **Debes colocar un enlace para definir la imagen**")

    if (!message.content.includes("http"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            "❌ `|` **El enlace debe contener el** `HTTP`"
          )
          .setColor("RED")
      );

    welcomeimg.establecer(`${message.guild.id}`, args.join(" "));

    message.channel.send("☑️ `|` **El fondo ha sido seleccionado correctamente**")
  }
