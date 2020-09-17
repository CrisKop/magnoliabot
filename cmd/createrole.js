const Discord = require("discord.js");
const toHex = require("colornames");

exports.run = async (client, message, args) => {
  const name = args.slice(1).join(" ");
  const regex = !/[^a-zA-Z0-9]+/g.test(name);
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send("❌ No tienes permisos de `Gestionar Roles`");
  }
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
    return message.channel.send("❌ No tengo permisos de `Gestionar Roles`");
  }
  if (!args[0]) {
    return message.channel.send(
      "❌ **Se ha detectado un error en los argumentos** \nModo Correcto: `createrole <colorname> <Name>`"
    );
  }
  if (!name) {
    return message.channel.send("❌ Necesitas especificar el nombre del role");
  }
  if (regex === false) {
    return message.channel.send(
      "❌ El nombre es invalido, solo puede contener letras y numeros"
    );
  }
  if (name.length > 100) {
    return message.channel.send(
      "❌ Tu role no puede sobrepasar los 100 caracteres"
    );
  }
  message.guild.roles.create({
    data: {
      name: name,
      color: toHex(args[0])
    }
  });
  let embed = new Discord.MessageEmbed()
    .setAuthor(
      `${message.author.username} - (${message.author.id})`,
      message.author.displayAvatarURL()
    )
    .setColor("RANDOM").setDescription(`
🧻 **Role: ** ${name}
🔥 **Accion: ** Nuevo Role Creado
🧭 **Role Color: ** ${args[0]}
🖥️ **Canal: ** ${message.channel}
👤 **Por: ** ${message.member}
      `);
  message.channel.send(embed);
};
