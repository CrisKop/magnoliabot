exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      `🌐 | Partners Bots/Aliados | 🌐`,
      client.user.displayAvatarURL()
    )
    .setColor("RANDOM")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/758153151508643890/760946006036185138/3447560.png"
    )
    .setDescription(
      "🏬 `|` El apartado de PARTNERS, es para los bots que estan aliados con **[Wolf Security](https://discord.com/api/oauth2/authorize?client_id=752518742692462672&permissions=403712255&scope=bot)** | **[Falexy Secure](https://discord.com/api/oauth2/authorize?client_id=753340440001904841&permissions=8&scope=bot)**"
    );
  message.channel.send(embed).then(msg => {
    msg.react("");
    msg.react("");
    msg.awaitReactions((reaction, user) => {
      if (user.bot) return;
      if (reaction.emoji.name === "") {
        const wolf = new Discord.MessageEmbed()
          .setAuthor(`Wolf Security`)
          .addField(
            "🐺 `|` **__Wolf Security:__**",
            "El cuenta con sistemas de seguridad y configuracion, para que sus discords este protegidos \n**[Invitame](https://discord.com/api/oauth2/authorize?client_id=752518742692462672&permissions=403712255&scope=bot)** `|` **[Server Soporte](https://discord.gg/W8nn78X)**"
          );
        msg.edit(wolf);
      }
      if (reaction.emoji.name === "") {
        const sd = new Discord.MessageEmbed()
        .addField(
          "🏅 `|` **__SD Protection:__**",
          "El bot cuenta con sistemas de seguridad, configuracion y diversion, para la mejor expectativa de sus servidores \n**[Invitame](https://discord.com/oauth2/authorize?client_id=716457247642878002&scope=bot&permissions=8)** `|` **[Server Soporte](https://discord.gg/GBzVVUK)**"
        );
        
        msg.edit(sd);
      }
    });
  });
};
