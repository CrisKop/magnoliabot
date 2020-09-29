exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  let ac = new (require("megadb")).crearDB("AntiChannel");
    let ar = new (require("megadb")).crearDB("AntiRoles");
  
  let user = message.author;
const developers_db = new db.crearDB("Developers");
  const staff = await develpep_db.obtener("Developers");
  if(staff.includes(user.id) == false) return message.channel.send("No tienes permisos, por que no eres STAFF del bot")
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          `🚘 Sistemas de Desactivacion (STAFF) 🚘`,
          message.author.displayAvatarURL()
        )
        .setDescription(
          "🌐 **Sistema Filtros (DESACTIVAR):** \n👤 `|` **__Si desea quitar los filtros `Anti-Channel` y `Anti-Role` "+prefix+"disableantis"
        )
    );
ar.eliminar(message.guild.id)
ac.eliminar(message.guild.id)
message.channel.send("[STAFF] **__Se han desactivado los filtros `Anti-Channel` y `Anti-Roles`")
}

