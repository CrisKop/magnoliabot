const ms = require("ms");

exports.run = async (client, message, args) => {
  // If the member doesn't have enough permissions
  if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Falex Gives")
  ) {
    return message.channel.send(
  "❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Gestionar Mensajes` para ejecutar ese comando**"
    );
  }


  let giveawayChannel = message.mentions.channels.first();

  if (!giveawayChannel) {
    return message.channel.send("❌ Debe mencionar un canal");
  }

  
  let giveawayDuration = args[1];

  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.channel.send("❌ Especifica la duracion del sorteo");
  }


  let giveawayNumberWinners = args[2];

  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.channel.send("❌ Especifica el numero de ganadores");
  }

  // Giveaway prize
  let giveawayPrize = args.slice(3).join(" ");
  // If no prize is specified
  if (!giveawayPrize) {
    return message.channel.send("❌ Especifica el premio a ganar");
  }

  // Start the giveaway
  client.giveawaysManager.start(giveawayChannel, {
    // The giveaway duration
    time: ms(giveawayDuration),
    // The giveaway prize
    prize: giveawayPrize,
    // The giveaway winner count
    winnerCount: giveawayNumberWinners,
    // Who hosts this giveaway
    hostedBy: client.config.hostedBy ? message.author : null,
    // Messages
    messages: {
      giveaway:
        (client.config.everyoneMention ? "" : "") +
        "🎉 **SORTEO** 🎉",
      giveawayEnded:
        (client.config.everyoneMention ? "" : "") +
        "🎉 **SORTEO FINALIZADO** 🎉",
      timeRemaining: "Tiempo Restante: **{duration}**!",
      inviteToParticipate: "Reaccion con 🎉 para participar!",
      winMessage: "Felicidades, {winners}! Han ganado **{prize}**!",
      embedFooter: "Sorteos",
      noWinner: "Sorteo cancelado, insuficiente participantes.",
      hostedBy: "Hecho Por: {user}",
      winners: "Ganador(es/as)",
      endedAt: "Termino hace:",
      units: {
        seconds: "seconds",
        minutes: "minutes",
        hours: "hours",
        days: "days",
        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
      }
    }
  });

  message.channel.send(`🎉 Sorteo empezo en ${giveawayChannel}!`);
};
