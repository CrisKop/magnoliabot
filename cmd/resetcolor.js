const db = require("megadb");
const color = new db.crearDB("color");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user = message.author;
  let x = args.join(" ");
  // }
  let colorxd = await color.obtener(`${user.id}`);

   if(!color.tiene(message.author.id)) return message.channel.send("❌ `|` **No tienes ningun color** `No puedes borrar algo que no tienes`")
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription("☑️ Se ha reseteado tus colores")
      .setColor(colorxd)
  );
  color.delete(`${message.author.id}`, x);
};
