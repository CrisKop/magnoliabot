exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
 const ali = new db.crearDB("Alianzas");
  
   if (!message.member.hasPermission("MANAGE_GUILD")) {
     return message.channel.send("❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Gestionar Servidor` para ejecutar ese comando**")
   }

  if(!args[0]) return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(`📛 | Ocurrio Un Error... | 📛`, client.user.displayAvatarURL())
  .setDescription("❌ `|` **__Para definir el role usa:__** `setmention alianza <#canal>`")
  .setColor("RANDOM")
  
  )
  if (args[0] === "alianza") {
    let canal = message.mentions.channels.first();
    if (!canal)
      return message.channel.send(
        "❌ `|` **Debes mencionar un canal **"
      );

    ali.establecer(message.guild.id, canal.id);
    message.channel.send(
      "☑️ `|` **Canal establecido correctamente para las alianzas** " +
        `<#${canal.id}>`
    );
  }
};
