const Discord = require("discord.js")
const raiders = require("../raiders.json")
exports.run = async (client, message, args) => {
  const db = require("megadb")

  let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
   let u = args[0]
  const dev = client.users.cache.get(u) || client.users.fetch(u);
  if (!u) return message.channel.send("**Escriba la ID para ver si esta en mi base de datos** \n`Modo Correcto:` **" + prefix + "falexyinfo <id>**")
  let a = []
  for (var key in raiders) {
    if (!raiders[u]) return message.channel.send("**Esa ID no está registrada en mi base de datos**")
    if (raiders[u].status === "Off") return message.channel.send("**Esa ID no está registrada en mi base de datos**")
  }
  
  const embed = new Discord.MessageEmbed()
    .setAuthor('Información de ' + `${u}`)
    .addField('**:bust_in_silhouette: Usuario**', '<@' + u + '>', true)
    .addField('**:unlock: Tag**', dev.tag, true)
    .addField('**🗓️ Cuenta creada**', dev.createdAt.toLocaleString(), true)
    .addField('**:id: ID**', u, true)
    .addField('**:ballot_box: Razón**', [raiders[u].reason], true)
    .addField('**🗓️ Fecha de la Sanción**', [raiders[u].fecha], true)
    .addField('**👮 Autor de la Sanción**', [raiders[u].author], true)
    .addField("**☄️ Server:**", [raiders[u].server], true)
    .addField('**:camera: Pruebas**', "[Click Aquí]("+[raiders[u].pruebas]+")", true)
    .setColor('#36393e')
    .setThumbnail(dev.avatarURL())
  message.channel.send(embed)
}