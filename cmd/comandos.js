exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
const db = require("megadb");
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/attachments/753270513069195337/753353041557717112/3391213.png")
      .setAuthor(`Lista Comandos ${client.user.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription("E")
      .addField("**Lista Comandos:**", `💰 **__Economia:__** \`${prefix}comandos eco\` \n👮 **__Staff:__** \`${prefix}comandos staff\` \n📜 **__Info:__** \`${prefix}comandos info\` \n📌 **__Config:__** \`${prefix}comandos config\` \n🔰 **__Seguridad:__** \`${prefix}comandos seguridad\` \n🎉 **__Diversion:__** \`${prefix}comandos diversion\``)
      .setTimestamp()
      .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    );
  if (args[0] === "eco") {
    const embed = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/753270513069195337/753353150454431764/2017585.png")
    .setColor("RANDOM")
    .setAuthor(`Economia de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Eco:", "`buy2` - `buy` - `shop` - `shop2` - `rob` - `addmoney` - `crime` - `rep` - `dep` - `with` - `work` - `daily` - `weekly` - `perfil` - `setinfo` - `delinfo` - `ruleta` - `setcolor` - `resetcolor`")
    .addField("Comandos/Eco(VIP):", "`setimg` - `delimg` - `configvip` - `setemoji` - `setemojioff` - `shopvip`")
    message.channel.send(embed)
  }
  
  if(args[0] === "staff") {
    const staff = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/753270513069195337/753364820526629035/3390910.png")
    .setColor("RANDOM")
    .setAuthor(`Staff de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Staff:", "`addstaff` - `removestaff` - `addvip` - `removevip` - `eval` - `falexyadd`")
    message.channel.send(staff)
  }
    if(args[0] === "info") {
    const staff = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/753270513069195337/753365099695046687/3390850.png")
    .setColor("RANDOM")
    .setAuthor(`Info de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/info:", "`botinfo` - `falexyinfo` - `listvips` - `afk` - `start-giveaway` - `reroll` - `end-giveaway`")
    message.channel.send(staff)
  }
   if(args[0] === "config") {
    const staff = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/753270513069195337/753365099695046687/3390850.png")
    .setColor("RANDOM")
    .setAuthor(`Config de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Config:", "`setprefix` - `resetprefix` - `createrole` - `menu`")
    message.channel.send(staff)
  }
  if(args[0] === "seguridad") {
    const se = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/758040716340363385/759031098842939432/3447560.png")
    .setColor("RANDOM")
    .setAuthor(`Seguridad de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Seguridad:", "`anti-loggers` - `anti-joins` - `anti-flood` - `falexydetectar` - `falexyban` - `snipe`")
    .addField("Comandos/Seguridad(VIP):", "`backup` - `anti-message` - `anti-spam`")
    message.channel.send(se)
  }
  if(args[0] === "diversion"){
    const se = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/758040716340363385/759031207098318908/3468129.png")
    .setColor("RANDOM")
    .setAuthor(`Diversion de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Diversion:", "`aki`")
    message.channel.send(se)
  }
};
