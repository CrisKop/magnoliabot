const Discord = require("discord.js");
const db = require("megadb");

exports.run = async (client, message, args) => {
  let db_muterole = new db.crearDB("RoleMuted");

  let permiso = message.member.hasPermission("ADMINISTRATOR");
  if (!permiso)
    return message.reply(
      "❌ `|` **Perdon " +
        `${message.author}` +
        ", No tienes permisos de `Administrador` para ejecutar ese comando**"
    );

  let role = message.mentions.roles.first();
  if (!role) return message.channel.send("❌ `|` **Debes mencionar un role**");

  if (role.comparePositionTo(message.guild.me.roles.highest) > 0)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "❌ `|` **No puedo establecer el role mencionado, porque ese role esta por encima de mi role**"
      )
    );

  db_muterole.establecer(`${message.guild.id}`, `${role.id}`);
  message.channel.send({
    embed: {
      color: "00f00f",
      title: "Mute Role Updated.",
      description: `Role: <@&${role.id}>`
    }
  });
};
