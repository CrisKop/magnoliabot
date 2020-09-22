const raiders = require("../raiders.json"); //definimos el archivo

const fs = require("fs"); //El fs de toda la vida (para archivos)
const Discord = require("discord.js"); //Para los embeds etc

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      "**Necesitas el permiso de `Banear Miembros` para usar el comando.**"
    );

  var arrayids = [];
  for (var id in raiders) {
    if (!raiders[id].status) continue;
    arrayids.push(id);
    message.guild.members.ban(id);
  }

  const embed = new Discord.MessageEmbed()
    .setAuthor("🔎 Forceban")
    .setThumbnail(
      "https://images-ext-2.discordapp.net/external/WjONKM5JNmZ5_wJCS0VcBO5jJRYEJeuN1AllHZqp1KU/%3Fwidth%3D499%26height%3D499/https/media.discordapp.net/attachments/704073921527414845/705892480352256050/talento.png"
    )
    .setDescription(
      "**🖥️ `|` " +
        arrayids.length +
        " usuarios maliciosos han sido baneados.**"
    )
    .setTimestamp()
    .setFooter("Recuerda que este proceso puede tardar unos minutos")
    .setColor("#36393e");

  message.channel.send(embed);
  // channel.send("<@&731535699966296115>")
};
