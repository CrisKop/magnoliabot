exports.run = async (client, message, args) => {
if (!sug.tiene(message.guild.id))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(`❌ | Ha Ocurrido Un Error | ❌`)
          .setDescription(
            "🏭 `|` **__No hay ningun canal establecido, por lo tanto no puedes eliminar algo que no hay__**"
          )
          .setColor("RED")
      );
    sug.eliminar(message.guild.id, canal.id);