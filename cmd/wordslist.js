exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const words = new (require("megadb")).crearDB("Palabras");

  let medallas;
  medallas = await words.obtener(`${message.guild.id}`);

  if (!words.tiene(`${message.guild.id}`)) {
    await words.set(`${message.guild.id}`, []);
    return (medallas = "❌ **__No hay palabras bloqueadas__**");
  }
  let med = await words.get(`${message.guild.id}`);

  let pal;
  if (!words.tiene(`${message.guild.id}`)) {
    pal = "❌ **__No hay palabras bloqueadas__**";
  }
  if (medallas == "❌ **__No hay palabras bloqueadas__**") {
    pal = "❌ **__No hay palabras bloqueadas__**";
  }
  if (med.length == 0) {
    pal = "❌ **__No hay palabras bloqueadas__**";
  } else {
    pal = med.join(`\n`);
  }

  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(message.guild.iconURL())
      .setAuthor(`Palabras Bloqueadas de ${message.guild.name}`, message.guild.iconURL())
      .setDescription(`**${pal}**`)
    message.channel.send(embed);
  } else {
    message.channel.send("❌ `|` **No hay palabras bloqueadas en el servidor**")
  }
};
