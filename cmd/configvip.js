exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
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
  let img2 = await img_db.obtener(`${user.id}`)
  let we;
  if (img_db.tiene(`${user.id}`)) {
    we = `☑️ **[[Click-Imagen]](${img2})**`;
  }

  if (!img_db.tiene(`${user.id}`)) {
    we = "❌ **Imagen del perfil no definida**";
  }
  
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(`⚙️🔩 Configuraciones De ${message.guild.name} ⚙️🔩`)
        .addField("**📚 Prefix:**", "☑️ `" + prefix + "`")
        .setDescription("**Si necesitas mas informacion coloca `configvip info`**")
        .addField("**🖼️ Imagen Perfil**", we)
    );
  if (args[0] === "info") {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `Menu Informacion de ${message.guild.name}`,
        client.user.displayAvatarURL()
      )
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL())
      .addField(
        "🖼️ **Imagen Perfil:**",
        "`" + `${prefix}setimg <url>` + "`"
      )
    message.channel.send(embed);
  }
};