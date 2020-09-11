const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");
  
  let idioma = new db.crearDB("Idioma");
  
  if(args[0] === "español") {
    
    idioma.establecer(message.guild.id, "español")
    await message.channel.send("Español Obtenido como Idioma oficial del servidor")
    
  }
  
  if(args[0] === "ingles") {
    
    idioma.establecer(message.guild.id, "ingles")
    await message.channel.send("English getting are lang official the guild")
  }
  
  idioma.push(`${message.guild.id}`, `${args[0]}`)
  
}