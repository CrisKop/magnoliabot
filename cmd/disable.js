exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          `🚘 Sistemas de Desactivacion 🚘`,
          message.author.displayAvatarURL()
        )
        .setDescription(
          "🌐 **Sistema Sugerencias:** \n👤 `|` **__Si desea eliminar el canal de sugerencias:__** `disable sugerencias` \n📜 `|` **__Si desea establecer el canal de sugerencias:__** `setsugerencia <#canal>`"
        )
    );


  if (args[0] === "sugerencias") {
    const db = require("megadb");
    const sug = new db.crearDB("Sugerencias");
    if (!sug.tiene(message.guild.id))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(`❌ | Ha Ocurrido Un Error | ❌`)
          .setDescription(
            "🏭 `|` **__No hay ningun canal establecido, por lo tanto no puedes eliminar algo que no hay__**"
          )
          .setColor("RED")
      );
    sug.eliminar(message.guild.id);
    message.channel.send("☑️ `|` **El canal de sugerencias ha sido eliminado correctamente**")
  }
};
