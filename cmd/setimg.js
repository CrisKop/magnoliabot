let Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");
  let Discord = require("discord.js");
  let user = message.author;
  const vips_db = new db.crearDB("Vips");
  const vip = await vips_db.obtener("Vips");
  
  let prefix_db = new db.crearDB("prefixes") 
  
  var prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  if (vip.includes(user.id) == false)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "❌ No eres VIP y por lo tanto no puedes ejecutar este comando"
        )
        .setColor("RED")
    );
  const img_db = new db.crearDB("img");

  if (!args.join(" "))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("❌ `|` **Debes Especificar El enlace de la imagen**")
        .setColor("RED")
    );

  if (!message.content.includes("http"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("❌ `|` **Debe ser un enlace**")
        .setColor("RED")
    );

  img_db.establecer(`${message.author.id}`, args.join(" "));

  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription("☑️ `|` **Imagen para tu prefil seleccionado** `usa "+ `${prefix}perfil`+"`")
      .setColor("GREEN")
  );
};
