exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let dbs = require("quick.db");
  let db = require("megadb");
  const ms = require("parse-ms"); //exacto
  const dinero = new db.crearDB("Dinero");
  
  let user2 = message.author;
  let author = await dbs.fetch(`rob_${message.guild.id}_${user2.id}`);
  let timeout = 1800000;
  if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ Ya has robado, tomate un descanso \n\nIntenta de nuevo en: ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed);
  } else {

  let user = message.mentions.users.first()
  if (!user)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("❌ Debes mencionar un usuario")
        .setColor("RED")
    );

  // if (authorcmd <= 250) {
  //   return message.channel.send(
  //     new Discord.MessageEmbed()
  //       .setDescription("❌ Necesitas 250$ de dinero en el bolsillo para robar")
  //       .setColor("RED")
  //   );
  // }
    
     if (!dinero.tiene(`${message.guild.id}.${user.id}`)) {
    dinero.establecer(`${message.guild.id}.${user.id}`, 0);
  }

  const mencion = await dinero.obtener(`${message.guild.id}.${user.id}`);
  const authorcmd = await dinero.obtener(
    `${message.guild.id}.${message.author.id}`
  );

  
  if(mencion <= 0) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("❌ No tiene nada que puedas robarle")
        .setColor("RED")
    );
  }
    
  if(message.author.id === user.id) return message.channel.send("No puedes robarte a ti mismo")

  let random = Math.floor(Math.random() * 200) + 1;
  
  const embed = new Discord.MessageEmbed()
  .setDescription(`☑️ Le has robado a ${user} una cantidad de ${random} de dinero`)
  .setColor("GREEN")
  message.channel.send(embed)
  dinero.restar(`${message.guild.id}.${user.id}`, random)
  dinero.sumar(`${message.guild.id}.${message.author.id}`, random)
  dbs.set(`rob_${message.guild.id}_${user.id}`, Date.now());
};
}
