exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let perms = message.member.hasPermission("MANAGE_MESSAGES");

  if (!perms)
    return message.channel.send(
      "No tienes permisos"
    );
  const channel = message.mentions.channels.first() || message.channel;

  //en esta constante definimos un canal mencionado y si no el canal donde se ejecuto el cmd

  const msg = client.snipes.get(channel.id);
  if (!msg) {
    message.channel
      .send("❌ `|` **__No hay ningun mensaje borrado actualmente__**")
      .then(m => m.delete({ timeout: 5000 }));
  } else {
    const main = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/attachments/739147561763602533/748980296229060738/3347644.png")
      .setAuthor(`Se vio un mensaje eliminado de: ${msg.delete.tag}`, client.user.displayAvatarURL())
      .addField("📜 `|` **__Mensaje:__**", msg.content)
      .addField("🍬 `|` **__Canal:__**", `<#${msg.canal.id}>`)
      .setTimestamp()
      .setFooter("Mensaje Borrado Por: "+message.author.username)

    message.channel.send(main).catch(e => { //<#${msg.canal.id}> ${msg.delete.tag}
      message.channel.send(
        "❌ `|` **Parece que hubo un error**"
      );
    });
  }
};