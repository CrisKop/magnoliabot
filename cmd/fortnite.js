const fclient = require("fortnite");
const fortnite = new fclient("fd854fc9-db40-4f80-90df-08dbfa044743");
let Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let jugadorstr = args[0]; //jugadorstr sera el nombre del jugador
  let plataforma = args[1];
  if (!jugadorstr)
    return message.channel.send("ingresa el nombre de un jugador");
  if (!plataforma)
    return message.channel.send(
      "ingresa una plataforma, puede ser pc o gamepad"
    );

  fortnite
    .user(jugadorstr, plataforma)
    .then(jugador => {
      //buscamos el jugador por nombre y plataforma y se crea un JSON con sus stats
      const embed = new Discord.MessageEmbed() //un embed para que se vea mas bonis :3
        .setThumbnail(jugador.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`**Estadisticas de: [${jugadorstr}](${jugador.url})**`) //haremos que el nombre sea clickeable para ir a su usuario en fortnitetracker
        .addField("Estadisticas/Informacion:", `🎉 \`|\` **__Victorias:__** \n**Modo Solo:** ${jugador.stats.solo.wins} \n**Modo Duo:** ${jugador.stats.duo.wins} \n**Modo Squad:** ${jugador.stats.squad.wins} \n\n🥖 \`|\` **__Eliminaciones:__** \n**Modo Solo:** ${jugador.stats.solo.kills} \n**Modo Duo:** ${jugador.stats.duo.kills} \n**Modo Squad:** ${jugador.stats.squad.kills} \n\n🎲 \`|\` **__Partidas:__** \n**Modo Solo:** ${jugador.stats.solo.matches} \n**Modo Duo:** ${jugador.stats.duo.matches} \n**Modo Squad:** ${jugador.stats.squad.matches}`)
      message.channel.send(embed);
    })
    .catch(e => message.reply("error: " + e)); //y un catch por si algo falla
};
