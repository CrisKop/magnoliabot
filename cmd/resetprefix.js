exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
const db = require("megadb")
let prefix_db = new db.crearDB("prefixes");
let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
       "❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Administrador` para ejecutar ese comando**"
      );
   if(!args[0]) await prefix_db.delete(`${message.guild.id}`, "f/")
   message.channel.send("☑️ El prefix se ha reseteado correctamente a `f/`")
}