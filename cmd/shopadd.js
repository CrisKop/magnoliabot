exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  const db = require("megadb")
  
  let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }/**/
  
  const items = new db.crearDB("Tienda")
  let it = await items.obtener("Tienda")

  let args1 = args.join(" ").split(" | ")
  let xd = args1[0]
  if(!xd) return message.channel.send("❌ `|` **Debes crear un nombre para el item** `Modo correcto:` "+ `\n${prefix}shopadd <nombre> | <precio> | <descripcion>`)
  let price = args1[1]
  if(!price) return message.channel.send("❌ `|` **Debes colocar el precio del item** `Modo correcto:` "+ `\n${prefix}shopadd <nombre> | <precio> | <descripcion>`)
  let desc = args1[2]
  if(!desc) return message.chanel.send("❌ `|` **Debes colocar una descripcion al item** `Modo correcto:` "+ `\n${prefix}shopadd <nombre> | <precio> | <descripcion>`)
  
  
  if (!items.tiene("Items")) {
      items.establecer("Items", []);
    }
  
  items.push("Items", `${xd}**:\nPrecio: **${price}**\nDescripcion: **${desc}\n\n`)
 /* items.push("Items", desc)
  items.push("Items", price)*/
  message.channel.send("☑️ `|` **El item se ha creado correctamente**")
}