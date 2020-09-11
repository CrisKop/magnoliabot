exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let user = message.author;
  const db = require("megadb");
  const vips_db = new db.crearDB("Vips");
  const vip = await vips_db.obtener("Vips");
  if (vip.includes(user.id) == false)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "❌ No eres VIP y por lo tanto no puedes ejecutar este comando"
        )
        .setColor("RED")
    );

  const embed = new Discord.MessageEmbed()
    .setAuthor(`Lista Emojis Personalizados`, message.author.displayAvatarURL())
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription("**Emojis:** \n\n`Regalo` 🎁 \n`Futbol` ⚽ \n`Tecnico` 🛠️")
    .setFooter("Usa: `setemoji <emoji-nombre>`");
  message.channel.send(embed);
};
