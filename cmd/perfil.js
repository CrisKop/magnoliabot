exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  let user = message.mentions.users.first() || message.author;
  let db = require("megadb")
  const desc = new db.crearDB("Descripciones");

  //dinero//
  const dinero = new db.crearDB("Dinero");
  const banco = new db.crearDB("Banco");
  //dinero
  
  if (!dinero.tiene(`${message.guild.id}.${user.id}`)) {
    dinero.establecer(`${message.guild.id}.${user.id}`, 0);
  }

  if (!banco.tiene(`${message.guild.id}.${user.id}`)) {
    banco.establecer(`${message.guild.id}.${user.id}`, 0);
  }
  let cdinero = await dinero.obtener(`${message.guild.id}.${user.id}`);
  let cbanco = await banco.obtener(`${message.guild.id}.${user.id}`);
  var total = Math.floor(cdinero + cbanco);
  
  
  //descripciones//
  const note = await desc.obtener(`${user.id}`);
  //ddescripciones//
  
  //niveles//
  let levels_db = new db.crearDB("niveles");
   if (!levels_db.tiene(message.guild.id))
    levels_db.establecer(message.guild.id, {});
  if (!levels_db.tiene(`${message.guild.id}.${user.id}`))
    levels_db.establecer(`${message.guild.id}.${user.id}`, {
      xp: 0,
      nivel: 1
    });
  let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${user.id}`);

  let randomxp = Math.floor(Math.random() * 4) + 2;
  let levelup = 5 * nivel ** 2 + 50 * nivel + 100;
  //niveles//
  
  //staff//
  const developers_db = new db.crearDB("Developers");
  let staff = await developers_db.obtener("Developers");
  let skere2;
  skere2 = "`Si`";
  if (staff.includes(user.id) == false) {
    skere2 = "`No`";
  }
  //staff//

  //vips//
  const vips_db = new db.crearDB("Vips");
  let vip = await vips_db.obtener("Vips");
  let skere;
  skere = "`Si`";
  if (vip.includes(user.id) == false) {
    skere = "`No`";
  }
  //vips
  
  
  //color//
  const color = new db.crearDB("color");
  let colorxd = await color.obtener(`${user.id}`);
  //color 
  
const embed = new Discord.MessageEmbed()
    .setAuthor(
      `🍺 Perfil de ${user.username} [${user.id}]`,
      client.user.displayAvatarURL()
    )
    .setDescription(`🚀 ${note ? `**${note}**` : "**No Tiene Descripcion**"}`)
    .setThumbnail(user.displayAvatarURL())
    .setColor(colorxd)
    .addField(
      "🤑 `|` **__Dinero/Banco:__**",
      "**Dinero:** " +
      cdinero +
      " \n**Banco:** " +
      cbanco +
      " \n**Total:** " +
      total,
      true
    )
    .addField(
      "🔋 `|` **__Nivel/XP:__**",
      `**Nivel:** ${nivel} \n**XP:** ${xp}/${levelup} \n**Siguiente Nivel:** ${nivel +1}`,
      true
    )
    .addField("🎻 `|` **__Staff/Vip:__**", `**Staff:** ${skere2} \n**Vip:** ${skere}`, true)
  message.channel.send(embed);
};
