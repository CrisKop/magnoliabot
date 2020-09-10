exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const db = require("megadb")
  const items = new db.crearDB("Tienda")
  let it = await items.obtener("Tienda")
  
  let xd = args[0]
  if(!xd) return message.channel.send("❌ `|` **Debes crear un nombre para el item**")
  
  let 
  
  items.push(message.guild.id, xd)
}