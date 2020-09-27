exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
  const sug = new db.crearDB("Sugerencias");
  const moment = require("moment");
  require("moment-duration-format");
  const mencion = new db.crearDB("MencionSuggest");
  let rol = await mencion.obtener(message.guild.id);

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
      `🌻 **Sugerencia:** \`${xd}\` \n👤 **Enviada Por:** ${message.author} \n⌛ **Hora:** ${fecha}`
    )
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL());
  canalrendered.send(`${rol ? `<@&${rol}>` : "📛 `|` **__No hay ningun role configurado para mencionar__**"}`); //"📛 `|` **__No hay ningun role configurado para mencionar__**"
  canalrendered.send(embed).then(msg => {
    msg.react("☑️");
    msg.react("❌");
  });
};
