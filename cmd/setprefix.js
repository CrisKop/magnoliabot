const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");
  
  let prefix_db = new db.crearDB("prefixes");
  
  let X = args.join(" ")
  
  
  
  if(!args.join(" ")) return message.channel.send("**Coloca un Prefix**")
  
  prefix_db.establecer(`${message.guild.id}`, X) 
  await message.channel.send("**Prefix Colocado como: " + X + "**")
}