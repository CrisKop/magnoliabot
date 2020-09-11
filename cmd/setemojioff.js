exports.run = async (client, message, args) => {
  let user = message.author;
  let Discord = require("discord.js");
  const db = require("megadb");
  const emojis = new db.crearDB("EmojisInter");
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


  let emojir = args[0];
  if (!emojir) {
    return message.channel.send(
      "**・♡・꒰꒱・⇢ Debes escribir el nombre del emoji a remover \nUsa `shopvip` para saber los emojis que hay**"
    );
  } else if (args[0] === "Regalo") {
    const userinventarioxd = await emojis.obtener(`${message.author.id}`);
    if (!userinventarioxd.includes("🎁"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ no tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has removido la medalla **Regalo** ")
        .setColor("GREEN")
    );
    emojis.eliminar(`${message.author.id}`, "🎁");
  } else if (args[0] === "Futbol") {
    const userinventarioxd = await emojis.obtener(`${message.author.id}`);
    if (!userinventarioxd.includes("⚽"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ no tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has removido la medalla **Futbol** ⚽")
        .setColor("GREEN")
    );
    emojis.eliminar(`${message.author.id}`, "⚽");
  } else if (args[0] === "Tecnico") {
    const userinventarioxd = await emojis.obtener(`${message.author.id}`);
    if (!userinventarioxd.includes("🛠️"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ no tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has removido la medalla **Tecnico** 🛠️")
        .setColor("GREEN")
    );
    emojis.eliminar(`${message.author.id}`, "🛠️");
  } else {
    message.channel.send("ese emoji no existe")
  }
}