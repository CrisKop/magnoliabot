const Discord = require("discord.js");
exports.run = async (client, message, args) => {
     
    if(!args[0]) return message.reply(
    new Discord.MessageEmbed()
    .setDescription("**__Debes colocar la ID de un video__**")
    .addField("Cual es la ID:", "`La ID es la que referencia el video para encontrarlo mas facil, la ID es la que aparece despues del **watch=**`")
    .setImage("https://cdn.discordapp.com/attachments/758153148266315817/758535337701277707/unknown.png")
    .setFooter("En este caso la ID es `H76xgH9jZvA`")
    .setColor("RANDOM"))
    
    let id = args[0]
    
    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://i.ytimg.com/vi/${id}/0.jpg`)
    .setColor("RANDOM")
    .setAuthor(`Descarga de video`)
    .setDescription(`**__Links Videos:__** \nFormato MP3: [Mp3](https://www.y2mate.com/youtube-mp3/${id}) \nFormato MP4: [Mp4](https://www.y2mate.com/youtube/${id})`)
    
    message.channel.send({embed})

}