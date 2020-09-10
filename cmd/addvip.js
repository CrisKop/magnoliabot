const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const db = require("megadb")
const vips_db = new db.crearDB("Vips");

const dev = ["692363394719809577", "520988949053702145"]   
if (!dev.includes(message.author.id)) return message.channel.send("❌ `|` **No tienes permisos Suficientes**")

    let user = message.mentions.users.first() || client.users.cache.get[0] || args[0];

    if (!user)
      return message.channel.send("❌ `|` **Debes mencionar un usuario**")
    if (!vips_db.tiene("Vips")) {
      vips_db.establecer("Vips", []);
    }

    if (!vips_db.tiene("Vips")) {
      vips_db.establecer("Vips", []);
    } 

    const premium1 = await vips_db.obtener("Vips");
    if (premium1.includes(user.id) == true)
      return message.channel.send("❌ `|` **Este usuario ya pertenece a la base de datos de los Usuarios Vips del bot**")

    await vips_db.push("Vips", user.id);
    message.channel.send("✅ `|` **Usuario establecido correctamente en la base de datos de los Usuarios Vips del bot**")
}