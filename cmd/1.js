const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");
  
  let idioma = new db.crearDB("Idioma")
  
  let lang = await idioma.obtener(message.guild.id)
  
  if(idioma.tiene(`${message.guild.id}`, "español")) {
    
   await message.channel.send("Hola")
    
  }
  if(idioma.tiene(`${message.guild.id}`, "ingles")) {
    
   await message.channel.send("Hello")
    
  }//XDDDD
  
  if(!idioma.tiene(`${message.guild.id}`)) {
    
    return message.channel.send("Hola")
    
  }
  
}