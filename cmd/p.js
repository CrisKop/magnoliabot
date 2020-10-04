exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  let user = message.author;
  let days = user.createdAt.toLocaleString();
  let ing = member.user.joinedAt.toDateString().split(' ')
  const embed = new Discord.MessageEmbed()
  .setDescription(`Cuenta creada: ${days} \nFecha ingrso: ${ing}`)
  message.channel.send(embed)
};
