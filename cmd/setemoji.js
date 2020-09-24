exports.run = async (client, message, args) => {
  let user = message.author;
  let Discord = require("discord.js");
  const db = require("megadb");
  const emojis = new db.crearDB("EmojisInter");
  let med = await emojis.get(`${user.id}`);
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

  if (!emojis.tiene(`${message.author.id}`)) {
    emojis.establecer(`${message.author.id}`, []);
  }
  let emojir = args[0];

  if (!emojir) {
    return message.channel.send(
      "**・♡・꒰꒱・⇢ Debes escribir el nombre del emoji a agregar \nUsa `shopvip` para saber los emojis que hay**"
    );
  } else if (args[0] === "Regalo") {
    if (!emojis.tiene(`${message.author.id}`)) {
      emojis.establecer(`${message.author.id}`, []);
    }
    const userinventarioxd = await emojis.obtener(`${message.author.id}`);
    if (userinventarioxd.includes("🎁"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has obtenido la medalla **Regalo** 🎁")
        .setColor("GREEN")
    );
    emojis.establecer(`${message.author.id}`, "🎁");
  } else if (args[0] === "Futbol") {
    if (!emojis.tiene(`${message.author.id}`)) {
      emojis.establecer(`${message.author.id}`, []);
    }
    const userinventarioxd = await emojis.obtener(`${message.author.id}`);
    if (userinventarioxd.includes("⚽"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has obtenido la medalla **Futbol** ⚽")
        .setColor("GREEN")
    );
    emojis.establecer(`${message.author.id}`, "⚽");
  } else if (args[0] === "Tecnico") {
    if (!emojis.tiene(`${message.author.id}`)) {
      emojis.establecer(`${message.author.id}`, []);
    }
    const userinventarioxd = await emojis.obtener(`${message.author.id}`);
    if (userinventarioxd.includes("🛠️"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has obtenido la medalla **Tecnico** 🛠️")
        .setColor("GREEN")
    );
    emojis.establecer(`${message.author.id}`, "🛠️");
     } else if (args[0] === "Barcelona") {
    if (!emojis.tiene(`${message.author.id}`)) {
      emojis.establecer(`${message.author.id}`, []);
    }
    const userinventarioxd = await emojis.obtener(`${message.author.id}`);
    if (userinventarioxd.includes("<:Barca:758426604954583110>"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has obtenido la medalla **Barcelona** <:Barca:758426604954583110>")
        .setColor("GREEN")
    );
    emojis.establecer(`${message.author.id}`, "<:Barca:758426604954583110>");
  } else {
    message.channel.send("Ese emoji no existe")
  }
};
