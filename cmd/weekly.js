const Discord = require("discord.js");
const db = require("megadb");
const dinero = new db.crearDB("Dinero");
const cooldown3 = new db.crearDB("cooldown3");
var ms = require("parse-ms");

exports.run = async (client, message, args) => {
  let tiempo =  604800000;
  if (!cooldown3.tiene(`${message.guild.id}.${message.author.id}`)) {
    cooldown3.establecer(`${message.guild.id}.${message.author.id}`, Date.now() + tiempo);
    if (!dinero.tiene(`${message.guild.id}.${message.author.id}`))
      dinero.establecer(`${message.guild.id}.${message.author.id}`, 0);
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 500);
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("☑️ Has recogido tus 500 monedas")
        .setColor("GREEN")
    );
  } else {
    let time = await cooldown3.obtener(`${message.guild.id}.${message.author.id}`);
    let timeObj = ms(time - Date.now());
    if (Date.now() < time)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            "❌ Necesitas esperar" +
              ` ${timeObj.days}d ${timeObj.hours}h ${timeObj.minutes}m y ${timeObj.seconds}s` +
              " ⏰"
          )
          .setColor("RED")
      );
    else {
      cooldown3.establecer(`${message.guild.id}.${message.author.id}`, Date.now() + tiempo);
      dinero.sumar(`${message.guild.id}.${message.author.id}`, 500);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("☑️ Has recogido tus 500 monedas")
          .setColor("GREEN")
      );
    }
  }
};
