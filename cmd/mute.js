exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  let mute = new db.crearDB("RoleMuted");
  let rol = await mute.obtener(message.guild.id);
  let permiso = message.member.hasPermission("MANAGE_GUILD");
  let mencionado = message.mentions.members.first();
  let razon = args.slice(1).join(" ") || "Razon Indefinida";

  if (!permiso)
    return message.reply(
      "❌ `|` **Perdon " +
        `${message.author}` +
        ", No tienes permisos de `Gestionar Server` para ejecutar ese comando**"
    );

  if (!mute.tiene(message.guild.id))
    return message.channel.send(
      "❌ `|` **__No se ha establecido el role para mutear al usuario__** \nUsa: `setmuterole <@role>`"
    );

  if (!mencionado)
    return message.reply("❌ `|` **Debes mencionar un usuario**");

  if (!rol)
    ({}.then(role => {
      message.guild.channels.cache.forEach(r =>
        r.updateOverwrite(role.id, {
          SEND_MESSAGES: false
        })
      );
    }));

  if (mencionado.roles.cache.has(rol))
    return message.channel.send("❌ `|` **Este usuario ya esta muteado**");
  mencionado.roles.add(rol);
  const embedmute = new Discord.MessageEmbed()
    .setAuthor(
      `🔇 | Usuario ${mencionado.user.username} Ha sido muteado | 🔇`,
      mencionado.user.displayAvatarURL()
    )
    .addField(
      "🏅 `|` **Datos Muteo:**",
      `👤 **__Usuario Muteado:__** ${mencionado} \`[${mencionado.id}]\` \n👮 **__Responsable:__** ${message.author.tag} \`[${message.author.id}]\` \n📜 **__Razon:__** ${razon}`
    );
  message.channel.send(embedmute);
};
