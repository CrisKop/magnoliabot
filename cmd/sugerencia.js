exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
  const sug = new db.crearDB("Sugerencias");
  
   let suggest = await sug.obtener(`${message.guild.id}`);
    if (!sug.tiene(`${message.guild.id}`))
      return message.channel.send(
        "**Aun no esta establecido el canal de sugerencias \nContacte con un administrador para que lo defina**"
      );
    const canalrendered = client.channels.cache.get(suggest);
  
  let xd = args.join(" ")
  if(!xd) return message.channel.send("Debes colocar una sugerencia")
  
   const embed = new Discord.MessageEmbed()
    .setAuthor(`Nueva Sugerencia`, client.user.displayAvatarURL())
    .addField("Datos Sugerencia", `**Sugerencia: ${xd} \n**Enviada Por:** ${message.author} \n**Hora:** ${fecha}`)
    message.channel.send(
      "<a:si:739197012569882645> Autenticado ``|`` **Sugerencia Enviada Correctamente** <a:si:739197012569882645>"
    );
    canalrendered.send(embed).then(msg => {
      msg.react("☑️")
      msg.react("❌")
    });
  }