exports.run = async (client, message, args) => {
  message.delete()
  const db = require("megadb")

  let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  const interpoll = new db.crearDB("InterPoll")
  let xd = args.slice(0).join(" ")
  
  if(!xd) return message.channel.send("Debes crear una contraseña `La que tu quieras`")
  
  if(interpoll.tiene(message.author.id)) return message.channel.send("Ya creaste tu contraseña")
  interpoll.establecer(message.author.id, xd)
  message.channel.send("Se ha establecido una contraseña")
  message.author.send("La contraseña establecida es: "+ xd)
  
}