exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let user = message.author;
  const db = require("megadb");
const vips_db = new db.crearDB("Vips");
  const vip = await vips_db.obtener("Vips");
  let skere;
  skere = "`Si`";
  if (vip.includes(user.id) == false) {
    skere = "`No`";
  }
  if(vip.includes(user.id) == false) return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(`Has encontrado un beneficio VIP`, message.author.displayAvatarURL())
    .setDescription("**__¿Para que sirve el VIP?__** \nEl vip sirve para que puedas obtener beneficios que tiene el bot, y veas mejor expectativa al bot")
    .setColor("BLUE")
    .setThumbnail(message.author.displayAvatarURL())
    .addField("**__¿Soy VIP__?**", skere)
    .addField("**__¿Como puedo conseguir VIP?__**", "`Donando: (1.00 a 5.00 USD/EUR)` **[PayPal](https://paypal.me/Xeantrix?locale.x=es_XC)** \n`Boosteando Wolf Security` **[Server Wolf](https://discord.gg/W8nn78X)** \n`Metiendo a los siguientes bots a servidores llenos` **[Wolf Security](https://discord.com/api/oauth2/authorize?client_id=752518742692462672&permissions=403712255&scope=bot)** `|` **[Monkey Security](https://discordapp.com/api/oauth2/authorize?client_id=755834111091802284&permissions=8&scope=bot)**")
)
  const embed = new Discord.MessageEmbed()
    .setAuthor(`Lista Emojis Personalizados`, message.author.displayAvatarURL())
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription("**Emojis:** \n\n`Regalo` 🎁 \n`Futbol` ⚽ \n`Tecnico` 🛠️ \n`Barcelona` <:Barca:755496077414629497>")
    .setFooter("Usa: `setemoji <emoji-nombre>`");
  message.channel.send(embed);
};
