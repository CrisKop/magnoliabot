exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  const db = require("megadb")
  const mencion = new db.crearDB("MencionSuggest")
  let role = message.mentions.roles.first()
  if(!role) return message.channel.send("❌ `|` **Debes mencionar un role para configurarlo**")
  
  mencion.establecer(message.guild.id, role.id)
  message.channel.send("☑️ `|` **Role establecido correctamente para mencionar en las sugerencias** "+`<@&${role.id}>`)
}