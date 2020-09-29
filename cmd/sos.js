exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let channel = client.channels.cache.get("760576112563716167");
  let usuario = message.author;
  const db = require("megadb")
  let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`🌐 Reporte 🌐`)
      .setColor("RANDOM")
      .setThumbnail(
        "https://image.freepik.com/vector-gratis/empresario-dibujos-animados-manos-hoja-papel-analisis-lupa_165488-183.jpg"
      )
      .addField(
        "🏅 **Confirma el reporte** 🏅",
        "**Si desea confirmar el reporte coloca `si` \nSi desea cancelar el reporte coloca `no`** \n\n**__Nota:__** \n`SE ACTIVO EL ANTI-CHANNELS Y ANTI-ROLES` coloca: `"+prefix+"menu config`"
      )
  );

  const collector = message.channel.createMessageCollector(
    m => m.author.id === usuario.id && m.channel.id === message.channel.id,
    { time: 7000 }
  ); // Ponemos que tiene 3 segundos para poder responder a este mensaje.

  collector.on("collect", collected => {
    if (collected.content.toLowerCase() === "si") {
      message.channel.createInvite({ maxAge: 0 }).then(link => {
        const embed = new Discord.MessageEmbed()
          .setTitle("📧 | **Reporte O Duda**")
          .addField("👥 Dueño Discord:", message.guild.owner)
          .addField(":battery: Servidor:", message.guild.name)
          .addField(":wrench: Invite Discord:", link)
          .addField(":bust_in_silhouette: Reporte Enviado Por", message.author)
          .setThumbnail(
            "https://gifimage.net/wp-content/uploads/2017/09/advertencia-gif-12.gif"
          )
          .setColor("RANDOM");

        channel.send(embed);
        channel.send("@here");
        message.channel.send("**Has Advertido Al Staff**");
        let ac = new (require("megadb")).crearDB("AntiChannel");
        ac.establecer(`${message.guild.id}.at`, "activado");
        let ar = new (require("megadb")).crearDB("AntiRoles");
        ar.establecer(`${message.guild.id}.at`, "activado")
      });
    } else if (collected.content.toLowerCase() === "no") {
      message.channel.send("❌ `|` **Has cancelado el envio del reporte**"); // Si la respuesta es no enviara este mensaje.
    }
  });
  collector.on("end", collected => {
    if (collected.size === 0)
      return message.channel.send(
        "❌ `|` **Se ha acabado el tiempo** :rolling_eyes:"
      ); // Si la persona no responde en los 3 segundos de espera, enviara esta respuesta.
  });
};
