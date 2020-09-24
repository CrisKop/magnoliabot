exports.run = async (client, message, args) => {
    const Discord = require("discord.js");
      const db = require("megadb");
      const developers_db = new db.crearDB("Developers");
  let devs = await developers_db.obtener("Developers");
  let user = message.author;
  if (devs.includes(user.id) == false)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `${user.username} [${user.id}]`,
          message.author.displayAvatarURL()
        )
        .setColor("RED")
        .setDescription(
          "🗳️ `|` **__No eres STAFF del BOT, por lo tanto no puedes usar el comando__**"
        )
    );
      let blacklist = new db.crearDB("BlackList");
      if (!blacklist.tiene("blacklist")) {
        blacklist.establecer("blacklist", []);
      } //Guardamos los argumentos 0 (id) en el array creado anteriormente El codigo este va en el comando el de arriba en otro para crearlo
  
      if (!args[0]) return message.channel.send("❌ Debe colocar una ID");
      const idsxd = await blacklist.obtener("blacklist");
      if (idsxd.includes(args[0]) == false)
        return message.channel.send("❌ El usuario no esta en la forceban");

    if(user.bot) return message.channel.send("No puedes agregar a un bot")
      if (isNaN(args[0]))
        return message.channel.send("❌ Debe colocar una ID real");
  
      blacklist.extract("blacklist", args[0]);
  
      const embed = new Discord.MessageEmbed()
        .setAuthor(`☑️ Usuario Removido ☑️`)
        .setColor("RED")
        .addField("**Info Proceso**", "🆔 **ID Usuario:** " + args[0])
        .addField("**👤 Usuario:**", `<@${args[0]}>`);
      message.channel.send(embed);
    }