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
      .setAuthor(`🥊 Lista Comandos ${client.user.username} 🥊`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription("📃 `|` Te invito al **[Servidor Soporte](https://discord.gg/W8nn78X)** \n📣 `|` Podras **[Invitarme](https://discord.com/api/oauth2/authorize?client_id=753340440001904841&permissions=8&scope=bot)** Por este enlace")
      .addField("⭐ `|` **Lista Comandos:**", `💰 **__Economia:__** \`${prefix}comandos eco\` \n👮 **__Staff:__** \`${prefix}comandos staff\` \n📜 **__Info:__** \`${prefix}comandos info\` \n📌 **__Config:__** \`${prefix}comandos config\` \n🔰 **__Seguridad:__** \`${prefix}comandos seguridad\` \n🎉 **__Diversion:__** \`${prefix}comandos diversion\` \n🏭 **__Todos los Comandos:__** \`${prefix}comandos all\``)
      .setTimestamp()
      .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    );
  if (args[0] === "eco") {
    const embed = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/753270513069195337/753353150454431764/2017585.png")
    .setColor("RANDOM")
    .setAuthor(`Economia de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Eco:", "`game` - `buy2` - `buy` - `shop` - `shop2` - `rob` - `addmoney` - `crime` - `rep` - `dep` - `with` - `work` - `daily` - `weekly` - `perfil` - `setinfo` - `delinfo` - `ruleta` - `setcolor` - `resetcolor`")
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
    .addField("Comandos/info:", "`covidpais` - `covidall` - `botinfo` - `falexyinfo` - `listvips` - `afk` - `start-giveaway` - `reroll` - `end-giveaway` - `sugerencia`")
    message.channel.send(staff)
  }
   if(args[0] === "config") {
    const staff = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/753270513069195337/753365099695046687/3390850.png")
    .setColor("RANDOM")
    .setAuthor(`Config de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Config:", "`setprefix` - `resetprefix` - `createrole` - `menu` - `setautorole` - `setsugerencia` - `setmention`")
    message.channel.send(staff)
  }
  if(args[0] === "seguridad") {
    const se = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/758040716340363385/759031098842939432/3447560.png")
    .setColor("RANDOM")
    .setAuthor(`Seguridad de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Seguridad:", "`sos` - `deletewords` - `blockword` - `unlockword` - `wordslist` - `anti-loggers` - `anti-message` - `anti-spam` - `anti-channel` - `anti-roles` - `anti-joins` - `anti-flood` - `falexydetectar` - `falexyban` - `snipe`")
    .addField("Comandos/Seguridad(VIP):", "`backup`")
    message.channel.send(se)
  }
  if(args[0] === "diversion"){
    const se = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/758040716340363385/759031207098318908/3468129.png")
    .setColor("RANDOM")
    .setAuthor(`Diversion de ${client.user.username}`, client.user.displayAvatarURL())
    .addField("Comandos/Diversion:", "`aki` - `tictoe`")
    message.channel.send(se)
  }
  if(args[0] === "all"){
    const embed1 = new Discord.MessageEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/758040716340363385/759031207098318908/3468129.png")
    .setColor("RANDOM")
    .setAuthor(`Todos Los Comandos de: ${client.user.username}`, client.user.displayAvatarURL())
    .setDescription("💸 `|` **__Economia:__** \n`game` - `buy2` - `buy` - `shop` - `shop2` - `rob` - `addmoney` - `crime` - `rep` - `dep` - `with` - `work` - `daily` - `weekly` - `perfil` - `setinfo` - `delinfo` - `ruleta` - `setcolor` - `resetcolor` \n<:EconBot:758151903783419914> `|` **__Economia VIP:__** \n`setimg` - `delimg` - `configvip` - `setemoji` - `setemojioff` - `shopvip` \n\n🛠️ `|` **__Staff:__** `addstaff` - `removestaff` - `addvip` - `removevip` - `eval` - `falexyadd` \n\n📜 `|` **__Info:__** `covidpais` - `covidall` - `disable` - `botinfo` - `falexyinfo` - `listvips` - `afk` - `start-giveaway` - `reroll` - `end-giveaway` - `sugerencia` \n\n🌐 `|` **__Config:__** `setprefix` - `resetprefix` - `createrole` - `menu` - `setautorole` - `setsugerencia` - `setmention` \n\n🔰 `|` **__Seguridad:__** `deletewords` - `blockword` - `unlockword` - `wordslist` - `anti-loggers` - `anti-joins` - `anti-flood` - `falexydetectar` - `falexyban` - `snipe` - `anti-message` - `anti-spam` \n<:EconBot:758151903783419914> `|` **__Seguridad VIP:__** `backup` \n\n🎉 `|` **__Diversion:__** `youtube` - `aki` - `tictoe`")
    .addField("🥂 `|` **__Enlaces:__**", "**[Server Soporte](https://discord.gg/W8nn78X)** `|` **[Invitame](https://discord.com/api/oauth2/authorize?client_id=753340440001904841&permissions=8&scope=bot)** `|` **[Wolf Security](https://discord.com/api/oauth2/authorize?client_id=752518742692462672&permissions=403712255&scope=bot)** `|` **[Monkey Security](https://discordapp.com/api/oauth2/authorize?client_id=755834111091802284&permissions=8&scope=bot)**")
    .setFooter("Panel Comandos "+message.author.tag, message.author.displayAvatarURL())   
    message.channel.send(embed1)
  }
};
