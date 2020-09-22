 exports.run = async (client, message, args) => {
    let Discord = require("discord.js")
  let sv = client.guilds.cache.get(args[0])
  
    if (!sv) return message.channel.send('**Debes ingresar una ID de un servidor existente.**')
    sv.channels.random().createInvite({maxAge: 0}).then(invite => {
    const embed = new Discord.MessageEmbed()
    .setColor(0x36393E)
    .setAuthor('Invitación Extraida.', client.user.displayAvatarURL())
    .addField('━━━━━━━━━━\nNombre del servidor:', sv)
    .addField('ID del Servidor', sv.id)
    .addField('Owner Info:', `\`\Owner name\`\:  ${sv.owner.user.tag}  \n\n\`\Owner ID\`\:  ${sv.owner.user.id}`)                      
    .addField('Estadisticas Generales:', `Usuarios: **${sv.memberCount}** | Canales: **${sv.channels.cache.size}** | Roles: **${sv.roles.cache.size}**`)
    .addField('invitación del servidor:\n━━━━━━━━━━', invite)
    .setThumbnail(sv.iconURL())
   
    message.channel.send(embed)
    message.channel.send("**Información del servidor enviada.**")
    message.channel.send("**En caso de que no se haya enviado, es probable que no tenga permisos.**")
    })
  }