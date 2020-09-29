exports.run = async (client, message, args) => {
  //como se hace lo de plataformas?? //lo hare aqui espera
  const Discord = require("discord.js");

  let guild = message.guild;

      const features = guild.features.join("\n");
    if (!features) {
      var features2 = "Ninguna";
    } else {
      var features2 = features;
    }
  
  let novedades = {
    NEWS: "**:newspaper: `|` Noticias**",
    ANIMATED_ICON: "**<:arrowgreen:739203436066635826> `|` Icono Animado**",
    BANNER: "**:comet: `|` Cabecera**",
    COMMERCE: "**:shopping_cart: `|` Comercio**",
    COMMUNITY: "**:mega: `|` Comunidad**",
    DISCOVERABLE: "**:mag: `|` Descubrimiento Activado**",
    FEATURABLE: "**:mag: `|` Descubrible**",
    INVITE_SPLASH: "**:railway_track: `|` Fondo De Inviación**",
    PARTNERED: "**<:Estats:748609040300638240> `|` Asociado Con Discord**",
    VANITY_URL: "**:desktop: `|` Url Personalizada**",
    VERIFIED: "**<:Confirmado:748913952750043136> `|` Verificado**",
    VIP_REGIONS: "**:beginner: `|` Regiones VIP**",
    WELCOME_SCREEN_ENABLED: "**:comet: `|` Pantalla De Bienvenida**"
  };

  let nivel = {
    0: "Ninguno",
    1: "Nivel 1",
    2: "Nivel 2",
    3: "Nivel 3"
  };

  let region = {
    europe: "Europa :flag_eu:",
    brazil: "Brasil :flag_br: ",
    hongkong: "Hong Kong :flag_hk:",
    japan: "Japón :flag_jp:",
    russia: "Rusia :flag_ru:",
    singapore: "Singapur :flag_sg:",
    southafrica: "Sudáfrica :flag_za:",
    sydney: "Sydney :flag_au:",
    "us-central": "Central US :flag_us:",
    "us-east": "Este US :flag_us:",
    "us-south": "Sur US :flag_us:",
    "us-west": "Oeste US :flag_us:",
    "vip-us-east": "VIP US Este :flag_us:",
    "eu-central": "Europa Central :flag_eu:",
    "eu-west": "Europa Oeste :flag_eu:",
    london: "London :flag_gb:",
    amsterdam: "Amsterdam :flag_nl:",
    india: "India :flag_in:"
  };

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      `Informacion de: ${message.guild.name}`,
      client.user.displayAvatarURL()
    )
    .addField(
      " `|` **__Info Server:__**",
      `Nombre: ${guild.name} \nID: ${guild.id} \nDueño: ${
        guild.owner
      } \nFecha Creacion: ${new Date(guild.createdAt).toString()} \nRegion: ${
        region[guild.region]
      }`
    )
    .addField(
      " `|` **__Actividad:__**",
      `Total Miembros: ${guild.memberCount} \nEn Linea: ${
        guild.members.cache.filter(m => m.presence.status === "online").size
      } Ausente: ${
        guild.members.cache.filter(m => m.presence.status === "idle").size
      } Ocupado: ${
        guild.members.cache.filter(m => m.presence.status === "dnd").size
      } Desconectado: ${
        guild.members.cache.filter(m => m.presence.status === "offline").size
      }`
    )
    .addField(
      " `|` **__Boosteos/Nivel:__**", `**Nº Boost:** ${message.guild.premiumSubscriptionCount} \n**Nivel Boost:** ${nivel[server.premiumTier]} \n**Ventajas Boost:** ${message.guild.features.length > 0 ? message.guild.features.map(fea => novedades[fea]) : "**No Tiene Ventajas**"}`)`Mejoras`
  message.channel.send(embed); 
};
