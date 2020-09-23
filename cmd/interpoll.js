exports.run = async (client, message, args) => {
  const db = require("megadb")
  let Discord = require("discord.js")
  let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  
  const interpoll = new db.crearDB("InterPoll")
  let inter = await interpoll.obtener("InterPoll")
  
  let xd = args.slice(0).join(" ")
  if(!xd) return message.channel.send("Debes digitar la contraseña")
  if(!interpoll.tiene(`${message.author.id}`)) return message.channel.send("Esa contraseña no existe")

  message.channel.send("Has colocalo la contraseña correcta")
}