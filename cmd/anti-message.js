const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let xd = args.slice(0).join(" ");
  let usuario = message.author;
  let db = require("megadb");
  let am = new (require("megadb")).crearDB("AntiMessage");
  
  let perms = message.member.hasPermission("ADMINISTRATOR");

  if (!perms)
    return message.channel.send("❌ No tienes permisos de `Administrador`.");

  //if(!log.tiene(`${message.guild.id}`)) return message.channel.send("❌ No has establecido el canal de logs \nUsa: `setlogs #canal`")
  if (!xd)
    return message.channel.send(
      "☑️ Activa usando `anti-message enable` \n❌ Desactiva usando `anti-message disable`"
    );

  if(args[0] === "disable"){
    am.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiLinks **Desactivada** Correctamente"
      );
  } else if (args[0] === "enable"){
     if (am.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Message Ya estan activados");
    am.establecer(`${message.guild.id}.at`, "activado");
    return message.channel.send("☑️ AntiLoggers **Activada** Correctamente");
  }

  message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(`🌐 Reporte 🌐`)
    .setColor("RANDOM")
    .setThumbnail("https://image.freepik.com/vector-gratis/empresario-dibujos-animados-manos-hoja-papel-analisis-lupa_165488-183.jpg")
    .addField("🏅 **Confirma el reporte** 🏅", "**Si desea confirmar el reporte coloca `si` \nSi desea cancelar el reporte coloca `no`**"))

 const collector = message.channel.createMessageCollector(
      m => m.author.id === usuario.id && m.channel.id === message.channel.id,
      { time: 7000 }
    ); // Ponemos que tiene 3 segundos para poder responder a este mensaje.

    collector.on("collect", async collected => {
      if (collected.content.toLowerCase() === "si") {
        await message.channel.send("Espera un momento....")
     } else if (collected.content.toLowerCase() === "no") {
        message.channel.send("**Has cancelado el envio del reporte**"); // Si la respuesta es no enviara este mensaje.
      }
    });
    collector.on("end", collected => {
      if (collected.size === 0)
        return message.channel.send("**Se ha acabado el tiempo** :rolling_eyes:"); // Si la persona no responde en los 3 segundos de espera, enviara esta respuesta.
    });
}