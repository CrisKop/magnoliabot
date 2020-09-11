exports.run = (client, message, args) => {
const tresenraya = require('tresenraya');
 let Discord = require("discord.js")
const user = message.mentions.users.first();
const mencion = new Discord.RichEmbed()
  .setAuthor(`🎲 Juego TicTacToe 🎲`)
  .setColor("RED")
  .setDescription("❌ Mencion a un usuario para jugar")
  if(!user) return message.channel.send(mencion)

  var embot = new Discord.RichEmbed();
  embot.setDescription("❌ No puedes jugar con un bot");
  embot.setColor("RED")
  if(user.bot) return message.channel.send(embot);

  if (user.id == message.author.id)
  return message.channel.send(
    new Discord.MessageEmbed()
      .setDescription("❌ No puedes jugar contigo mismo")
      .setColor("RED")
  );
  
const partida = new tresenraya({ jugadores: [message.author.id, user.id] });
  
partida.on('ganador', (jugador, tablero, paso) => { // cuando encuentra a algún ganador se emite el evento 'ganador'
    
  message.channel.send(
    new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`🎲 Juego TicTacToe (GANASTE) 🎲`)
    .setDescription('¡Ha ganado ' + client.users.cache.get(jugador).username + ' en esta partida! Después de `' + paso + ' pasos.`\n\n' + tablero.string + '\n\nLo siento, ' + client.users.get(partida.perdedor).username + '... :frowning:')
  )
    
});
  
partida.on('empate', (jugadores, tablero, paso) => { // si se produce un empate se emite el evento 'empate'
    
  message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(`🎲 Juego TicTacToe (EMPATE) 🎲`)
    .setColor("ORANGE")
    .setDescription('¡Ha sido un empate entre: ' + jugadores.map(x => client.users.cache.get(x).username).join(' y ') + '!')
  )
});
  
message.channel.send(
  new Discord.MessageEmbed()
  .setColor("BLUE")
    .setAuthor(`🎲 Juego TicTacToe (COMIENZO) 🎲`)
    .setDescription('Empieza ' + client.users.cache.get(partida.turno.jugador).username + ', elige un número del 1 al 9 [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string)
  )
 
const colector = message.channel.createMessageCollector(msg => msg.author.id === partida.turno.jugador && !isNaN(msg.content) && (Number(msg.content) >= 1 && Number(msg.content) <= 9) && partida.disponible(msg.content) && !partida.finalizado);
 
colector.on('collect', (msg) => {
      
  partida.elegir(msg.content); // elegir la posición dependiendo del contenido del mensaje recolectado
  
  if(partida.finalizado) {
    
    colector.stop();
    return;
    
  } // si la partida ya ha finalizado (ya sea por que alguien ha ganado o ha habido un empate), para el colector y retorna nada
      
  message.channel.send(
    new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setAuthor(`🎲 Juego TicTacToe (TURNOS) 🎲`)
    .setDescription('Turno de ' + client.users.cache.get(partida.turno.jugador).username + ' [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string)
  );
      
});
}