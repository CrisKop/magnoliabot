exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  const dinero = new db.crearDB("Dinero");
  const inventario = new db.crearDB("inventarios");
  const userbalance = await dinero.obtener(`${message.guild.id}.${message.author.id}`);
  const userinventario = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
  let bot = client.user.username;
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  const embed = new Discord.MessageEmbed()

    .setAuthor(bot + " ┊ Buy", client.user.avatarURL())
    .setDescription("Ejemplo: `" + prefix + "buy` [objeto]")
    .setColor("RANDOM")
    .setThumbnail(
      "https://lh3.googleusercontent.com/proxy/ZvTO67F4dYfiu5wh5CQQghUpxyWt9zoUF7to7qfiwltHEKIOyTJgOHjOgNT6UwmFK3pjYY16rYUyx_sLXm-Y7G2Rd8PISgr3KhBBlaVI5It5JME2tHnnvloyMlPp5mbu06GxXbSn7Zuhfo2GXJUw-DI1"
    )
    .setFooter("Si no sabes lo que se puede comprar usa " + prefix + "shop")
    .setTimestamp();
  if (!args[0]) {
     message.channel.send(embed);
 } else if (args[0].toLowerCase() == "football") {
   if (userbalance <= 5000)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("⚽"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has comprado la medalla **Football** ⚽")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 5000);
    inventario.push(`${message.guild.id}.${message.author.id}`, "⚽");
  } else if (args[0].toLowerCase() == "basket") {
    if (userbalance <= 10000)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("🏀"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has comprado la medalla **Basket** 🏀")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 10000);
    inventario.push(`${message.guild.id}.${message.author.id}`, "🏀");
    } else if (args[0].toLowerCase() == "tecnico") {
    if (userbalance <= 1500)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("🛠️"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has comprado la medalla **Tecnico** 🛠️")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 1500);
    inventario.push(`${message.guild.id}.${message.author.id}`, "🛠️");
        } else if (args[0].toLowerCase() == "programador") {
    if (userbalance <= 25000)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("🔰"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has comprado la medalla **Programador** 🔰")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 25000);
    inventario.push(`${message.guild.id}.${message.author.id}`, "🔰");
     } else if (args[0].toLowerCase() == "barcelona") {
    if (userbalance <= 40000)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("<:Barca:755496077414629497>"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has comprado la medalla **Barcelona** <:Barca:755496077414629497>")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 40000);
    inventario.push(`${message.guild.id}.${message.author.id}`, "<:Barca:755496077414629497>");
  } else if (args[0]) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("❌ Esa medalla no existe")
        .setColor("RED")
    );
  }
};
