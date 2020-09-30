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
    )
    .addField(
      "☣️ `|` **__Bots Aliados:__**",
      "**SD Protection:** `Reacciona con: 🏅` \n**Wolf Security** `Reacciona con: 🐺`"
    )
    .addField(
      "❌ `|` **__Cierra Panel:__**",
      "**Para cerrar el panel** `Reacciona con: ❌`"
    );
  message.channel.send(embed).then(msg => {
    msg.react("🐺");
    msg.react("🏅");
    msg.react("❌")
    msg.awaitReactions((reaction, user) => {
      if (message.author.id !== user.id) return;
      if (user.bot) return;
      if (reaction.emoji.name === "🐺") {
        const wolf = new Discord.MessageEmbed()
          .setThumbnail(
            "https://cdn.discordapp.com/avatars/752518742692462672/d6ec7bae41e90a94c8da038abc3a0fba.webp"
          )
          .setAuthor(`🛠️ | Wolf Security | 🛠️`)
          .setColor("RANDOM")
          .setDescription(
            "**__Nota:__** `|` *Recuerda que puedes estar en los bots partners hablandole al dueño de Falexy Secure*"
          )
          .addField(
            "🐺 `|` **__Wolf Security:__**",
            "El cuenta con sistemas de seguridad y configuracion, para que sus discords este protegidos \n**[Invitame](https://discord.com/api/oauth2/authorize?client_id=752518742692462672&permissions=403712255&scope=bot)** `|` **[Server Soporte](https://discord.gg/W8nn78X)**"
          )
          .addField(
            "🍎 `|` **__Vuelve a este PANEL:__**",
            "**Para volver al panel principal** `Reacciona con: 🔴`"
          )
          .addField(
            "❌ `|` **__Cierra Panel:__**",
            "**Para cerrar el panel** `Reacciona con: ❌`"
          );
        reaction.users.remove(user);
        msg.edit(wolf).then(msg => {
          msg.react("🔴");
          msg.react("❌");
          msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;
            if (user.bot) return;
            if (reaction.emoji.name === "🔴") {
              msg.edit(embed);
              reaction.users.remove(user);
            }
            if (reaction.emoji.name === "❌") {
              const embed2 = new Discord.MessageEmbed().setDescription(
                "Cerrando Panel..."
              )
              .setColor("RED")
              msg.edit(embed2).then(m => m.delete({ timeout: 2000 }));
            }
          });
        });
      }
      if (reaction.emoji.name === "🏅") {
        const sd = new Discord.MessageEmbed()
          .setThumbnail(
            "https://cdn.discordapp.com/avatars/716457247642878002/68e6f8652abe3467755ba4a969a0d96d.webp"
          )
          .setAuthor(`🧭 | SD Protection | 🧭`)
          .setColor("RANDOM")
          .setDescription(
            "**__Nota:__** `|` *Recuerda que puedes estar en los bots partners hablandole al dueño de Falexy Secure*"
          )
          .addField(
            "🏅 `|` **__SD Protection:__**",
            "El bot cuenta con sistemas de seguridad, configuracion y diversion, para la mejor expectativa de sus servidores \n**[Invitame](https://discord.com/oauth2/authorize?client_id=716457247642878002&scope=bot&permissions=8)** `|` **[Server Soporte](https://discord.gg/GBzVVUK)**"
          )
          .addField(
            "🍎 `|` **__Vuelve a este PANEL:__**",
            "**Para volver al panel principal** `Reacciona con: 🔴`"
          )
          .addField(
            "❌ `|` **__Cierra Panel:__**",
            "**Para cerrar el panel** `Reacciona con: ❌`"
          );
        reaction.users.remove(user);
        msg.edit(sd).then(msg => {
          msg.react("🔴");
          msg.react("❌");
          msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;
            if (user.bot) return;
            if (reaction.emoji.name === "🔴") {
              msg.edit(embed);
              reaction.users.remove(user);
            }
            if (reaction.emoji.name === "❌") {
              const embed2 = new Discord.MessageEmbed().setDescription(
                "Cerrando Panel..."
              )
              .setColor("RED")
              msg.edit(embed2).then(m => m.delete({ timeout: 2000 }));
            }
          });
        });
      }
      if (reaction.emoji.name === "🔴") {
        msg.edit(embed);
        reaction.users.remove(user);
      }
      if (reaction.emoji.name === "❌") {
        const embed2 = new Discord.MessageEmbed().setDescription(
          "Cerrando Panel..."
        )
        .setColor("RED")
        msg.edit(embed2).then(m => m.delete({ timeout: 2000 }));
      }
    });
  });
};
