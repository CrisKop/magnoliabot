     exports.run = async (client, message, args) => {
       let Discord = require("discord.js")
var permisos = {
        CREATE_INSTANT_INVITE: "Crear Invitación",
        KICK_MEMBERS: "Expulsar Miembros",
        BAN_MEMBERS: "Banear Miembros",
        ADMINISTRATOR: "Administador",
        MANAGE_CHANNELS: "Gestionar Canales",
        MANAGE_GUILD: "Gestionar Servidor",
        VIEW_AUDIT_LOG: "Ver Registro de Auditoría",
        PRIORITY_SPEAKER: "Prioridad de Palabra",
        VIEW_CHANNEL: "Ver Canal",
        ADD_REACTIONS: "Añadir Reacciones",
        STREAM: "Transmitir",
        READ_MESSAGES: "Leer Mensajes",
        SEND_MESSAGES: "Enviar Mensajes",
        SEND_TTS_MESSAGES: "Enviar Mensaje de Texto a Voz",
        MANAGE_MESSAGES: "Gestionar Mensajes",
        EMBED_LINKS: "Incrustar Enlaces",
        USE_EXTERNAL_EMOJIS: "Usar Emojis Externos",
        ATTACH_FILES: "Adjuntar Archivos",
        READ_MESSAGE_HISTORY: "Leer Historial de Mensajes",
        MENTION_EVERYONE: "Mencionar a Todos",
        EXTERNAL_EMOJIS: " Emojis Externos",
        CONNECT: "Conectar",
        SPEAK: "Hablar",
        MUTE_MEMBERS: "Silenciar Miembros",
        DEAFEN_MEMBERS: "Ensordecer Miembros",
        MOVE_MEMBERS: "Mover Miembros",
        USE_VAD: "Usar Actividad de Voz",
        CHANGE_NICKNAME: "Cambiar Apodo",
        MANAGE_NICKNAMES: "Gestionar Apodos",
        MANAGE_ROLES: "Gestionar Roles",
        MANAGE_ROLES_OR_PERMISSIONS: "Gestionar Roles o Permisos",
        MANAGE_WEBHOOKS: "Gestionar Webhooks",
        MANAGE_EMOJIS: "Gestionar Emojis"
      };
      let estadouser = {
        online: "<a:conectado:704683627388076153> Conectado",
        idle: "<a:ausente:704683627601985617> Ausente",
        dnd: "<a:nomolestar:704683627329486849> No Molestar",
        invisible: "<a:desaparecido:704683627270635622> Invisible"
      };
      let bots = {
        false: "<:interrobang:705628779518885898> No",
        true: "<a:verificado:697508074801332295> Si"
      };

      let userm = message.mentions.members.first();

      if (!userm) {
        var user6 = message.member;

        const embed64 = new Discord.MessageEmbed()
          .setThumbnail(user6.displayAv)
          .setAuthor(
            "Info de " + user6.user.username + "#" + user6.user.discriminator,
            user6.user.avatarURL
          )
          .setColor("RANDOM")
          .addField(
            "<:boy:705093344350568518> **Nombre:**",
            user6.user.username,
            true
          )
          .addField(
            "<a:Corree:705851251065225371> **Jugando a:**",
            user6.user.presence.game != null
              ? user6.user.presence.game.name
              : "Nada",
            true
          )
          .addField("<:id:705094028227510333> **ID:**", user6.user.id, true)
          .addField(
            "<:link:705094294117023825> **URL Del Avatar**",
            message.author.avatarURL
          )
          .addField(
            "<a:Fiesta:698964936453521428> **Estado:**",
            estadouser[user6.user.presence.status],
            true
          )
          .addField(
            "<:bot:360209976012308494> **¿Es un BOT?**",
            bots[user6.user.bot]
          )
          .addField(
            "<:Inicio:698303945399074846> **Apodo:**",
            `${user6.nickname !== null ? `${user6.nickname}` : "Ninguno"}`,
            true
          )
          .addField(
            "<a:verificado:697508074801332295> **Cuenta Creada:**",
            user6.user.createdAt.toDateString(),
            true
          )
          .addField(
            "<:calendar:705472156120776724> **Fecha de Ingreso:**",
            message.member.joinedAt.toDateString(),
            true
          )
          .addField(
            "**Roles:**",
            message.member.roles.cache.map(roles => roles).join("  |  "),
            true
          )
          .addField(
            "**Permisos:**",
            `\`\`\`${user6.permissions
              .toArray()
              .cache.map(p => permisos[p])
              .join(", ")}\`\`\``
          )
          .setFooter(
            "Solicitado por" + message.author.username + "",
            message.author.avatarURL()
          );

        message.channel.send(embed64);
      } else {
        const embed65 = new Discord.MessageEmbed()
          .setThumbnail(userm.avatarURL())
          .setAuthor(
            "Info de " + userm.user.username + "#" + userm.user.discriminator,
            userm.user.displayAvatarURL
          )
          .setColor("RANDOM")
          .addField(
            "<:boy:705093344350568518> **Nombre**",
            userm.user.username,
            true
          )
          .addField(
            "<a:Corree:705851251065225371> **Jugando a**",
            userm.user.presence.game != null
              ? userm.user.presence.game.name
              : "Nada",
            true
          )
          .addField("<:id:705094028227510333> **ID**", userm.user.id, true)
          .addField(
            "<:link:705094294117023825> **URL Del Avatar**",
            message.author.avatarURL()
          )
          .addField(
            "<a:Fiesta:698964936453521428> **Estado**",
            estadouser[userm.user.presence.status],
            true
          )
          .addField(
            "<:bot:360209976012308494> **¿Es un BOT?**",
            bots[userm.user.bot]
          )
          .addField(
            "<:Inicio:698303945399074846> **Apodo**",
            `${userm.nickname !== null ? `${userm.nickname}` : "Ninguno"}`,
            true
          )
          .addField(
            "<a:verificado:697508074801332295> **Cuenta Creada**",
            userm.user.createdAt.toDateString(),
            true
          )
          .addField(
            "<:calendar:705472156120776724> **Fecha de Ingreso**",
            message.member.joinedAt.toDateString(),
            true
          )
          .addField(
            "**Roles**",
            message.member.roles.cache.map(roles => roles).join("  |  "),
            true
          )
          .addField(
            "**Permisos:**",
            `\`\`\`${userm.permissions
              .toArray().cache
              .map(p => permisos[p])
              .join(", ")}\`\`\``
          )
          .setFooter(
            "Solicitado por " + message.author.username + "",
            message.author.avatarURL()
          );

        message.channel.send(embed65);
      }
     }