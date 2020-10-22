const Discord = require("discord.js");
const TikTok = require("tiktok-search");
exports.run = async (client, message, args) => {
    if(message.author.bot) return;
   let busqueda = args.join(" ")
   if(!busqueda) return message.channel.send("❌ `|` Debes colocar algun apodo nombre de alguna cuenta de tiktok")
   let Tru = {
       'true' : 'Si',
       'false' : 'No'
   }
    TikTok.getUser(busqueda).then(res =>{
        const embed = new Discord.MessageEmbed()
        .addField("<:info:768865018866434068> `|` **__Datos/Info__** `(TikTok)`", `👥 **Nombre:** ${res.userame} \n❣️ **Apodo:** ${res.displayName} \n🗞️ **Titulo:** ${res.title} \n🖇️ **Perfil:** ${res.profile} \n<a:VERIFICADO:758151918245249024> **Cuenta Verificada:** ${Tru[res.verified]} \n🔒 **Cuenta Privada:** ${Tru[res.private]} \n👥 **Seguidores:** ${res.followers} \n💾 **Seguidos:** ${res.following} \n📸 **Videos:** ${res.videos} \n🏅 **Datos:** ${res.description} \n📄 **Descripcion:** ${res.signature}`)
        .setColor('RANDOM')
        .setTimestamp()
  
        message.channel.send(embed)
    }).catch(err =>{
        return message.channel.send('❌ `|` No pude encontrar ningun usuario con el apodo `'+busqueda+'`')
    })
}

