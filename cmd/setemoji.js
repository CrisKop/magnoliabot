exports.run = async (client, message, args) => {
  let user = message.author;
  let Discord = require("discord.js");
  const db = require("megadb");
  const emojis = new db.crearDB("EmojisInter");
  let med = await emojis.get(`${user.id}`);
  const vips_db = new db.crearDB("Vips");
  const vip = await vips_db.obtener("Vips");
  if (vip.includes(user.id) == false)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "❌ No eres VIP y por lo tanto no puedes ejecutar este comando"
        )
        .setColor("RED")
    );

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
  } else {
    message.channel.send("Ese emoji no existe")
  }
};
