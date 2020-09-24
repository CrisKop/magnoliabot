const ms = require("ms");

exports.run = async (client, message, args) => {
  // If the member doesn't have enough permissions
 if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Falex Gives")
  ) {
    return message.channel.send(
      "❌ Necesitas permisos de `Gestionar Mensajes` o tener el role `Falex Gives`"
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
      "❌ No pude encontrar ese sorteo `" + args.join(" ") + "`."
    );
  }

  // Reroll the giveaway
  client.giveawaysManager
    .reroll(giveaway.messageID)
    .then(() => {
      // Success message
      message.channel.send("☑️ Sorteo Resorteado!");
    })
    .catch(e => {
      if (
        e.startsWith(
          `❌ Sorteo con la ID ${giveaway.messageID} no ha terminado`
        )
      ) {
        message.channel.send("❌ Este sorteo no ha terminado");
      } else {
        console.error(e);
        message.channel.send("❌ Ha ocurrido un error...");
      }
    });
};
