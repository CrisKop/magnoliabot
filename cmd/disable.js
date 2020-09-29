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
          "🌐 **Sistema Sugerencias:** \n👤 `|` **__Si desea eliminar el canal de sugerencias:__** `disable sugerencias` \n📜 `|` **__Si desea establecer el canal de sugerencias:__** `setsugerencia <#canal>` \n🧻 `|` **__Si desea eliminar la mencion de la sugerencia__** `disable suggmencion` \n🖍️ `|` **__Si desea configurar la mencion para las sugerencias__** `setmention <@role>` \n\n🥊 **Sistema Bienvenidas:** \n🍹 `|` **__Si desea configurar las bienvenidas usa:__** `setwelcome <#canal>` \n🖼️ `|` **__Si desea configurar la imagen usa:__** `setwelcomeimg <url>` \n☣️ `|` **__Si desea eliminar las bienvenidas usa:__** `disable bienvenidas`"
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
  if(args[0] === "suggmencion"){
  let Discord = require("discord.js")
  const db = require("megadb")
  const mencion = new db.crearDB("MencionSuggest")
  
  if (!mencion.tiene(message.guild.id))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(`❌ | Ha Ocurrido Un Error | ❌`)
          .setDescription(
            "🏭 `|` **__No hay ningun role establecido para la mencion, por lo tanto no puedes eliminar algo que no hay__**"
          )
          .setColor("RED")
      );
  mencion.eliminar(message.guild.id)
  message.channel.send("☑️ `|` **La mencion de las sugerencias han sido eliminadas correctamente**")
}
if(args[0] === "bienvenidas"){
    let Discord = require("discord.js")
  const db = require("megadb")
  let welcome_db = new db.crearDB("setwelcome", "welcomeleave");
   if (!welcome_db.tiene(message.guild.id))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(`❌ | Ha Ocurrido Un Error | ❌`)
          .setDescription(
            "🏭 `|` **__ny__**"
          )
          .setColor("RED")
      );
  welcome_db.eliminar(message.guild.id)
  message.channel.send("☑️ `|` **Las bienvenidas han sido eliminadas correctamente**")
}
};
