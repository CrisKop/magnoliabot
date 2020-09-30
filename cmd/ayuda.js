const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  const db = require("megadb");
  let prefix_db = new db.crearDB("prefixes")
  
      let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setThumbnail(message.author.displayAvatarURL({ size: 1024, dynamic: true }))
.setTitle("🍭 **__Puedes Invitarme Mediante Este Link__**")
.setAuthor(`Panel ayuda ${client.user.username}`, client.user.displayAvatarURL())
.setURL("https://discord.com/api/oauth2/authorize?client_id=753340440001904841&permissions=8&scope=bot")
.setDescription("> **__Hola, soy un bot de economia hecho para ustedes esperemos que nos ayuden a llegar a muchos servidores__**")
.addField("💿 `|` **Inicio:**", "Si quieres empezar a usarme utiliza el siguiente comando `"+`${prefix}comandos`+"` ya con eso sabras como utilizarme y podras ver mis comandos")
.addField("🎡 `|` **Partners:**", "`"+prefix+"partners`")
.addField("🗳️ `|` **Info:**", "El bot cuenta con muchos comandos, la mayoria de economia y estamos mejorando varias cosas, todos los dias")
.addField("🔗 `|` **Enlaces/Links:**", "**[Invitame](https://discord.com/api/oauth2/authorize?client_id=753340440001904841&permissions=8&scope=bot)** `|` **[Wolf Security](https://discord.com/api/oauth2/authorize?client_id=752518742692462672&permissions=403712255&scope=bot)** `|` **[Monkey Security](https://discordapp.com/api/oauth2/authorize?client_id=755834111091802284&permissions=8&scope=bot)**")
message.channel.send(embed)
}