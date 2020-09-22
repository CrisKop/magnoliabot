const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  const db = require("megadb");
  let prefix_db = new db.crearDB("prefixes")
  
      let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  
  if(!args[0]) return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(`Filtros y Configuracion de ${message.guild.name}`, client.user.displayAvatarURL())
  .setDescription(`**__Aqui esta los filtros y configuracion__** \nPara ver los filtros usa **${prefix}menu filtros** \nPara ver las configs **${prefix}menu config**`)
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL())
  )
  
  if(args[0] === "filtros"){
    let al = new (require("megadb")).crearDB("AntiLoggers");
    let am = new (require("megadb")).crearDB("AntiMessage");
    
    let ae;
    if (am.tiene(message.guild.id)) {
    ae = `☑️ Activado`;
    }
    if (!am.tiene(message.guild.id)) {
    ae = "❌ Desactivado";
    }
    
    let as;
    if (al.tiene(message.guild.id)) {
    as = `☑️ Activado`;
    }
    if (!al.tiene(message.guild.id)) {
    as = "❌ Desactivado";
    }
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Filtros de ${message.guild.name}`, client.user.displayAvatarURL())
    .addField("**__Filtros Activadas/Desactivadas__**", `**__Anti-Loggers:__** ${as} \n**__Anti-Message:__** ${ae}`)
    .setColor("RANDOM")
    message.channel.send(embed)
  }
  
  if(args[0] === "config"){
  const log = new db.crearDB("Logs");
  let lo = await log.obtener(message.guild.id)
    let l;
  if (log.tiene(message.guild.id)) {
    l = `<#${lo}>`;
  }
  if (!log.tiene(message.guild.id)) {
   l = "❌ No hay canal definido";
  }
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Configuraciones de ${message.guild.name}`, client.user.displayAvatarURL())
    .addField("**__Configs Activadas/Desactivadas__**", `**__Logs:__** ${l}`)
    .setColor("RANDOM")
    message.channel.send(embed)
  }
  
  
  
}