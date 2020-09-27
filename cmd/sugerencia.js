exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
  const sug = new db.crearDB("Sugerencias");
  const moment = require("moment");
  require("moment-duration-format");

  let suggest = await sug.obtener(`${message.guild.id}`);
  if (!sug.tiene(`${message.guild.id}`))
    return message.channel.send(
      "❌ `|` **Aun no esta establecido el canal de sugerencias \nContacte con un administrador para que lo defina**"
    );
  const canalrendered = client.channels.cache.get(suggest);

  let xd = args.join(" ");
  if (!xd)
    return message.channel.send("❌ `|` **Debes colocar una sugerencia**");

  let fecha = moment().format("MMMM Do YYYY, h:mm:ss a");

  message.channel.send("☑️ `|` **Sugerencia enviada correctamente**");
  const embed = new Discord.MessageEmbed()
    .setAuthor(`🌐 | Nueva Sugerencia | 🌐`, client.user.displayAvatarURL())
    .addField(
      "📜 **__Datos Sugerencia__**",
      `🌻 **Sugerencia:** \`${xd}\` \n👤 **Enviada Por:** ${message.author} \n⌛ **Hora:** ${fecha}`
    )
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL());
  canalrendered.send(embed).then(msg => {
    msg.react("☑️");
    msg.react("❌");
    msg.awaitReactions((reaction, user) => {
      //Lo que hara el primer emoji afectara al primer embed
      if (message.author.id !== user.id) return;
      if (reaction.emoji.name === "☑️") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            `🌐 | Sugerencia Aceptada | 🌐`,
            client.user.displayAvatarURL()
          )
          .addField(
            "📜 **__Datos Sugerencia__**",
            `🌻 **Sugerencia:** \`${xd}\` \n👤 **Enviada Por:** ${message.author} \n⌛ **Hora:** ${fecha} \n\n✳️ **Estado:** Aceptada`
          )
          .setColor("GREEN")
          .setThumbnail(message.author.displayAvatarURL());
        msg.reactions.removeAll()
      }
      if (reaction.emoji.name === "❌") {
       const embed2 = new Discord.MessageEmbed()
          .setAuthor(
            `🌐 | Sugerencia Rechazada | 🌐`,
            client.user.displayAvatarURL()
          )
          .addField(
            "📜 **__Datos Sugerencia__**",
            `🌻 **Sugerencia:** \`${xd}\` \n👤 **Enviada Por:** ${message.author} \n⌛ **Hora:** ${fecha} \n\n✳️ **Estado:** Rechazada`
          )
          .setColor("RED")
          .setThumbnail(message.author.displayAvatarURL());
        msg.edit(embed2)
        msg.reactions.removeAll()
      }
    });
  });
};
