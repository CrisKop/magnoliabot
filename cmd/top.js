exports.run = async (client, message, args) => {
  const db = require("megadb")
  const dinero = new db.crearDB("Dinero");
  let Discord = require("discord.js")
  
   var encontrados = [];
  
  let index = 0;
  let fin = []
  let reasons = []
  for(let i = 0; i < encontrados.length;i++){
    console.log(encontrados[i])
      let datos = await dinero.get(encontrados[i])
      reasons.push(datos)
     fin.push(`${++index}📌 <@${encontrados[i]}> | Dinero: ${reasons[i]}`)
  }
  
    message.channel.send(new Discord.MessageEmbed()
    .setColor("RED")
    .setThumbnail("https://image.freepik.com/vector-gratis/auditoria-o-investigacion-fiscal-o-lista-paginas-papel-traves-lupa-icono-vector-dibujos-animados-plana_101884-673.jpg")
    .setAuthor("⚠️ >> | Deteccion de usuarios maliciosos en " + message.guild.name)
    .setDescription( fin.join("\n") )
                         )
}
