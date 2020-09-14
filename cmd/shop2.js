const Discord = require("discord.js");
const db = require("megadb");

const dinero = new db.crearDB("Dinero");
const banco = new db.crearDB("Banco");
exports.run = async (client, message, args) => {
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  let bot = client.user.username;
  let botavatar = client.user.avatarURL();
  //let user =
  //message.mentions.members.first() ||
  //client.users.get(args[0]) ||
  //message.author;

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
        .addField(
          "🏅 Medallas:",
          "**[1]** 🛠️(Tecnico) **[1,500]** \n **[2]** ⚽(Football) **[5,000]** \n **[3]** 🏀(Basket) **[10,000]** \n **[4]** 🔰(Programador)",
          true
        )
    );
}