const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const db = require("megadb")

const dev = ["692363394719809577", "520988949053702145"]   
if (!dev.includes(message.author.id)) return message.channel.send("❌ `|` **No tienes permisos Suficientes**")

  if(!args[0]) return message.channel.send("❌ `|` **Debes definir que quieres agregarlo como: **\n`Developer` - `Admin` - `Mod` - `Soporte` - `Etc`")
   
  if(args[0] === "Developer") {
    const developers_db = new db.crearDB("Developers", "Staff");
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
    client.users.cache.get(user).send("✅ `|` **Has sido establecido correctamente en la base de datos de los Desarrolladores del bot**")
  }
  
  if(args[0] === "Admin") {
const admins_db = new db.crearDB("Admins", "Staff");
    
    let user = message.mentions.users.first() || client.users.cache.get[0] || args[0];

    if (!user)
     return message.channel.send("❌ `|` **Debes mencionar un usuario**")
    if (!admins_db.tiene("Admins")) {
      admins_db.establecer("Admins", []);
    }

    if (!admins_db.tiene("Admins")) {
      admins_db.establecer("Admins", []);
    }

    const premium = await admins_db.obtener("Admins");
    if (premium.includes(user.id) == true)
      return message.channel.send("❌ `|` **Este usuario ya pertenece a la base de datos de los STAFFS**")

    await admins_db.push("Admins", user.id);
    message.channel.send("✅ `|` **Usuario establecido correctamente en la base de datos de los STAFFS del bot**")
    client.users.cache.get(user).send("✅ `|` **Has sido establecido correctamente en la base de datos de los Administradores del bot**")
  }
  
    if(args[0] === "Mod") {
const mods_db = new db.crearDB("Mods", "Staff");
    
    let user = message.mentions.users.first() || client.users.cache.get[0] || args[0];

    if (!user)
     return message.channel.send("❌ `|` **Debes mencionar un usuario**")
    if (!mods_db.tiene("Mods")) {
      mods_db.establecer("Mods", []);
    }

    if (!mods_db.tiene("Mods")) {
      mods_db.establecer("Mods", []);
    }

    const premium = await mods_db.obtener("Mods");
    if (premium.includes(user.id) == true)
      return message.channel.send("❌ `|` **Este usuario ya pertenece a la base de datos de los STAFFS**")

    await mods_db.push("Mods", user.id);
    message.channel.send("✅ `|` **Usuario establecido correctamente en la base de datos de los STAFFS del bot**")
    client.users.cache.get(user).send("✅ `|` **Has sido establecido correctamente en la base de datos de los Moderadores del bot**")
  }
}