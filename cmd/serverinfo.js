exports.run = async (client, message, args) => { //como se hace lo de plataformas?? //lo hare aqui espera //pero no quiero copiar, me siento sucio cuando lo hago ;v 
  const Discord = require("discord.js");
  
  let guild = message.guild;
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Informacion de: ${message.guild.name}`, client.user.displayAvatarURL())
  .addField("Info Server:__**", `Nombre: ${guild.name} \nID: ${guild.id} \nDueño: ${guild.owner} \nFecha Creacion: ${new Date(guild.createAt.toSt)`)rin