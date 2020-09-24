const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const db = require("megadb"); 

let idioma = new db.crearDB("Idioma");

if(args[0] === "español") {
   await idioma.establecer(message.guild.id, "Español")
    message.channel.send("**__Español__** Definido como el lenguaje oficial del servidor")
}

if(args[0] === "english") {
   await idioma.establecer(message.guild.id, "English") 
    message.channel.send("**__English__** Set are languaje official in server")
}
}