const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");
  
  let prefix_db = new db.crearDB("prefixes");
  
  let X = args.join(" ")
  
  prefix_db.establecer(`${message.guild.id}`, X)
  
  if(X < 5) return message.channel.send("**El Prefix no puede contener mas de 5 Caracteres**")
  
  if(!args.join(" ")) return message.channel.send("**Coloca un Prefix**")
  
  
}