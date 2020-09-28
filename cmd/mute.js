exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  let db_muterole = new db.crearDB("RoleMuted");

  let permiso = message.member.hasPermission("MANAGE_GUILD");
  let mencionado = message.mentions.members.first();
  let razon = args.slice(1).join(" ");

  if (!permiso)
    return message.reply(
      "No tienes los permisos necesarios. \n`Gestionar_Servidor`"
    );
  if (!mencionado) return message.reply("Especifica a un miembro.");
  if (!razon) return message.channel.send("Especifica el motivo.");

  if (!db_muterole.tiene(message.guild.id))
    return message.channel.send(
      "En este servidor no esta el rol mute Establecido, Uso: **setmuterole [@rol]**"
    );

  let rol = await db_muterole.obtener(message.guild.id);

  if (mencionado.roles.cache.has(rol)) return message.channel.send("Este miembro ya esta muteado.");
  mencionado.roles.add(rol);

  const embedmute = new Discord.MessageEmbed()
    .setAuthor(`Muteado ${mencionado}`)
    .addField(`Moderator:`, `${message.author.username}`)
    .addField(`Miembro:`, `${mencionado}`)
    .addField(`Razon:`, `${razon}`);
  message.channel.send(embedmute); //enviamos
};
