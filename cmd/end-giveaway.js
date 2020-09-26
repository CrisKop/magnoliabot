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

  // If no message ID or giveaway name is specified
  if (!args[0]) {
    return message.channel.send("❌ Debe colocar una ID de un sorteo activo");
  }

  // try to found the giveaway with prize then with ID
  let giveaway =
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);

  // If no giveaway was found
  if (!giveaway) {
    return message.channel.send(
      "❌ No pude encontrar el sorteo `" + args.join(" ") + "`."
    );
  }

  // Edit the giveaway
  client.giveawaysManager
    .edit(giveaway.messageID, {
      setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
      // Success message
      message.channel.send(
        "❌ Sorteo terminada en " +
          client.giveawaysManager.options.updateCountdownEvery / 1000 +
          " Segundos...."
      );
    })
    .catch(e => {
      if (
        e.startsWith(
          `❌ Sorteo con la ID ${giveaway.messageID} ya ha terminado.`
        )
      ) {
        message.channel.send("❌ Este sorteo ya termino");
      } else {
        console.error(e);
        message.channel.send("❌ Ha ocurrido un error...");
      }
    });
};
