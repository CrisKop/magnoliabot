const Discord = require("discord.js");
const db = require("megadb");

exports.run = async (client, message, args) => {
  let mute = new db.crearDB("RoleMuted");

  let permiso = message.member.hasPermission("ADMINISTRATOR");
  if (!permiso)
    return message.reply(
      "❌ `|` **Perdon " +
        `${message.author}` +
        ", No tienes permisos de `Administrador` para ejecutar ese comando**"
    );

  let role = message.mentions.roles.first();
  if (!role) return message.channel.send("❌ `|` **Debes mencionar un role**");

  if (role.comparePositionTo(message.guild.me.roles.highest) > 0)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "❌ `|` **No puedo establecer el role mencionado, porque ese role esta por encima de mi role**"
      )
    );

  mute.establecer(message.guild.id, role.id)
  message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(`✅ | Role Seleccionado Correctamente | ✅`, client.user.displayAvatarURL())
  .setDescription("♾️ `|` **Informacion/Datos:**", `📌 **__Role:__** <@&${role}> \n👮 **Creado Por:__** ${message.author}`)
  .setColor("RED")
  
  
  )
}