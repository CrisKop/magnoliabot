exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
let perms = message.member.hasPermission("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Permiso` para ejecutar ese comando**")
  const db = require("megadb");
  const words = new db.crearDB("Palabras");

  if (!words.tiene(message.guild.id)) {
    words.establecer(message.guild.id, []);
  }
  let xd = args.slice(0).join(" ");
  if (!xd)
    return message.channel.send(
      "❌ `|` **Debes colocar una palabra a bloquear**"
    );

  const idsxd = await words.obtener(message.guild.id);
  if (idsxd.includes(args[0]) == false)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`❌ | Ha Ocurrido Un Error | ❌`)
        .setDescription(
          "🏭 `|` **__La palabra que digito `" +
            xd +
            "` No esta bloqueada en el servidor__**"
        )
        .setColor("RED")
    );

    if(!words.tiene(message.guild.id)) return message.channel.send(
    new Discord.MessageEmbed()
        .setAuthor(`❌ | Ha Ocurrido Un Error | ❌`)
        .setDescription("🏭 `|` **__Esa palabra no existe en la base de datos del servidor__**")
        .setColor("RED")
    )
  words.extract(message.guild.id, xd);
  message.channel.send(
    "☑️ `|` **Palabra `" + xd + "` Desbloqueada Correctamente**"
  );
};
