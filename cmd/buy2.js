exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  const dinero = new db.crearDB("Dinero");
  const userbalance = await dinero.obtener(`${message.guild.id}.${message.author.id}`);
  const userinventario = await items.obtener(`${message.guild.id}.${message.author.id}`)
  let bot = client.user.username;
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  const items = new db.crearDB("Tienda")
  
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
 } else if (args.join(" ").toLowerCase() == await items.obtener(message.guild.id)) { 
   if (userbalance <= 5000)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!items.tiene(`${message.guild.id}.${message.author.id}`)) {
      items.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await items.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes(message.guild.id))
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
    items.push(`${message.guild.id}.${message.author.id}`, "⚽");
  } 
};
