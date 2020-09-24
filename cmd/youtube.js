const Discord = require("discord.js");
exports.run = async (client, message, args) => {
     
    if(!args[0]) return message.reply("ingrese la ID")
    
    let id = args[0]
    
    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://i.ytimg.com/vi/${id}/0.jpg`)
    .setTitle('📥 | YT Descarga')
    .setDescription(`[Mp3](https://www.y2mate.com/youtube-mp3/${id})\n\n[Mp4](https://www.y2mate.com/youtube/${id})`)
    .setFooter(`Todo 100% legal `)
    
    message.channel.send({embed})

}