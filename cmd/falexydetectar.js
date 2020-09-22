const Discord = require("discord.js");
const fs = require("fs");
const raiders = require("../raiders.json");

module.exports.run = async (client, message, args, perm) => {
  if (perm) return message.channel.send(perm);
  var arr = [];
  for (var key in raiders) {
    if (!message.guild.members.cache.get(key)) continue;
    if (!raiders[key].status) continue;
    arr.push([key, raiders[key].reason, raiders[key].prueba]);
  }

  let top = arr.splice(0, 25);

  let final = [];
  for (let x = 0; x < top.length; x++) {
    final.push(
      "📌 **#**" +
        parseInt(x + 1) +
        " <@" +
        top[x][0] +
        "> (" +
        top[x][0] +
        ") **Razon:** " +
        top[x][1]
    );
  }
  if (final.length < 1)
    return message.channel.send(
      "**:lock: `|` No he detectado ningún raider en este servidor.**"
    );

  const embed = new Discord.MessageEmbed()
    .setDescription(
      "💺 `|` Detección de **" +
        parseInt(top.length) +
        "** usuarios malicioso en **" +
        message.guild.name +
        "**\n\n" +
        final.join("\n")
    )
    .setThumbnail(
      "https://media.discordapp.net/attachments/681458243524231188/705913161861169172/buscar.png?width=499&height=499"
    )
    .setColor("RANDOM");

  message.channel.send(embed);
};
