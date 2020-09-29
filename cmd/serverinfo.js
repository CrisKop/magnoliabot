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

  let normal = message.guild.emojis.cache.filter(e => !e.animated).size;
  let animated2 = message.guild.emojis.cache.filter(e => e.animated).size;
  let animated = message.guild.emojis.cache
    .filter(e => e.animated)
    .map(x => x.toString());
  let anima2 = animated.slice(0, 10).join("**|**");
  let emojis = message.guild.emojis.cache
    .filter(e => !e.animated)
    .map(x => x.toString());

  let emojis2 = emojis.slice(0, 10).join("**|**");

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(
      `🌐 | Informacion de: ${message.guild.name} | 🌐`,
      client.user.displayAvatarURL()
    )
    .addField(
      "📜 `|` **__Info Server:__**",
      `📰 **Nombre:** ${guild.name} \n🆔 **ID:** ${guild.id} \n💠 **Dueño:** ${
        guild.owner
      } \n📅 **Fecha Creacion:** ${new Date(
        guild.createdAt
      ).toString()} \n🌍 **Region:** ${region[guild.region]}`
    )
    .addField(
      "☢️ `|` **__Actividad:__**",
      `👥 **Total Miembros:** ${guild.memberCount} \n💚 **En Linea:** ${
        guild.members.cache.filter(m => m.presence.status === "online").size
      } 💛 **Ausente:** ${
        guild.members.cache.filter(m => m.presence.status === "idle").size
      } ❤️ **Ocupado:** ${
        guild.members.cache.filter(m => m.presence.status === "dnd").size
      } 🖤 **Desconectado:** ${
        guild.members.cache.filter(m => m.presence.status === "offline").size
      } \n🧭 \`\|\` **__Plataformas:__** \n💻 **Escritorio:** ${
        message.guild.members.cache.filter(
          o => o.presence.clientStatus && o.presence.clientStatus.desktop
        ).size
      } 📱 **Celular/Movil:** ${
        message.guild.members.cache.filter(
          o => o.presence.clientStatus && o.presence.clientStatus.mobile
        ).size
      } 🖇️ **Web/Pagina:** ${
        message.guild.members.cache.filter(
          o => o.presence.clientStatus && o.presence.clientStatus.web
        ).size
      }`,
      true
    )
    .addField(
      "💥 `|` **__Boosteos/Nivel:__**",
      `🔖 **Nº Boost:** ${
        message.guild.premiumSubscriptionCount
      } \n🥥 **Nivel Boost:** ${
        nivel[guild.premiumTier]
      } \n🚦 **Ventajas Boost:** ${
        message.guild.features.length > 0
          ? message.guild.features.map(fea => novedades[fea])
          : "No Tiene Ventajas"
      }`
    )
    .addField(
      "🍋 `|` **__Emojis:__**",
      `🌿 **Total Emojis:** ${guild.emojis.cache.size} \n💝 **Animados:** ${
        animated.length == 0
          ? "No hay emojis animados en este servidor"
          : anima2
      } \n🚝 **Normales:** ${
        emojis.length == 0 ? "No hay emojis en este servidor" : emojis2
      }`
    )

    .addField(
      "🥫 `|` **__Canales:__**",
      `🥂 **Total Canales:** ${guild.channels.cache.size} \n🏕️ **Categoria(s):** ${
        guild.channels.cache.filter(c => c.type === "category").size
      } \n📜 **Canales de Texto:** ${
        guild.channels.cache.filter(c => c.type === "text").size
      } \n🎙️ **Canales de Voz:** ${
        guild.channels.cache.filter(c => c.type === "voice").size
      }`
    )

    .addField(
      "🧻 `|` **__Roles:__**",
      `🗞️ **Total Roles:** ${guild.roles.cache.size} \n🤟 **Gestionados:** ${
        guild.roles.cache.filter(r => r.type === "managed").size
      }`
    )

    .addField(
      "💤 `|` **__Afk:__**",
      `🛌 **Canal AFK:** ${guild.afkChannel ||
        "¡No hay ningun canal AFK configurado!"} \n⏲️ **Tiempo AFK:** ${guild.afkTimeout +
        " segundos" || "¡No hay ningun canal AFK configurado!"}`
    );
  message.channel.send(embed);
};
