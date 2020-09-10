const megadb = require("megadb");
const color = new megadb.crearDB("color");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user = message.author;
  let x = args.join(" ");
  color.delete(`${message.author.id}`, x);
  // }
  let colorxd = await color.obtener(`${user.id}`);

  //if(!color.tiene(`${message.guild.id}`)) return message.channel.send("❌ `|` **No tienes ningun color**")
  await message.channel.send("❌ `|` **Espera un momento...**").then(m => m.delete({ timeout: 2000 }))
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription("☑️ Se ha reseteado tus colores")
      .setColor(colorxd)
  );
};
