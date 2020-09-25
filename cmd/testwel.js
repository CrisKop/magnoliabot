const Discord = require("discord.js");
exports.run = async (client, message, args) => {
if (message.author.id !== "692363394719809577") return message.channel.send("Solo lo puede usar mi creador")
      let embed = new Discord.MessageEmbed()
      .setAuthor(`🎉 >> | Simulando Entrada al Servidor`)
      .addField("Usuario:", message.author)
      .addField("ID Canal:", message.guild.id)
      .setColor("RANDOM")
      message.channel.send(embed);

    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.users.fetch(message.author))
    );
  }