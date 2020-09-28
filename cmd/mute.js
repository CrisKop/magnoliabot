exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  let db_muterole = new db.crearDB("RoleMuted");

  let permiso = message.member.hasPermission("MANAGE_GUILD");
  let user = message.mentions.users.first();
  let razon = args.slice(1).join(" ") || "Razon Indefinida"

  if (!permiso)
    return message.reply(
      "❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Gestionar Server` para ejecutar ese comando**"
    );
  
  if (!db_muterole.tiene(message.guild.id))
    return message.channel.send("**__No se ha establecido el role para mutear al usuario__** \nUsa: `setmuterole <@role>`");
  
  if (!user) return message.reply("❌ `|` **Debes mencionar un usuario**");

  let rol = await db_muterole.obtener(message.guild.id);

  if (user.roles.cache.has(rol)) return message.channel.send("❌ `|` **Este usuario ya esta muteado**");
  user.roles.add(rol);

  const embedmute = new Discord.MessageEmbed()
  .setAuthor(`🔇 | Usuario ${user.username} Ha sido muteado | 🔇`, user.displayAvatarURL())
  .addField("🏅 `|` **Datos Muteo:**", `👤 **__Usuario Muteado:__** ${user} [${user.id}] \n👮 **__Responsable:__** ${message.author.tag} [${message.author.id}] \n📜 **__Razon:__** ${razon}`)
  message.channel.send(embedmute); //enviamos
};
