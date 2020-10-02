const db = require("megadb");
let Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "❌ No tienes los permisos suficientes para usar este comando n.n"
        )
        .setColor("RANDOM")
    );

  const forceban = new db.crearDB("Ids");
  let i = await forceban.obtener("ids");

  const embed = new Discord.MessageEmbed()
    .setAuthor("🔎 Forceban")
    .setThumbnail(
      "https://images-ext-2.discordapp.net/external/WjONKM5JNmZ5_wJCS0VcBO5jJRYEJeuN1AllHZqp1KU/%3Fwidth%3D499%26height%3D499/https/media.discordapp.net/attachments/704073921527414845/705892480352256050/talento.png"
    )
    .setDescription(
      "**🖥️ `|` " + i.length + " usuarios maliciosos han sido baneados.**"
    )
    .setTimestamp()
    .setFooter("Recuerda que este proceso puede tardar unos minutos")
    .setColor("#36393e");

  message.channel.send(embed);
  i.forEach(id => {
    message.guild.members.ban(id.toString());
  });
};
