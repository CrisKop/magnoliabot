exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
  const sug = new db.crearDB("Sugerencias");
  const moment = require("moment");
  require("moment-duration-format");
  const mencion = new db.crearDB("MencionSuggest")
  let rol = await mencion.obtener(message.guild.id)

  let suggest = await sug.obtener(`${message.guild.id}`);
  if (!sug.tiene(`${message.guild.id}`))
    return message.channel.send(
      "❌ `|` **Aun no esta establecido el canal de sugerencias \nContacte con un administrador para que lo defina**"
    );
  const canalrendered = client.channels.cache.get(suggest);

  let xd = args.join(" ");
  if (!xd)
    return message.channel.send("❌ `|` **Debes colocar una sugerencia**");

  let fecha = moment().format("MMM Do YY");     

  message.channel.send("☑️ `|` **Sugerencia enviada correctamente**");
  const embed = new Discord.MessageEmbed()
    .setAuthor(`🌐 | Nueva Sugerencia | 🌐`, client.user.displayAvatarURL())
    .addField(
      "📜 **__Datos Sugerencia__**",
      `🌻 **Sugerencia:** \`${xd}\` \n👤 **Enviada Por:** ${message.author} \n⌛ **Hora:** ${fecha} \n\n🟡 **Estado:** \`Pendiente\``
    )
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL());
  canalrendered.send(`<@&${rol ? `${rol}>` : "No hay ningun role configurado para mencionar"}`)
  canalrendered.send(embed).then(msg => {
    msg.react("☑️");
    msg.react("❌");
//     msg.awaitReactions((reaction, user) => {
//       if (msg.guild.owner.id != user.id && !msg.guild.member(user).hasPermission("MANAGE_GUILD"))
//         return user.send(
//           new Discord.MessageEmbed()
//             .setAuthor(`📛 Sin Permisos 📛`)
//             .setColor("RANDOM")
//             .setThumbnail(client.user.displayAvatarURL())
//             .setDescription(
//               "📛 **NO TIENES PERMISOS PARA REACCIONAR A LA SUGERENCIA**"
//             )
//         ).cacth(e => {
//           message.channel.send("No pude enviarle el mensaje al usuario")
//         })

//       if (message.author.id !== user.id) return;
//       if (reaction.emoji.name === "☑️") {
//         const embed1 = new Discord.MessageEmbed()
//           .setAuthor(
//             `🌐 | Sugerencia Aceptada | 🌐`,
//             client.user.displayAvatarURL()
//           )
//           .addField(
//             "📜 **__Datos Sugerencia__**",
//             `🌻 **Sugerencia:** \`${xd}\` \n👤 **Enviada Por:** ${message.author} \n⌛ **Hora:** ${fecha} \n\n✳️ **Estado:** \`Aceptada\``
//           )
//           .setColor("GREEN")
//           .setThumbnail(message.author.displayAvatarURL());
//         msg.edit(embed1);
//         msg.reactions.removeAll();
//       }
//       if (reaction.emoji.name === "❌") {
//         const embed2 = new Discord.MessageEmbed()
//           .setAuthor(
//             `🌐 | Sugerencia Rechazada | 🌐`,
//             client.user.displayAvatarURL()
//           )
//           .addField(
//             "📜 **__Datos Sugerencia__**",
//             `🌻 **Sugerencia:** \`${xd}\` \n👤 **Enviada Por:** ${message.author} \n⌛ **Hora:** ${fecha} \n\n⛔ **Estado:** \`Rechazada\``
//           )
//           .setColor("RED")
//           .setThumbnail(message.author.displayAvatarURL());
//         msg.edit(embed2);
//         msg.reactions.removeAll();
//       }
//     });
//   });
});
}