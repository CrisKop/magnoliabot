exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  
  let prefix_db = new db.crearDB("prefixes") 
  
  var prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
let user = message.author;
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