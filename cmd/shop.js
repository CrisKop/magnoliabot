
exports.run = async (client, message, args) => {  
  
  const Discord = require("discord.js");
  const db = require("megadb");
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
let bot = client.user.username;
  let botavatar = client.user.displayAvatarURL();
  //let user =
  //message.mentions.members.first() ||
  //client.users.get(args[0]) ||
  //message.author;
  
  const items = new db.crearDB("Tienda")
  let it = await items.obtener("Items")

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()

        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Usa " + prefix + "buy [objeto] para comprar")
        .setThumbnail(
          "https://images.emojiterra.com/google/android-10/128px/1f3ea.png"
        )
        .setAuthor(bot + " ┊ Tienda", botavatar)
        .setDescription(
          "**Para comprar las medallas debes tener tu money en:** `Dinero`"
        )
        .addField("🏅 Items:", `${it.join("\n\n") ? `**${it.join("\n\n")}**` : "No hay Items en la tienda"}`)
    );
}