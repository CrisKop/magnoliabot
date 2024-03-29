const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const db = require("megadb")

const dev = ["692363394719809577", "520988949053702145"]   
if (!dev.includes(message.author.id)) return message.channel.send("❌ `|` **No tienes permisos Suficientes**")
  
    const developers_db = new db.crearDB("Developers"); //>:c
    let user = message.mentions.users.first() || client.users.cache.get[0] || args[0];

    if (!user)
     return message.channel.send("❌ `|` **Debes mencionar un usuario**")
    
   
    if (!developers_db.tiene("Developers")) {
      developers_db.establecer("Developers", []);
    }

    if (!developers_db.tiene("Developers")) {
      developers_db.establecer("Developers", []);
    }

    const premium = await developers_db.obtener("Developers");
    if (premium.includes(user.id) == true)
      return message.channel.send("❌ `|` **Este usuario ya pertenece a la base de datos de los STAFFS**")

    await developers_db.push("Developers", user.id);
    message.channel.send("✅ `|` **Usuario establecido correctamente en la base de datos de los STAFFS del bot**")
    client.users.cache.get(user.id).send("✅ `|` **Has sido establecido correctamente en la base de datos de los Desarrolladores del bot**").catch(e => {
     message.channel.send("❌ `|` **Hubo un error...** "+ e)
   })
  }