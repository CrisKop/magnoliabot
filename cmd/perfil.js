exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let db = require("megadb");

  let user = message.mentions.users.first() || message.author;

  let prefix_db = new db.crearDB("prefixes");

  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  const inventario = new db.crearDB("inventarios");

  if (inventario.tiene(`${message.author.id}`))
    return message.channel.send("Vuelve a colocar " + prefix + "perfil");

  const desc = new db.crearDB("Descripciones");

  const dinero = new db.crearDB("Dinero");
  const banco = new db.crearDB("Banco");

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

  //imagen//
  const img_db = new db.crearDB("img");
  const il = await img_db.obtener(`${user.id}`, args.join(" "));
  //badges//
  let badges = {
    DISCORD_EMPLOYEE: "<:Empleado:739216383841140878> **Empleado Discord**",
    DISCORD_PARTNER: "<:Partner:739216383103205406> **Partner Discord**",
    HYPESQUAD_EVENTS: "<:HypeSquad:739216383547539456> **Eventos HypeSquad**",
    BUGHUNTER_LEVEL_1: "<:BugHunter:739224970101653514> **BugHunter 1**",
    HOUSE_BRAVERY: "<:Bravery:739216376211701810> **House Bravery**",
    HOUSE_BRILLIANCE: "<:Brilliance:739216380007809104> **House Brilliance**",
    HOUSE_BALANCE: "<:balance:739216375477829733> **House Balance**",
    EARLY_SUPPORTER: "<:soporte:739216384851968050> **Soporte**",
    TEAM_USER: "<:team:739216384999030835> **Usuario Team**",
    SYSTEM: "<:sistema:739216385095237713> **Sistema**",
    BUGHUNTER_LEVEL_2: "<:BugHunter:739224970101653514> **BugHunter 2**",
    VERIFIED_BOT: "<:botverificado:739216382985764864> **Bot Verificado**",
    VERIFIED_DEVELOPER: "<:dev:739214087732592731> **Developer Verificado**"
  };
  //badges

  //matrimonio
  // const marry = new db.crearDB("Matrimonio");
  // const marr = await marry.obtener(`${message.guild.id}.${user.id}`);
  //matrimonio

  //reps//
  const rep = new db.crearDB("rep");
  let r = await rep.obtener(`${message.guild.id}.${user.id}`);
  //medallas//
  let medallas;
  medallas = await inventario.obtener(`${message.guild.id}.${user.id}`);

  if (!inventario.tiene(`${message.guild.id}.${user.id}`)) {
    await inventario.set(`${message.guild.id}.${user.id}`, []); //Esto se ocupa
    return (medallas = "No tiene medallas");
  }
  let med = await inventario.get(`${message.guild.id}.${user.id}`);

  let medails;
  if (!inventario.tiene(`${message.guild.id}.${user.id}`)) {
    medails = "No tiene medallas";
  }
  if (medallas == "No tiene medallas") {
    medails = "No tiene medallas";
  }
  if (med.length == 0) {
    medails = "No tiene medallas";
  } else {
    medails = med.join(" | ");
  }

  const emojis = new db.crearDB("EmojisInter");
  let emoji = await emojis.get(`${user.id}`);

  const db_marry = new db.crearDB("marry");
  const marr = await db_marry.obtener(`${message.author.id}`);

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      `🍺 Perfil de ${user.username} [${user.id}]`,
      client.user.displayAvatarURL()
    )
    .setDescription(
      `${emoji ? `${emoji}` : "No"} **|** ${
        note ? `${note}` : "**No Tiene Descripcion**"
      }`
    )
    .setThumbnail(il)
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
      `**Nivel:** ${nivel} \n**XP:** ${xp}/${levelup} \n**Siguiente Nivel:** ${nivel +
        1}`,
      true
    )
    .addField(
      "🎻 `|` **__Staff/Vip:__**",
      `**Staff:** ${skere2} \n**Vip:** ${skere}`,
      true
    )
    .addField(
      "♥ **Casad@ con:**",
      `${marr ? `${marr}` : "No esta casad@"}`,
      true
    )
    .addField(
      "🦡 `|` **__Badges:__**",
      user.flags.toArray().length > 0
        ? user.flags.toArray().map(flag => badges[flag])
        : "**No tiene Insignias**",
      true
    )
    .addField(
      "🔥 `|` **__Reputaciones:__**",
      `${r ? `${r}` : "No tienes reputaciones"}`,
      true
    )
    .addField("👝 `|` **__Medallas:__**", medails, true);
  message.channel.send(embed);
};
