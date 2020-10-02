const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require("megadb");
  const forceban = new db.crearDB("Ids");
  let i = await forceban.obtener("ids");
  let forceadd2 = new db.crearDB("Razones");
  var encontrados = [];
  i.forEach(id => {
    if (message.guild.members.cache.get(id)) {
      encontrados.push(id);
    }
  });
  if (encontrados < 1)
    return message.channel.send(
      "No he detectado ningun raider en este servidor"
    );

  let index = 0;
  let fin = [];
  let reasons = [];
  for (let i = 0; i < encontrados.length; i++) {
    let datos = await forceadd2.get(encontrados[i]);
    reasons.push(datos);
    fin.push(`✳️ ${++index} <@${encontrados[i]}> | **Razon:** ${reasons[i]}`);
  }
    
    let xd = fin.join("\n")
    
    let estado = message.guild.members.cache.filter(x =>
            x.presence.activities.find(x => x.type === 'CUSTOM_STATUS') &&
            x.presence.activities.find(x => x.type === 'CUSTOM_STATUS').state &&
            x.presence.activities
              .find(x => x.type === 'CUSTOM_STATUS').state.includes('https://discord.gg')
        ).map(x => x.id);
    
    let en = `${estado.map(id => `<@${id}>`).join(' ')}`

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`🌐 | Hemos detectado usuarios maliciosos en `+message.guild.name+" | 🌐")
    .setDescription(`👥 **Encontrados:** \`${parseInt(encontrados.length)}\` \n⛔ **Usuarios Maliciosos:** ${xd} \n👥 **Encontrados:** \`${estado.length}\` \n**Usuarios con enlaces:** ${en}`)
    )
}
