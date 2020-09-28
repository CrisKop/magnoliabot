const Discord = require("discord.js");
const db = require("megadb");

exports.run = async (client, message, args) => {
  let db_muterole = new db.crearDB("RoleMuted");

  let permiso = message.member.hasPermission("ADMINISTRATOR");
  if (!permiso) return message.reply("no tienes perms.");

  let role = message.mentions.roles.first();
  if (!role) return message.channel.send("Debes mencionar un role");

  db_muterole.establecer(`${message.guild.id}`, `${role.id}`);
  message.channel.send({
    embed: {
      color: "00f00f",
      title: "Mute Role Updated.",
      description: `Role: <@&${role.id}>`
    }
  });
};
