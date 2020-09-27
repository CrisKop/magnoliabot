const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");
  let prefix_db = new db.crearDB("prefixes");

  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `Filtros y Configuracion de ${message.guild.name}`,
          client.user.displayAvatarURL()
        )
        .setDescription(
          `**__Aqui esta los filtros y configuracion__** \nPara ver los filtros usa **${prefix}menu filtros** \nPara ver las configs **${prefix}menu config**`
        )
        .setColor("RANDOM")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())
    );

  if (args[0] === "filtros") {
    let al = new (require("megadb")).crearDB("AntiLoggers");
    let am = new (require("megadb")).crearDB("AntiMessage");
    let ab = new db.crearDB("AntiBots");
    const u = new db.crearDB("AntiUser");

    let abo;
    if (ab.tiene(message.guild.id)) {
      abo = `☑️ Activado`;
    }
    if (!ab.tiene(message.guild.id)) {
      abo = "❌ Desactivado";
    }

    let ae;
    if (am.tiene(message.guild.id)) {
      ae = `☑️ Activado`;
    }
    if (!am.tiene(message.guild.id)) {
      ae = "❌ Desactivado";
    }

    let as;
    if (al.tiene(message.guild.id)) {
      as = `☑️ Activado`;
    }
    if (!al.tiene(message.guild.id)) {
      as = "❌ Desactivado";
    }

    let au;
    if (u.tiene(message.guild.id)) {
      au = `☑️ Activado`;
    }
    if (!u.tiene(message.guild.id)) {
      au = "❌ Desactivado";
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `Filtros de ${message.guild.name}`,
        client.user.displayAvatarURL()
      )
      .addField(
        "**__Filtros Activadas/Desactivadas__**",
        `💻 **__Anti-Loggers:__** ${as} \n📜 **__Anti-Message:__** ${ae} \n🤖 **__Anti-Bots:__** ${abo} \n👤 **__Anti-Users:__** ${au}`
      )
      .addField(
        "**__Informacion Filtros:__**",
        "💻 **__AntiLoggers:__** `Evita los loggers, los loggers roban tu IP, y con esta proteccion las evita` \n📜 **__AntiMessage:__** `No deja que hablen las personas en el servidor` \n🤖 **__AntiBots:__** `Evita la entrada de bots de cualquier tipo` \n👤 **__AntiUsers:__** `Evita la entrada de los usuarios solamente`"
      )
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL());
    message.channel.send(embed);
  }

  if (args[0] === "config") {
    const log = new db.crearDB("Logs");
    let lo = await log.obtener(message.guild.id);
    const sug = new db.crearDB("Sugerencias");
    let s = await sug.obtener(message.guild.id);

    const roleb = new db.crearDB("AutoBots");
    const role = new db.crearDB("AutoUser");
    let u = await role.obtener(message.guild.id);
    let b = await roleb.obtener(message.guild.id);
    
    const mencion = new db.crearDB("MencionSuggest")
    let r = await mencion.obtener(message.guild.id)

    let m;
    if (mencion.tiene(message.guild.id)) {
      m = `<@&${r}>`;
    }
    if (!mencion.tiene(message.guild.id)) {
      m = "❌ No hay role definido sugerencias";
    }
    
    let su;
    if (sug.tiene(message.guild.id)) {
      su = `<#${s}>`;
    }
    if (!sug.tiene(message.guild.id)) {
      su = "❌ No hay canal definido";
    }

    let l;
    if (log.tiene(message.guild.id)) {
      l = `<#${lo}>`;
    }
    if (!log.tiene(message.guild.id)) {
      l = "❌ No hay canal definido";
    }

    let dx;
    if (roleb.tiene(message.guild.id)) {
      dx = `<@&${b}>`;
    }
    if (!roleb.tiene(message.guild.id)) {
      dx = "❌ No hay role definido";
    }

    let xd;
    if (role.tiene(message.guild.id)) {
      xd = `<@&${u}>`;
    }
    if (!role.tiene(message.guild.id)) {
      xd = "❌ No hay role definido";
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `Configuraciones de ${message.guild.name}`,
        client.user.displayAvatarURL()
      )
      .addField(
        "**__Configs Activadas/Desactivadas__**",
        `**__Logs:__** ${l} \n**__Sugerencias:__** ${su} \n**__Mencion Sugerencia:__** ${m} \n\n**__Autoroles:__** \n**Bots:** ${dx} \n**Usuarios:** ${xd}`
      )
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL());
    message.channel.send(embed);
  }
};
