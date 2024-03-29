const Discord = require("discord.js");
const db = require("megadb")
let prefix_db = new db.crearDB("prefixes");

exports.run = async (client, message, args) => {
    
    let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
        "❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Administrador` para ejecutar ese comando**"
      );

    if(!args[0]) return message.channel.send("❌ Debes colocar un prefix");
    if(args[0].length > 4) return message.channel.send("❌ El prefix debe contener menos de 4 caracteres");
    await message.channel.send("❌ `|` **Cambiando prefix...**").then(m => m.delete({ timeout: 2000 }))
    await message.channel.send("❌ `|` **Verificando servidor...**").then(m => m.delete({ timeout: 2000 }))
    await message.channel.send("❌ `|` **Verificando que no eres un robot...**").then(m => m.delete({ timeout: 2000 }))
    prefix_db.establecer(`${message.guild.id}`, args[0]);
    message.channel.send("☑️ El prefix fue cambiado a `" + args[0] + "`");
}