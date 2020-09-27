exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const mencion = new db.crearDB("MencionSuggest");

  if(!args[0]) return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(`📛 | Ocurrio Un Error... | 📛`, client.user.displayAvatarURL())
  .setDescription("❌ `|` **__Para definir el role usa:__** `setmention sugerencia @role`")
  .setColor("RANDOM")
  
  )
  if (args[0] === "sugerencia") {
    let role = message.mentions.roles.first();
    if (!role)
      return message.channel.send(
        "❌ `|` **Debes mencionar un role para configurarlo**"
      );

    mencion.establecer(message.guild.id, role.id);
    message.channel.send(
      "☑️ `|` **Role establecido correctamente para mencionar en las sugerencias** " +
        `<@&${role.id}>`
    );
  }
};
