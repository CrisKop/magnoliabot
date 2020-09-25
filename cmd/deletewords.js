exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const words = new (require("megadb")).crearDB("Palabras");
  let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms) return message.channel.send("No tienes permisos");

  if (!words.tiene(message.guild.id))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`❌ | Ha Ocurrido Un Error | ❌`)
        .setDescription("🏭 `|` **__No hay palabras para eliminar__**")
        .setColor("RED")
    );

  if (words.tiene(`${message.guild.id}`)) {
    let xd = await words.obtener(`${message.guild.id}`);
  } else {
    words.establecer(`${message.guild.id}`, []);
  }

  words.establecer(`${message.guild.id}`, []);

  message.channel.send("☑️ `|` **Las palabras han sido eliminadas**");
};
