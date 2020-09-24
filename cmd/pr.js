const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");

  let idioma = new db.crearDB("Idioma");

  let skr = await idioma.obtener(message.guild.id);
  
  if(!idioma.tiene(message.guild.id)) return message.channel.send("No hay ningun idioma predefinido usa `f/setlang <español/english>`")

  if (skr.includes("Español")) {
    message.channel.send("Hola, puedes colocar f/ayuda");
  }

  if (skr.includes("English")) {
    message.channel.send("Hello, can you put a f/help");
  }
};
